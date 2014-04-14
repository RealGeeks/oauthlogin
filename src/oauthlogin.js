/*jslint node: true */
/*global window: false */
'use strict';

var querystring = require('querystring');

var OauthLogin = function(authorizeUrl, clientId) {
  this.authorizeUrl = authorizeUrl;
  this.clientId = clientId;
};

OauthLogin.prototype.navigate = function(newUrl) {
  window.location.href = newUrl;
};

OauthLogin.prototype.authorize = function(callbackUrl, scope, prompt) {
  var qs = querystring.stringify({
      response_type: "token", // We only support the js flow
      client_id: this.clientId,
      scope: scope || "default",
      prompt: prompt || "consent",
      redirect_uri: encodeURIComponent(callbackUrl)
  });
  this.navigate(this.authorizeUrl + qs);
};


module.exports = OauthLogin;
