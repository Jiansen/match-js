const primitivePatternHandler = (exp, pattern) => {
  if(pattern[0] === exp) {
    return pattern[1];
  }
  return undefined;
}

const handlerByPatternType = {
  'string': primitivePatternHandler,
  'number': primitivePatternHandler,
  'function': (exp, pattern) => {
    if ('unapply' in pattern[0].prototype) {
      return pattern[1](pattern[0].prototype.unapply(exp));
    }
    return undefined;
  }
}

const match = exp => patterns => {
  for (const pattern of patterns) {
    const optionPrimitiveResult = handlerByPatternType[typeof pattern[0]](exp, pattern);
    if (optionPrimitiveResult != undefined) {
      return optionPrimitiveResult;
    }
  };

  return undefined;
}

export default match;
