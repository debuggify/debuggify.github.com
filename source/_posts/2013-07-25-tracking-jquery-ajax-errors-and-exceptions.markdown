---
layout: post
title: "Tracking jquery ajax errors and exceptions"
date: 2013-07-25 4:44
comments: true
categories: ajax debug exceptions errors catch track cross-origin same-origin
published: true
author: Ankur Agarwal
---

The web had already shifted from static web pages to ajax driven websites for good. This shift have made the web awesome and faster but have introduced some new problems which need to taken care of . One of these is failed ajax requests. There are many reasons for a ajax request to fail, some of them are

    - Api End points are down or unreachable
    - Unauthorized / Invalid data requested
    - Some error happened at the API back-end
    - Edge cases are not handed properly in the code

Normally the ajax pull data from self hosted as well 3rd party hosted APIs. In both cases, the failure of ajax request has to handled at both ends, but front end is more important because of its high impact on the user experience. In case of 3rd party APIs, there is any way no possibility to have control over back-end, so front-end is the default choice.

The browser behaves differently when it comes to make a ajax calls for same origin and ajax call for cross origin, and therefore exceptional handling also have to different.

## Same Origin

In jQuery, the simplest way to catch all the ajax errors and exceptions on a web page

    $(document).ajaxError(function(event, jqXHR, ajaxSettings, thrownError) {

      // This is the default error handler for ajax request.

      // Extract all the information required to understand.
      var requestResponse = {
        url: ajaxSettings.url,
        method: ajaxSettings.type,
        data: ajaxSettings.data,
        httpStatus: jqXHR.status,
        error: thrownError || jqXHR.statusText,
        data: ajaxSettings.data
      };

      console.error(requestResponse)

      // Notify the user so he might not wonder.
      alert('Something went wrong, Please try again');

      // Report it back for fixing it
      // Only for debuggify users
      var ajaxErrors = debuggify.Logger.get('ajax_errors');
      ajaxErrors.attach(requestResponse);
      ajaxErrors.error('Caught ajax error');

    });


One important thing to note here is this handler is not called for cross-domain scripts and cross-domain JSONP requests which made its easy to avoid any ajax errors happening in application other than your native javascript code.


**Note** If `$.ajax()` or `$.ajaxSetup()` is called with the `global` option set to `false`, the .ajaxError() method will not fire.


Apart from this generic handler, it is possible to have a dedicated error handler for each type of request.

    $.ajax({

      type: "POST",
      url: "https://api.twitter.com/1.1/statuses/user_timeline.json",
      error: function(jqXHR, textStatus,errorThrown) {
        var requestResponse = {
          httpStatus: jqXHR.status,
          error: thrownError || jqXHR.statusText,
        };

        console.log(requestResponse);

        // Notify the user so he might not wonder.
        alert('Something went wrong, Please try again');


        // Report it back for fixing it
        // Only for debuggify users
        var ajaxErrors = debuggify.Logger.get('ajax_errors');
        ajaxErrors.attach(requestResponse);
        ajaxErrors.error('Caught ajax error');

      }
    });

Event this dedicated handler is not called for cross-domain script and cross-domain JSONP requests.


## Cross Origin

The limitation for ajax exception handlers is not just a jQuery limitation, but it is a javascript limitation. The reason behind this limitation is that most browser are not giving permissions to access error messages for cross domain scripts due to security reasons.

There are some solutions (or workarounds) for this. (Reference [stackoverflow](http://stackoverflow.com/questions/10093497/jquery-doesnt-fire-error-callback-with-cross-domain-script/10094761#10094761) )

First one, if backend is accessible, set (in my example PHP) headers to allow a cross domain call. When you do this, then JavaScript accepts the call, and no crossdomain tricks are needed.

        header('Access-Control-Allow-Origin: http://domain1.com, http://domain2.com'); //whitelist

Secondly if there is no access to backend, a timeout based workaround can be used to get a error callback
    $.ajax({
        type: "POST",
        url: "https://api.twitter.com/1.1/statuses/user_timeline.json",
        success: start_map,
        timeout: 2000, // 2 seconds timeout before error function will be called
        dataType: 'script',
        crossDomain: true
    });

This is a nasty trick to solve the problem as it can definitely screw up things for slow internet connection.

Another alternative option is using the jQuery plugin [jquery-jsonp](https://github.com/jaubourg/jquery-jsonp). This plugin is using script onload / onerror method along with timeout to get the error callback.


