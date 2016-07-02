import chai from 'chai';
import match from '../lib/match-js';

chai.expect();
const expect = chai.expect;

describe('Matching on Algebraic Data Type: An Calculator', function () {
  class BinOpExp {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  }
  class Add extends BinOpExp {
    unapply(exp) {
      if (exp instanceof Add){
        return [exp.x, exp.y];
      }
      return undefined;
    }
  }
  class Min extends BinOpExp {
    unapply(exp) {
      if (exp instanceof Min){
        return [exp.x, exp.y];
      }
      return undefined;
    }
  }
  class Mul extends BinOpExp {
    unapply(exp) {
      if (exp instanceof Mul){
        return [exp.x, exp.y];
      }
      return undefined;
    }
  }
  class Div extends BinOpExp {
    unapply(exp) {
      if (exp instanceof Div){
        return [exp.x, exp.y];
      }
      return undefined;
    }
  }
  class Number {
    unapply(e) {
      if (typeof e === 'number'){
        return e;
      }
      return undefined;
    }
  }

  const evaluate = (exp) => match(exp)(
      [Add, ([x, y])=> evaluate(x)+evaluate(y)],
      [Min, ([x, y])=> evaluate(x)-evaluate(y)],
      [Mul, ([x, y])=> evaluate(x)*evaluate(y)],
      [Div, ([x, y])=> evaluate(x)/evaluate(y)],
      [Number, (x) => x]
    );

  it('evaluate(5) should eval to 5', () => {
      expect(evaluate(5)).to.be.equal(5);
  });

  it('/( *( +(3)(2) )(6) ) (2) should eval to 15', () => {
      const exp = new Div(
                    new Mul( new Add(3, 2), 6),
                    2);
      expect(evaluate(exp)).to.be.equal(15);
  });
});
