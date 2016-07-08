chai = require 'chai'
matchJS = require '../lib/match-js'
match = matchJS.match
otherwise = matchJS.otherwise

chai.expect()
expect = chai.expect

describe 'Matching on redux-like Action class:', ->
  class Action
    constructor:(type) ->
      @type = type
      @payload = undefined

    unapply:(action) ->
      if(action.type == @type)
        return { payload: action.payload }

    action:(payload)->
      return {
        type: this.type
        payload: payload
      }

  ChangeUsername = new Action('ChangeUsername')
  ChangeAddress = new Action('ChangeAddress')
  StrangeAction = new Action('UJRBJLWYTU')

  it 'ChangeUsername should match ChangeUsername', ->
    action = ChangeUsername.action('myusername')
    m = match(action)(
      [ChangeUsername, ({payload}) -> 'name: '+payload],
      [ChangeAddress, ({payload}) -> 'postcode: '+payload.postcode],
      [otherwise, (_) -> 'unknown action: '+action]
    )
    expect(m).to.be.equal('name: myusername')

  it 'ChangeAddress should match ChangeAddress', ->
    action = ChangeAddress.action({
      name: 'HOME ROAD',
      postcode: '1234',
    })
    m = match(action)(
      [ChangeUsername, ({payload}) -> 'name: '+payload],
      [ChangeAddress, ({payload}) -> 'postcode: '+payload.postcode],
      [otherwise, (_) -> 'unknown action: '+action]
    )
    expect(m).to.be.equal('postcode: 1234')

  it 'StrangeAction should match otherwise', ->
    action = StrangeAction.action('FSCRKCAWCN')
    m = match(action)(
      [ChangeUsername, ({payload}) -> 'name: '+payload],
      [ChangeAddress, ({payload}) -> 'postcode: '+payload.postcode],
      [otherwise, (_) -> 'unknown action: '+action]
    )
    expect(m).to.be.equal('unknown action: '+action)

  return
