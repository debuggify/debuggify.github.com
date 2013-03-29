# Advanced Debugging

Below are some advance techniques to capture exceptions.

First create a logger object

    var project = debuggify.Logger.get('project');


## Manually Report

###  Using Try-Catch

  We can wrap our code inside **try-catch** so it breaks we can extract information like filename, line no, char no and stacktrace from the exception.

    function foo() {
      try {
        throw new Error("Something went wrong");
      } catch(e) {

        // We can manually report this exception
        project.report(e);

      }
    }

    foo();


## Automatically Report


### Using Try-Catch wrapper

This will **wrap multiple** functions at once.


    var bar= {

      p1: true,
      p2: 100,

      foo1 : function() {
        throw new Error("Something went wrong 1");
      }

      foo2 : function() {
        throw new Error("Something went wrong 2");
      }


      foo3 : function() {
        throw new Error("Something went wrong 2");
      }
    }

    // All methods of bar will be wrapped
    project.track(bar);

    // Only foo1 and foo2 will be wrapped
    project.track(bar, ['foo1', 'foo2']);


### Using with Jquery

    // All methods of bar will be wrapped
    project.track(jQuery);

    // Only the mentioned functions will be wrapped
    project.track(jQuery, ['extend', 'trim', 'hasData', 'css' ]);

    foo();


### Disable Try-Catch wrapper


    // For all the functions
    project1.untrack(bar);

    // For only mentioned function names
    project1.untrack(bar, ['extend', "trim"]);


This will restore the original functions. This will work only if the function is already wrapped.


## Helpers

### SetTimeout & SetInterval

We have wrapped `setTimeout` and `setInterval` by default so any exceptions happens though their callbacks will be captured automatically.

### Jquery Ajax Helper

    // A simple ajax helper to track ajax errors
    $(document).ajaxError(function(event, jqXHR, ajaxSettings, thrownError) {

      project.error(thrownError);

    });

In future we will be integrating it in the debuggify js file to automatically capture ajax errors.
