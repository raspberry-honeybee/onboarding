#!/usr/bin/env node
import { convert, compare, getTypeFromUnits } from "../src/convert.js";

const [,, cmd, ...rest] = process.argv;

if (cmd === "compare") {
  const [value1, unit1, value2, unit2] = rest;
  if (!value1 || !unit1 || !value2 || !unit2) {
    console.error("Usage: convert compare <value1> <unit1> <value2> <unit2>");
    console.error("Example: convert compare 5 km 3 mi");
    process.exit(1);
  }
  try {
    const type = getTypeFromUnits(unit1, unit2);
    const result = compare(type, value1, unit1, value2, unit2);
    const { value1: v1, unit1: u1, value2: v2, unit2: u2, value2InUnit1, outcome } = result;
    if (outcome === "equal") {
      console.log(`${v1} ${u1} and ${v2} ${u2} are equal (${v2} ${u2} = ${value2InUnit1} ${u1})`);
    } else if (outcome === "first") {
      console.log(`${v1} ${u1} is greater than ${v2} ${u2} (${v2} ${u2} = ${value2InUnit1} ${u1})`);
    } else {
      console.log(`${v2} ${u2} is greater than ${v1} ${u1} (${v2} ${u2} = ${value2InUnit1} ${u1})`);
    }
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
  process.exit(0);
}

const [type, value, from, to] = [cmd, ...rest];
if (!type || !value) {
  console.error("Usage: convert <type> <value> [from] [to]");
  process.exit(1);
}

try {
  const result = convert(type, Number(value), from, to);
  console.log(result);
} catch (err) {
  console.error(err.message);
  process.exit(1);
}
