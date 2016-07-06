import chai from 'chai';
import {match, _, otherwise, id, CASE} from '../lib/match-js';

chai.expect();
const expect = chai.expect;

describe('Miscellaneous useages', function () {
  it('execute statements should be allowed', () => {
      const m = match(10)(
        [1, 'ONE'],
        [10, ()=>{
          return 'TEN';
        }, null]
      )
      expect(m).to.be.equal('TEN');
  });
  it('pass additional parameters to matched patial function', () => {
    const m = match(1)(
      [1, (x,y,z)=>{
        return 'Match '+x+' '+y+' '+z;
      }, 2,3]
    )
    expect(m).to.be.equal('Match 1 2 3');
  });
  it('default pattern (_) that matches everything', () => {
    const i = 3;
    const m = match(i)(
      [1, 'ONE'],
      [2, 'TWO'],
      [_, ()=>'_ matches '+i]
    )
    expect(m).to.be.equal('_ matches 3');
  });
  it('default pattern (otherwise) that matches everything', () => {
    const i = 3;
    const m = match(i)(
      [1, 'ONE'],
      [2, 'TWO'],
      [otherwise, ()=>'otherwise matches '+i+'']
    )
    expect(m).to.be.equal('otherwise matches 3');
  });
  it('id functions returns the same input value', () => {
    const x = 10;
    const m = match(x)(
      [1, 'ONE'],
      [2, 'TWO'],
      [10, id]
    )
    expect(m).to.be.equal(x);
  });
  it('CASE statements test', function() {
    const i = 10;
    const m = match(i)(
      CASE(1, (x,y,z)=>{ return 'Match '+x+' '+y+' '+z; }, 2,3),
      CASE(2, 'TWO'),
      CASE(_, ()=>'_ matches '+i)
    );
    expect(m).to.be.equal('_ matches 10');
  });
});
