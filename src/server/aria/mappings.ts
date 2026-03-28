import type { QuestionMapping } from "./types";

// ── Option-to-Vector Mapping Table ──
// Ported from ARIA_ENGINE/aria/core/questionnaire.py:887-969
// Each option maps to one or more of the 5 continuous preference vectors.
// Accumulation method: max() per vector (matching engine behavior).
//
// Compiler version: 2.0

export const QUESTION_MAPPINGS: QuestionMapping[] = [
  // ═══════════════════════════════════
  // DOMAIN: Lifestyle Dynamics (Q1-11)
  // ═══════════════════════════════════

  {
    question_id: 1,
    question_key: "everyday_item_guide",
    section_key: "lifestyle_dynamics",
    options: [
      { index: 0, option_key: "functionality_practicality", vectors: { complexity_preference: 0.3, sentiment_preference: 0.4 } },
      { index: 1, option_key: "aesthetic_appeal_design", vectors: { sentiment_preference: 0.7, sensory_preference: 0.8 } },
      { index: 2, option_key: "brand_reputation_recommendations", vectors: { sentiment_preference: 0.5, technique_preference: 0.6 } },
      { index: 3, option_key: "ethical_environmental", vectors: { sentiment_preference: 0.8, sensory_preference: 0.6 } },
    ],
  },
  {
    question_id: 2,
    question_key: "rewarding_indulgence",
    section_key: "lifestyle_dynamics",
    options: [
      { index: 0, option_key: "new_hobby_skill", vectors: { complexity_preference: 0.65, time_preference: 0.5, technique_preference: 0.55 } },
      { index: 1, option_key: "luxury_item", vectors: { sentiment_preference: 0.8, sensory_preference: 0.72 } },
      { index: 2, option_key: "gourmet_meal", vectors: { sentiment_preference: 0.7, sensory_preference: 0.75 } },
      { index: 3, option_key: "nature_traveling", vectors: { sentiment_preference: 0.6, sensory_preference: 0.7 } },
    ],
  },
  {
    question_id: 3,
    question_key: "ideal_weekend_activity",
    section_key: "lifestyle_dynamics",
    options: [
      { index: 0, option_key: "creative_physical", vectors: { complexity_preference: 0.6, technique_preference: 0.7 } },
      { index: 1, option_key: "new_trends_tech", vectors: { complexity_preference: 0.75, time_preference: 0.35, technique_preference: 0.6 } },
      { index: 2, option_key: "relaxing_home", vectors: { sentiment_preference: 0.4, sensory_preference: 0.5 } },
      { index: 3, option_key: "socializing_events", vectors: { sentiment_preference: 0.6, sensory_preference: 0.6 } },
    ],
  },
  {
    question_id: 4,
    question_key: "choice_priority",
    section_key: "lifestyle_dynamics",
    options: [
      { index: 0, option_key: "sustainability_ethical", vectors: { sentiment_preference: 0.85, sensory_preference: 0.6 } },
      { index: 1, option_key: "quality_durability", vectors: { complexity_preference: 0.6, technique_preference: 0.65 } },
      { index: 2, option_key: "cost_effectiveness", vectors: { complexity_preference: 0.4, sentiment_preference: 0.3 } },
      { index: 3, option_key: "cultural_artistic", vectors: { sentiment_preference: 0.75, sensory_preference: 0.8 } },
    ],
  },
  {
    question_id: 5,
    question_key: "trend_response",
    section_key: "lifestyle_dynamics",
    options: [
      { index: 0, option_key: "early_explorer", vectors: { complexity_preference: 0.7, time_preference: 0.25 } },
      { index: 1, option_key: "measured_adoption", vectors: { time_preference: 0.6, complexity_preference: 0.5 } },
      { index: 2, option_key: "timeless_preference", vectors: { time_preference: 0.75, sentiment_preference: 0.5 } },
      { index: 3, option_key: "blended_modern_classic", vectors: { complexity_preference: 0.55, time_preference: 0.5 } },
    ],
  },
  {
    question_id: 6,
    question_key: "online_content",
    section_key: "lifestyle_dynamics",
    options: [
      { index: 0, option_key: "educational_skill", vectors: { complexity_preference: 0.7, time_preference: 0.5, technique_preference: 0.45 } },
      { index: 1, option_key: "lifestyle_wellness", vectors: { sentiment_preference: 0.65, sensory_preference: 0.6 } },
      { index: 2, option_key: "news_current_events", vectors: { complexity_preference: 0.6, sentiment_preference: 0.5 } },
      { index: 3, option_key: "entertainment_humor", vectors: { sentiment_preference: 0.5, sensory_preference: 0.6 } },
    ],
  },
  {
    question_id: 7,
    question_key: "life_focus",
    section_key: "lifestyle_dynamics",
    options: [
      { index: 0, option_key: "personal_professional_dev", vectors: { complexity_preference: 0.8, time_preference: 0.65 } },
      { index: 1, option_key: "health_wellbeing", vectors: { sentiment_preference: 0.65, sensory_preference: 0.6 } },
      { index: 2, option_key: "relationships_social", vectors: { sentiment_preference: 0.8, sensory_preference: 0.65 } },
      { index: 3, option_key: "leisure_travel", vectors: { sensory_preference: 0.8, time_preference: 0.35 } },
    ],
  },
  {
    question_id: 8,
    question_key: "decision_influence",
    section_key: "lifestyle_dynamics",
    options: [
      { index: 0, option_key: "personal_research", vectors: { complexity_preference: 0.75, time_preference: 0.45 } },
      { index: 1, option_key: "friends_family_recs", vectors: { sentiment_preference: 0.7, sensory_preference: 0.5 } },
      { index: 2, option_key: "expert_opinions", vectors: { complexity_preference: 0.7, sentiment_preference: 0.45, time_preference: 0.35 } },
      { index: 3, option_key: "intuition_spontaneous", vectors: { sentiment_preference: 0.6, time_preference: 0.3 } },
    ],
  },
  {
    question_id: 9,
    question_key: "self_investment",
    section_key: "lifestyle_dynamics",
    options: [
      { index: 0, option_key: "learning_education", vectors: { complexity_preference: 0.75, time_preference: 0.6 } },
      { index: 1, option_key: "physical_fitness", vectors: { sentiment_preference: 0.65, technique_preference: 0.6 } },
      { index: 2, option_key: "grooming_presentation", vectors: { sensory_preference: 0.7, sentiment_preference: 0.5 } },
      { index: 3, option_key: "mental_emotional", vectors: { sentiment_preference: 0.8, sensory_preference: 0.5 } },
    ],
  },
  {
    question_id: 10,
    question_key: "community_engagement",
    section_key: "lifestyle_dynamics",
    options: [
      { index: 0, option_key: "volunteering", vectors: { sentiment_preference: 0.82, time_preference: 0.55 } },
      { index: 1, option_key: "local_events_clubs", vectors: { sentiment_preference: 0.7, sensory_preference: 0.65 } },
      { index: 2, option_key: "online_forums_social", vectors: { complexity_preference: 0.6, technique_preference: 0.5 } },
      { index: 3, option_key: "workshops_talks", vectors: { complexity_preference: 0.7, time_preference: 0.55, technique_preference: 0.45 } },
    ],
  },
  {
    question_id: 11,
    question_key: "weekend_domain",
    section_key: "lifestyle_dynamics",
    options: [
      { index: 0, option_key: "arts_culture", vectors: { sensory_preference: 0.85, sentiment_preference: 0.65 } },
      { index: 1, option_key: "nature_outdoors", vectors: { sensory_preference: 0.65, sentiment_preference: 0.65 } },
      { index: 2, option_key: "culinary_experiences", vectors: { sensory_preference: 0.75, sentiment_preference: 0.7 } },
      { index: 3, option_key: "technology_innovation", vectors: { complexity_preference: 0.85, time_preference: 0.45, technique_preference: 0.55 } },
    ],
  },

  // ═══════════════════════════════════════
  // DOMAIN: Future Orientations (Q13-23)
  // ═══════════════════════════════════════

  {
    question_id: 13,
    question_key: "change_adaptation",
    section_key: "future_orientations",
    options: [
      { index: 0, option_key: "embrace_enthusiastically", vectors: { time_preference: 0.25, complexity_preference: 0.7 } },
      { index: 1, option_key: "adapt_gradually", vectors: { time_preference: 0.6, complexity_preference: 0.6 } },
      { index: 2, option_key: "prefer_stability", vectors: { time_preference: 0.85, sentiment_preference: 0.5 } },
      { index: 3, option_key: "blend_old_new", vectors: { time_preference: 0.45, complexity_preference: 0.65 } },
    ],
  },
  {
    question_id: 14,
    question_key: "future_excitement",
    section_key: "future_orientations",
    options: [
      { index: 0, option_key: "tech_advancements", vectors: { complexity_preference: 0.9, time_preference: 0.45, technique_preference: 0.6 } },
      { index: 1, option_key: "social_cultural_shifts", vectors: { sentiment_preference: 0.7, sensory_preference: 0.6 } },
      { index: 2, option_key: "personal_family_milestones", vectors: { sentiment_preference: 0.8, sensory_preference: 0.7 } },
      { index: 3, option_key: "career_educational", vectors: { complexity_preference: 0.8, time_preference: 0.6 } },
    ],
  },
  {
    question_id: 15,
    question_key: "valued_experiences",
    section_key: "future_orientations",
    options: [
      { index: 0, option_key: "adventures_travels", vectors: { sensory_preference: 0.7, time_preference: 0.35 } },
      { index: 1, option_key: "career_academic", vectors: { complexity_preference: 0.8, time_preference: 0.85, technique_preference: 0.45 } },
      { index: 2, option_key: "relationships_connections", vectors: { sentiment_preference: 0.9, sensory_preference: 0.65 } },
      { index: 3, option_key: "growth_realization", vectors: { sentiment_preference: 0.75, complexity_preference: 0.6 } },
    ],
  },
  {
    question_id: 16,
    question_key: "innovation_tradition",
    section_key: "future_orientations",
    options: [
      { index: 0, option_key: "favor_cutting_edge", vectors: { complexity_preference: 0.7, sensory_preference: 0.6, technique_preference: 0.7 } },
      { index: 1, option_key: "tried_true_open", vectors: { complexity_preference: 0.5, time_preference: 0.65 } },
      { index: 2, option_key: "stick_traditional", vectors: { time_preference: 0.8, sentiment_preference: 0.6 } },
      { index: 3, option_key: "blend_both", vectors: { complexity_preference: 0.55, time_preference: 0.5 } },
    ],
  },
  {
    question_id: 17,
    question_key: "satisfying_accomplishment",
    section_key: "future_orientations",
    options: [
      { index: 0, option_key: "fitness_health_goal", vectors: { sentiment_preference: 0.65, technique_preference: 0.6 } },
      { index: 1, option_key: "creative_project", vectors: { sensory_preference: 0.75, technique_preference: 0.7 } },
      { index: 2, option_key: "career_milestone", vectors: { complexity_preference: 0.8, time_preference: 0.85, technique_preference: 0.4 } },
      { index: 3, option_key: "meaningful_relationships", vectors: { sentiment_preference: 0.9, sensory_preference: 0.65 } },
    ],
  },
  {
    question_id: 18,
    question_key: "interest_cultivation",
    section_key: "future_orientations",
    options: [
      { index: 0, option_key: "online_research_virtual", vectors: { complexity_preference: 0.75, time_preference: 0.45, technique_preference: 0.35 } },
      { index: 1, option_key: "classes_workshops", vectors: { complexity_preference: 0.65, technique_preference: 0.75, time_preference: 0.45 } },
      { index: 2, option_key: "travel_real_world", vectors: { sensory_preference: 0.7, time_preference: 0.35 } },
      { index: 3, option_key: "knowledgeable_individuals", vectors: { sentiment_preference: 0.7, complexity_preference: 0.65 } },
    ],
  },
  {
    question_id: 19,
    question_key: "sensory_preference",
    section_key: "future_orientations",
    options: [
      { index: 0, option_key: "visual", vectors: { sensory_preference: 0.65, complexity_preference: 0.45 } },
      { index: 1, option_key: "auditory", vectors: { sensory_preference: 0.7, sentiment_preference: 0.35 } },
      { index: 2, option_key: "tactile", vectors: { sensory_preference: 0.65, technique_preference: 0.45 } },
      { index: 3, option_key: "gustatory_olfactory", vectors: { sensory_preference: 0.65, sentiment_preference: 0.45 } },
    ],
  },
  {
    question_id: 20,
    question_key: "relaxation_style",
    section_key: "future_orientations",
    options: [
      { index: 0, option_key: "quiet_solitary", vectors: { sentiment_preference: 0.4, sensory_preference: 0.5 } },
      { index: 1, option_key: "friends_family", vectors: { sentiment_preference: 0.85, sensory_preference: 0.65 } },
      { index: 2, option_key: "active_sports_outdoor", vectors: { sensory_preference: 0.75, time_preference: 0.4 } },
      { index: 3, option_key: "entertainment_media", vectors: { sentiment_preference: 0.5, sensory_preference: 0.6 } },
    ],
  },
  {
    question_id: 21,
    question_key: "technology_role",
    section_key: "future_orientations",
    options: [
      { index: 0, option_key: "central_to_life", vectors: { complexity_preference: 0.65, technique_preference: 0.65 } },
      { index: 1, option_key: "important_balanced", vectors: { complexity_preference: 0.6, technique_preference: 0.45, time_preference: 0.35 } },
      { index: 2, option_key: "minimal_traditional", vectors: { time_preference: 0.6, sentiment_preference: 0.35 } },
      { index: 3, option_key: "communication_basic", vectors: { technique_preference: 0.35, sentiment_preference: 0.3 } },
    ],
  },
  {
    question_id: 22,
    question_key: "legacy_motivation",
    section_key: "future_orientations",
    options: [
      { index: 0, option_key: "professional_career", vectors: { complexity_preference: 0.8, time_preference: 0.85, technique_preference: 0.35 } },
      { index: 1, option_key: "personal_familial", vectors: { sentiment_preference: 0.85, sensory_preference: 0.6, time_preference: 0.65 } },
      { index: 2, option_key: "creative_artistic", vectors: { sentiment_preference: 0.75, sensory_preference: 0.8 } },
      { index: 3, option_key: "community_social", vectors: { sentiment_preference: 0.82, sensory_preference: 0.6, time_preference: 0.55 } },
    ],
  },
  {
    question_id: 23,
    question_key: "worldview",
    section_key: "future_orientations",
    options: [
      { index: 0, option_key: "optimism_potential", vectors: { sentiment_preference: 0.8, time_preference: 0.35 } },
      { index: 1, option_key: "realism_pragmatism", vectors: { sentiment_preference: 0.5, complexity_preference: 0.7 } },
      { index: 2, option_key: "idealism_better_world", vectors: { sentiment_preference: 0.9, sensory_preference: 0.6 } },
      { index: 3, option_key: "traditionalism_established", vectors: { sentiment_preference: 0.7, time_preference: 0.8 } },
    ],
  },

  // ═══════════════════════════════════════
  // DOMAIN: Sensory Signature (Q24-34)
  // ═══════════════════════════════════════

  {
    question_id: 24,
    question_key: "inspiration_source",
    section_key: "sensory_signature",
    options: [
      { index: 0, option_key: "crafted_object_scene", vectors: { sensory_preference: 0.70, technique_preference: 0.65 } },
      { index: 1, option_key: "moving_storytelling", vectors: { sentiment_preference: 0.80, time_preference: 0.50 } },
      { index: 2, option_key: "captivating_sound", vectors: { sensory_preference: 0.80, sentiment_preference: 0.55 } },
      { index: 3, option_key: "abstract_concept", vectors: { complexity_preference: 0.80, technique_preference: 0.55 } },
    ],
  },
  {
    question_id: 25,
    question_key: "enriching_experience",
    section_key: "sensory_signature",
    options: [
      // Exploring unfamiliar = low-time wandering, moderate sensory
      { index: 0, option_key: "unfamiliar_settings", vectors: { sensory_preference: 0.60, time_preference: 0.30 } },
      // Narrative engagement = sentiment + temporal depth
      { index: 1, option_key: "compelling_narrative", vectors: { sentiment_preference: 0.75, time_preference: 0.50 } },
      // Rhythmic immersion = peak sensory
      { index: 2, option_key: "rhythmic_melodic", vectors: { sensory_preference: 0.85, sentiment_preference: 0.55 } },
      // Visual aesthetics = sensory + compositional complexity
      { index: 3, option_key: "visual_aesthetics", vectors: { sensory_preference: 0.65, complexity_preference: 0.55 } },
    ],
  },
  {
    question_id: 26,
    question_key: "cultural_intrigue",
    section_key: "sensory_signature",
    options: [
      // Art = sensory + technique (craft traditions)
      { index: 0, option_key: "artistic_expressions", vectors: { sensory_preference: 0.65, technique_preference: 0.55 } },
      // Folklore = sentiment + time (tradition, memory)
      { index: 1, option_key: "storytelling_folklore", vectors: { sentiment_preference: 0.75, time_preference: 0.60 } },
      // Music = peak sensory
      { index: 2, option_key: "sounds_music", vectors: { sensory_preference: 0.80, sentiment_preference: 0.50 } },
      // Architecture = complexity + time (heritage, enduring structure)
      { index: 3, option_key: "architectural_heritage", vectors: { complexity_preference: 0.70, time_preference: 0.60 } },
    ],
  },
  {
    question_id: 27,
    question_key: "emotional_resonance",
    section_key: "sensory_signature",
    options: [
      { index: 0, option_key: "breathtaking_visual", vectors: { sensory_preference: 0.70, sentiment_preference: 0.50 } },
      { index: 1, option_key: "gripping_story", vectors: { sentiment_preference: 0.80, time_preference: 0.55 } },
      { index: 2, option_key: "powerful_melody", vectors: { sensory_preference: 0.80, sentiment_preference: 0.65 } },
      { index: 3, option_key: "ingenious_design", vectors: { complexity_preference: 0.75, technique_preference: 0.65 } },
    ],
  },
  {
    question_id: 28,
    question_key: "gathering_activity",
    section_key: "sensory_signature",
    options: [
      // Visual arts at a gathering = sensory + social warmth
      { index: 0, option_key: "visual_arts_photo", vectors: { sensory_preference: 0.65, sentiment_preference: 0.55 } },
      // Writing/theatre = sentiment + narrative time
      { index: 1, option_key: "writing_theatrical", vectors: { sentiment_preference: 0.70, time_preference: 0.45 } },
      // Music/sound = sensory + technique (craft of sound design)
      { index: 2, option_key: "music_sound_design", vectors: { sensory_preference: 0.75, technique_preference: 0.60 } },
      // Architecture = complexity + technique (structural appreciation)
      { index: 3, option_key: "architectural_spatial", vectors: { complexity_preference: 0.70, technique_preference: 0.55 } },
    ],
  },
  {
    question_id: 29,
    question_key: "creative_identity",
    section_key: "sensory_signature",
    options: [
      // Visual identity = sensory + technique (craft of image-making)
      { index: 0, option_key: "visual_arts_photo", vectors: { sensory_preference: 0.70, technique_preference: 0.55 } },
      // Writing identity = sentiment + complexity (language structure)
      { index: 1, option_key: "writing_theatrical", vectors: { sentiment_preference: 0.70, complexity_preference: 0.50 } },
      // Music identity = peak sensory + technique (instrument/composition skill)
      { index: 2, option_key: "music_sound_design", vectors: { sensory_preference: 0.80, technique_preference: 0.60 } },
      // Architecture identity = complexity + technique
      { index: 3, option_key: "architectural_spatial", vectors: { complexity_preference: 0.70, technique_preference: 0.65 } },
    ],
  },
  {
    question_id: 30,
    question_key: "historical_fascination",
    section_key: "sensory_signature",
    options: [
      // Artistic movements = sensory + time (historical continuity)
      { index: 0, option_key: "artistic_movements", vectors: { sensory_preference: 0.60, time_preference: 0.60 } },
      // Legendary narratives = sentiment + time (deep tradition)
      { index: 1, option_key: "legendary_narratives", vectors: { sentiment_preference: 0.70, time_preference: 0.65 } },
      // Music evolution = sensory + complexity (genre as system)
      { index: 2, option_key: "music_genre_evolution", vectors: { sensory_preference: 0.70, complexity_preference: 0.50 } },
      // Architectural eras = complexity + time (structural heritage)
      { index: 3, option_key: "architectural_eras", vectors: { complexity_preference: 0.70, time_preference: 0.65 } },
    ],
  },
  {
    question_id: 31,
    question_key: "style_influence",
    section_key: "sensory_signature",
    options: [
      // Visual trends = sensory + low time (novelty, current)
      { index: 0, option_key: "visual_art_trends", vectors: { sensory_preference: 0.65, time_preference: 0.30 } },
      // Cinema = sentiment + sensory (emotional narrative medium)
      { index: 1, option_key: "cinematic_theatrical", vectors: { sentiment_preference: 0.70, sensory_preference: 0.55 } },
      // Musical icons = sensory + sentiment
      { index: 2, option_key: "musical_styles_icons", vectors: { sensory_preference: 0.75, sentiment_preference: 0.50 } },
      // Design/architecture = complexity + technique (structural thinking)
      { index: 3, option_key: "design_architectural", vectors: { complexity_preference: 0.65, technique_preference: 0.60 } },
    ],
  },
  {
    question_id: 32,
    question_key: "creative_expression",
    section_key: "sensory_signature",
    options: [
      { index: 0, option_key: "visual_art_piece", vectors: { sensory_preference: 0.65, technique_preference: 0.60 } },
      { index: 1, option_key: "written_performed", vectors: { sentiment_preference: 0.75, time_preference: 0.50 } },
      { index: 2, option_key: "musical_composition", vectors: { sensory_preference: 0.75, technique_preference: 0.55 } },
      { index: 3, option_key: "design_structural", vectors: { complexity_preference: 0.75, technique_preference: 0.75 } },
    ],
  },
  {
    question_id: 33,
    question_key: "creative_relaxation",
    section_key: "sensory_signature",
    options: [
      // Viewing art = sensory + moderate complexity (compositional appreciation)
      { index: 0, option_key: "viewing_art_design", vectors: { sensory_preference: 0.60, complexity_preference: 0.45 } },
      // Watching story = sentiment + time (narrative unfolding)
      { index: 1, option_key: "watching_story", vectors: { sentiment_preference: 0.70, time_preference: 0.45 } },
      // Listening/creating music = sensory + technique (active making)
      { index: 2, option_key: "listening_creating_music", vectors: { sensory_preference: 0.80, technique_preference: 0.55 } },
      // Exploring architecture = complexity + technique
      { index: 3, option_key: "exploring_architecture", vectors: { complexity_preference: 0.65, technique_preference: 0.55 } },
    ],
  },
  {
    question_id: 34,
    question_key: "art_role",
    section_key: "sensory_signature",
    options: [
      // Inspiration = sensory + technique (creative spark → making)
      { index: 0, option_key: "inspiration_creativity", vectors: { sensory_preference: 0.65, technique_preference: 0.55 } },
      // Emotional expression = sentiment (core emotional function)
      { index: 1, option_key: "emotional_expression", vectors: { sentiment_preference: 0.85, sensory_preference: 0.45 } },
      // Connection = sentiment + time (relational, communal, enduring)
      { index: 2, option_key: "connect_world", vectors: { sentiment_preference: 0.75, time_preference: 0.50 } },
      // Intellectual stimulation = complexity (pure cognition)
      { index: 3, option_key: "intellectual_stimulation", vectors: { complexity_preference: 0.80, technique_preference: 0.50 } },
    ],
  },
];

// Build a lookup by question_id for O(1) access
export const MAPPING_BY_ID = new Map(
  QUESTION_MAPPINGS.map((m) => [m.question_id, m]),
);
