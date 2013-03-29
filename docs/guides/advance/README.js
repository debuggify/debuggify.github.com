Ext.data.JsonP.advance({"guide":"<h1>Advanced Debugging</h1>\n<div class='toc'>\n<p><strong>Contents</strong></p>\n<ol>\n<li><a href='#!/guide/advance-section-1'>Manually Report</a></li>\n<li><a href='#!/guide/advance-section-2'>Automatically Report</a></li>\n<li><a href='#!/guide/advance-section-3'>Helpers</a></li>\n</ol>\n</div>\n\n<p>Below are some advance techniques to capture exceptions.</p>\n\n<p>First create a logger object</p>\n\n<pre><code>var project = debuggify.Logger.get('project');\n</code></pre>\n\n<h2 id='advance-section-1'>Manually Report</h2>\n\n<h3>Using Try-Catch</h3>\n\n<p>  We can wrap our code inside <strong>try-catch</strong> so it breaks we can extract information like filename, line no, char no and stacktrace from the exception.</p>\n\n<pre><code>function foo() {\n  try {\n    throw new Error(\"Something went wrong\");\n  } catch(e) {\n\n    // We can manually report this exception\n    project.report(e);\n\n  }\n}\n\nfoo();\n</code></pre>\n\n<h2 id='advance-section-2'>Automatically Report</h2>\n\n<h3>Using Try-Catch wrapper</h3>\n\n<p>This will <strong>wrap multiple</strong> functions at once.</p>\n\n<pre><code>var bar= {\n\n  p1: true,\n  p2: 100,\n\n  foo1 : function() {\n    throw new Error(\"Something went wrong 1\");\n  }\n\n  foo2 : function() {\n    throw new Error(\"Something went wrong 2\");\n  }\n\n\n  foo3 : function() {\n    throw new Error(\"Something went wrong 2\");\n  }\n}\n\n// All methods of bar will be wrapped\nproject.track(bar);\n\n// Only foo1 and foo2 will be wrapped\nproject.track(bar, ['foo1', 'foo2']);\n</code></pre>\n\n<h3>Using with Jquery</h3>\n\n<pre><code>// All methods of bar will be wrapped\nproject.track(jQuery);\n\n// Only the mentioned functions will be wrapped\nproject.track(jQuery, ['extend', 'trim', 'hasData', 'css' ]);\n\nfoo();\n</code></pre>\n\n<h3>Disable Try-Catch wrapper</h3>\n\n<pre><code>// For all the functions\nproject1.untrack(bar);\n\n// For only mentioned function names\nproject1.untrack(bar, ['extend', \"trim\"]);\n</code></pre>\n\n<p>This will restore the original functions. This will work only if the function is already wrapped.</p>\n\n<h2 id='advance-section-3'>Helpers</h2>\n\n<h3>SetTimeout &amp; SetInterval</h3>\n\n<p>We have wrapped <code>setTimeout</code> and <code>setInterval</code> by default so any exceptions happens though their callbacks will be captured automatically.</p>\n\n<h3>Jquery Ajax Helper</h3>\n\n<pre><code>// A simple ajax helper to track ajax errors\n$(document).ajaxError(function(event, jqXHR, ajaxSettings, thrownError) {\n\n  project.error(thrownError);\n\n});\n</code></pre>\n\n<p>In future we will be integrating it in the debuggify js file to automatically capture ajax errors.</p>\n","title":"Advance Techniques"});