chai = require 'chai'
matchJS = require '../lib/match-js'
match = matchJS.match
_ = matchJS._
id = matchJS.id
otherwise = matchJS.otherwise
CASE = matchJS.CASE

chai.expect()
expect = chai.expect

describe 'Miscellaneous useages', ->
  it 'execute statements should be allowed', ->
    m = match(10)(
      [1, 'ONE'],
      [10, ( ->'TEN'), null]
    )
    expect(m).to.be.equal 'TEN'

  it 'pass additional parameters to matched patial function', ->
    m = match(1)(
      [1, (x,y,z)->
        'Match '+x+' '+y+' '+z
      , 2,3]
    )
    expect(m).to.be.equal 'Match 1 2 3'

  it 'default pattern (_) that matches everything', ->
    i = 3
    m = match(i)(
      [1, 'ONE'],
      [2, 'TWO'],
      [_, ()->'_ matches '+i]
    )
    expect(m).to.be.equal '_ matches 3'
  it 'default pattern (otherwise) that matches everything', ->
      i = 3
      m = match(i)(
        [1, 'ONE'],
        [2, 'TWO'],
        [otherwise, ()->'otherwise matches '+i]
      )
      expect(m).to.be.equal 'otherwise matches 3'

  it 'id functions returns the same input value', ->
    x = 10
    m = match(x)(
      [1, 'ONE'],
      [2, 'TWO'],
      [10, id]
    )
    expect(m).to.be.equal x

  it 'CASE statements test', ->
    i = 10;
    m = match(i)(
      CASE(1, ( (x,y,z)-> 'Match '+x+' '+y+' '+z ), 2,3),
      CASE(2, 'TWO'),
      CASE(_, ->'_ matches '+i)
    )
    expect(m).to.be.equal '_ matches 10'

  return
