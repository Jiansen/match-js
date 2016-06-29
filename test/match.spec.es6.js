import chai from 'chai';
import match from '../lib/match.js';

chai.expect();
const expect = chai.expect;

describe('Matching on build-in primitive types', function () {
  describe('Integer value', function () {
    it('should match the same value', () => {
        const m = match(1)({
            1: "ONE",
            2: "TWO"
        })
        expect(m).to.be.equal('ONE');
    });
  });
  describe('Integer veriable', function () {
      it('should match the same value', () => {
          const twoVar = 2;
          const n = match(twoVar)({
              1: "ONE",
              2: "TWO"
          })
          expect(n).to.be.equal('TWO');
      });
  });
});
