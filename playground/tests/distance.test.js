import { test } from "node:test";
import { strictEqual } from "node:assert";
import { convertDistance } from "../src/lib/distance.js";

test("converts meters to kilometers", () => {
  strictEqual(convertDistance(1000, "m", "km"), 1);
  strictEqual(convertDistance(500, "m", "km"), 0.5);
  strictEqual(convertDistance(0, "m", "km"), 0);
});

test("converts kilometers to meters", () => {
  strictEqual(convertDistance(1, "km", "m"), 1000);
  strictEqual(convertDistance(0.5, "km", "m"), 500);
});

test("converts meters to miles", () => {
  strictEqual(convertDistance(1609.344, "m", "mi"), 1);
  strictEqual(convertDistance(0, "m", "mi"), 0);
});

test("converts miles to meters", () => {
  strictEqual(convertDistance(1, "mi", "m"), 1609.344);
  strictEqual(convertDistance(0, "mi", "m"), 0);
});
