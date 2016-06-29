const primitivePatternHandler = (exp, [pattern, block]) => {
  if(pattern === exp) {
    return block;
  }
  return undefined;
}

const handlerByPatternType = {
  'string': primitivePatternHandler,
  'number': primitivePatternHandler,
  'function': (exp, [pattern, block]) => {
    if ('unapply' in pattern.prototype) {
      return block(pattern.prototype.unapply(exp));
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
