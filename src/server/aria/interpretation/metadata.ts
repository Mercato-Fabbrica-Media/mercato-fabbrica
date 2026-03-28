import type { ArchetypeMetadata } from "./types";

export const ARCHETYPE_METADATA: Record<ArchetypeMetadata["id"], ArchetypeMetadata> = {
  alchemist: {
    id: "alchemist",
    title: "Alchemist",
    descriptor: "Agent of Transformation",
    shortInterpretation:
      "You are drawn to transformation, the precise application of technique, timing, and intensity that turns raw material into something newly potent.",
    voiceTraits: ["precise", "layered", "kinetic", "intentional"],
    visualTraits: ["high contrast", "material detail", "process emphasis"],
    recommendationEmphasis: ["transformation", "craft intensity", "process depth"],
    railLabels: ["Transformative Finds", "Process & Fire", "Made Through Precision"],
    rationaleMode: "transformation",
  },
  curator: {
    id: "curator",
    title: "Curator",
    descriptor: "Composer of Atmosphere",
    shortInterpretation:
      "You are guided by coherence, proportion, and the relation between parts. Your taste favors arrangement, sequence, and the intelligence of composition.",
    voiceTraits: ["elegant", "selective", "editorial", "harmonizing"],
    visualTraits: ["pairings", "sequence layouts", "controlled contrast", "compositional whitespace"],
    recommendationEmphasis: ["fit", "relation", "atmosphere", "tonal integrity"],
    railLabels: ["In Good Relation", "Composed for You", "Elements in Balance"],
    rationaleMode: "composition",
    clusterModifiers: {
      archivist:
        "Your profile combines editorial refinement with continuity. You tend to preserve what matters by placing it in good relation.",
      oracle:
        "Your profile blends composition with discernment. You are selective not just in taste, but in the meaning and pattern behind what belongs together.",
    },
  },
  forager: {
    id: "forager",
    title: "Forager",
    descriptor: "Seeker of Living Abundance",
    shortInterpretation:
      "You orient toward discovery through immediacy, seasonality, and the pleasures of encounter. You trust what feels found rather than over-arranged.",
    voiceTraits: ["sensory", "alive", "curious", "seasonal"],
    visualTraits: ["organic groupings", "abundant imagery", "natural textures"],
    recommendationEmphasis: ["seasonality", "wildness", "discovery"],
    railLabels: ["Found in Season", "Wild Pleasures", "Discovered for You"],
    rationaleMode: "discovery",
  },
  mystic: {
    id: "mystic",
    title: "Mystic",
    descriptor: "Keeper of Inner Depth",
    shortInterpretation:
      "You are attuned to feeling, intuition, and contemplation. Your preferences move toward inward resonance, emotional depth, and time-rich meaning.",
    voiceTraits: ["quiet", "intuitive", "depth-seeking", "reflective"],
    visualTraits: ["soft contrast", "atmospheric pacing", "spacious layouts"],
    recommendationEmphasis: ["meaning", "inwardness", "emotional depth"],
    railLabels: ["Quiet Resonances", "Depth & Feeling", "Inner Correspondences"],
    rationaleMode: "intuition",
  },
  provocateur: {
    id: "provocateur",
    title: "Provocateur",
    descriptor: "Instigator of Contrast",
    shortInterpretation:
      "You gravitate toward boldness, tension, and high sensory charge. Your taste favors disruption, vivid contrast, and the experience that refuses complacency.",
    voiceTraits: ["bold", "charged", "sharp", "unpredictable"],
    visualTraits: ["contrast", "edge", "graphic emphasis"],
    recommendationEmphasis: ["contrast", "novelty", "high charge"],
    railLabels: ["At the Edge", "Sharp Contrasts", "Chosen to Disrupt"],
    rationaleMode: "provocation",
  },
  archivist: {
    id: "archivist",
    title: "Archivist",
    descriptor: "Steward of Meaning",
    shortInterpretation:
      "You are drawn to forms that carry memory, structure, and quiet authority. Your preferences favor continuity over novelty, guided by discernment rather than caution.",
    voiceTraits: ["deliberate", "grounded", "precise", "historically aware"],
    visualTraits: ["stable layout", "strong hierarchy", "muted resonance", "provenance detail"],
    recommendationEmphasis: ["continuity", "provenance", "endurance", "trust"],
    railLabels: ["Enduring Forms", "Provenance & Continuity", "What Holds Over Time"],
    rationaleMode: "provenance",
    clusterModifiers: {
      curator:
        "Your profile joins stewardship with editorial refinement. You preserve what matters, but you also know how to place it beautifully in relation.",
      oracle:
        "Your profile joins continuity with discernment. You are drawn to what endures because it carries structure, meaning, and internal coherence.",
      alchemist:
        "There is also a background note of sophistication here: a respect for refinement and process, expressed as care rather than reinvention.",
    },
  },
  oracle: {
    id: "oracle",
    title: "Oracle",
    descriptor: "Reader of Patterns",
    shortInterpretation:
      "You are guided by discernment, essence, and hidden structure. Your taste moves toward clarity, signal, and the forms that reveal themselves slowly.",
    voiceTraits: ["distilled", "incisive", "perceptive", "quiet"],
    visualTraits: ["compressed interface", "symbolic accents", "quiet confidence"],
    recommendationEmphasis: ["signal", "meaning", "conceptual clarity", "hidden logic"],
    railLabels: ["Signals & Correspondences", "Beneath the Surface", "Chosen with Discernment"],
    rationaleMode: "discernment",
    clusterModifiers: {
      archivist:
        "Your profile grounds abstraction in continuity. Insight here is anchored by lineage, trust, and what has proven it can endure.",
      curator:
        "Your profile blends discernment with composition. You look for the exact arrangement where meaning and form become legible together.",
    },
  },
  artisan: {
    id: "artisan",
    title: "Artisan",
    descriptor: "Keeper of Craft",
    shortInterpretation:
      "You are technique-forward and tactile. Your preferences reflect respect for material integrity, process, and the intelligence of skilled making.",
    voiceTraits: ["tactile", "exact", "material", "skilled"],
    visualTraits: ["process detail", "close texture", "tool-and-material emphasis"],
    recommendationEmphasis: ["craft", "material integrity", "process quality"],
    railLabels: ["Made with Integrity", "Material & Method", "Crafted for You"],
    rationaleMode: "craft",
  },
  host: {
    id: "host",
    title: "Host",
    descriptor: "Maker of Welcome",
    shortInterpretation:
      "You orient toward warmth, generosity, and convivial ease. Your taste favors what nourishes relation and creates a sense of welcome.",
    voiceTraits: ["warm", "open", "social", "care-forward"],
    visualTraits: ["generous spacing", "soft warmth", "gathering-oriented layouts"],
    recommendationEmphasis: ["hospitality", "welcome", "relation"],
    railLabels: ["Made to Gather", "For the Table", "Spaces of Welcome"],
    rationaleMode: "warmth",
  },
  wanderer: {
    id: "wanderer",
    title: "Wanderer",
    descriptor: "Seeker of Open Terrain",
    shortInterpretation:
      "You are energized by mobility, novelty, and sensory breadth. Your preferences favor unfamiliar territory, open horizons, and unanchored discovery.",
    voiceTraits: ["restless", "open", "mobile", "exploratory"],
    visualTraits: ["movement", "breadth", "discovery paths"],
    recommendationEmphasis: ["mobility", "novelty", "open-ended exploration"],
    railLabels: ["Open Terrain", "Unexpected Routes", "Move Toward the Unfamiliar"],
    rationaleMode: "exploration",
  },
  sentinel: {
    id: "sentinel",
    title: "Sentinel",
    descriptor: "Keeper of Stability",
    shortInterpretation:
      "You are grounded in steadiness, protection, and nourishment. Your preferences favor sustaining what matters and holding reliable forms in place.",
    voiceTraits: ["steady", "protective", "reliable", "grounded"],
    visualTraits: ["anchored layouts", "quiet density", "supportive structure"],
    recommendationEmphasis: ["stability", "protection", "continuity of care"],
    railLabels: ["What Sustains", "Steady Foundations", "Held with Care"],
    rationaleMode: "protection",
  },
};
