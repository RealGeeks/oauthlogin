/*jsling node: true */
'use strict';

var OauthLogin = function(authorize_url, client_id) {
  this.authorize_url = authorize_url;
  this.client_id = client_id;
};


module.exports = OauthLogin;
