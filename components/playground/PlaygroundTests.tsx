"use client";

import type { ValidationResult } from "./types";

interface PlaygroundTestsProps {
  results: ValidationResult;
}

export function PlaygroundTests({ results }: PlaygroundTestsProps) {
  const allPassed = results.passed;

  return (
    <div className="playground-tests">
      <div className="playground-tests-header">
        <span className="playground-tests-title">Test Results</span>
        <span
          className={`playground-tests-summary ${
            allPassed
              ? "playground-tests-summary--pass"
              : "playground-tests-summary--fail"
          }`}
        >
          {results.totalPassed} / {results.totalTests} Passed
        </span>
      </div>

      <div className="playground-test-list">
        {results.results.map((test, i) => (
          <div
            key={i}
            className={`playground-test-item ${
              test.passed
                ? "playground-test-item--pass"
                : "playground-test-item--fail"
            }`}
          >
            <span className="playground-test-icon">
              {test.passed ? "✓" : "✗"}
            </span>
            <span className="playground-test-name">
              {test.hidden ? `Hidden Test ${i + 1}` : test.name}
            </span>
            {!test.passed && test.error && (
              <span className="playground-test-error">{test.error}</span>
            )}
          </div>
        ))}
      </div>

      {allPassed && (
        <div className="playground-tests-celebration">
          <span>🎉</span>
          <span>All Tests Passed! Great job!</span>
        </div>
      )}
    </div>
  );
}
