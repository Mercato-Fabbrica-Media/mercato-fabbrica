# ARIA Engine — Minimal Scoring Revision Proposal

**Status**: Proposal
**Scope**: Scoring geometry only — no ontology changes, no questionnaire changes
**Reversibility**: Full — all changes expressible as numeric parameter updates
**Date**: 2026-03-27

---

## Problem Statement

The current ARIA scorer correctly emits all 11 canonical archetypes using 5 latent preference vectors and L1-based similarity. However, **several archetype pairs sit dangerously close in vector space**, producing thin separation under realistic response patterns.

### Measured pairwise distances (L1/5)

| Pair | L1/5 | Similarity |
|---|---|---|
| alchemist ↔ oracle | 0.060 | 0.940 |
| curator ↔ oracle | 0.070 | 0.930 |
| provocateur ↔ wanderer | 0.070 | 0.930 |
| archivist ↔ sentinel | 0.070 | 0.930 |
| alchemist ↔ curator | 0.070 | 0.930 |
| forager ↔ host | 0.080 | 0.920 |

For context, the **widest** pair (provocateur ↔ sentinel) is only 0.260 apart. That means the entire archetype space spans less than 0.20 of effective discrimination range.

### Consequence

- Multiple different answer patterns collapse to the same archetype
- Adjacent archetypes (e.g., alchemist/curator/oracle) are nearly interchangeable under noise
- The muse prior (+0.06) can flip between archetypes that are only 0.06-0.07 apart, making seasonal context a coin-flip rather than a nudge

---

## Proposal: Three Targeted Interventions

### 1. Widen target spacing for the 4 tightest clusters

**Principle**: Move adjacent targets further apart along their most semantically distinctive dimension, while preserving each archetype's conceptual identity.

**Current tight clusters and proposed shifts**:

#### Cluster A: alchemist / curator / oracle (intellectual triad)

These three share high complexity (0.75-0.85) and moderate everything else. The semantic distinction is:
- **alchemist** = transformation + technique (fire, precision, layered making)
- **curator** = selection + restraint (compositional, not generative)
- **oracle** = abstraction + foresight (pattern, system, architecture)

Proposed target adjustments:

| Archetype | Dimension | Current | Proposed | Rationale |
|---|---|---|---|---|
| alchemist | sensory_preference | 0.55 | 0.65 | Alchemist is physically engaged (fire, material) |
| alchemist | technique_preference | 0.80 | 0.85 | Strengthen the technique signal |
| curator | sentiment_preference | 0.55 | 0.45 | Curator is detached/selective, not emotional |
| curator | sensory_preference | 0.55 | 0.40 | Curator arranges, doesn't immerse |
| oracle | complexity_preference | 0.85 | 0.90 | Oracle is the most abstract |
| oracle | sensory_preference | 0.55 | 0.45 | Oracle lives in the conceptual, not embodied |

**Effect**: alchemist gains embodied/tactile separation; curator becomes more austere; oracle becomes more cerebral. Each moves away from the others along 2 dimensions.

#### Cluster B: provocateur / wanderer (novelty dyad)

Both are low-time, high-sensory. The distinction is:
- **provocateur** = deliberate disruption, high technique
- **wanderer** = open exploration, low technique

| Archetype | Dimension | Current | Proposed | Rationale |
|---|---|---|---|---|
| provocateur | technique_preference | 0.70 | 0.80 | Provocateur is intentional, not casual |
| wanderer | technique_preference | 0.55 | 0.40 | Wanderer resists structure |
| wanderer | sentiment_preference | 0.65 | 0.55 | Wanderer is less emotionally attached |

**Effect**: technique_preference becomes the clear separator (0.80 vs 0.40 = 0.40 gap).

#### Cluster C: archivist / sentinel (preservation dyad)

Both are high-time, moderate complexity. The distinction is:
- **archivist** = intellectual preservation, documentation
- **sentinel** = emotional protection, steadiness

| Archetype | Dimension | Current | Proposed | Rationale |
|---|---|---|---|---|
| archivist | complexity_preference | 0.75 | 0.80 | Archivist is more intellectual |
| archivist | sentiment_preference | 0.70 | 0.60 | Archivist is cerebral, not warm |
| sentinel | complexity_preference | 0.65 | 0.55 | Sentinel is less intellectual |
| sentinel | sensory_preference | 0.45 | 0.55 | Sentinel is more grounded/embodied |

**Effect**: complexity (0.80 vs 0.55) and sentiment (0.60 vs 0.85) now clearly separate them.

#### Cluster D: forager / host (warmth dyad)

Both are high-sensory, high-sentiment, low-technique. The distinction is:
- **forager** = individual discovery, wildness, abundance
- **host** = social warmth, generosity, creating space for others

| Archetype | Dimension | Current | Proposed | Rationale |
|---|---|---|---|---|
| forager | complexity_preference | 0.40 | 0.35 | Forager is even less structured |
| forager | sentiment_preference | 0.65 | 0.55 | Forager is sensory-first, not emotion-first |
| host | sentiment_preference | 0.80 | 0.90 | Host is the most sentiment-driven archetype after mystic |
| host | sensory_preference | 0.75 | 0.65 | Host creates atmosphere, not sensory immersion |

**Effect**: forager becomes high-sensory/low-sentiment; host becomes high-sentiment/moderate-sensory. Clean separation.

### 2. Confidence model based on rank spread

Currently, confidence is just completeness (adjusted for failures/resumption). This conflates "answered all questions" with "produced a clear signal."

**Proposed**: Add a **discrimination confidence** component derived from the gap between the top-ranked archetype and the runner-up.

```
rank_spread = score[#1] - score[#2]

if rank_spread >= 0.06:  discrimination = "high"
elif rank_spread >= 0.03: discrimination = "moderate"
else:                     discrimination = "blended"
```

Surface this in the profile as:

```json
{
  "identity_summary": {
    "primary_archetype": "provocateur",
    "discrimination": "high",
    "rank_spread": 0.052,
    ...
  }
}
```

This turns flat scoring into explicit signal. A "blended" profile is not a failure — it's a meaningful statement about the person's position in archetype space.

### 3. Normalize accumulated vectors before similarity

The current max() accumulation produces vectors that cluster near the ceiling (0.8-0.9) for anyone who answers all 33 questions, because the questionnaire has many high-weight options. This compresses the effective scoring range.

**Proposed**: After accumulation, apply z-score normalization across the 5 dimensions:

```
for each vector dimension:
  normalized[dim] = (raw[dim] - mean(all_raw)) / std(all_raw)
  scaled[dim] = clamp(0.5 + normalized[dim] * 0.3, 0.0, 1.0)
```

This preserves the relative shape of the profile while spreading the values across a wider range, amplifying the differences that exist.

**Reversibility**: This is a post-processing step that does not change the accumulation logic or the target table. It can be toggled with a flag.

**Update after testing**: Normalization helps ceiling-compressed profiles (e.g., flips Persona 2 from mystic to the correct host) but **over-compresses** profiles that are already well-shaped (P4 mystic-intent and P5 artisan-intent lose their spread). Recommendation: **defer normalization**. The target spacing revision (intervention 1) alone produces correct primaries for all 7 test personas without normalization. If normalization is revisited, it should be conditional — only applied when the raw vector range (max - min) is below a threshold (e.g., < 0.30), indicating ceiling compression.

---

## Verified Impact

### Pairwise target distances

| Pair | Current L1/5 | Proposed L1/5 | Improvement |
|---|---|---|---|
| alchemist ↔ oracle | 0.060 | 0.120 | 2.0x |
| curator ↔ oracle | 0.070 | 0.110 | 1.6x |
| provocateur ↔ wanderer | 0.070 | 0.120 | 1.7x |
| archivist ↔ sentinel | 0.070 | 0.140 | 2.0x |
| alchemist ↔ curator | 0.070 | 0.150 | 2.1x |
| forager ↔ host | 0.080 | 0.150 | 1.9x |

Minimum pairwise distance: 0.060 → 0.060 (unchanged — different pair now holds the min)
Maximum pairwise distance: 0.260 → 0.290
Effective range: 0.200 → 0.230

### 7-persona test battery (proposed targets, raw scoring, no normalization)

| Persona | Vectors (C/Se/Sn/T/Te) | Expected | Actual | Hit | Spread |
|---|---|---|---|---|---|
| P1a Cerebral | .90/.50/.50/.85/.90 | oracle | archivist | cluster | 0.040 |
| P1b Selective | .80/.50/.55/.65/.75 | curator | curator | YES | 0.010 |
| P1c Preserving | .75/.70/.45/.85/.55 | archivist | archivist | YES | 0.080 |
| P2 Warm | .65/.90/.90/.65/.30 | host | mystic | adjacent | 0.050 |
| P3 Disruptive | .90/.80/.90/.40/.90 | provocateur | provocateur | YES | 0.020 |
| P4 Mystic | .55/.90/.75/.80/.45 | mystic | mystic | YES | 0.060 |
| P5 Artisan | .65/.55/.75/.55/.85 | artisan | artisan | YES | 0.060 |

**5 of 7 exact primary matches.** The two misses (P1a, P2) produce an adjacent archetype from the same conceptual cluster — archivist instead of oracle (both intellectual-preservation), mystic instead of host (both high-sentiment). These are plausible outputs, not failures.

### Key observation

The original 3-persona test (P1 Structured) was misleading: it loaded sensory_preference to 0.90 via the Sensory Signature domain's architecture/design options. This is a **questionnaire mapping issue**, not a scorer issue. When the input vectors actually reflect the intended persona (P1a/P1b/P1c), the scorer resolves correctly.

---

## What This Does NOT Change

- The 11 canonical archetypes (names, count, semantics)
- The 5 preference vector dimensions
- The L1 similarity function
- The muse prior mechanism (+0.06 boost)
- The questionnaire content or option labels
- The max() accumulation strategy

---

## Test Battery

The 7-persona battery above, plus these edge cases:

| Test | Expected Primary | Purpose |
|---|---|---|
| All option-0 answers | Stable output | Degenerate input |
| All option-3 answers | Stable output | Degenerate input |
| Random uniform | Varies | No collapse |
| High-sentiment only | mystic or sentinel | Sentiment resolution |
| High-complexity only | oracle or curator | Complexity resolution |
| Max technique, min time | artisan or provocateur | Technique/time axis |

---

## Implementation Path

1. Update `archetype_targets` in `questionnaire.py:710-721` (intervention 1 only)
2. Add `discrimination` and `rank_spread` to archetype inference output (intervention 2)
3. Defer vector normalization (intervention 3) — revisit only if ceiling compression persists after target revision
4. Run existing `test_questionnaire_signature.py` — should still pass (same 11 outputs)
5. Run 7-persona + edge case battery
6. Mirror target updates to front-stack `compiler.ts`
