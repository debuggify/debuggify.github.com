---
layout: post
title: "Error in Javascript Comments"
date: 2013-06-22 08:12
comments: true
categories: javascript comments error IE9 IE8 IE7 IE6
published: true
author: Ankur Agarwal
---

Last week, I was writing code in javascript  when I found something that completly blew off my mind. This is what I found

![Stupid IE](/images/posts/stupid_ie.png)

Yeah, IE thowing error in javascript comment. For some time I didnot believe what I am seeing, but gradually I came to my senses. Like most developers, first thing I did was started cursing IE on twitter, but later reality struct me and that is to find a solution to this mess.

I dig in a lot of wrong places until I found [conditional comments](http://en.wikipedia.org/wiki/Conditional_comment) in IE. A sample of how the conditional logic works is below

    <script>
    /*@cc_on

      @if (@_jscript_version == 10)
        document.write("You are using IE10");

      @elif (@_jscript_version == 9)
        document.write("You are using IE9");

      @elif (@_jscript_version == 5.8)
        document.write("You are using IE8");

      @elif (@_jscript_version == 5.7 && window.XMLHttpRequest)
        document.write("You are using IE7");

      @elif (@_jscript_version == 5.6 || (@_jscript_version == 5.7 && !window.XMLHttpRequest))
        document.write("You are using IE6");

      @elif (@_jscript_version == 5.5)
        document.write("You are using IE5.5");

      @else
        document.write("You are using IE5 or older");

      @end

    @*/
    </script>

To fix this all I need to do is to remove the whole comment. This comment is anyways useful for sourcemaps supported browsers which is long way to go for IE.

Anyways this is just a hack for the time being. The [sourcemap specs](https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit) has been updated due to this problem. To know more check the [uglifyjs issue on github](https://github.com/mishoo/UglifyJS2/pull/213)

Finally all I have to say is `God Bless IE Developers`

