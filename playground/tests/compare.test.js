import { test } from "node:test";
import { strictEqual, throws } from "node:assert";
import { compare, getTypeFromUnits } from "../src/convert.js";

test("getTypeFromUnits returns type for matching distance units", () => {
  strictEqual(getTypeFromUnits("km", "mi"), "distance");
  strictEqual(getTypeFromUnits("m", "km"), "distance");
});

test("getTypeFromUnits returns type for matching temperature units", () => {
  strictEqual(getTypeFromUnits("C", "F"), "temperature");
  strictEqual(getTypeFromUnits("K", "C"), "temperature");
});

test("getTypeFromUnits returns type for matching weight units", () => {
  strictEqual(getTypeFromUnits("g", "oz"), "weight");
  strictEqual(getTypeFromUnits("lb", "oz"), "weight");
});

test("getTypeFromUnits throws for incompatible units", () => {
  throws(
    () => getTypeFromUnits("km", "C"),
    /incompatible|unknown/
  );
});

test("getTypeFromUnits throws for unknown units", () => {
  throws(
    () => getTypeFromUnits("xyz", "km"),
    /incompatible|unknown/
  );
});

test("compare: first value greater (distance)", () => {
  const result = compare("distance", 5, "km", 3, "mi");
  strictEqual(result.outcome, "first");
  strictEqual(result.unit1, "km");
  strictEqual(result.unit2, "mi");
  strictEqual(result.value1, 5);
  strictEqual(result.value2, 3);
});

test("compare: second value greater (distance)", () => {
  const result = compare("distance", 2, "km", 5, "mi");
  strictEqual(result.outcome, "second");
});

test("compare: equal values (distance)", () => {
  const result = compare("distance", 1, "km", 0.621371, "mi");
  strictEqual(result.outcome, "equal");
});

test("compare: temperature", () => {
  const result = compare("temperature", 100, "C", 200, "F");
  strictEqual(result.outcome, "first"); // 100°C > 200°F (93.3°C)
});
