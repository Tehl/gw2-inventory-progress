function distinct(arr) {
  return arr.filter((item, idx) => arr.indexOf(item) === idx);
}

function except(arr, exclude) {
  return arr.filter(item => exclude.indexOf(item) === -1);
}

function flatten(arr) {
  return arr.reduce(
    (sum, local) => (local.length ? [...sum, ...local] : [...sum, local]),
    []
  );
}

export { distinct, except, flatten };
