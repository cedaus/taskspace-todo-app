export function constructAll(list, model) {
  return list.map((item) => {
    return new model(item);
  });
}


export function bool(bool_str) {
  if (bool_str === 'true') { return true; } else if (bool_str === 'false') {
    return false;
  }
  return null;
}
