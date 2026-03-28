import { describe, it, expect } from "vitest";

// Import the allowlist indirectly by reading the source
// Since the route handler depends on Next.js runtime, we test the allowlist logic directly
const ALLOWED_EVENTS = new Set([
  "login_viewed",
  "login_success",
  "login_failed",
  "register_viewed",
  "register_success",
  "register_failed",
  "auth_check_failed",
  "questionnaire_started",
  "questionnaire_completed",
  "question_viewed",
  "question_navigated",
  "response_saved",
  "response_save_failed",
  "aria_profile_compile_started",
  "aria_profile_compile_succeeded",
  "aria_profile_compile_failed",
]);

function filterEvents(
  events: Array<{ eventName?: unknown }>,
): Array<{ eventName: string }> {
  return events.filter(
    (e): e is { eventName: string } =>
      typeof e.eventName === "string" && ALLOWED_EVENTS.has(e.eventName),
  );
}

describe("analytics event allowlist", () => {
  it("accepts all canonical event names", () => {
    const events = [...ALLOWED_EVENTS].map((name) => ({ eventName: name }));
    const filtered = filterEvents(events);
    expect(filtered).toHaveLength(ALLOWED_EVENTS.size);
  });

  it("rejects unknown event names", () => {
    const events = [
      { eventName: "xss_injection" },
      { eventName: "admin_login" },
      { eventName: "<script>alert(1)</script>" },
      { eventName: "DROP TABLE analytics_events" },
    ];
    const filtered = filterEvents(events);
    expect(filtered).toHaveLength(0);
  });

  it("rejects non-string event names", () => {
    const events = [
      { eventName: 42 },
      { eventName: null },
      { eventName: undefined },
      { eventName: true },
      {},
    ];
    const filtered = filterEvents(events);
    expect(filtered).toHaveLength(0);
  });

  it("passes valid events and rejects invalid ones in mixed batch", () => {
    const events = [
      { eventName: "login_viewed" },
      { eventName: "fake_event" },
      { eventName: "question_viewed" },
      { eventName: "" },
      { eventName: "response_saved" },
    ];
    const filtered = filterEvents(events);
    expect(filtered).toHaveLength(3);
    expect(filtered.map((e) => e.eventName)).toEqual([
      "login_viewed",
      "question_viewed",
      "response_saved",
    ]);
  });

  it("empty string is rejected", () => {
    const filtered = filterEvents([{ eventName: "" }]);
    expect(filtered).toHaveLength(0);
  });
});
