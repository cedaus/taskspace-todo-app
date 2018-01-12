export function constructAll(list, model) {
  return list.map((item) => {
    return new model(item);
  });
}
