# ECQ Interpretation Layer Spec

## Purpose

This layer translates calibrated ECQ outputs into user-facing expression without altering scoring or questionnaire mappings.

It answers:
- how an archetype should sound
- how it should look
- how it should prioritize recommendations
- how mixed clusters should be interpreted
- how confidence states should modulate presentation

## Non-Negotiable Constraints

- Do not modify `Scorer v2`
- Do not remap questionnaire semantics here
- Do not use interpretation logic to "correct" archetype outcomes
- Interpretation is a presentation and orchestration layer, not a scoring layer
- Archetype outputs must remain traceable to canonical ECQ results

## Core Distinction

These three archetypes are adjacent, but not interchangeable.

### Archivist

- Mode: Stewardship
- Primary logic: continuity, memory, lineage, preservation, transmission
- User reads as: thoughtful, grounded, structured, careful, enduring

### Curator

- Mode: Composition
- Primary logic: arrangement, harmony, proportion, relation, editorial coherence
- User reads as: refined, selective, aesthetic, balanced, intentional

### Oracle

- Mode: Discernment
- Primary logic: pattern recognition, abstraction, essence, judgment, interpretive clarity
- User reads as: perceptive, inward, exacting, symbolic, incisive

## UI Rendering Model

Each archetype should express across five surfaces:

1. Title
2. Descriptor line
3. Voice / copy tone
4. Visual language
5. Recommendation weighting behavior

## Canonical Archetype Rendering Rules

### Archivist

#### Title

Archivist

#### Descriptor Line

Use language like:
- Keeper of Continuity
- Steward of Meaning
- Guardian of Lineage
- The One Who Retains What Matters

Do not use:
- dusty
- academic
- nostalgic
- collector, unless highly controlled

#### Voice / Copy Tone

Archivist copy should feel:
- deliberate
- grounded
- precise
- historically aware
- calm, not static
- custodial rather than inventive

Underlying feeling:

> What deserves to endure?

#### UI Copy Patterns

Intro line examples:
- You are guided by continuity, structure, and the preservation of meaning.
- You tend to trust what has depth, lineage, and the ability to endure.
- Your taste favors what is kept with care, not merely made for novelty.

Decision framing examples:
- You gravitate toward systems that hold memory.
- You prefer substance over spectacle.
- You respond to refinement that carries time within it.

Recommendation rationale examples:
- Chosen for its provenance, longevity, and quiet authority.
- Recommended for its continuity of craft and cultural memory.
- Selected because it preserves distinct character rather than chasing novelty.

#### Visual Language

Archivist should render with:
- stable layout
- strong hierarchy
- generous margins
- structured modules
- muted but resonant palette
- emphasis on provenance, notes, lineage, dates, and sources

Mood references:
- archive table
- collector's ledger
- quiet library of taste
- living record, not museum stiffness

#### Recommendation Behavior

Archivist users should receive stronger weighting toward:
- provenance-rich products
- heritage goods
- regional specificity
- seasonal continuity
- structured editorial collections
- ritualized, repeatable experiences
- trusted makers and enduring forms

Archivist recommendations should favor:
- depth over novelty
- stewardship over disruption
- memory over surprise
- continuity over volatility

#### Avoid

Do not render Archivist as:
- old-fashioned by default
- anti-experimental
- purely historical
- bureaucratic or dry

Archivist is not backward-looking.
Archivist is continuity-bearing.

### Curator

#### Title

Curator

#### Descriptor Line

Use language like:
- Composer of Atmosphere
- Editor of Relations
- Keeper of Proportion
- Arranger of the Essential

Do not use:
- shopper
- stylist alone
- tastemaker in a trendy sense

#### Voice / Copy Tone

Curator copy should feel:
- elegant
- selective
- relational
- harmonizing
- aesthetic but not ornamental
- poised and editorial

Underlying feeling:

> What belongs together?

#### UI Copy Patterns

Intro line examples:
- You are guided by coherence, proportion, and the relation between parts.
- You seek balance, not excess.
- Your taste is shaped by sequence, atmosphere, and the intelligence of arrangement.

Decision framing examples:
- You notice how elements speak to one another.
- You prefer the precisely placed over the merely abundant.
- You respond to composition, pacing, and tonal clarity.

Recommendation rationale examples:
- Chosen for how beautifully it integrates into a larger whole.
- Recommended for its balance, proportion, and tonal fit.
- Selected because it completes a constellation rather than standing alone.

#### Visual Language

Curator should render with:
- elegant grouping
- pairings and sets
- relational tiles
- sequence-based layouts
- compositional whitespace
- controlled contrast
- visual emphasis on harmony between items

Mood references:
- salon wall
- editorial spread
- perfectly set table
- proportion, sequencing, dialogue

#### Recommendation Behavior

Curator users should receive stronger weighting toward:
- coordinated sets
- bundles with internal logic
- editorial lists
- "complete the table / ritual / experience" suggestions
- aesthetic and sensory harmony
- cross-category composition
- recommendations that improve the whole environment

Curator recommendations should favor:
- fit
- relation
- pacing
- atmosphere
- tonal integrity

#### Avoid

Do not render Curator as:
- merely fashionable
- trend-led
- superficial
- generic luxury language

Curator is not style for style's sake.
Curator is editorial intelligence in arrangement.

### Oracle

#### Title

Oracle

#### Descriptor Line

Use language like:
- Reader of Patterns
- Keeper of Insight
- Seer of Essential Form
- Interpreter of Hidden Order

Do not use:
- mystical fluff by default
- fortune language
- vague spiritual language unless product context explicitly supports it

#### Voice / Copy Tone

Oracle copy should feel:
- distilled
- incisive
- quiet
- perceptive
- symbolic
- exact without becoming cold

Underlying feeling:

> What is the underlying pattern here?

#### UI Copy Patterns

Intro line examples:
- You are guided by discernment, essence, and hidden structure.
- You tend to seek the principle beneath the surface.
- Your taste moves toward clarity, meaning, and the forms that reveal themselves slowly.

Decision framing examples:
- You notice what is implied, not only what is shown.
- You prefer depth of significance over immediate display.
- You respond to signals of coherence, symbolism, and internal truth.

Recommendation rationale examples:
- Chosen for its depth, signal clarity, and interpretive resonance.
- Recommended because it reveals more the longer it is engaged.
- Selected for its underlying structure, not just its surface appeal.

#### Visual Language

Oracle should render with:
- distilled interface language
- fewer but more meaningful elements
- symbolic accenting
- elegant compression
- strong emphasis on insight, pattern, and thematic thread
- quiet visual confidence

Mood references:
- annotated diagram
- celestial chart
- symbolic folio
- philosophical minimalism with depth

#### Recommendation Behavior

Oracle users should receive stronger weighting toward:
- conceptually strong products
- symbolically resonant stories
- editorial depth pieces
- interpretive content
- items with layered meaning
- less noise, more signal
- fewer recommendations, but more exact recommendations

Oracle recommendations should favor:
- essence
- hidden logic
- symbolic congruence
- interpretive richness
- conceptual clarity

#### Avoid

Do not render Oracle as:
- fantasy language
- pure mysticism
- occult excess
- cold abstraction detached from material life

Oracle is not vague spirituality.
Oracle is discernment made elegant.

## Cluster Interpretation Rules

Treat the primary archetype as the governing mode and the secondaries as tonal modifiers.

### Archivist Primary + Curator Secondary

Reads as:
- preservation with elegance
- continuity through composition
- stewardship with editorial refinement

UI effect:
- structured recommendations with beautiful relational grouping
- strong provenance plus pairing logic
- enduring collections

### Archivist Primary + Oracle Secondary

Reads as:
- principled preservation
- discernment in service of continuity
- memory with interpretive depth

UI effect:
- recommendation rationale should stress meaning, lineage, and internal coherence
- slightly more distilled than decorative
- strong trust, signal clarity, and symbolic richness

This is likely close to the current calibrated P1.

### Curator Primary + Oracle Secondary

Reads as:
- aesthetic composition guided by insight
- elegance with strong judgment
- relational intelligence with conceptual sharpness

UI effect:
- refined bundles, highly selective recommendations
- fewer, better combinations
- more exact tonal matching

### Oracle Primary + Archivist Secondary

Reads as:
- pattern discernment rooted in continuity
- interpretive depth without drift
- abstraction anchored by lasting forms

UI effect:
- highly distilled recommendations with strong provenance and meaning
- reduced volume, increased clarity

## Confidence-State Behavior

The interpretation layer must respect confidence model outputs.

### `high_confidence`

Behavior:
- archetype-forward rendering is allowed
- strong title and descriptor
- clear recommendation posture
- less hedging in copy

Example:
- Archivist - Steward of Meaning

### `blended_profile`

Behavior:
- render primary archetype, but visibly acknowledge secondary logic
- avoid overclaiming singular identity
- recommendations should span the cluster intelligently

Example:
- Archivist with Curatorial and Oracular tendencies
- You preserve what matters, but with strong discernment and compositional care.

### `low_separation`

Behavior:
- do not over-dramatize a single archetype
- present as a balanced field
- use softer identity language
- recommendation system should widen, not narrow

Example:
- Your profile moves between stewardship, composition, and interpretation.
- You tend to respond to continuity, balance, and meaning in equal measure.

## Recommendation Translation Rules

### Archivist

Recommendation modules should privilege:
- provenance metadata
- legacy makers
- continuity-based editorial stories
- seasonal recurrence
- repeat-purchase rituals
- archival collections
- slower discovery paths

### Curator

Recommendation modules should privilege:
- bundling logic
- pairings
- sequence-aware presentation
- occasion-building
- cross-category relation
- aesthetic cohesion
- scene composition

### Oracle

Recommendation modules should privilege:
- depth essays
- symbolic correspondences
- strong signal-to-noise filtering
- fewer but more exact suggestions
- thematic pathways
- hidden affinities
- concept-led discovery

## UI Component Guidance

Recommended component families:

### Archetype Card

Contains:
- title
- descriptor
- one-paragraph interpretation
- cluster indicators
- confidence presentation

### Why This Was Chosen

A rationale module that varies by archetype:
- Archivist: provenance / continuity / trust / lineage
- Curator: relation / harmony / fit / sequence
- Oracle: pattern / meaning / internal logic / signal

### Recommendation Rails

Different rail labels by archetype:

Archivist:
- Enduring Forms
- Provenance & Continuity
- What Holds Over Time

Curator:
- In Good Relation
- Composed for You
- Elements in Balance

Oracle:
- Signals & Correspondences
- Beneath the Surface
- Chosen with Discernment

### Editorial Overlay Language

Each product or content object can expose different metadata emphasis:
- Archivist sees origin, date, lineage, and process continuity
- Curator sees pairing, fit, placement, and sequence
- Oracle sees meaning, pattern, and symbolic or thematic relevance

## Product-Level Guidance for Current P1

Given the current validated P1 result:
- Primary: `archivist`
- Secondary cluster: `alchemist`, `oracle`

Interpretation guidance:

Do not suppress `alchemist` completely in language generation.
It should remain a background note of sophistication, but not the dominant identity.

P1 should render as Archivist-forward with:
- Oracular discernment
- a faint residual transformative intelligence, expressed as refinement rather than reinvention

Preferred tone:
- structured
- long-horizon
- exacting
- meaningful
- not static
- not trendy
- not overtly maker-centric

Recommended descriptor set for current P1:
- Steward of Meaning
- Guided by Continuity and Discernment
- A Keeper of What Endures

Short interpretation copy:

> You are drawn to forms that carry memory, structure, and quiet authority. Your preferences favor continuity over novelty, but not out of caution, out of discernment. You tend to recognize what deserves to be preserved, arranged, and carried forward.

## Implementation Boundary

This interpretation layer should live as:
- archetype metadata definitions
- UI copy dictionaries
- recommendation explanation templates
- cluster rendering rules
- confidence-state presentation rules

It should not live inside:
- scorer
- vector math
- questionnaire mappings

## Recommended Next Artifact

This document is the checkpoint artifact for the interpretation layer.

Recommended next implementation surfaces:

1. archetype metadata object in application code
2. copy dictionary for descriptor and rationale variants
3. confidence-aware rendering rules in profile UI
4. recommendation rail taxonomy aligned to archetype mode

## Directive

Do not modify the scoring system.
Do not perform additional global remapping.
All future changes should occur above the calibration layer.
