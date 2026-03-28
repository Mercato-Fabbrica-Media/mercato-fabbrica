/**
 * E2E compiler validation — 3 deliberate test personas
 * Run: npx tsx scripts/test-compiler.ts
 */

import { compileProfile } from "../src/server/aria/compiler";
import { QUESTION_MAPPINGS } from "../src/server/aria/mappings";
import type { QuestionnaireCompletedPayload } from "../src/server/aria/types";

// All 33 question IDs in order
const ALL_QS = QUESTION_MAPPINGS.map((m) => m.question_id);

function buildPayload(
  accountId: number,
  optionChoices: number[], // one index per question (0-3)
): QuestionnaireCompletedPayload {
  const responses = ALL_QS.map((qId, i) => ({
    question_id: qId,
    question_key: QUESTION_MAPPINGS[i]!.question_key,
    section_key: QUESTION_MAPPINGS[i]!.section_key,
    response_type: "single_select" as const,
    value: `option_${optionChoices[i]}`,
    option_index: optionChoices[i]!,
    option_key: QUESTION_MAPPINGS[i]!.options[optionChoices[i]!]?.option_key ?? null,
  }));

  return {
    event_type: "questionnaire.completed",
    payload_version: "1.0",
    source: {
      application: "joyous_living",
      environment: "development",
      questionnaire_version: "1.0",
      completed_at: new Date().toISOString(),
    },
    account: { account_id: accountId },
    questionnaire: {
      questionnaire_id: "enigmatic_choices",
      total_questions: 33,
      completed_questions: 33,
      completion_status: "completed",
    },
    responses,
    behavioral_summary: {
      total_time_ms: 300000,
      average_time_per_question_ms: 9000,
      resumed_session: false,
      response_save_failures: 0,
    },
  };
}

// ═══════════════════════════════════════════
// PERSONA 1: Structured / Refined / Complex
// Should lean: curator, archivist, oracle
// Strategy: pick options heavy on complexity_preference, time_preference, technique_preference
// ═══════════════════════════════════════════
const persona1Choices = [
  // Lifestyle Dynamics (Q1-11)
  2, // brand/reputation → complexity+technique
  0, // new hobby/skill → complexity+technique
  1, // new trends/tech → complexity+technique
  1, // quality/durability → complexity+technique
  2, // timeless preference → time+sentiment
  0, // educational/skill → complexity+technique
  0, // personal/professional dev → complexity+technique
  0, // personal research → complexity+technique
  0, // learning/education → complexity+technique
  3, // workshops/talks → complexity+technique
  3, // technology/innovation → complexity+technique
  // Future Orientations (Q13-23)
  1, // adapt gradually → time+complexity
  0, // tech advancements → complexity+technique
  1, // career/academic → complexity+technique
  0, // cutting edge → complexity+technique
  2, // career milestone → complexity+technique
  0, // online research → complexity+technique
  3, // gustatory/olfactory → sensory (only sensory Q)
  0, // quiet solitary → low vectors
  0, // central to life → complexity+technique
  0, // professional/career → complexity+technique
  1, // realism/pragmatism → complexity
  // Sensory Signature (Q24-34)
  3, // abstract concept → complexity
  3, // visual aesthetics → sensory
  3, // architectural heritage → complexity+sensory
  3, // ingenious design → complexity+sensory
  3, // architectural/spatial → complexity+sensory
  3, // architectural/spatial → complexity+sensory
  3, // architectural eras → complexity+sensory
  3, // design/architectural → complexity+sensory
  3, // design/structural → complexity+technique
  3, // exploring architecture → complexity+sensory
  3, // intellectual stimulation → complexity
];

// ═══════════════════════════════════════════
// PERSONA 2: Sensory / Warm / Relational
// Should lean: host, forager, artisan
// Strategy: pick options heavy on sentiment_preference, sensory_preference
// ═══════════════════════════════════════════
const persona2Choices = [
  // Lifestyle Dynamics (Q1-11)
  3, // ethical/environmental → sentiment+sensory
  2, // gourmet meal → sentiment+sensory
  3, // socializing/events → sentiment+sensory
  0, // sustainability → sentiment+sensory
  3, // blended modern/classic → complexity+time (mild)
  1, // lifestyle/wellness → sentiment+sensory
  2, // relationships/social → sentiment+sensory
  1, // friends/family recs → sentiment+sensory
  3, // mental/emotional → sentiment+sensory
  0, // volunteering → sentiment+sensory
  2, // culinary experiences → sensory+sentiment
  // Future Orientations (Q13-23)
  3, // blend old/new → mild
  2, // personal/family milestones → sentiment+sensory
  2, // relationships/connections → sentiment+sensory
  1, // tried-true-open → time+complexity mild
  3, // meaningful relationships → sentiment+sensory
  3, // knowledgeable individuals → sentiment+complexity
  3, // gustatory/olfactory → high sensory
  1, // friends/family → sentiment+sensory
  2, // minimal/traditional → low complexity
  1, // personal/familial → sentiment+sensory
  2, // idealism → sentiment+sensory
  // Sensory Signature (Q24-34)
  0, // crafted object → sentiment+sensory
  2, // rhythmic/melodic → sensory+sentiment
  1, // storytelling/folklore → sentiment+sensory
  1, // gripping story → sentiment+sensory
  2, // music/sound design → sensory+sentiment
  1, // writing/theatrical → sentiment+sensory
  1, // legendary narratives → sentiment+sensory
  1, // cinematic/theatrical → sentiment+sensory
  0, // visual art piece → sentiment+sensory
  2, // listening/creating music → sensory+sentiment
  1, // emotional expression → sentiment+sensory
];

// ═══════════════════════════════════════════
// PERSONA 3: Disruptive / Exploratory / Novelty
// Should lean: provocateur, wanderer, alchemist
// Strategy: pick options that maximize sensory but minimize time, plus high technique
// ═══════════════════════════════════════════
const persona3Choices = [
  // Lifestyle Dynamics (Q1-11)
  1, // aesthetic appeal → sentiment+sensory
  1, // luxury item → sentiment+sensory
  0, // creative/physical → complexity+technique
  3, // cultural/artistic → sentiment+sensory
  0, // early explorer → complexity+low time
  3, // entertainment/humor → sentiment+sensory
  3, // leisure/travel → sensory+low time
  3, // intuition/spontaneous → sentiment+low time
  2, // grooming/presentation → sensory+sentiment
  1, // local events/clubs → sentiment+sensory
  0, // arts/culture → sensory+sentiment
  // Future Orientations (Q13-23)
  0, // embrace enthusiastically → low time+complexity
  1, // social/cultural shifts → sentiment+sensory
  0, // adventures/travels → sensory+low time
  0, // cutting edge → complexity+technique
  1, // creative project → sensory+technique
  2, // travel/real world → sensory+low time
  0, // visual → sensory
  2, // active/sports/outdoor → sensory+low time
  0, // central to life → complexity+technique
  2, // creative/artistic → sentiment+sensory
  0, // optimism/potential → sentiment+low time
  // Sensory Signature (Q24-34)
  2, // captivating sound → sentiment+sensory
  0, // unfamiliar settings → sensory+sentiment
  0, // artistic expressions → sensory+sentiment
  0, // breathtaking visual → sensory+sentiment
  0, // visual arts/photo → sensory+sentiment
  0, // visual arts/photo → sensory+sentiment
  0, // artistic movements → sensory+sentiment
  2, // musical styles → sensory+sentiment
  2, // musical composition → sentiment+sensory
  2, // listening/creating → sensory+sentiment
  0, // inspiration/creativity → sentiment+sensory
];

// ═══════════════════════════════════════════
// RUN
// ═══════════════════════════════════════════

const personas = [
  { name: "Persona 1 — Structured / Refined / Complex", choices: persona1Choices, accountId: 9001, expected: ["curator", "archivist", "oracle"] },
  { name: "Persona 2 — Sensory / Warm / Relational", choices: persona2Choices, accountId: 9002, expected: ["host", "forager", "artisan"] },
  { name: "Persona 3 — Disruptive / Exploratory / Novelty", choices: persona3Choices, accountId: 9003, expected: ["provocateur", "wanderer", "alchemist"] },
];

for (const p of personas) {
  const payload = buildPayload(p.accountId, p.choices);
  const profile = compileProfile(payload);

  const sortedScores = Object.entries(profile.archetype_scores)
    .sort((a, b) => b[1] - a[1]);

  console.log(`\n${"═".repeat(60)}`);
  console.log(`${p.name}`);
  console.log(`${"═".repeat(60)}`);
  console.log(`Expected top 3: ${p.expected.join(", ")}`);
  console.log(`\nPrimary:   ${profile.identity_summary.primary_archetype}`);
  console.log(`Secondary: ${profile.identity_summary.secondary_archetype}`);
  console.log(`Tertiary:  ${profile.identity_summary.tertiary_archetype}`);
  console.log(`\nPreference Vectors:`);
  for (const [k, v] of Object.entries(profile.preference_vectors)) {
    const bar = "█".repeat(Math.round(v * 30));
    console.log(`  ${k.padEnd(25)} ${v.toFixed(3)}  ${bar}`);
  }
  console.log(`\nAll 11 Archetype Scores (ranked):`);
  for (const [key, score] of sortedScores) {
    const bar = "█".repeat(Math.round(score * 30));
    const marker = p.expected.includes(key) ? " ◄ expected" : "";
    console.log(`  ${key.padEnd(14)} ${score.toFixed(3)}  ${bar}${marker}`);
  }
  console.log(`\nConfidence: ${profile.identity_summary.confidence_score}`);
  console.log(`Completeness: ${profile.identity_summary.completeness_score}`);
  console.log(`Discrimination: ${profile.identity_summary.discrimination}`);
  console.log(`Rank Spread: ${profile.identity_summary.rank_spread}`);

  // Check: did the primary land in expected?
  const primary = profile.identity_summary.primary_archetype;
  const hit = primary && p.expected.includes(primary);
  console.log(`\n${hit ? "✅ PRIMARY MATCHES EXPECTATION" : "⚠️  PRIMARY DOES NOT MATCH EXPECTATION"}`);

  // Check spread between #1 and #4
  const spread = sortedScores[0]![1] - sortedScores[3]![1];
  console.log(`Score spread (1st - 4th): ${spread.toFixed(3)} ${spread < 0.02 ? "⚠️  FLAT — weak discrimination" : "✅ Good separation"}`);
}
