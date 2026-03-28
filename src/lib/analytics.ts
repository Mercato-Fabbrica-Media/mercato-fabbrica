let sessionId: string | null = null;

function getSessionId(): string {
  if (sessionId) return sessionId;

  if (typeof window !== "undefined") {
    const stored = sessionStorage.getItem("analytics_session_id");
    if (stored) {
      sessionId = stored;
      return stored;
    }
    const id = crypto.randomUUID();
    sessionStorage.setItem("analytics_session_id", id);
    sessionId = id;
    return id;
  }

  return "server";
}

interface TrackOptions {
  questionnaireId?: number;
  questionId?: number;
  stepIndex?: number;
  route?: string;
  metadata?: Record<string, unknown>;
}

const queue: Array<{
  eventName: string;
  sessionId: string;
  questionnaireId?: number;
  questionId?: number;
  stepIndex?: number;
  route: string;
  metadata?: Record<string, unknown>;
}> = [];

let flushTimer: ReturnType<typeof setTimeout> | null = null;

function flush() {
  if (queue.length === 0) return;
  const batch = queue.splice(0, queue.length);

  const body = JSON.stringify(batch.length === 1 ? batch[0] : batch);

  if (typeof navigator !== "undefined" && navigator.sendBeacon) {
    navigator.sendBeacon("/api/analytics", body);
  } else {
    void fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true,
    }).catch(() => {
      /* analytics should never block UX */
    });
  }
}

export function track(eventName: string, options: TrackOptions = {}) {
  const route =
    options.route ??
    (typeof window !== "undefined" ? window.location.pathname : "");

  queue.push({
    eventName,
    sessionId: getSessionId(),
    questionnaireId: options.questionnaireId,
    questionId: options.questionId,
    stepIndex: options.stepIndex,
    route,
    metadata: options.metadata,
  });

  if (flushTimer) clearTimeout(flushTimer);
  flushTimer = setTimeout(flush, 500);
}

if (typeof window !== "undefined") {
  window.addEventListener("beforeunload", flush);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") flush();
  });
}
