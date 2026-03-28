import { ARCHETYPE_METADATA } from "./metadata";
import type { RecommendationRationale, RecommendationRationaleInput, RationaleMode } from "./types";

const MODE_LABELS: Record<RationaleMode, string> = {
  provenance: "Why it fits",
  composition: "Why it belongs",
  discernment: "Why it resonates",
  transformation: "Why it transforms the whole",
  craft: "Why it is well made",
  warmth: "Why it gathers well",
  exploration: "Why it opens outward",
  protection: "Why it holds steady",
  discovery: "Why it feels found",
  intuition: "Why it feels right",
  provocation: "Why it sharpens the field",
};

function joinAttributes(attributes: string[] | undefined): string {
  if (!attributes || attributes.length === 0) return "its overall character";
  if (attributes.length === 1) return attributes[0]!;
  if (attributes.length === 2) return `${attributes[0]} and ${attributes[1]}`;
  return `${attributes.slice(0, -1).join(", ")}, and ${attributes[attributes.length - 1]}`;
}

function soften(sentence: string, confidence: RecommendationRationaleInput["confidence"]): string {
  if (confidence === "high_confidence") return sentence;
  if (confidence === "blended_profile") return `A strong fit because ${sentence.charAt(0).toLowerCase()}${sentence.slice(1)}`;
  return `One reason it may fit is that ${sentence.charAt(0).toLowerCase()}${sentence.slice(1)}`;
}

function sentenceForMode(
  mode: RationaleMode,
  itemName: string,
  attributePhrase: string,
): string {
  switch (mode) {
    case "provenance":
      return `${itemName} aligns through provenance, continuity, and the quiet authority carried in ${attributePhrase}.`;
    case "composition":
      return `${itemName} fits through balance, relation, and the way ${attributePhrase} comes into good proportion.`;
    case "discernment":
      return `${itemName} fits through signal clarity, interpretive depth, and the hidden logic within ${attributePhrase}.`;
    case "transformation":
      return `${itemName} fits through process intensity, layered making, and the transformative force present in ${attributePhrase}.`;
    case "craft":
      return `${itemName} fits through material integrity, technique, and the care evident in ${attributePhrase}.`;
    case "warmth":
      return `${itemName} fits through welcome, generosity, and the way ${attributePhrase} supports relation.`;
    case "exploration":
      return `${itemName} fits through movement, openness, and the invitation to explore found in ${attributePhrase}.`;
    case "protection":
      return `${itemName} fits through steadiness, support, and the reliable structure carried by ${attributePhrase}.`;
    case "discovery":
      return `${itemName} fits through immediacy, seasonality, and the feeling of discovery carried by ${attributePhrase}.`;
    case "intuition":
      return `${itemName} fits through emotional resonance, inward depth, and the felt meaning of ${attributePhrase}.`;
    case "provocation":
      return `${itemName} fits through contrast, charge, and the disruptive edge carried by ${attributePhrase}.`;
  }
}

export function buildRecommendationRationale(
  input: RecommendationRationaleInput,
): RecommendationRationale | null {
  if (!input.primaryArchetype) return null;

  const metadata = ARCHETYPE_METADATA[input.primaryArchetype];
  const mode = metadata.rationaleMode;
  const itemName = input.itemName ?? "This recommendation";
  const attributePhrase = joinAttributes(input.attributes);

  return {
    shortLabel: MODE_LABELS[mode],
    sentence: soften(sentenceForMode(mode, itemName, attributePhrase), input.confidence),
    emphasis: mode,
  };
}
