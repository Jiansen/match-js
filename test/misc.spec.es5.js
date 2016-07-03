var chai = require('chai');
var matchJS = require('../lib/match-js');
var match = matchJS.match;
var _ = matchJS._;
var id = matchJS.id;
var otherwise = matchJS.otherwise;

chai.expect();
var expect = chai.expect;

describe('Miscellaneous useages', function() {
  it('execute statements should be allowed', function() {
      var m = match(10)(
        [1, "ONE"],
        [10, function(){
          return "TEN";
        }, null]
      )
      expect(m).to.be.equal('TEN');
  });
  it('pass additional parameters to matched patial function', function() {
    var m = match(1)(
      [1, function(x,y,z){
        return "Match "+x+" "+y+" "+z;
      }, 2,3]
    )
    expect(m).to.be.equal('Match 1 2 3');
  });
  it('default pattern (_) that matches everything', function() {
    var i = 3;
    var m = match(i)(
      [1, "ONE"],
      [2, "TOW"],
      [_, function(){ return "_ matches "+i; }]
    )
    expect(m).to.be.equal('_ matches 3');
  });
  it('default pattern (otherwise) that matches everything', function() {
    var i = 3;
    var m = match(i)(
      [1, "ONE"],
      [2, "TOW"],
      [otherwise, function(){ return "otherwise matches "+i; }]
    )
    expect(m).to.be.equal('otherwise matches 3');
  });

  it('id functions returns the same input value', function() {
    var x = 10;
    var m = match(x)(
      [1, "ONE"],
      [2, "TOW"],
      [10, id]
    )
    expect(m).to.be.equal(x);
  });

});
