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
  }
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
