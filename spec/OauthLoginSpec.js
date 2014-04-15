var OauthLogin = require('../src/oauthlogin');
var q = require('q');

describe('OauthLogin', function() {
  var ol, deferred;
  beforeEach(function() {
    ol = new OauthLogin("http://localhost/auth", 'http://localhost/auth/callback', 1);
  });

  it("can load the authorization url", function() {
    spyOn(ol, 'navigate');
    ol.authorize();
    expect(ol.navigate).toHaveBeenCalledWith('http://localhost/authresponse_type=token&client_id=1&scope=default&prompt=consent&redirect_uri=http%253A%252F%252Flocalhost%252Fauth%252Fcallback');
  });

  it("can recognize a callback URL", function() {
    spyOn(ol, 'getCurrentUrl').andReturn("http://localhost/auth/callback");
    expect(ol.onCallbackUrl()).toBe(true);
  });

  it("can return the auth token from the callback", function() {
    spyOn(ol, 'getCurrentUrl').andReturn("http://localhost/auth/callback#authToken=foobar");
    var authToken = ol.authorize();
    expect(authToken).toBe('foobar');
  });
});
