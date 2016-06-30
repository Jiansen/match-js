import chai from 'chai';
import match from '../lib/match.js';

chai.expect();
const expect = chai.expect;

describe('Matching on build-in primitive types', function () {
  it('Integer value 10 should match value 10', () => {
      const m = match(10)([
          [1, "ONE"],
          [10, "TEN"],
      ])
      expect(m).to.be.equal('TEN');
  });
  it('Integer veriable of value 2 should match the value 2', () => {
      const two = 2;
      const m = match(two)([
          [1, "ONE"],
          [2, "TWO"],
      ])
      expect(m).to.be.equal('TWO');
  });

  it('Boolean value true should match value true', () => {
      const m = match(true)([
          [1, "ONE"],
          [10, "TEN"],
          [true, "TRUE"],
      ])
      expect(m).to.be.equal('TRUE');
  });

  it('String value \'Hello World\' should match value \'Hello World\'', () => {
      const m = match('Hello World')([
          [1, "ONE"],
          [10, "TEN"],
          ['Hello World', "Hello World Matched"],
      ])
      expect(m).to.be.equal('Hello World Matched');
  });
});

describe('Matching on class contructor Twice:', function () {
  class Twice {
    constructor(x) {
      this.value = x*2;
      this.funny_prop = 'funny';
    }
    unapply(x) {
      if (x instanceof Twice && x.value%2 ==0) {
        return x.value / 2
      }

      if( x%2 ==0 ) {
        return x/2;
      }else{
        return undefined;
      }
    }
  }

  it('10 should match Twice(x), where x is assigned to 5', () => {
      const m = match(10)([
          [1, "ONE"],
          [2, "TWO"],
          [Twice, (x) => x],
      ])
      expect(m).to.be.equal(5);
  });
  it('10 should match Twice(5)', () => {
      const m = match(10)([
          [1, "ONE"],
          [2, "TWO"],
          [new Twice(5), "Twice(5)"],
      ])
      expect(m).to.be.equal("Twice(5)");
  });
  it('Twice(5) should match Twice(x), where x is assigned to 5', () => {
      const twice5 = new Twice(5);
      const m = match(twice5)([
        [1, "ONE"],
        [2, "TWO"],
        [Twice, (x) => x],
      ])
      expect(m).to.be.equal(5);
  });
  it('Twice(5) should match new Twice(5), before match with Twice(x)', () => {
      const twice5 = new Twice(5);
      const m = match(twice5)([
        [1, "ONE"],
        [new Twice(5), "Twice(5)"],
        [Twice, (x) => x],
      ])
      expect(m).to.be.equal("Twice(5)");
  });
  it('Twice(5) should not match Twice(6), but Twice(x)', () => {
      const twice5 = new Twice(5);
      const m = match(twice5)([
        [1, "ONE"],
        [new Twice(6), "Twice(6)"],
        [Twice, (x) => x],
      ])
      expect(m).to.be.equal(5);
  });
  it('Twice(6) should match {value: 12}', () => {
      const twice6 = new Twice(6);
      const m = match(twice6)([
        [1, "ONE"],
        [{value: 12}, "Twice(6) matches {value:12}"],
        [Twice, (x) => x],
      ])
      expect(m).to.be.equal("Twice(6) matches {value:12}");
  });
});

describe('Matching on class contructor: Basic Calculator', function () {
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

  const evaluate = (exp) => match(exp)([
      [Add, ([x, y])=> evaluate(x)+evaluate(y)],
      [Min, ([x, y])=> evaluate(x)-evaluate(y)],
      [Mul, ([x, y])=> evaluate(x)*evaluate(y)],
      [Div, ([x, y])=> evaluate(x)/evaluate(y)],
      [Number, (x) => x],
    ]);

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
