chai = require 'chai'
matchJS = require '../lib/match-js'
match = matchJS.match

chai.expect()
expect = chai.expect

describe 'Matching on build-in primitive types', ->
  it 'Integer value 10 should match value 10', ->
      m = match(10)(
        [1, "ONE"],
        [10, "TEN"]
      )
      expect(m).to.be.equal 'TEN'

  it 'Integer veriable of value 2 should match the value 2', ->
      two = 2;
      m = match(two)(
        [1, "ONE"],
        [2, "TWO"]
      )
      expect(m).to.be.equal 'TWO'


  it 'Boolean value true should match value true', ->
      m = match(true)(
        [1, "ONE"],
        [10, "TEN"],
        [true, "TRUE"]
      )
      expect(m).to.be.equal 'TRUE'


  it 'String value \'Hello World\' should match value \'Hello World\'', ->
      m = match('Hello World')(
        [1, "ONE"],
        [10, "TEN"],
        ['Hello World', "Hello World Matched"]
      )
      expect(m).to.be.equal 'Hello World Matched'


  it 'Integer 1 should match int 1, not String \'1\'', ->
      m = match(1)(
        ['1', "String ONE"],
        [1, "Integer ONE"]
      )
      expect(m).to.be.equal 'Integer ONE'

  it 'String \'1\' should match String \'1\', not int 1', ->
      m = match(1)(
        [1, "Integer ONE"],
        ['1', "String ONE"]
      )
      expect(m).to.be.equal 'Integer ONE'
  return
