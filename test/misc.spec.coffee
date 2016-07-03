chai = require 'chai'
matchJS = require '../lib/match-js'
match = matchJS.match
_ = matchJS._
id = matchJS.id

chai.expect()
expect = chai.expect

describe 'Miscellaneous useages', ->
  it 'execute statements should be allowed', ->
    tenfun = ->"TEN"
    m = match(10)(
      [1, "ONE"],
      [10, tenfun, null]
    )
    expect(m).to.be.equal 'TEN'

  it 'pass additional parameters to matched patial function', ->
    m = match(1)(
      [1, (x,y,z)->
        "Match "+x+" "+y+" "+z
      , 2,3]
    )
    expect(m).to.be.equal 'Match 1 2 3'

  it 'default pattern that matches everything', ->
    i = 3
    m = match(i)(
      [1, "ONE"],
      [2, "TOW"],
      [_, ()->"ANY is "+i+""]
    )
    expect(m).to.be.equal 'ANY is 3'

  it 'id functions returns the same input value', ->
    x = 10
    m = match(x)(
      [1, "ONE"],
      [2, "TOW"],
      [10, id]
    )
    expect(m).to.be.equal x
