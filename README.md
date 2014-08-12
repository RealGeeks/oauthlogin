# oauthlogin.js

This is a simple interface for using the javascript oauth2 flow.

Heads up: Don't actually use this yet, it's still in development.

[![Build Status](https://travis-ci.org/RealGeeks/oauthlogin.svg?branch=master)](https://travis-ci.org/RealGeeks/oauthlogin)


The interface looks like this:

```js
var ol = new OauthLogin('http://www.oauthprovider.com/oauth/authorize', 'http://localhost/oauth/callback');
var authToken = ol.authorize();
```

Call this script when your page loads if you need a auth token.  If you are on the callback url already, it will set authToken immediately (synchronously).  If you are not on the callback url, it will send your browser to to the authorization server.

# Optional Parameters

You can optionally call a couple other paramters on authorize:

```js
ol.authorize('default', 'consent', 'funkystate');
```

The first parameter, "scope", is the list of scopes you are asking for.  The second parameter, "prompt", is whether you want to be prompted to log in or not.  The third parameter is 'state', which you can use to send some application state through the oauth server to keep track of stuff.

# Error Handling

Calls to authorize normally return a key.  Sometimes, it will throw an error.  This will happen if authorization fails, for instance.  You can handle this with catch.

# Changelog

 * 0.1.0: Add 'state' parameter
 * 0.0.5: Add error handling and make hash fragment parsing actually work
 * 0.0.4: Don't double urlencode the redirect URL
 * 0.0.3: Add ? before querystring
 * 0.0.2: Include unminified version in dist
 * 0.0.1: Initial release

# License

The MIT License (MIT)

Copyright (c) 2014 Kevin McCarthy

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
