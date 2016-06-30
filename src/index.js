const primitivePatternHandler = (exp, [pattern, block]) => {
  if(pattern === exp) {
    return block;
  }
  return undefined;
}

const primitiveValueEqualTest = (expression, pattern) => expression === pattern;
const objectEqualTest = (expression, pattern) => {
  for (const property in pattern) {
    if ( !matchTest(pattern[property], expression[property]) ) {
      return false
    }
  }
  // all properties in patern have matched properties in the expression object
  return true;
}
const functionEqualTest = (expression, pattern) => {
  // exactly the same function
  return expression === pattern;
}

const matchByTypeTest = {
  'undefined': primitiveValueEqualTest,
  'string': primitiveValueEqualTest,
  'number': primitiveValueEqualTest,
  'boolean': primitiveValueEqualTest,
  'function': functionEqualTest,
  'object': objectEqualTest,
}

const matchTest = (expression, pattern) => {
  const type_expression = typeof expression;
  const type_pattern = typeof pattern;

  if (type_expression === type_pattern) {
    return matchByTypeTest[type_expression](expression, pattern);
  }
  return false;
}

const handlerByPatternType = {
  'string': primitivePatternHandler,
  'number': primitivePatternHandler,
  'boolean': primitivePatternHandler,
  'function': (exp, [pattern, block]) => {
    if ('unapply' in pattern.prototype) {
      const extractObj = pattern.prototype.unapply(exp);
      if (extractObj != undefined) {
        return block(extractObj);
      }
    }
    return undefined;
  },
  'object': (exp, [pattern, block]) => {
    // unapply method is defined in the pattern object's prototype
    if ('unapply' in pattern) {
      // apply pattern.unapply to both the expression and the pattern object
      const extractExp = pattern.unapply(exp);
      const extractPat = pattern.unapply(pattern);

      if ( matchTest(extractExp, extractPat) ) {
        return block;
      }
      return undefined;
    }
    if ( matchTest(exp, pattern) ) {
      return block;
    }
    return undefined;
  },
}

const match = exp => patterns => {
  for (const [pattern, block] of patterns) {
    const optionPrimitiveResult = handlerByPatternType[typeof pattern](exp, [pattern, block]);
    if (optionPrimitiveResult != undefined) {
      return optionPrimitiveResult;
    }
  };
  return undefined;
}

export default match;
