var OauthLogin = require('../src/oauthlogin');
var q = require('q');


describe('OauthLogin', function() {
  var ol, deferred;
  beforeEach(function() {
    ol = new OauthLogin("http://localhost/auth", 1);
  });

  it("can load the authorization url", function() {
    spyOn(ol, 'navigate');
    OauthLogin.authenticate();
    excpect(ol.navigate).toHaveBeenCalledWith('http://localhost/auth?client_id=1');
  });
});
