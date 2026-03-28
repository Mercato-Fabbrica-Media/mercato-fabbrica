import type { ArchetypeKey } from "../types";
import { CONFIDENCE_COPY, CONFIDENCE_INTERPRETATION_PREFIX, GENERIC_CLUSTER_COPY } from "./copy";
import { ARCHETYPE_METADATA } from "./metadata";
import type { ProfileRenderInput, ProfileRenderResult } from "./types";

function uniqueSecondary(primary: ArchetypeKey | null, secondary: ArchetypeKey[]): ArchetypeKey[] {
  return secondary.filter((item, index) => item !== primary && secondary.indexOf(item) === index);
}

function buildClusterSummary(
  primary: ArchetypeKey,
  secondary: ArchetypeKey[],
  confidence: ProfileRenderInput["confidence"],
): string | null {
  const primaryMeta = ARCHETYPE_METADATA[primary];
  const preferred = secondary
    .map((id) => primaryMeta.clusterModifiers?.[id])
    .find((value): value is string => Boolean(value));

  if (preferred) {
    return preferred;
  }

  const secondaryTitles = secondary.map((id) => ARCHETYPE_METADATA[id].title);

  if (confidence === "blended_profile") {
    return GENERIC_CLUSTER_COPY.blended(primaryMeta.title, secondaryTitles);
  }

  if (confidence === "low_separation") {
    return GENERIC_CLUSTER_COPY.soft([primaryMeta.title, ...secondaryTitles]);
  }

  return null;
}

export function renderProfile(input: ProfileRenderInput): ProfileRenderResult {
  if (!input.primary) {
    return {
      title: null,
      descriptor: null,
      interpretation: null,
      clusterSummary: null,
      emphasis: "soft",
      railLabels: [],
      rationaleMode: null,
      voiceTraits: [],
      visualTraits: [],
      recommendationEmphasis: [],
    };
  }

  const primaryMeta = ARCHETYPE_METADATA[input.primary];
  const secondary = uniqueSecondary(input.primary, input.secondary);
  const confidenceCopy = CONFIDENCE_COPY[input.confidence];
  const confidencePrefix = CONFIDENCE_INTERPRETATION_PREFIX[input.confidence];
  const clusterSummary = buildClusterSummary(input.primary, secondary, input.confidence);

  return {
    title: primaryMeta.title,
    descriptor: confidenceCopy.formatter(primaryMeta.descriptor),
    interpretation: confidencePrefix
      ? `${confidencePrefix} ${primaryMeta.shortInterpretation}`
      : primaryMeta.shortInterpretation,
    clusterSummary,
    emphasis: confidenceCopy.emphasis,
    railLabels: primaryMeta.railLabels,
    rationaleMode: primaryMeta.rationaleMode,
    voiceTraits: primaryMeta.voiceTraits,
    visualTraits: primaryMeta.visualTraits,
    recommendationEmphasis: primaryMeta.recommendationEmphasis,
  };
}
