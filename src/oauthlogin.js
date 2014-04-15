/*jslint node: true */
/*global window: false */
'use strict';

var querystring = require('querystring');
var URI = require('uri-js');

var OauthLogin = function(authorizeUrl, callbackUrl, clientId) {
  this.authorizeUrl = authorizeUrl;
  this.clientId = clientId;
  this.callbackUrl = callbackUrl;
};

OauthLogin.prototype.navigate = function(newUrl) {
  window.location.href = newUrl;
};

OauthLogin.prototype.getCurrentUrl = function() {
  return window.location.href;
};

OauthLogin.prototype.onCallbackUrl = function() {
  var url1 = URI.parse(this.callbackUrl);
  var url2 = URI.parse(this.getCurrentUrl());
  // Everything but the hash fragment needs to match
  return url1.scheme === url2.scheme &&
         url1.path === url2.path &&
         url1.host === url2.host &&
         url1.port === url2.port &&
         url1.query === url2.query;
};

OauthLogin.prototype.authorize = function(scope, prompt) {

  if (this.onCallbackUrl()) {
    return 'foobar';
  }

  var qs = querystring.stringify({
      response_type: "token", // We only support the js flow
      client_id: this.clientId,
      scope: scope || "default",
      prompt: prompt || "consent",
      redirect_uri: encodeURIComponent(this.callbackUrl)
  });
  this.navigate(this.authorizeUrl + qs);
};


module.exports = OauthLogin;
