import type { ArchetypeKey, AriaProfile } from "../types";

export type ConfidenceState = AriaProfile["identity_summary"]["discrimination"];

export type RationaleMode =
  | "provenance"
  | "composition"
  | "discernment"
  | "transformation"
  | "craft"
  | "warmth"
  | "exploration"
  | "protection"
  | "discovery"
  | "intuition"
  | "provocation";

export interface ArchetypeMetadata {
  id: ArchetypeKey;
  title: string;
  descriptor: string;
  shortInterpretation: string;
  voiceTraits: string[];
  visualTraits: string[];
  recommendationEmphasis: string[];
  railLabels: string[];
  rationaleMode: RationaleMode;
  clusterModifiers?: Partial<Record<ArchetypeKey, string>>;
}

export interface ProfileRenderInput {
  primary: ArchetypeKey | null;
  secondary: ArchetypeKey[];
  confidence: ConfidenceState;
}

export interface ProfileRenderResult {
  title: string | null;
  descriptor: string | null;
  interpretation: string | null;
  clusterSummary: string | null;
  emphasis: "strong" | "blended" | "soft";
  railLabels: string[];
  rationaleMode: RationaleMode | null;
  voiceTraits: string[];
  visualTraits: string[];
  recommendationEmphasis: string[];
}

export interface RecommendationRationaleInput {
  primaryArchetype: ArchetypeKey | null;
  secondaryArchetypes?: ArchetypeKey[];
  confidence: ConfidenceState;
  itemName?: string;
  attributes?: string[];
}

export interface RecommendationRationale {
  shortLabel: string;
  sentence: string;
  emphasis: RationaleMode;
}

export interface RecommendationRailInput {
  primaryArchetype: ArchetypeKey | null;
  secondaryArchetypes?: ArchetypeKey[];
  confidence: ConfidenceState;
}

export interface RecommendationRailSelection {
  labels: string[];
  emphasis: RationaleMode | null;
}
