[![Build Status][build]][build-link]
[![semantic-release][semantic-image]][semantic-url]
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

[build]: https://api.travis-ci.org/Jiansen/match.js.svg?branch=master
[build-link]: https://travis-ci.org/Jiansen/match.js
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release



# match-js
Patten matching via extractor objects in JavaScript

## Documents & Notes

TODO: documents will be in the [docs](./docs) folder.

### Plan
- To simplify the syntax/APIs, in ES6, ES5, and some JavaScript derived languages.  If you would like to use match-js in you favourite language, please open an [issue](https://github.com/Jiansen/match-js/issues).
- To support more types of patterns and usage cases.  To request a feature, open an [issue](https://github.com/Jiansen/match-js/issues) and give a snippet of the code in your mind.  As library designers, we'd like to see how you wanted to write code. The code snippet does not have to be executable (for now).
- To refactor some small to medium sized libraries/applications using match-js, see if this library may contribute to better code.  If you have an candidate library/application in mind, please give it a go, and create a pull request to add your examples in the [Standalone Examples](# Standalone Examples) Section.

## Examples
### Basic Usage
Initial Project
```
$ npm init
$ npm install --save match-js
```
Create index.js
```
var match = require('match-js');

var two = 2;
var m = match(two)(
  [1, "ONE"],
  [2, "TWO"]
);
console.log(m);
```

### More Examples
See *.spec.es6.js files in the [test](./test) folder.

The match-js library can be used in ES5 code, but ES5 test examples in this repository are likely to be refactored at some point.

Please
- Create a pull request if you can contribute a test example.
- Open an issue if you want to request a feature that can improve your code.

### Standalone Examples
TODO: List of Standalone Examples


## Related Work

The idea of *extractor objects* is borrowed from the Scala extractor objects.  More details on the Scala feature can be found in the [language documentation](http://docs.scala-lang.org/tutorials/tour/extractor-objects.html)
and [companion paper](https://infoscience.epfl.ch/record/98468/files/MatchingObjectsWithPatterns-TR.pdf).

The implementation is influenced by [Todd Motto](https://github.com/toddmotto)'s blog: [Replacing switch statements with Object literals](https://toddmotto.com/deprecating-the-switch-statement-for-object-literals/).

[Nathan Faubion](https://github.com/natefaubion)'s [Matches.js](https://github.com/natefaubion/matches.js) library defines patterns in string literature and is shipped with an ad-hoc parser.  This library takes a different approach.  It defines a syntactically similar pattern using higher-order functions.  We made the decision for the following consideration:
- We are unsure what is the most convenient syntax rule to define a variety of patterns in JavaScript, a language that evolves rapidly.  Therefore, we are likely not able to give a precise *language specification* that defines a pattern.
- Many front-end developers uses new JS features (i.e. ES6 or ES7) or other JS-compatible languages (i.e. CoffeeScript and TypeScript), which have a different *taste* of syntax.

## Collaboration Guidelines
Comments, questions and case studies are welcome.  Feel free to create issues and pull requests.

The library is started based on [Krasimir Tsonev](https://github.com/krasimir)'s [Webpack library starter](https://github.com/krasimir/webpack-library-starter), which provides the following features.

### Process
```
ES6 source files
       |
       |
    webpack
       |
       +--- babel, eslint
       |
  ready to use
     library
  in umd format
```

### Getting started
1. Setting up the name of your library
  * Open `webpack.config.js` file and change the value of `libraryName` variable.
  * Open `package.json` file and change the value of `main` property so it matches the name of your library.
2. Build your library
  * Run `npm install` to get the project's dependencies
  * Run `npm run build` to produce minified version of your library.
3. Development mode
  * Having all the dependencies installed run `npm run dev`. This command will generate an non-minified version of your library and will run a watcher so you get the compilation on file change.
4. Running the tests
  * Run `npm run test`

### Scripts
* `npm run build` - produces production version of your library under the `lib` folder
* `npm run dev` - produces development version of your library and runs a watcher
* `npm run test:es5` - runs the tests written in ES5 (*.spec.est5:js)
* `npm run test:es6` - runs the tests written in ES6 (*.spec.es6.js)


## Release with semantic-release
* Run `./node_modules/.bin/semantic-release-cli setup` if haven't done in your working machine before.
* Run `npm run commit` to write a Commitizen friendly commit message.
* Release is triggered when run `git push` to master with any of the following commit messages.
### Patch Release
```
fix(pencil): stop graphite breaking when too much pressure applied
```
### ~~Minor~~ Feature Release
```
feat(pencil): add 'graphiteWidth' option
```
### ~~Major~~ Breaking Release
```
perf(pencil): remove graphiteWidth option

BREAKING CHANGE: The graphiteWidth option has been removed. The default graphite width of 10mm is always used for performance reason.
```
