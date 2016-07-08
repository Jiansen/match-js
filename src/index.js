const isUndefined = (value) => typeof value === 'undefined'

const evalMatchedPatternByStatmentsType = {
  'string': (_obj, value, _args) => value,
  'number': (_obj, value, _args) => value,
  'boolean': (_obj, value, _args) => value,
  'function': (extractObj, fun, ...args) => fun(extractObj, ...args),
  'object': (_obj, value, _args) => value,
}

const evalMatchedPattern = (obj, statements, ...args) => {
  if( !isUndefined(obj) )  {
    return evalMatchedPatternByStatmentsType[typeof statements](obj, statements, ...args);
  }
}

const primitivePatternHandler = (exp, [pattern, statements, ...args]) => {
  if(primitiveValueEqualTest(exp, pattern)) {
    return evalMatchedPattern(exp, statements, ...args);
  }
  return undefined;
}

const primitiveValueEqualTest = (expression, pattern) => expression === pattern;
const objectEqualTest = (expression, pattern) => {
  for (const property in pattern) {
    if ( !isUndefined(pattern[property]) && !matchTest(pattern[property], expression[property]) ) {
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
  'function': (exp, [pattern, statements, ...args]) => {
    if ('unapply' in pattern.prototype) {
      const extractObj = pattern.prototype.unapply(exp);
      if ( !isUndefined(extractObj) ) {
        return evalMatchedPattern(extractObj, statements, ...args);
      }
    }
    return undefined;
  },
  'object': (exp, [pattern, statements, ...args]) => {
    // unapply method is defined in the pattern object's prototype
    if ('unapply' in pattern) {
      // apply pattern.unapply to both the expression and the pattern object
      const extractExp = pattern.unapply(exp);
      const extractPat = pattern.unapply(pattern);

      if ( matchTest(extractExp, extractPat) ) {
        return evalMatchedPattern(extractExp, statements, ...args);
      }
      return undefined;
    }
    if ( matchTest(exp, pattern) ) {
      return evalMatchedPattern(exp, statements, ...args);
    }
    return undefined;
  },
}

const match = exp => (...pattern_clauses) => {
  for (const [pattern, statements, ...args] of pattern_clauses) {
    const optionResult = handlerByPatternType[typeof pattern](exp, [pattern, statements, ...args]);
    if (!isUndefined(optionResult)) {
      return optionResult;
    }
  };
  return undefined;
}

const _ = {
  unapply(x) {
    return null;
  }
}
const CASE = (...args) => args
const otherwise = _
const id = (x) => x


export default {
  match,
  _,
  CASE,
  id,
  otherwise,
}
