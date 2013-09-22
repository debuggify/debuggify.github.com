# Tracking Frameworks

Check out The [Track Api](#!/guide/advance-section-3) and [The Report Api ](#!/guide/advance-section-1)

## jQuery

### Try-Catch Wrapper

The easy way to start with this is using

    // All methods of bar will be wrapped
    project.track(jQuery);
    project.track(jQuery.event);

First line install a try-catch wrapper around all query apis and will catch any raised exceptions.

Second line will start tracking the jQuery events which are listened using apis like `.click`, `.trigger` etc.


### Jquery Ajax Helper

This is small snipet to track jQuery ajax related errors.

    // A simple ajax helper to track ajax errors
    $(document).ajaxError(function(event, jqXHR, ajaxSettings, thrownError) {

      project.error(thrownError);

    });


## Emberjs

Ember provides a onerror handler which is triggered which framework encounter any errors.

    Ember.onerror = function(e) {
      project.report(e);
    }


## Backbone

Coming Soon