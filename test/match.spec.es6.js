import chai from 'chai';
import Match from '../lib/match.js';

chai.expect();

const expect = chai.expect;

let lib;

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
