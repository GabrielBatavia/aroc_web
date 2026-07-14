import assert from "node:assert/strict";
import test from "node:test";

import { simulateGait, validateGaitSimulationInput } from "./gait.js";

const defaultInput = {
  strideMm: 24,
  periodMs: 600,
  footClearanceMm: 40,
  balanceGain: 74,
  comHeightMm: 295,
  lateralOffsetMm: 0,
  steps: 120,
};

test("accepts a complete valid simulation request", () => {
  const result = validateGaitSimulationInput(defaultInput);
  assert.equal(result.ok, true);
});

test("rejects incomplete and out-of-range requests", () => {
  const result = validateGaitSimulationInput({ ...defaultInput, strideMm: 80, steps: 120.5 });
  assert.equal(result.ok, false);

  if (!result.ok) {
    assert.deepEqual(
      result.errors.map((error) => error.field).sort(),
      ["steps", "strideMm"],
    );
  }
});

test("returns deterministic simulation results", () => {
  const first = simulateGait(defaultInput);
  const second = simulateGait(defaultInput);

  assert.deepEqual(first, second);
  assert.equal(first.summary.status, "STABLE");
  assert.equal(first.series.length, defaultInput.steps);
});

test("identifies an unstable aggressive gait", () => {
  const result = simulateGait({
    ...defaultInput,
    strideMm: 56,
    periodMs: 380,
    footClearanceMm: 68,
    balanceGain: 44,
  });

  assert.equal(result.summary.status, "FALL_RISK");
  assert.ok(result.metrics.riskFactors.length > 0);
});
