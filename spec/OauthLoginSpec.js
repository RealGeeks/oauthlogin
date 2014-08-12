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

  it("can optionally send different scopes", function() {
    spyOn(ol, 'navigate');
    ol.authorize('weirdscope');
    expect(ol.navigate).toHaveBeenCalledWith('http://localhost/auth?response_type=token&client_id=1&scope=weirdscope&prompt=consent&redirect_uri=http%3A%2F%2Flocalhost%2Fauth%2Fcallback');
  })

  it("can optionally send different the prompt parameter", function() {
    spyOn(ol, 'navigate');
    ol.authorize('default', 'dontprompt');
    expect(ol.navigate).toHaveBeenCalledWith('http://localhost/auth?response_type=token&client_id=1&scope=default&prompt=dontprompt&redirect_uri=http%3A%2F%2Flocalhost%2Fauth%2Fcallback');
  })

  it("can optionally send a state", function() {
    spyOn(ol, 'navigate');
    ol.authorize('default', 'consent', 'awesome');
    expect(ol.navigate).toHaveBeenCalledWith('http://localhost/auth?response_type=token&client_id=1&scope=default&prompt=consent&state=awesome&redirect_uri=http%3A%2F%2Flocalhost%2Fauth%2Fcallback');
  })

  it("can recognize a callback URL", function() {
    spyOn(ol, 'getCurrentUrl').andReturn("http://localhost/auth/callback");
    expect(ol.onCallbackUrl()).toBe(true);
  });

  it("can return the auth token from the callback", function() {
    spyOn(ol, 'getCurrentUrl').andReturn("http://localhost/auth/callback#access_token=foobar");
    var resp = ol.authorize();
    expect(resp.authToken).toBe('foobar');
  });

  it("can return the state from the callback", function() {
    spyOn(ol, 'getCurrentUrl').andReturn("http://localhost/auth/callback#access_token=foobar&state=whatever");
    var resp = ol.authorize();
    expect(resp.state).toBe('whatever');
  });

  it("can return the scope from the callback", function() {
    spyOn(ol, 'getCurrentUrl').andReturn("http://localhost/auth/callback#access_token=foobar&scope=whatever");
    var resp = ol.authorize();
    expect(resp.scope).toBe('whatever');
  });

  it("throws an error if authorization failed", function() {
    spyOn(ol, 'getCurrentUrl').andReturn("http://localhost/auth/callback?error=access_denied");
    expect(ol.authorize.bind(ol)).toThrow(new Error("access_denied"));
  })
});
