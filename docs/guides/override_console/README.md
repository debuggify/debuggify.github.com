# Override Console

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

