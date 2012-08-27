---
layout: post
title: "Why Debuggify?"
date: 2012-08-07 12:10
comments: true
categories:
author: Ankur Agarwal
published: true
---


To be frank, Internet is a second home to me. I was born 6 years back when I bought my first computer and a internet connection. For most of people out there who feel same, are continuously trying to make *Internet a better place*. I am also a computer science engineering grad so my affinity towards computers is justified. In order to feed my engineering inquisitiveness and my quest to make the Internet a better place, I have explored the black, white and gray sections of the internet.

I am full stack web developer by profession and have authored / coauthored many 3rd party social plugins for [Shareaholic Inc] which runs on thousands of different blogs and websites driving 1+ billion pageviews per month. These plugins can be installed on different CMS/blogging platform like Wordpress, Drupal, Tumblr, Blogger etc. While working on these plugins I closely interact with the different elements of the modern internet ecosystem.

What's my use case of 3rd party plugin ?

> A 3rd party plugin has to be **robust** enough to work in **3rd party environments** while interacting with **3rd party apis** and support every **major browser vendor** out there

Explaining the above quote

  - As plugins runs on 3rd party websites, it has to be robust so it `doesn't break` itself and neither the website
  - It has to be fast enough to deliver `good page load time`
  - It should `not conflict` with other existing plugins
  - It should `support majour browser vendors` including internet explorer
  - It should also `support legacy browser versions` like ie6 ie7 etc
  - As plugins interact with over 200+ 3rd party apis, it hard to keep track when something break
  - It should be easy to setup with multiple cms/blogging environments for better distribution

I have faced many `technical challenges` while developing these plugins, some of them

  - In 3rd party environment, developers have limited or no control over things, so its hard to debug and reproduce bugs / issues
  - If some plugin feature is not working its hard to know whether
    - its not working for a particular website,
    - or not working for a set of URLs
    - or for a particular CMS/Blogging environment
    - or for a particular screen resolution
    - or for a particular browser vendor
    - or even for a particular version of a browser vendor
    - or for all cases
  - Its hard to judge the impact of every release, whether it fixed the problem or introduced some new side effects
  - The 3rd party API's are continuously changing, upgrading & depreciating.  Companies like Facebook, Google, Twitter are continuously bashing developers with bleeding edges of their API's
  - With HTML5, ES Harmony and CSS3,  browsers are evolving faster than ever, so they are also releasing bleeding edge features and API's

`Web developers` are the keepers of the modern internet. They are encountering similar problems on the daily basic. A majority their development time is spend in debugging and fixing bugs. The debugging is becoming hard due to the evolving nature of web and Zero Bugs is a Myth. So I finally decided to go on a quest to make **Internet a better place for developers**

  [Shareaholic Inc]: http://www.shareaholic.com/publishers