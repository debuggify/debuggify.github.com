# Frequently Asked Questions

## Does it track errors in cross origin scripts.

Check [Track Cross Origin Scripts](#!/guide/advance-section-4)




## I am getting "Script error".

Check [Script Error](#!/guide/advance-section-5)



## Why not use google analytics to track errors ?

First of all the google analytics is not designed to track long messages as it uses image pixel tracking which is nothing more than a get request with all the information encoded as url parameters. The maximum length of a url is around 1800 character which limits the amount of information can be collected.

So its hard to collect bulky informations like stacktraces, custom user information, and much more.




## How is it different from services like [errorception](http://errorception.com/) ?

Debuggify does much more than just tracking javascript exceptions through `window.onerror`.

- provide apis to track custom exceptions though try catch
- enables you to track errors for cross origin scripts
- support minified code through source map
- track the users so its easy to understand the impact of problem.
- supports modular logging same as server side
- track custom events
- search though the data
- and much more
