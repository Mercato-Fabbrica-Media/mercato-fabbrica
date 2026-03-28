// ── QuestionnaireCompletedPayload ──
// The formal intake artifact from Joyous Living to ARIA.

export interface QuestionnaireCompletedPayload {
  event_type: "questionnaire.completed";
  payload_version: "1.0";
  source: {
    application: "joyous_living";
    environment: "development" | "preview" | "production";
    questionnaire_version: string;
    completed_at: string; // ISO 8601
  };
  account: {
    account_id: number;
    session_id?: string;
  };
  questionnaire: {
    questionnaire_id: "enigmatic_choices";
    total_questions: number;
    completed_questions: number;
    completion_status: "completed" | "partial";
  };
  responses: Array<{
    question_id: number;
    question_key: string;
    section_key: string;
    response_type: "single_select";
    value: string | null;
    option_index: number | null;
    option_key: string | null;
  }>;
  behavioral_summary: {
    total_time_ms?: number;
    average_time_per_question_ms?: number;
    resumed_session: boolean;
    response_save_failures: number;
  };
  analytics_summary?: {
    question_views: number;
    response_saved_count: number;
    response_save_failed_count: number;
  };
}

// ── AriaProfile ──
// The canonical compiled identity artifact owned by ARIA.
// Aligned with ARIA Engine archetype_systems_clarification.py
// and aria/core/questionnaire.py

export interface AriaProfile {
  profile_id: string;
  profile_version: "2.0";
  account_id: number;
  source_profile: {
    origin: "enigmatic_choices";
    questionnaire_version: string;
    compiled_at: string; // ISO 8601
    compiler_version: string;
  };
  identity_summary: {
    primary_archetype: ArchetypeKey | null;
    secondary_archetype: ArchetypeKey | null;
    tertiary_archetype: ArchetypeKey | null;
    confidence_score: number; // 0.0 – 1.0
    completeness_score: number; // 0.0 – 1.0
    discrimination: "high_confidence" | "blended_profile" | "low_separation";
    rank_spread: number; // score gap between #1 and #2
  };
  // The 5 continuous preference vectors (ARIA Engine canonical dimensions)
  preference_vectors: PreferenceVectors;
  // Similarity scores for all 11 archetypes
  archetype_scores: Record<ArchetypeKey, number>;
  behavioral_modifiers: {
    decisiveness: number;
    completion_commitment: number;
  };
  provenance: {
    explicit_signal_weight: number;
    behavioral_signal_weight: number;
    total_questions_answered: number;
    total_questions_available: number;
  };
  status: {
    state: "active" | "needs_recompute" | "partial";
    last_updated_at: string; // ISO 8601
  };
}

// ── Canonical ARIA.Signature archetypes (11) ──
// Source: ARIA_ENGINE/aria/core/questionnaire.py:710-721

export type ArchetypeKey =
  | "alchemist"
  | "curator"
  | "forager"
  | "mystic"
  | "provocateur"
  | "archivist"
  | "oracle"
  | "artisan"
  | "host"
  | "wanderer"
  | "sentinel";

// ── 5 continuous preference vectors ──
// Source: ARIA_ENGINE/aria/core/questionnaire.py:876-884

export interface PreferenceVectors {
  complexity_preference: number;
  sentiment_preference: number;
  sensory_preference: number;
  time_preference: number;
  technique_preference: number;
}

export type VectorKey = keyof PreferenceVectors;

// ── Option-to-vector mapping ──
// Each option contributes to one or more of the 5 vectors

export type OptionVectorMapping = Record<string, number>;

export interface QuestionMapping {
  question_id: number;
  question_key: string;
  section_key: string;
  options: Array<{
    index: number;
    option_key: string;
    vectors: OptionVectorMapping;
  }>;
}
