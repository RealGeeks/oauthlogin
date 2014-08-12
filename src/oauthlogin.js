/*jslint node: true */
/*global window: false */
'use strict';

var querystring = require('querystring');
var url = require('url');

var compactObject = function(obj) {
  Object.keys(obj).forEach(function(k) {
    if (!obj[k]) {
      delete obj[k];
    }
  });
};

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
  var url1 = url.parse(this.callbackUrl);
  var url2 = url.parse(this.getCurrentUrl());
  // Match everything but the hash fragment and query string
  return url1.scheme === url2.scheme &&
         url1.pathname === url2.pathname &&
         url1.hostname === url2.hostname &&
         url1.port === url2.port;
};

OauthLogin.prototype.parseHashString = function() {
  var hashFragment = url.parse(this.getCurrentUrl()).hash.substr(1);
  return querystring.parse(hashFragment);
};

OauthLogin.prototype.authorize = function(scope, prompt, state) {
  if (this.onCallbackUrl()) {
    var errorQs = querystring.parse(url.parse(this.getCurrentUrl()).query);
    if ('error' in errorQs) {
      throw new Error(errorQs.error);
    }
    var hash = this.parseHashString();
    var resp = {
      authToken: hash.access_token,
      state: hash.state,
      scope: hash.scope
    };
    compactObject(resp);
    return resp;
  }

  var qs = {
      response_type: "token", // We only support the js flow
      client_id: this.clientId,
      scope: scope || "default",
      prompt: prompt || "consent",
      state: state,
      redirect_uri: this.callbackUrl
  };
  compactObject(qs);
  this.navigate(this.authorizeUrl + '?' + querystring.stringify(qs));
};


module.exports = OauthLogin;
