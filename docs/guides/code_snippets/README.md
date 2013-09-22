# Code Snippets

To use this on your pages, copy the code snippet below, replacing **YOUR_API_KEY** with your api key.

Paste this snippet into your website template page so that it appears after the starting &lt;/head&gt; tag.

**NOTE:** The tracking starts only after the javascript code is executed. So it will get maximum data if its loaded as the first javascript.


You can include the code snippets in the following way

## Sync Code Snippet


    <script type="text/javaScript" src="https://cdn.debuggify.net/js/YOUR_API_KEY/debuggify.logger.http.js"></script>


This is a simple script tag which loads the javascript from Debuggify CDN servers to the page. As browser executes the website in a single thread. This will block the execution of next script.

#### Advantages

  - `Catch maximum exceptions:` Due to ordered execution, all the exceptions in code queued after it will be captured.
  - `Capture more accurate data points:` As library is already loaded it will able to collect more accurate data points.

#### Disadvantages

The only disadvantage of this method is `Slight increase in page load time`

To counter it

  - Using CDN's to reduce the latency. Our test shows that latency varies from 70-500ms with an average of around 200ms across the globe.
  - Enabled cache caching headers for the javascript file so later requested will be fetched from the cache.

## Async Code Snippet
    <script type="text/javaScript">
      (function(e,t,r){if(!r.version&&!r.__ai){e.debuggify=r;var n,a,o,s="debuggify",g=Array.prototype.slice,i={};r._e=[];o=e.onerror;e.onerror=function(){r._e&&r._e.push(arguments);return o?o.apply(this,arguments):void 0};r.init=function(e,o,c){function u(e,t,r,n){var a=r.split(".");if(2==a.length){e=e[a[0]];r=a[1]}e[r]=function(){var e=n?n+"#"+r:r;t.push([e].concat(g.call(arguments,0)))}}function p(e,t,r,n){var a,o=r.split(" ");for(a=0;o.length>a;a++)u(e,t,o[a],n)}n=t.createElement("script");n.type="text/javascript";n.async=!0;n.src="https://cdn.debuggify.net/js/"+e+"/debuggify.logger.http.js";a=t.getElementsByTagName("script")[0];a.parentNode.insertBefore(n,a);var l=r;c!==void 0?l=r[c]=[]:c=s;l.Logger=l.Logger||[];var d=l.Logger;p(l,l,"Logger.get setEnv addTransport setDefaults onload",null);var f=function(e){var t=this,r=i[a],n={},a=t&&t.namespace?t.namespace+"__"+e:e;if(r!==void 0)return i[a];p(n,d,"setLevel setFlag get message setNamespace addTransport sendToCollector report track untrack isTracked genericMessage log warn error info",a);n.name=e;n.get=f;n.namespace=a;i[a]=n;d.push(["get"].concat(g.call(arguments,0)));return n};d.get=f};r.__ai="0.0.3"}})(window,document,window.debuggify||[]);debuggify.init("YOUR API KEY");
    </script>


This will dynamically insert a script tag with async mode and provide fake api objects which will work until the script is loaded.

With async mode, browser will download the javascript in a parallel thread and execute it whenever the execution thread is idle.

#### Advantages
  - `Doesn't affect page load time`

#### Disadvantages
  - `Less exceptions are caught:` As the execution time of js depends on the availability of the execution thread which will be definitely be later as compared to the sync method.
  - `Less accurate datapoints:` Due to fake apis, the accuracy of data point will be less until the full javascript is loaded.

## Bundling the code

Save the code from https://cdn.debuggify.net/js/YOUR_API_KEY/debuggify.logger.http.js and ship it along with your side code

#### Advantages
  - `Doesn't dependent on debuggify CDN's`

#### Disadvantages

The only disadvantage is to manually update the code for new features and fixes who is a unnecessary pain.

**Note** This method is not recommended until you are deploying at close time-intervals and have a automated way of merging the code in to your code base
