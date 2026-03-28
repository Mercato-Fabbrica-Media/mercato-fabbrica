import type { ConfidenceState } from "./types";

export const CONFIDENCE_COPY: Record<
  ConfidenceState,
  { emphasis: "strong" | "blended" | "soft"; formatter: (descriptor: string) => string }
> = {
  high_confidence: {
    emphasis: "strong",
    formatter: (descriptor) => descriptor,
  },
  blended_profile: {
    emphasis: "blended",
    formatter: (descriptor) => `${descriptor} with adjacent tendencies`,
  },
  low_separation: {
    emphasis: "soft",
    formatter: () => "Balanced across adjacent archetypal modes",
  },
};

export const GENERIC_CLUSTER_COPY = {
  blended: (primaryTitle: string, secondaryTitles: string[]) =>
    secondaryTitles.length === 0
      ? `Your profile centers on ${primaryTitle.toLowerCase()} tendencies, with nearby archetypal signals still in play.`
      : `Your profile centers on ${primaryTitle.toLowerCase()} tendencies, while also drawing on ${secondaryTitles.join(" and ").toLowerCase()}.`,
  soft: (secondaryTitles: string[]) =>
    secondaryTitles.length === 0
      ? "Your profile moves across adjacent archetypal modes, so presentation should stay open rather than over-claimed."
      : `Your profile moves between ${secondaryTitles.join(", ").toLowerCase()}, so presentation should stay open rather than over-claimed.`,
};

export const CONFIDENCE_INTERPRETATION_PREFIX: Partial<Record<ConfidenceState, string>> = {
  blended_profile: "This is a blended profile.",
  low_separation: "This profile should be presented as a balanced field rather than a fixed identity.",
};
