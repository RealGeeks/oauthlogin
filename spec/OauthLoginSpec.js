var OauthLogin = require('../src/oauthlogin');
var q = require('q');

describe('OauthLogin', function() {
  var ol, deferred;
  beforeEach(function() {
    ol = new OauthLogin("http://localhost/auth", 1);
  });

  it("can load the authorization url", function() {
    spyOn(ol, 'navigate');
    ol.authorize("http://callbacurl.com");
    expect(ol.navigate).toHaveBeenCalledWith('http://localhost/authresponse_type=token&client_id=1&scope=default&prompt=consent&redirect_uri=http%253A%252F%252Fcallbacurl.com');
  });
});
