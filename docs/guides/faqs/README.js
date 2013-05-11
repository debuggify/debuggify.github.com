Ext.data.JsonP.faqs({"guide":"<h1>Frequently Asked Questions</h1>\n<div class='toc'>\n<p><strong>Contents</strong></p>\n<ol>\n<li><a href='#!/guide/faqs-section-1'>Does it track errors in cross origin scripts.</a></li>\n<li><a href='#!/guide/faqs-section-2'>I am getting \"Script error\".</a></li>\n<li><a href='#!/guide/faqs-section-3'>Why not use google analytics to track errors ?</a></li>\n<li><a href='#!/guide/faqs-section-4'>How is it different from services like errorception ?</a></li>\n</ol>\n</div>\n\n<h2 id='faqs-section-1'>Does it track errors in cross origin scripts.</h2>\n\n<p>Check <a href=\"#!/guide/advance-section-4\">Track Cross Origin Scripts</a></p>\n\n<h2 id='faqs-section-2'>I am getting \"Script error\".</h2>\n\n<p>Check <a href=\"#!/guide/advance-section-5\">Script Error</a></p>\n\n<h2 id='faqs-section-3'>Why not use google analytics to track errors ?</h2>\n\n<p>First of all the google analytics is not designed to track long messages as it uses image pixel tracking which is nothing more than a get request with all the information encoded as url parameters. The maximum length of a url is around 1800 character which limits the amount of information can be collected.</p>\n\n<p>So its hard to collect bulky informations like stacktraces, custom user information, and much more.</p>\n\n<h2 id='faqs-section-4'>How is it different from services like errorception ?</h2>\n\n<p>Debuggify does much more than just tracking javascript exceptions through <code>window.onerror</code>.</p>\n\n<ul>\n<li>provide apis to track custom exceptions though try catch</li>\n<li>enables you to track errors for cross origin scripts</li>\n<li>support minified code through source map</li>\n<li>track the users so its easy to understand the impact of problem.</li>\n<li>supports modular logging same as server side</li>\n<li>track custom events</li>\n<li>search though the data</li>\n<li>and much more</li>\n</ul>\n\n","title":"FAQs"});