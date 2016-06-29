import chai from 'chai';
import match from '../lib/match.js';

chai.expect();
const expect = chai.expect;

describe('Matching on build-in primitive types', function () {
  describe('Integer value 10', function () {
    it('should match value 10', () => {
        const m = match(10)([
            [1, "ONE"],
            [10, "TEN"],
        ])
        expect(m).to.be.equal('TEN');
    });
  });
  describe('Integer veriable has value 2', function () {
      it('should match the value 2', () => {
          const two = 2;
          const m = match(two)([
              [1, "ONE"],
              [2, "TWO"],
          ])
          expect(m).to.be.equal('TWO');
      });
  });
});

describe('Matching on class contructor', function () {
  class Twice {
    constructor(x) {
      this.value = x*2;
    }
    unapply(x) {
      if( x%2 ==0 ) {
        return x/2;
      }else{
        return undefined;
      }
    }
  }
  describe('10 ', function () {
    it('should match Twice(5)', () => {
        const m = match(10)([
            [1, "ONE"],
            [2, "TWO"],
            [Twice, (x) => x],
        ])
        expect(m).to.be.equal(5);
    });
  });
  describe('Twice(5)', function () {
    it('should match Twice(5)', () => {
        const twice5 = new Twice(5);
        const m = match(10)([
          [1, "ONE"],
          [2, "TWO"],
          [Twice, (x) => x],
        ])
        expect(m).to.be.equal(5);
    });
  });
});
