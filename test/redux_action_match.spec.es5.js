var chai = require('chai');
var matchJS = require('../lib/match-js');
var match = matchJS.match;
var otherwise = matchJS.otherwise;

chai.expect();
var expect = chai.expect;

describe('Matching on redux-like Action class:', function() {
  function Action(type) {
    this.type = type;
    this.payload = undefined;
  }
  Action.prototype.unapply = function unapply(action) {
    if(action.type === this.type) {
      return { payload: action.payload };
    }
  };
  Action.prototype.action = function action(payload) {
    return {
      type: this.type,
      payload: payload,
    };
  };


  var ChangeUsername = new Action('ChangeUsername');
  var ChangeAddress = new Action('ChangeAddress');
  var StrangeAction = new Action('UJRBJLWYTU');

  it('ChangeUsername should match ChangeUsername', function() {
    var action = ChangeUsername.action('myusername');
    var m = match(action)(
      [ChangeUsername, function(payload) {return 'name: '+payload.payload;}],
      [ChangeAddress, function(payload) {return 'postcode: '+payload.payload.postcode;}],
      [otherwise, function() {return 'unknown action: '+action;}]
    );
    expect(m).to.be.equal('name: myusername');
  });
  it('ChangeAddress should match ChangeAddress', function() {
    var action = ChangeAddress.action({
      name: 'HOME ROAD',
      postcode: '1234',
    });
    var m = match(action)(
      [ChangeUsername, function(payload) {return 'name: '+payload.payload;}],
      [ChangeAddress, function(payload) {return 'postcode: '+payload.payload.postcode;}],
      [otherwise, function() {return 'unknown action: '+action;}]
    );
    expect(m).to.be.equal('postcode: 1234');
  });
  it('StrangeAction should match otherwise', function() {
    var action = StrangeAction.action('FSCRKCAWCN');
    var m = match(action)(
      [ChangeUsername, function(payload) {return 'name: '+payload.payload;}],
      [ChangeAddress, function(payload) {return 'postcode: '+payload.payload.postcode;}],
      [otherwise, function() {return 'unknown action: '+action;}]
    );
    expect(m).to.be.equal('unknown action: '+action);
  });
});
