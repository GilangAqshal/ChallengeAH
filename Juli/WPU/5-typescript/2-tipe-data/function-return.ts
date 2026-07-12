type Summary = {
  result: number;
};

function add(a: number, b: number): Summary {
  return {
    result: a + b,
  };
}
