var chai = require('chai');
var match = require('../lib/match.js');

chai.expect();
var expect = chai.expect;

describe('Matching on build-in primitive types', function () {
  describe('Integer value', function () {
    it('should match the same value', () => {
        var m = match(1)({
            1: "ONE",
            2: "TWO"
        })
        expect(m).to.be.equal('ONE');
    });
  });
  describe('Integer veriable', function () {
      it('should match the same value', () => {
          var twoVar = 2;
          var m = match(twoVar)({
              1: "ONE",
              2: "TWO"
          })
          expect(m).to.be.equal('TWO');
      });
  });
});
