var OauthLogin = require('../src/oauthlogin');

describe('OauthLogin', function() {
  var ol, deferred;
  beforeEach(function() {
    ol = new OauthLogin("http://localhost/auth", 'http://localhost/auth/callback', 1);
  });

  it("can load the authorization url", function() {
    spyOn(ol, 'navigate');
    ol.authorize();
    expect(ol.navigate).toHaveBeenCalledWith('http://localhost/auth?response_type=token&client_id=1&scope=default&prompt=consent&redirect_uri=http%3A%2F%2Flocalhost%2Fauth%2Fcallback');
  });

  it("can recognize a callback URL", function() {
    spyOn(ol, 'getCurrentUrl').andReturn("http://localhost/auth/callback");
    expect(ol.onCallbackUrl()).toBe(true);
  });

  it("can return the auth token from the callback", function() {
    spyOn(ol, 'getCurrentUrl').andReturn("http://localhost/auth/callback#access_token=foobar");
    var authToken = ol.authorize();
    expect(authToken).toBe('foobar');
  });

  it("throws an error if authorization failed", function() {
    spyOn(ol, 'getCurrentUrl').andReturn("http://localhost/auth/callback?error=access_denied");
    expect(ol.authorize.bind(ol)).toThrow(new Error("access_denied"));
  })
});
