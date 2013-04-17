# Debugging Frameworks

## jQuery

### Try-Catch Wrapper

The easy way to start with this is using

    // All methods of bar will be wrapped
    project.track(jQuery);

This will installed a try-catch wrapper around all query apis and catch the exceptions.


### Jquery Events

To track events in jQuery is simple.

    project.track(jQuery.event);

This will track all the events though apis like `.click`, `.trigger` etc


### Jquery Ajax Helper

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