# Advanced Techniques

Below are some advance techniques to capture exceptions.

First create a logger object

    var project = debuggify.Logger.get('project');







##  The Report API

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

  All you need to do is to pass the exception to the api, it will take care of extracting the information and reporting it.















##  The Big Try-Catch

  To catch errors in a particular javascript file, wrap the whole code inside a single try-catch. Executing the code inside the try catch can have some performance issues in browsers like chrome, so to do it efficiently

    var __my_code__ = function {

      // Whole javascript code here ...

    }

    try {
      __my_code__();
    } catch(e) {
      // Now any exception thrown inside this code will be reported
      project.report(e);
    }




















## The Track API

This will **wrap multiple** functions at once for any json object.


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














## Track Cross Domain Scripts

The are many different techniques to track cross domain scripts

### Fetch the javascript from the same origin as the current page.

For your own code its easy to host it on the same domain or setup a proxy which fetches the cross domain scripts and serve them. This may not play well with third party scripts as they further load many other scripts.

### Wrap whole file inside try-catch

For this technique you have to modify your existing javascript code. When the code is wrapped inside try-catch the exception is caught inside catch loop. Every browser gives exact information at this point. So its easy to extract the exact information at this point of time. Check [The Big Try-Catch](#!/guide/advance-section-2) to know more.


### Wrap the interfacing functions of the objects provided by that javascript

This means wrapping all the functions which are called externally with try-catch. You can manually go and update every function which is definitely hard to maintain. The good way is to use  [The Track Api](#!/guide/advance-section-3) which wrap all the functions of a object in line of code.












## Script error

### What does it mean?

When some exception occurs for any cross origin script, some browser do not allow to collect the actual error information through window.onerror. In this cases the error message returned is "Script error".

As per [stackoverflow](http://stackoverflow.com/questions/5913978/cryptic-script-error-reported-in-javascript-n-chrome-and-firefox/7778424#7778424
) post this behavior is intentional to avoid some security risks but its at expense of useful debugging information.


### I am not using any third party code then why I am seeing it ?

If the script is hosted on a different origin than the current page origin. Basically if anything among protocol, subdomain or port is different then its treated as different origin. This even happens if you are using CDN's to serve the static resources.



### How to get actual error message

Check [Track Cross Domain Scripts](#!/guide/advance-section-4)


















## Override Console

In production, We can easily capture console messages. And not only that, we can manage which type of message we want to capture.

Lets override console in a single line.

    window.console = debuggify.Logger.get('console');

    // We can console object to report errors
    console.info('Yay! I can collect console messages')
    console.log('Yay! I can collect console messages');
    console.warn('Yay! I can collect console messages');
    console.error('Yay! I can collect console messages');


This will send all types of messages to the server. But collecting info and log is not important so to limit it to receive only warn and error messages


    window.console.setLevel(2);


Calling `setLevel` will only send messages which are greater than and equal to mentioned level.

We can also use selFlag to enable / disable any specific level.

    // Disable info messages
    window.console.setFlag('info', false);

    // Enable info messages
    window.console.setFlag('info', false);






















## Helpers

### SetTimeout & SetInterval

We have wrapped `setTimeout` and `setInterval` by default so any exceptions happens though their callbacks will be captured automatically.

### Jquery Ajax Helper

    // A simple ajax helper to track ajax errors
    $(document).ajaxError(function(event, jqXHR, ajaxSettings, thrownError) {

      project.error(thrownError);

    });

In future we will be integrating it in the debuggify js file to automatically capture ajax errors.
