---
layout: post
title: "New API's to add custom data points"
date: 2013-07-24 04:24
comments: true
categories: custom-data debugging javascript metadata
published: true
author: Ankur Agarwal
---

In the past we have received many requests related to attach some custom data along with every messages collected.

We have added this functionality, and to simplify it, we have come with 3 new APIs


## The Alias API


Using this api, its possible to set an alias to the unique user identification used by the debuggify. This make it easy to map a debuggify user identifier to your site username or email id. Remember the old data will not have alias.

    debuggify.alias('foo@example.com');

Its pretty straight forward to use the above api.

**Note** Make sure every unique user should be given the one alias to avoid any data inconsistency.


## The Metadata API

To attach custom data along with every message

    debuggify.metadata({'login': true});



## The Attach API

To attach custom data along with a single message. This api need to be called on the logger object

    var ajaxErrors = debuggify.Logger.get('ajax_errors');

    ajaxErrors.attach({
      type: 'POST',
      url: '/api/notification'
    });

    ajaxErrors.error('Error in Notification Api');


After calling attach, it must be followed by the one of the logging Apis like `.log`, `.error`, `.warn`, `.debug` or `.message` to push that data to the server.

**Note**: The attached data will expire after its once used by logging Api's. To send data with every request use `.metadata` api


We soon be adding use cases on how to use this APIs more powerfully.