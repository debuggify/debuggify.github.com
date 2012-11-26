---
layout: post
title: "Window.onerror is not enough"
date: 2012-11-26 13:18
comments: true
categories:
author: Ankur Agarwal
published: true
---

Scott Hanselman blogged about [JavaScript the assembly language for the web](http://www.hanselman.com/blog/JavaScriptIsAssemblyLanguageForTheWebSematicMarkupIsDeadCleanVsMachinecodedHTML.aspx). There a plenty of [languages that compiles to javascript](https://github.com/jashkenas/coffee-script/wiki/List-of-languages-that-compile-to-JS). With the addition of Dart from Google and Typescript from Microsoft a war has broke out for better.

With the rise of compiled to javascript languages it hard to traceback the errors to original source. Almost all modern provides the window.onerror api to catch all uncaught exceptions on a page. This api provides very limited information (error message, filename and line number only) which is the root cause of many problems.

With modern web development practices the amount of javascript code per page is growing rapidly. Also this code is minified by the minification tools(like [Google Closure Compiler](https://developers.google.com/closure/compiler/),  [UglifyJS2](https://github.com/mishoo/UglifyJS2) etc) to reduce the code size. After minification whole code ends in one single line. Here is where most problem starts. I am listing some really annoying issues related to window.onerror below


- Missing Char No: The char no is very important for the minified code to point at the exact statement as there is only one line in minified code. Even source maps cannot be helpful in tracking back to original line.

- No Call Stack: The call stack is completely hidden from the developer so its hard to identify the functions flow. However there is a trick to [extract stack in IE9](http://blog.errorception.com/2011/12/call-stacks-in-ie.html) only.


- Cross Origin Errors: These types are thown when some cross origin permission is broken. They are very common on pages with facebook like and google plus widget installed. For such errors window.error message throw a single message "Script Error". As per [stackoverflow](http://stackoverflow.com/questions/5913978/cryptic-script-error-reported-in-javascript-n-chrome-and-firefox/7778424#7778424
) post this behavior is intentional to avoid some security risks but its at expense of useful debugging information.

Most of above mentioned problems are roadblock in debugging production websites / applications. There is a need for better tools and libraries for the job.

I will soon be writing a post on **Best Debugging Practices For Javascript In Production Environment**