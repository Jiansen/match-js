chai = require 'chai'
matchJS = require '../lib/match-js'
match = matchJS.match

chai.expect()
expect = chai.expect

describe 'Matching on Algebraic Data Type: An Calculator', ->
  class BinOpExp
    constructor:(x, y) ->
      @x = x
      @y = y

  class Add extends BinOpExp
    unapply: (exp) ->
      if exp instanceof Add then [exp.x, exp.y] else undefined

  class Min extends BinOpExp
    unapply: (exp) ->
      if exp instanceof Min then [exp.x, exp.y] else undefined

  class Mul extends BinOpExp
    unapply: (exp) ->
      if exp instanceof Mul then [exp.x, exp.y] else undefined

  class Div extends BinOpExp
    unapply: (exp) ->
      if exp instanceof Div then [exp.x, exp.y] else undefined

  class Number
    unapply: (e) ->
      if typeof e == 'number' then e else undefined

  evaluate = (exp) ->
    match(exp)(
      [Add, ([x, y]) -> evaluate(x)+evaluate(y)]
      [Min, ([x, y]) -> evaluate(x)-evaluate(y)]
      [Mul, ([x, y]) -> evaluate(x)*evaluate(y)]
      [Div, ([x, y]) -> evaluate(x)/evaluate(y)]
      [Number, (x) -> x])

  it 'evaluate(5) should eval to 5', ->
    expect(evaluate(5)).to.be.equal 5

  it '/( *( +(3)(2) )(6) ) (2) should eval to 15', ->
    exp = new Div(new Mul( new Add(3, 2), 6), 2)
    expect(evaluate(exp)).to.be.equal(15)

  return
