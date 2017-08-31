function mapKeys(source, iteratee) {
  let result = {};
  Object.keys(source).forEach(key => {
    result[key] = iteratee(source[key], key);
  });
  return result;
}

export { mapKeys };
