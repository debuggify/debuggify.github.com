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


First create a human object


    var Human = {

      name: "Anonmous",

      eyes: {
        see : function() {
          throw new Error("Something went wrong while seeing");
        },

        blink : function() {
          throw new Error("Something went wrong while blinking");
        },
      },

      talk : function() {
        throw new Error("Something went wrong while talking");
      },

      run: function() {
        throw new Error("Something went wrong while running");
      },

      walk : function() {
        throw new Error("Something went wrong while walking");
      }
    };


Now, To automatic enable the error tracking inside the functions


    // All the 1st level functions and their children functions will be wrapped
    // talk run walk are wrapped
    // see blink will not be wrapped
    project.track(Human);

    // Only walk and run will be wrapped
    project.track(bar, ['walk', 'run']);

    // To track children objects Human.eyes
    // see blink will be wrapped
    project.track(Human.eyes);


So, now errors will be reported automatically

    Human.walk();


We often have to work with big objects which have multilevel of hierarchy of functions. So we need to track all the sub level functions.

    // Lets extend the Human object

    Human.talk.to = function(name) {
      throw new Error("Something went wrong while talking  to " + name);
    };

    Human.talk.via = function(device) {
      throw new Error("Something went wrong while talking  via " + device);
    };

    // The same will track errors for to and from.
    // Need need to add extra tracking
    project.track(Human);


**NOTE**: This will only wrap the functions while are immediate children not the prototype chain functions


To check whether a function is currently tracked or not

    project.isTracked(Human.talk.to); // return true


### Using with Jquery

    // All methods of bar will be wrapped
    project.track(jQuery);

    // Only the mentioned functions will be wrapped
    project.track(jQuery, ['extend', 'trim', 'hasData', 'css' ]);


For more details on debugging jQuery, see [frameworks section](#!/guide/frameworks)


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
