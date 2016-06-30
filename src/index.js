const primitivePatternHandler = (exp, [pattern, block]) => {
  if(pattern === exp) {
    return block;
  }
  return undefined;
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
    if ('unapply' in pattern.__proto__) {
      const extractObj = pattern.__proto__.unapply(exp);
      if (extractObj != undefined) {
        return block;
      }
    }
    for (const property in pattern) {
        if (pattern[property] !== exp[property]) {
          return undefined
        }
    }
    // all properties in exp have the same value as corresponding properties in pattern object
    return block;
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
