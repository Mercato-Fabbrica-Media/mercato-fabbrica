import "server-only";
import { db } from "~/server/db";
import type { Prisma } from "@prisma/client";
import { assemblePayload } from "./assembler";
import { compileProfile, COMPILER_VERSION } from "./compiler";
import { saveProfile } from "./store";
import { QUESTIONNAIRE_VERSION } from "./contract";
import type { AriaProfile } from "./types";

export { loadProfile } from "./store";
export type { AriaProfile, QuestionnaireCompletedPayload } from "./types";

async function trackCompileEvent(
  eventName: string,
  accountId: number,
  metadata: Record<string, unknown>,
) {
  try {
    await db.analyticsEvent.create({
      data: {
        accountId,
        eventName,
        metadata: metadata as Prisma.InputJsonValue,
      },
    });
  } catch {
    // Telemetry is non-blocking
  }
}

/**
 * Full ARIA compilation pipeline:
 * 1. Assemble payload from DB (responses + analytics)
 * 2. Compile into AriaProfile
 * 3. Persist to aria_profiles table
 * 4. Track telemetry events
 *
 * Returns the compiled profile.
 */
export async function compileAndStoreProfile(
  accountId: number,
  sessionId?: string,
): Promise<AriaProfile> {
  const startMs = Date.now();

  await trackCompileEvent("aria_profile_compile_started", accountId, {
    compiler_version: COMPILER_VERSION,
    questionnaire_version: QUESTIONNAIRE_VERSION,
  });

  try {
    const payload = await assemblePayload(accountId, sessionId);
    const profile = compileProfile(payload);
    await saveProfile(profile);

    const durationMs = Date.now() - startMs;

    await trackCompileEvent("aria_profile_compile_succeeded", accountId, {
      compiler_version: COMPILER_VERSION,
      questionnaire_version: QUESTIONNAIRE_VERSION,
      payload_version: payload.payload_version,
      duration_ms: durationMs,
      primary_archetype: profile.identity_summary.primary_archetype,
      confidence_score: profile.identity_summary.confidence_score,
      completeness_score: profile.identity_summary.completeness_score,
      questions_answered: profile.provenance.total_questions_answered,
    });

    return profile;
  } catch (error) {
    const durationMs = Date.now() - startMs;

    await trackCompileEvent("aria_profile_compile_failed", accountId, {
      compiler_version: COMPILER_VERSION,
      questionnaire_version: QUESTIONNAIRE_VERSION,
      duration_ms: durationMs,
      error: error instanceof Error ? error.message : "unknown",
    });

    throw error;
  }
}
