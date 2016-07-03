###
Ported From the Scala Example in:
  http://docs.scala-lang.org/tutorials/tour/extractor-objects.html


```
object Twice
  def apply(x: Int): Int = x * 2
  def unapply(z: Int): Option[Int] = if (z%2 == 0) Some(z/2) else None

object TwiceTest extends App
  val x = Twice(21)
  x match  case Twice(n) => Console.println(n)  // prints 21

```
###

chai = require 'chai'
matchJS = require '../lib/match-js'
match = matchJS.match

chai.expect()
expect = chai.expect

describe 'Matching on class contructor Twice:', ->
  class Twice
    constructor:(x)->
      @value = x*2;
      @funny_prop = 'funny';

    unapply:(x)->
      if (x instanceof Twice) and (x.value%2 == 0)
        return x.value / 2

      if x%2 == 0
        return x/2;
      else
        return undefined;

  it '10 should match Twice(x), where x is assigned to 5', ->
      m = match(10)(
        [1, "ONE"],
        [2, "TWO"],
        [Twice, (x) => x]
      )
      expect(m).to.be.equal 5

  it '10 should match Twice(5)', ->
      m = match(10)(
        [1, "ONE"],
        [2, "TWO"],
        [new Twice(5), "Twice(5)"]
      )
      expect(m).to.be.equal "Twice(5)"

  it 'Twice(5) should match Twice(x), where x is assigned to 5', ->
      twice5 = new Twice(5)
      m = match(twice5)(
        [1, "ONE"],
        [2, "TWO"],
        [Twice, (x) => x]
      )
      expect(m).to.be.equal 5

  it 'Twice(5) should match new Twice(5), before match with Twice(x)', ->
      twice5 = new Twice(5)
      m = match(twice5)(
        [1, "ONE"],
        [new Twice(5), "Twice(5)"],
        [Twice, (x) => x]
      )
      expect(m).to.be.equal "Twice(5)"

  it 'Twice(5) should not match Twice(6), but Twice(x)', ->
      twice5 = new Twice(5)
      m = match(twice5)(
        [1, "ONE"],
        [new Twice(6), "Twice(6)"],
        [Twice, (x) => x]
      )
      expect(m).to.be.equal 5

  it 'Twice(6) should match value: 12', ->
      twice6 = new Twice(6)
      m = match(twice6)(
        [1, "ONE"],
        [value: 12, "Twice(6) matches value:12"],
        [Twice, (x) => x]
      )
      expect(m).to.be.equal "Twice(6) matches value:12"
