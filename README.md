# oauthlogin.js

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
ol.authorize('default', 'consent');
```

The first parameter, "scope", is the list of scopes you are asking for.  The second parameter, "prompt", is whether you want to be prompted to log in or not.

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
