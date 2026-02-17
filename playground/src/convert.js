import * as temperature from "./lib/temperature.js";
import * as distance from "./lib/distance.js";
import * as weight from "./lib/weight.js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const defaults = JSON.parse(
  readFileSync(join(__dirname, "../config/defaults.json"), "utf-8")
);

const UNIT_TYPES = {
  km: "distance",
  mi: "distance",
  m: "distance",
  C: "temperature",
  F: "temperature",
  K: "temperature",
  g: "weight",
  oz: "weight",
  lb: "weight",
};

export function getTypeFromUnits(unit1, unit2) {
  const t1 = UNIT_TYPES[unit1];
  const t2 = UNIT_TYPES[unit2];
  if (!t1 || !t2 || t1 !== t2) {
    throw new Error(
      `Cannot compare: incompatible or unknown units "${unit1}" and "${unit2}"`
    );
  }
  return t1;
}

export function compare(type, value1, from1, value2, from2) {
  const num1 = Number(value1);
  const num2 = Number(value2);
  if (Number.isNaN(num1)) throw new Error("Invalid number: first value must be numeric");
  if (Number.isNaN(num2)) throw new Error("Invalid number: second value must be numeric");

  const value2InUnit1 = convert(type, num2, from2, from1);
  const diff = num1 - value2InUnit1;
  let outcome;
  if (Math.abs(diff) < Math.pow(10, -defaults.precision)) outcome = "equal";
  else if (diff > 0) outcome = "first";
  else outcome = "second";

  return {
    value1: num1,
    unit1: from1,
    value2: num2,
    unit2: from2,
    value2InUnit1,
    outcome,
  };
}

export function convert(type, value, from, to) {
  const num = Number(value);
  if (Number.isNaN(num)) {
    throw new Error("Invalid number: value must be numeric");
  }

  let result;
  switch (type) {
    case "temperature":
      result = temperature.convertTemperature(
        num,
        from || defaults.temperature.defaultFrom,
        to || defaults.temperature.defaultTo
      );
      break;
    case "distance":
      result = distance.convertDistance(num, from, to);
      break;
    case "weight":
      result = weight.convertWeight(num, from, to);
      break;
    default:
      throw new Error("Unknown type " + type);
  }

  // Apply precision rounding
  return Math.round(result * Math.pow(10, defaults.precision)) / Math.pow(10, defaults.precision);
}
