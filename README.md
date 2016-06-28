# match
Patten matching via extractor objects in JavaScript

## Documents & Notes

See the [docs](./docs) folder

## Examples
TODO:

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
* `npm run test` - well ... it runs the tests :)
