var chai = require('chai');
var Match = require('../lib/match.js');

chai.expect();

var expect = chai.expect;

var lib;

describe('Given an instance of my library', function () {
  before(function () {
    lib = Match;
  });
  describe('when I need the name', function () {
    it('should return the name match', () => {
      expect(lib.libname).to.be.equal('match');
    });
  });
});
