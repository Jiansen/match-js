// import chai from 'chai';
// import Match from '../lib/match.js';

var chai = require('chai');
var Match = require('../lib/match.js');

chai.expect();

var expect = chai.expect;

var lib;

describe('Given an instance of my library', function () {
  before(function () {
    console.log(Match);
    lib = Match.default;
  });
  describe('when I need the name', function () {
    it('should return the name', () => {
      expect(lib.name).to.be.equal('Match');
    });
  });
});
