# Basic Techniques

## window.onerror

After the adding the code snipet, it automatically start tracking of all errors using **window.onerror** listener. You will access these errors from Debuggify Dashboard

But we can do a lot more than that.

## Client Side Logging

Just like server side logging we can do client side logging. All the logs will be collected and accessible from Debuggify Dashboard

Let start by creating a logger for whole project

    // Create a logger object
    var project1 = debuggify.Logger.get('project1');

    // Use similar to console object
    project1.log('Yay! I can log');
    project1.warn('You better watch yourself');
    project1.error('Oops! something breaks');


## Managing Messages Levels

There are following level available

  -  TRACE: 0
  -  INFO: 1
  -  WARN: 2
  -  ERROR: 3
  -  SILENT: 4


### Update single level

To turning off warn messages

    // All warn messages will be ignored after this.
    project1.setFlag('warn', true);

Similarly to re-enable warn messages

    // All warn messages will no longer be ignored.
    project1.setFlag('warn', false);

This works same for other events.

### Update multiple levels

To select any level

    // This will collect message >= WARN
    project1.setLevel(2);

Calling `setLevel` on a logger will remove all of the previous helper methods for the old levels and define helper methods for the new levels.


## Custom Events

Apart from the general log warn error, you can even create custom events to keep track of whats going on.

    // Use similar to console object
    project1.message('Clicked signup', 'module1' ,'click');
    project1.message('scrolled down', 'module1' ,'scroll');


## Modular Logging

Lets say you have multiple modules inside a project and want to track each module logs separately

    var project1_module1 = project1.get('module1');
    project1_module1.log('Yay! I can log separately for module1');

**Note:** Double underscore separates a module from its parent module

You can create as many modules you want.

    project1.get('module2').log('This goes to module2');
    project1.get('module3').log('This goes to module3');;


You can even create submodules.

    project1_module1.get('submodule1').log(This goes to submodule1));


This can theoretically go up to infinite levels.