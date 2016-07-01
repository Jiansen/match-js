var chai = require('chai');
var match = require('../lib/match-js');

chai.expect();
var expect = chai.expect;

describe('Matching on Algebraic Data Type: An Calculator', function () {
  function BinOpExp(x,y) {
    this.x = x;
    this.y = y;
  }

  function Add(x,y) {
    BinOpExp.call(this, x, y);
  }
  Add.prototype = Object.create(BinOpExp.prototype);
  Add.prototype.unapply = function unapply(exp) {
    if (exp instanceof Add){
      return [exp.x, exp.y];
    }
    return undefined;
  }

  function Min(x,y) {
    BinOpExp.call(this, x, y);
  }
  Min.prototype = Object.create(BinOpExp.prototype);
  Min.prototype.unapply = function unapply(exp) {
    if (exp instanceof Min){
      return [exp.x, exp.y];
    }
    return undefined;
  }

  function Mul(x,y) {
    BinOpExp.call(this, x, y);
  }
  Mul.prototype = Object.create(BinOpExp.prototype);
  Mul.prototype.unapply = function unapply(exp) {
    if (exp instanceof Mul){
      return [exp.x, exp.y];
    }
    return undefined;
  }

  function Div(x,y) {
    BinOpExp.call(this, x, y);
  }
  Div.prototype = Object.create(BinOpExp.prototype);
  Div.prototype.unapply = function unapply(exp) {
    if (exp instanceof Div){
      return [exp.x, exp.y];
    }
    return undefined;
  }

  function Number() {}
  Number.prototype.unapply = function unapply(e) {
    if (typeof e === 'number'){
      return e;
    }
    return undefined;
  }

  var evaluate = function evaluate(exp) {
    return match(exp)([
      [Add, function(arr) { return evaluate(arr[0])+evaluate(arr[1]); }],
      [Min, function(arr) { return evaluate(arr[0])-evaluate(arr[1]); }],
      [Mul, function(arr) { return evaluate(arr[0])*evaluate(arr[1]); }],
      [Div, function(arr) { return evaluate(arr[0])/evaluate(arr[1]); }],
      [Number, function(x) { return x}],
    ])
  };

  it('evaluate(5) should eval to 5', function() {
      expect(evaluate(5)).to.be.equal(5);
  });

  it('/( *( +(3)(2) )(6) ) (2) should eval to 15', function () {
      var exp = new Div(
                    new Mul( new Add(3, 2), 6),
                    2);
      expect(evaluate(exp)).to.be.equal(15);
  });
});
