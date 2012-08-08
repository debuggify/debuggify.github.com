---
layout: page
sharing: true
footer: true
---

## What is Debuggify? ##

Its is a cloud based debugging service which enhances the modern web development experience.

## How It Works?##

![][architecture]

It contains a multi-tiered architecture, consisting of:

  - [Debuggify JS]
  - [Debuggify Server]
  - [Debuggify Dashboard]


Basically it consists of javascript library [debuggify_js] which need to be included along with the code. This library provide utilities like `logger`, `collector`. This utilities can be controlled remotely over different transports like (`websockets`, `http` etc).

The [Debuggify Dashboard] is use to manage the different utilities remotely via [Debuggify Server]


<a name="debuggify_js"></a>
## Debuggify JS ##

A javascript library which provide advance debugging utilities with their predefined setting s for development, production and testing environments. These utilities can be of various types

  - Standalone : No need to integrate with the code
  - Partial Standalone: Can be integrated with code or controlled via code
  - Deeply Integrated: This type must be integrated to be used.

Current the following utilities are provided

  - logger: Provide advance module level logging support
  - collector: collect the data and send to the server
  - transports: Communication layer to communicate with the server


<a name="debuggify_server"></a>
## Debuggify Server ##
 A nodejs based server to make communication possible between browser client and dashboard. Both the browser client and dashboard connect the server and pass the message to each other

<a name="debuggify_dashboard"></a>
## Debuggify Dashboard ##

 The debugging utilities can be controlled remotely from the dashboard. The dashboard in development environment shows the live from the browser client.Currently dashboard has limited features. In future we can have features which allow to control multiple browser client simultaneously.

<a name="installation"></a>

## Quick Start ##

### Setup Debuggify Javascript ###

Install via Bookmarklet code.

    javascript:void((function(){var%20e=document.createElement('script');e.setAttribute('type','text/javascript');e.setAttribute('charset','UTF-8');e.setAttribute('src','http://cdn.debuggify.net/js/debuggify.logger.console.global.js?r='+Math.random()*99999999);document.body.appendChild(e)})())

Note: here are some more [bookmarkets]

### Setup Debuggify Server ###

Setup [nodejs] if not already

Install npm

    $ curl http://npmjs.org/install.sh | sh

After npm is installed, run the following command

    $ [sudo] npm install debuggify -g

This will install debuggify `globally` so that it may be run from the command line. Now `run` the debuggify server

    $ debuggify

This will run a server on default port `9999`


Open http://dashboard.debuggify.net in browser. Go to any page and click on the bookmarket. Now open the browser console run commands

    console.log('I love debugging')
    console.error('I hate bugs');

The message will appear in the dashboard.


## Usage ##

<a name="logger"></a>
### Logger ###

Create a logger object

    var project1 = debuggify.Logger.create('project1');


You can also use the library with console

    var console =  debuggify.Logger('project1', options);
**NOTE**: The above line will replace the global console(windows.console) if local console variable is not found, so be careful while using it.

Set Development Environment (optional)

    project1.setEnv('development');

  If no environment is set, then the defaults are used.

**NOTE** User should make sure that `src/eviroments/<enviroment Name>.js`file has been include.

Start using logger

    project1.log('some crappy information');
    project1.error('Shit! something breaks');
    project1.warn('You better watch yourself');


Add module specific logger to the project

    var project1_module1 = project1.addModule('module1');

    project1_module1.log('some crappy information');
    project1_module1.error('Shit! something breaks');
    project1_module1.warn('You better watch yourself');

Get logger object on demand

    var project1 = debuggify.Logger.get('project1'); // Returns the logger object for project1
    project1.log('this is a log for project1');

    var project1_module1 = project1.get('module1'); // Returns the logger object for module1
    project1_module1.log('this is a log for module1');

    // OR
    var project1_module1 = debuggify.Logger.get('project1').get('module1'); // Directly get the module logger object
    project1_module1.log('this is a log for module1');


Modules Hierarchy

    var project1_module1_submodule1 = debuggify.Logger.get('project1').get('module1'),get('submodule1');
    project1_module1_submodule1.log('this is a log for submodule1');

Set Logging Level (optional). Every environment has it logging level already set

    project1.setLevel(2); // Set warning and errors only for project on project project1
    project1_module1.setLevel(0); // Show all types messages for all the children on module module1

**NOTE** Calling `.setLevel` on a logger will remove reinstall debugging methods for the new levels. This will also affect the behavior of all the children. For any module its nearest overridden parent level is used

<a name="setFlag"></a>Set Flag for any message type (optional)

    project1.setFlag('error', true); // Set the flag for

**NOTE** Calling `.setFlag` on a logger will only affect the state of current object. Its children module will not be affected

Add a transport to a project

    project1.addTransport('Console', {});

*Control the parameter through URL* by enabline debug mode.Just add query string `project1__debug=true`.
This is very powerful can be used it to change configuration for particular module.Ex.

1.Change the environment.Following will change the environment to testing for project1 project.

    urlString?project1__debug=true&env=testing

2.To disable errors/logs/warnings for a particular module.Following will not throw warnings for module1 module for project1 project.

    urlString?project1__debug=true&project1__module1__info=false&project1__module1__error=false

**NOTE** The above is same as [setFlag]

3.To show or hide properties.Following will not show timestamp property for module1 module for project1 project.

    urlString?project1__debug=true&project1__module1__timestamp=false


Get the *logger object* by its name.Following will return the logger object for project1 if it is exists else it will create a new logger object with project1 name.If you do not want to create a new logger object pass the 2nd parameter as false

    debuggify.Logger.get(project1,true)


Send message for specific type(logs,error,warning).Following will change the error message for module module1 to "This is an error message".

    project1.message("This is an error message", module1, error)

<a name="transport"></a>
### Collector ###

This component is responsible for collecting the logging messages from the global object and send it to various transports medium. The collector is independent of logger so it can be loaded on demand.

<a name="transport"></a>
### Transports ###

#### Console ####
Send the logs to the browser console if it exist

    project1.add('Console', options)

<a name="bookmarklets"></a>
## Bookmarklets ##

  - Create a new bookmark on the browser toolbar
  - Copy the code below and paste the it in the URL field

        javascript:void((function(){var%20e=document.createElement('script');e.setAttribute('type','text/javascript');e.setAttribute('charset','UTF-8');e.setAttribute('src','http://cdn.debuggify.net/js/debuggify.logger.console.global.js?r='+Math.random()*99999999);document.body.appendChild(e)})()) "Drag me to the toolbar"

  - For other scripts change the name of the script in the src
    - `debuggify.logger.console.js` Logger component bundled with Console Transport
    - `debuggify.logger.console.global.js` Overload window.console with debuggify Logger object and transport console
    - `debuggify.allinone.js` All the stable components are bundle together


  [nodejs]: http://nodejs.org/#download
  [Debuggify JS]: #debuggify_js
  [Debuggify Server]: #debuggify_server
  [Debuggify Dashboard]: #debuggify_dashboard
  [bookmarkets]: #bookma
  [winston]: https://github.com/flatiron/winston
  [socket.io]: https://github.com/learnboost/socket.io
  [github issue tracker]: https://github.com/debuggify/debuggify_js/issues
  [@Agarwal_Ankur]: https://twitter.com/Agarwal_Ankur
  [@geniussandy]: https://twitter.com/geniussandy
  [@d3buggify]: https://twitter.com/d3buggify
  [Logger]: #logger
  [Collector]: #collector
  [Transports]: #transports
  [stacktrace]: https://github.com/eriwen/javascript-stacktrace
  [requirejs]: https://github.com/jrburke/requirejs
  [architecture]: http://cdn.debuggify.net/images/architecture.png "Architecture"
  [setFlag]:#setFlag
  [logger.console.global]: javascript:void((function(){var%20e=document.createElement('script');e.setAttribute('type','text/javascript');e.setAttribute('charset','UTF-8');e.setAttribute('src','http://cdn.debuggify.net/js/debuggify.logger.console.global.js?r='+Math.random()*99999999);document.body.appendChild(e)})()) "Drag me to the toolbar"


