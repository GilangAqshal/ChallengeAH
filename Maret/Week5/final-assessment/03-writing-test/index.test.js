import { sum } from "./index.js";
import assert from "node:assert";
import test from "node:test";

test("Hasil penjumlahan adalah ", () => {
  const a = 3;
  const b = 3;

  const result = sum(a, b);
  assert.equal(result, 6);
});
