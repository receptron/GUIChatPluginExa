/**
 * `context.app.searchExa` returns `unknown` since gui-chat-protocol 2.0.0, so
 * the plugin narrows it here instead of trusting the host's shape.
 *
 * Run with: yarn test
 */

import { test, describe } from "node:test";
import assert from "node:assert";
import { isExaSearchResponse } from "../src/core/hostResponse.js";

const RESULT = {
  title: "Example",
  url: "https://example.com",
  text: "body",
  highlights: ["a", "b"],
  score: 0.5,
};

describe("isExaSearchResponse", () => {
  test("accepts a successful response carrying results", () => {
    assert.equal(isExaSearchResponse({ success: true, results: [RESULT] }), true);
  });

  test("accepts a successful response with no results key", () => {
    assert.equal(isExaSearchResponse({ success: true }), true);
  });

  test("accepts a failure response carrying an error string", () => {
    assert.equal(isExaSearchResponse({ success: false, error: "boom" }), true);
  });

  test("rejects a result missing the fields the view renders", () => {
    assert.equal(
      isExaSearchResponse({ success: true, results: [{ title: "Example" }] }),
      false,
    );
  });

  test("rejects a result whose highlights are not all strings", () => {
    assert.equal(
      isExaSearchResponse({
        success: true,
        results: [{ ...RESULT, highlights: ["a", 2] }],
      }),
      false,
    );
  });

  test("rejects values that are not a response object", () => {
    [null, undefined, "ok", 7].forEach((value) => {
      assert.equal(
        isExaSearchResponse(value),
        false,
        `should reject ${JSON.stringify(value)}`,
      );
    });
  });
});
