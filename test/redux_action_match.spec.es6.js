import chai from 'chai';
import { match, otherwise }from '../lib/match-js';

chai.expect();
const expect = chai.expect;

describe('Matching on redux-like Action class:', () => {
  class Action {
    constructor(type) {
      this.type = type;
      this.payload = undefined;
    }
    unapply(action) {
      if(action.type === this.type) {
        return { payload: action.payload };
      }
    }

    action(payload){
      return {
        type: this.type,
        payload: payload,
      }
    }
  }

  const ChangeUsername = new Action('ChangeUsername');
  const ChangeAddress = new Action('ChangeAddress');
  const StrangeAction = new Action('UJRBJLWYTU');

  it('ChangeUsername should match ChangeUsername', () => {
    const action = ChangeUsername.action('myusername');
    const m = match(action)(
      [ChangeUsername, ({payload}) => 'name: '+payload],
      [ChangeAddress, ({payload}) => 'postcode: '+payload.postcode],
      [otherwise, (_) => 'unknown action: '+action]
    );
    expect(m).to.be.equal('name: myusername');
  });
  it('ChangeAddress should match ChangeAddress', () => {
    const action = ChangeAddress.action({
      name: 'HOME ROAD',
      postcode: '1234',
    });
    const m = match(action)(
      [ChangeUsername, ({payload}) => 'name: '+payload],
      [ChangeAddress, ({payload}) => 'postcode: '+payload.postcode],
      [otherwise, (_) => 'unknown action: '+action]
    );
    expect(m).to.be.equal('postcode: 1234');
  });
  it('StrangeAction should match otherwise', () => {
    const action = StrangeAction.action('FSCRKCAWCN');
    const m = match(action)(
      [ChangeUsername, ({payload}) => 'name: '+payload],
      [ChangeAddress, ({payload}) => 'postcode: '+payload.postcode],
      [otherwise, (_) => 'unknown action: '+action]
    );
    expect(m).to.be.equal('unknown action: '+action);
  });
});
