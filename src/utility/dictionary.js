function getOrAdd(dictionary, key, factory) {
  let result = dictionary[key];
  if (!result) {
    result = factory();
    dictionary[key] = result;
  }
  return result;
}

export { getOrAdd };
