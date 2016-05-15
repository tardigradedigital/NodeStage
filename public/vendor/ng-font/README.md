# ngFont

<b>ngFont</b> is an AngularJS module that fetching and using Google Fonts quickly. It requires <a href="https://github.com/urish/angular-load">angular-load</a>.

<h3> Current Version 0.0.1</h3>

<h4> Demo</h4>


<h4> Getting Started</h4>

Install using bower:
<p><code> bower install --save ng-font</code></p>

<br>Add js file to main html page
```javascript
 <script src="path/of/file/ngFont.js"></script>
```

<br>Call module to app:
```javascript
 angular.module('myApp', ['ngFont']);
```

<br>Call as "ng-font" in the area you want to use, and  enter the name of the font you want to use from <a href="https://www.google.com/fonts">Google Fonts</a>:

```javascript
 <span ng-font font="Lobster"> Lorem ipsum dolor sit amet </span>
```

<h4> Additional Options</h4>

```javascript

 size="30pt" 
 bold
 italic
 oblique
 shadow="2px 2px 2px #ccc" 
 opacity="0.5" 
 left
 center
 right
 
 <div ng-font font="Lobster" size="90%" italic right> Lorem ipsum dolor </div>
```
