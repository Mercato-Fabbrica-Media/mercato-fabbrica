import "server-only";
import { randomUUID } from "crypto";
import { MAPPING_BY_ID } from "./mappings";
import type {
  AriaProfile,
  ArchetypeKey,
  PreferenceVectors,
  VectorKey,
  QuestionnaireCompletedPayload,
} from "./types";

export const COMPILER_VERSION = "2.0.0";
const TOTAL_QUESTIONS = 33;

// ── Canonical archetype target profiles ──
// Source: ARIA_ENGINE/aria/core/questionnaire.py:710-721
// Revised for improved separation — see docs/ARIA-SCORING-REVISION-PROPOSAL.md

const ARCHETYPE_TARGETS: Record<ArchetypeKey, PreferenceVectors> = {
  alchemist:   { complexity_preference: 0.75, sentiment_preference: 0.65, sensory_preference: 0.65, time_preference: 0.55, technique_preference: 0.85 },
  curator:     { complexity_preference: 0.80, sentiment_preference: 0.45, sensory_preference: 0.40, time_preference: 0.55, technique_preference: 0.60 },
  forager:     { complexity_preference: 0.35, sentiment_preference: 0.55, sensory_preference: 0.85, time_preference: 0.55, technique_preference: 0.45 },
  mystic:      { complexity_preference: 0.55, sentiment_preference: 0.90, sensory_preference: 0.75, time_preference: 0.80, technique_preference: 0.45 },
  provocateur: { complexity_preference: 0.65, sentiment_preference: 0.60, sensory_preference: 0.85, time_preference: 0.35, technique_preference: 0.80 },
  archivist:   { complexity_preference: 0.80, sentiment_preference: 0.60, sensory_preference: 0.45, time_preference: 0.85, technique_preference: 0.55 },
  oracle:      { complexity_preference: 0.90, sentiment_preference: 0.75, sensory_preference: 0.45, time_preference: 0.55, technique_preference: 0.70 },
  artisan:     { complexity_preference: 0.65, sentiment_preference: 0.55, sensory_preference: 0.75, time_preference: 0.55, technique_preference: 0.85 },
  host:        { complexity_preference: 0.45, sentiment_preference: 0.90, sensory_preference: 0.65, time_preference: 0.45, technique_preference: 0.45 },
  wanderer:    { complexity_preference: 0.55, sentiment_preference: 0.55, sensory_preference: 0.80, time_preference: 0.35, technique_preference: 0.40 },
  sentinel:    { complexity_preference: 0.55, sentiment_preference: 0.85, sensory_preference: 0.55, time_preference: 0.80, technique_preference: 0.50 },
};

const VECTOR_KEYS: VectorKey[] = [
  "complexity_preference",
  "sentiment_preference",
  "sensory_preference",
  "time_preference",
  "technique_preference",
];

const ALL_ARCHETYPES: ArchetypeKey[] = [
  "alchemist", "curator", "forager", "mystic", "provocateur",
  "archivist", "oracle", "artisan", "host", "wanderer", "sentinel",
];

// ── Similarity function ──
// Matches ARIA Engine: 1.0 - (L1 distance / num_dimensions)
// Source: questionnaire.py:736-741

function similarity(vectors: PreferenceVectors, target: PreferenceVectors): number {
  let distance = 0;
  for (const key of VECTOR_KEYS) {
    distance += Math.abs(vectors[key] - target[key]);
  }
  return Math.max(0, 1 - distance / VECTOR_KEYS.length);
}

// ── Compiler ──

/**
 * Compiles a QuestionnaireCompletedPayload into an AriaProfile.
 * Algorithm matches ARIA Engine:
 * 1. Accumulate 5 preference vectors via max() per response
 * 2. Compute L1-based similarity to all 11 archetype targets
 * 3. Rank archetypes by similarity score
 */
export function compileProfile(
  payload: QuestionnaireCompletedPayload,
): AriaProfile {
  // Step 1 — Accumulate preference vectors (max per dimension)
  const vectors: PreferenceVectors = {
    complexity_preference: 0,
    sentiment_preference: 0,
    sensory_preference: 0,
    time_preference: 0,
    technique_preference: 0,
  };

  let answeredCount = 0;

  for (const response of payload.responses) {
    if (response.option_index === null) continue;

    const mapping = MAPPING_BY_ID.get(response.question_id);
    if (!mapping) continue;

    const optionMapping = mapping.options.find(
      (o) => o.index === response.option_index,
    );
    if (!optionMapping) continue;

    answeredCount++;

    // max() accumulation — matches engine behavior
    for (const [key, value] of Object.entries(optionMapping.vectors)) {
      const vk = key as VectorKey;
      if (vk in vectors) {
        vectors[vk] = Math.max(vectors[vk], value);
      }
    }
  }

  // Step 2 — Score all 11 archetypes by similarity
  const archetypeScores = {} as Record<ArchetypeKey, number>;
  for (const key of ALL_ARCHETYPES) {
    archetypeScores[key] = Math.round(similarity(vectors, ARCHETYPE_TARGETS[key]) * 1000) / 1000;
  }

  // Step 3 — Rank archetypes
  const sorted = ALL_ARCHETYPES
    .map((k) => ({ key: k, score: archetypeScores[k] }))
    .sort((a, b) => b.score - a.score);

  const primary = (sorted[0]?.score ?? 0) > 0 ? (sorted[0]?.key ?? null) : null;
  const secondary = (sorted[1]?.score ?? 0) > 0 ? (sorted[1]?.key ?? null) : null;
  const tertiary = (sorted[2]?.score ?? 0) > 0 ? (sorted[2]?.key ?? null) : null;

  // Step 3b — Rank spread and discrimination
  const rankSpread = Math.round(
    ((sorted[0]?.score ?? 0) - (sorted[1]?.score ?? 0)) * 1000,
  ) / 1000;
  const discrimination: "high_confidence" | "blended_profile" | "low_separation" =
    rankSpread >= 0.08
      ? "high_confidence"
      : rankSpread >= 0.03
        ? "blended_profile"
        : "low_separation";

  // Step 4 — Confidence and completeness
  const completeness = answeredCount / TOTAL_QUESTIONS;
  let confidence = completeness;

  if (payload.behavioral_summary.response_save_failures > 2) {
    confidence *= 0.9;
  }
  if (payload.behavioral_summary.resumed_session) {
    confidence *= 0.95;
  }

  // Step 5 — Behavioral modifiers
  const avgTimeMs = payload.behavioral_summary.average_time_per_question_ms;
  let decisiveness = 0.5;
  if (avgTimeMs !== undefined) {
    if (avgTimeMs < 5000) decisiveness = 0.8;
    else if (avgTimeMs < 10000) decisiveness = 0.6;
    else if (avgTimeMs < 20000) decisiveness = 0.4;
    else decisiveness = 0.2;
  }

  const completionCommitment =
    payload.questionnaire.completion_status === "completed"
      ? payload.behavioral_summary.resumed_session
        ? 0.9
        : 1.0
      : completeness * 0.7;

  const now = new Date().toISOString();

  return {
    profile_id: randomUUID(),
    profile_version: "2.0",
    account_id: payload.account.account_id,
    source_profile: {
      origin: "enigmatic_choices",
      questionnaire_version: payload.source.questionnaire_version,
      compiled_at: now,
      compiler_version: COMPILER_VERSION,
    },
    identity_summary: {
      primary_archetype: primary,
      secondary_archetype: secondary,
      tertiary_archetype: tertiary,
      confidence_score: Math.round(confidence * 1000) / 1000,
      completeness_score: Math.round(completeness * 1000) / 1000,
      discrimination,
      rank_spread: rankSpread,
    },
    preference_vectors: {
      complexity_preference: Math.round(vectors.complexity_preference * 1000) / 1000,
      sentiment_preference: Math.round(vectors.sentiment_preference * 1000) / 1000,
      sensory_preference: Math.round(vectors.sensory_preference * 1000) / 1000,
      time_preference: Math.round(vectors.time_preference * 1000) / 1000,
      technique_preference: Math.round(vectors.technique_preference * 1000) / 1000,
    },
    archetype_scores: archetypeScores,
    behavioral_modifiers: {
      decisiveness: Math.round(decisiveness * 1000) / 1000,
      completion_commitment: Math.round(completionCommitment * 1000) / 1000,
    },
    provenance: {
      explicit_signal_weight: 0.85,
      behavioral_signal_weight: 0.15,
      total_questions_answered: answeredCount,
      total_questions_available: TOTAL_QUESTIONS,
    },
    status: {
      state:
        payload.questionnaire.completion_status === "completed"
          ? "active"
          : "partial",
      last_updated_at: now,
    },
  };
}
