# oauthlogin.js


The interface looks like this:

```js
var ol = new OauthLogin('http://www.oauthprovider.com/oauth/authorize', 'http://localhost/oauth/callback');
var authToken = ol.authorize();
```

Call this script when your page loads if you need a auth token.  If you are on the callback url already, it will set authToken immediately (synchronously).  If you are not on the callback url, it will send your browser to to the authorization server.
