import { describe, it, expect } from "vitest";
import { renderProfile } from "~/server/aria/interpretation/renderProfile";
import { selectRecommendationRails } from "~/server/aria/interpretation/rails";
import { buildRecommendationRationale } from "~/server/aria/interpretation/rationale";
import { ARCHETYPE_METADATA } from "~/server/aria/interpretation/metadata";
import type { ArchetypeKey } from "~/server/aria/types";
import type { ProfileRenderInput, ConfidenceState } from "~/server/aria/interpretation/types";

const ALL_ARCHETYPES = Object.keys(ARCHETYPE_METADATA) as ArchetypeKey[];
const CONFIDENCE_LEVELS: ConfidenceState[] = [
  "high_confidence",
  "blended_profile",
  "low_separation",
];

// ── renderProfile ──────────────────────────────────────────────

describe("renderProfile", () => {
  it("returns null fields when primary is null", () => {
    const result = renderProfile({
      primary: null,
      secondary: [],
      confidence: "high_confidence",
    });
    expect(result.title).toBeNull();
    expect(result.descriptor).toBeNull();
    expect(result.interpretation).toBeNull();
    expect(result.clusterSummary).toBeNull();
    expect(result.emphasis).toBe("soft");
    expect(result.railLabels).toEqual([]);
    expect(result.rationaleMode).toBeNull();
  });

  it.each(ALL_ARCHETYPES)(
    "renders %s with high_confidence — strong identity",
    (archetype) => {
      const result = renderProfile({
        primary: archetype,
        secondary: [],
        confidence: "high_confidence",
      });
      expect(result.title).toBe(ARCHETYPE_METADATA[archetype].title);
      expect(result.descriptor).toBe(ARCHETYPE_METADATA[archetype].descriptor);
      expect(result.emphasis).toBe("strong");
      expect(result.interpretation).toBe(
        ARCHETYPE_METADATA[archetype].shortInterpretation,
      );
      expect(result.railLabels.length).toBeGreaterThan(0);
      expect(result.rationaleMode).toBeTruthy();
    },
  );

  it("blended_profile acknowledges secondary logic", () => {
    const result = renderProfile({
      primary: "curator",
      secondary: ["archivist"],
      confidence: "blended_profile",
    });
    expect(result.emphasis).toBe("blended");
    expect(result.descriptor).toContain("adjacent tendencies");
    expect(result.interpretation).toContain("blended profile");
    // curator has a clusterModifier for archivist
    expect(result.clusterSummary).toBe(
      ARCHETYPE_METADATA.curator.clusterModifiers!.archivist,
    );
  });

  it("low_separation softens identity claims", () => {
    // Use forager+wanderer — no clusterModifiers, so generic soft copy is used
    const result = renderProfile({
      primary: "forager",
      secondary: ["wanderer", "host"],
      confidence: "low_separation",
    });
    expect(result.emphasis).toBe("soft");
    expect(result.descriptor).toBe(
      "Balanced across adjacent archetypal modes",
    );
    expect(result.interpretation).toContain("balanced field");
    expect(result.clusterSummary).toContain("over-claimed");
  });

  it("low_separation with clusterModifier prefers specific copy", () => {
    const result = renderProfile({
      primary: "archivist",
      secondary: ["oracle"],
      confidence: "low_separation",
    });
    expect(result.emphasis).toBe("soft");
    // archivist has a clusterModifier for oracle — should use it even in low_separation
    expect(result.clusterSummary).toBe(
      ARCHETYPE_METADATA.archivist.clusterModifiers!.oracle,
    );
  });

  it("deduplicates secondary archetypes matching primary", () => {
    const result = renderProfile({
      primary: "oracle",
      secondary: ["oracle", "curator"],
      confidence: "blended_profile",
    });
    // clusterSummary should use curator only (oracle filtered out as duplicate of primary)
    expect(result.clusterSummary).toBe(
      ARCHETYPE_METADATA.oracle.clusterModifiers!.curator,
    );
  });

  it("produces deterministic output for identical input", () => {
    const input: ProfileRenderInput = {
      primary: "forager",
      secondary: ["wanderer"],
      confidence: "high_confidence",
    };
    const a = renderProfile(input);
    const b = renderProfile(input);
    expect(a).toEqual(b);
  });
});

// ── selectRecommendationRails ──────────────────────────────────

describe("selectRecommendationRails", () => {
  it("returns empty when primaryArchetype is null", () => {
    const result = selectRecommendationRails({
      primaryArchetype: null,
      confidence: "high_confidence",
    });
    expect(result.labels).toEqual([]);
    expect(result.emphasis).toBeNull();
  });

  it.each(ALL_ARCHETYPES)(
    "%s returns expected rail labels",
    (archetype) => {
      const result = selectRecommendationRails({
        primaryArchetype: archetype,
        confidence: "high_confidence",
      });
      expect(result.labels).toEqual(
        ARCHETYPE_METADATA[archetype].railLabels,
      );
      expect(result.emphasis).toBe(
        ARCHETYPE_METADATA[archetype].rationaleMode,
      );
    },
  );

  it("returns valid rails for blended profiles", () => {
    const result = selectRecommendationRails({
      primaryArchetype: "curator",
      secondaryArchetypes: ["archivist", "oracle"],
      confidence: "blended_profile",
    });
    expect(result.labels.length).toBeGreaterThan(0);
    expect(result.emphasis).toBeTruthy();
  });
});

// ── buildRecommendationRationale ───────────────────────────────

describe("buildRecommendationRationale", () => {
  it("returns null when primaryArchetype is null", () => {
    const result = buildRecommendationRationale({
      primaryArchetype: null,
      confidence: "high_confidence",
    });
    expect(result).toBeNull();
  });

  it("provenance mode stays distinct from composition and discernment", () => {
    const provenance = buildRecommendationRationale({
      primaryArchetype: "archivist",
      confidence: "high_confidence",
      itemName: "Aged Balsamic",
    })!;
    const composition = buildRecommendationRationale({
      primaryArchetype: "curator",
      confidence: "high_confidence",
      itemName: "Aged Balsamic",
    })!;
    const discernment = buildRecommendationRationale({
      primaryArchetype: "oracle",
      confidence: "high_confidence",
      itemName: "Aged Balsamic",
    })!;

    expect(provenance.emphasis).toBe("provenance");
    expect(composition.emphasis).toBe("composition");
    expect(discernment.emphasis).toBe("discernment");

    // Sentences should be distinct
    expect(provenance.sentence).not.toBe(composition.sentence);
    expect(provenance.sentence).not.toBe(discernment.sentence);
    expect(composition.sentence).not.toBe(discernment.sentence);

    // Labels should be distinct
    expect(provenance.shortLabel).not.toBe(composition.shortLabel);
    expect(provenance.shortLabel).not.toBe(discernment.shortLabel);
  });

  it("sparse item data still yields usable copy", () => {
    const result = buildRecommendationRationale({
      primaryArchetype: "host",
      confidence: "high_confidence",
      // no itemName, no attributes
    })!;
    expect(result.sentence).toContain("This recommendation");
    expect(result.sentence).toContain("its overall character");
    expect(result.shortLabel).toBeTruthy();
  });

  it("high_confidence does not soften the sentence", () => {
    const result = buildRecommendationRationale({
      primaryArchetype: "forager",
      confidence: "high_confidence",
      itemName: "Wild Honey",
      attributes: ["terroir", "seasonality"],
    })!;
    expect(result.sentence).not.toContain("may fit");
    expect(result.sentence).not.toContain("strong fit because");
    expect(result.sentence).toMatch(/^Wild Honey/);
  });

  it("blended_profile softens with 'strong fit because'", () => {
    const result = buildRecommendationRationale({
      primaryArchetype: "forager",
      confidence: "blended_profile",
      itemName: "Wild Honey",
    })!;
    expect(result.sentence).toContain("A strong fit because");
  });

  it("low_separation softens with 'may fit'", () => {
    const result = buildRecommendationRationale({
      primaryArchetype: "forager",
      confidence: "low_separation",
      itemName: "Wild Honey",
    })!;
    expect(result.sentence).toContain("One reason it may fit");
  });

  it("joins multiple attributes correctly", () => {
    const result = buildRecommendationRationale({
      primaryArchetype: "artisan",
      confidence: "high_confidence",
      itemName: "Hand-forged Knife",
      attributes: ["steel", "handle", "balance"],
    })!;
    expect(result.sentence).toContain("steel, handle, and balance");
  });

  it("joins two attributes with 'and'", () => {
    const result = buildRecommendationRationale({
      primaryArchetype: "artisan",
      confidence: "high_confidence",
      itemName: "Hand-forged Knife",
      attributes: ["steel", "balance"],
    })!;
    expect(result.sentence).toContain("steel and balance");
  });

  it.each(ALL_ARCHETYPES)(
    "%s produces a rationale with all required fields",
    (archetype) => {
      const result = buildRecommendationRationale({
        primaryArchetype: archetype,
        confidence: "high_confidence",
        itemName: "Test Item",
      })!;
      expect(result).not.toBeNull();
      expect(result.shortLabel).toBeTruthy();
      expect(result.sentence).toBeTruthy();
      expect(result.emphasis).toBeTruthy();
    },
  );
});
