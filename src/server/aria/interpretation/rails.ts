import { ARCHETYPE_METADATA } from "./metadata";
import type { RecommendationRailInput, RecommendationRailSelection } from "./types";

export function selectRecommendationRails(
  input: RecommendationRailInput,
): RecommendationRailSelection {
  if (!input.primaryArchetype) {
    return {
      labels: [],
      emphasis: null,
    };
  }

  const metadata = ARCHETYPE_METADATA[input.primaryArchetype];

  return {
    labels: metadata.railLabels,
    emphasis: metadata.rationaleMode,
  };
}
