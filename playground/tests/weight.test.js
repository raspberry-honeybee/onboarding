import { test } from "node:test";
import { strictEqual } from "node:assert";
import { convertWeight } from "../src/lib/weight.js";

test("converts pounds to ounces", () => {
  strictEqual(convertWeight(1, "lb", "oz"), 16);
  strictEqual(convertWeight(0.5, "lb", "oz"), 8);
  strictEqual(convertWeight(0, "lb", "oz"), 0);
});

test("converts ounces to pounds", () => {
  strictEqual(convertWeight(16, "oz", "lb"), 1);
  strictEqual(convertWeight(8, "oz", "lb"), 0.5);
});

test("converts pounds to grams", () => {
  strictEqual(convertWeight(1, "lb", "g"), 453.592);
  strictEqual(convertWeight(0, "lb", "g"), 0);
});

test("converts grams to pounds", () => {
  strictEqual(convertWeight(453.592, "g", "lb"), 1);
  strictEqual(convertWeight(0, "g", "lb"), 0);
});
