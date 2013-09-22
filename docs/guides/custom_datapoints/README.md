# Custom Data points

Apart from the standard data points, additional data points can be added. Checkout the below Api's


## The Alias API


Using this api, its possible to set an alias to the unique user identification used by the debuggify. This make it easy to map a debuggify user identifier to your site username or email id. Remember the old data will not have alias.

    debuggify.alias('foo@example.com');

Its pretty straight forward to use the above api.

**Note** Make sure every unique user should be given the one alias to avoid any data inconsistency.




## The Metadata API

To attach custom data along with every message

    debuggify.metadata({'login': true});



## The Attach API

To attach custom data along with single message. This api need to be called from the logger object

    var ajaxErrors = debuggify.Logger.get('ajax_errors');

    ajaxErrors.attach({
      type: 'POST',
      url: '/api/notification'
    });

    ajaxErrors.error('Error in Notification Api');


After calling attach, it must be followed by the one of the logging Apis like `.log`, `.error`, `.warn`, `.debug` or `.message` to push that data to the server.

**Note**: The attached data will expire after its once used by logging Api's. To send data with every request use `.metadata` api
