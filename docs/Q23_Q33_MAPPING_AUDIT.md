# Q23-Q33 Sensory Signature — Mapping Audit

**Purpose**: Identify compression in sensory_preference that prevents discrimination of cerebral/ordered personas from sensory/craft personas.

**Legend**: C = complexity, Se = sentiment, Sn = sensory, T = time, Te = technique. Values shown only where non-zero.

---

## Current Weights

### Q23 (DB 24) — inspiration_source
*"When seeking inspiration, which of these are you most likely to turn to?"*

| # | Option | C | Se | Sn | T | Te | Flag |
|---|---|---|---|---|---|---|---|
| 0 | crafted_object_scene | — | 0.70 | **0.80** | — | — | Sn+Se only |
| 1 | moving_storytelling | — | **0.80** | 0.70 | — | — | Sn+Se only |
| 2 | captivating_sound | — | 0.70 | **0.80** | — | — | Sn+Se only |
| 3 | abstract_concept | **0.80** | 0.60 | — | — | — | Only option with non-Sn signal |

**Diagnosis**: 3 of 4 options load Sn 0.70-0.80 + Se 0.70-0.80. Only option 3 escapes. No Te, no T signal at all.

---

### Q24 (DB 25) — enriching_experience
*"In your downtime, what type of experience do you find most enriching?"*

| # | Option | C | Se | Sn | T | Te | Flag |
|---|---|---|---|---|---|---|---|
| 0 | unfamiliar_settings | — | 0.65 | 0.65 | — | — | Sn+Se only |
| 1 | compelling_narrative | — | **0.75** | 0.70 | — | — | Sn+Se only |
| 2 | rhythmic_melodic | — | 0.70 | **0.85** | — | — | Sn+Se only |
| 3 | visual_aesthetics | — | 0.60 | **0.80** | — | — | Sn+Se only |

**Diagnosis**: ALL 4 options load Sn 0.65-0.85 + Se 0.60-0.75. Zero signal on C, T, Te. Complete compression.

---

### Q25 (DB 26) — cultural_intrigue
*"What aspect of a new culture do you find most intriguing to explore?"*

| # | Option | C | Se | Sn | T | Te | Flag |
|---|---|---|---|---|---|---|---|
| 0 | artistic_expressions | — | 0.65 | **0.75** | — | — | Sn+Se only |
| 1 | storytelling_folklore | — | **0.75** | 0.65 | — | — | Se+Sn only |
| 2 | sounds_music | — | 0.60 | **0.80** | — | — | Sn+Se only |
| 3 | architectural_heritage | **0.70** | — | 0.75 | — | — | C+Sn — one non-Se option |

**Diagnosis**: 3 of 4 are Sn+Se. Option 3 introduces C but still carries Sn 0.75. No T, no Te.

---

### Q26 (DB 27) — emotional_resonance
*"Which of these experiences resonates with you on a deeper emotional level?"*

| # | Option | C | Se | Sn | T | Te | Flag |
|---|---|---|---|---|---|---|---|
| 0 | breathtaking_visual | — | 0.70 | **0.80** | — | — | Sn+Se only |
| 1 | gripping_story | — | **0.80** | 0.70 | — | — | Se+Sn only |
| 2 | powerful_melody | — | 0.70 | **0.85** | — | — | Sn+Se only |
| 3 | ingenious_design | **0.70** | — | 0.75 | — | — | C+Sn |

**Diagnosis**: Identical pattern to Q25. Three Sn+Se, one C+Sn. No T, no Te.

---

### Q27 (DB 28) — gathering_activity
*"At a social gathering, which activity are you most likely to enjoy?"*

| # | Option | C | Se | Sn | T | Te | Flag |
|---|---|---|---|---|---|---|---|
| 0 | visual_arts_photo | — | 0.60 | **0.75** | — | — | Sn+Se only |
| 1 | writing_theatrical | — | **0.75** | 0.60 | — | — | Se+Sn only |
| 2 | music_sound_design | — | 0.70 | **0.85** | — | — | Sn+Se only |
| 3 | architectural_spatial | **0.70** | — | 0.75 | — | — | C+Sn |

**Diagnosis**: Same pattern again. Q27 = Q26 = Q25 structurally.

---

### Q28 (DB 29) — creative_identity
*"Which of these creative interests do you most identify with?"*

| # | Option | C | Se | Sn | T | Te | Flag |
|---|---|---|---|---|---|---|---|
| 0 | visual_arts_photo | — | 0.60 | **0.75** | — | — | Sn+Se only |
| 1 | writing_theatrical | — | **0.75** | 0.60 | — | — | Se+Sn only |
| 2 | music_sound_design | — | 0.70 | **0.85** | — | — | Sn+Se only |
| 3 | architectural_spatial | **0.70** | — | 0.75 | — | — | C+Sn |

**Diagnosis**: IDENTICAL to Q27. Same option_keys, same weights. Q27 and Q28 are duplicates in scoring effect.

---

### Q29 (DB 30) — historical_fascination
*"Which historical aspect fascinates you the most?"*

| # | Option | C | Se | Sn | T | Te | Flag |
|---|---|---|---|---|---|---|---|
| 0 | artistic_movements | — | 0.65 | **0.75** | — | — | Sn+Se only |
| 1 | legendary_narratives | — | **0.75** | 0.65 | — | — | Se+Sn only |
| 2 | music_genre_evolution | — | 0.60 | **0.80** | — | — | Sn+Se only |
| 3 | architectural_eras | **0.70** | — | 0.75 | — | — | C+Sn |

**Diagnosis**: Same structural pattern as Q25-Q28. Five questions in a row with the same vector distribution.

---

### Q30 (DB 31) — style_influence
*"What influences your personal style or aesthetics the most?"*

| # | Option | C | Se | Sn | T | Te | Flag |
|---|---|---|---|---|---|---|---|
| 0 | visual_art_trends | — | 0.60 | **0.75** | — | — | Sn+Se only |
| 1 | cinematic_theatrical | — | **0.75** | 0.70 | — | — | Se+Sn only |
| 2 | musical_styles_icons | — | 0.65 | **0.80** | — | — | Sn+Se only |
| 3 | design_architectural | **0.70** | — | 0.75 | — | — | C+Sn |

**Diagnosis**: Same pattern, 6th question in a row.

---

### Q31 (DB 32) — creative_expression
*"If you were to express yourself creatively, which form would it take?"*

| # | Option | C | Se | Sn | T | Te | Flag |
|---|---|---|---|---|---|---|---|
| 0 | visual_art_piece | — | 0.70 | **0.80** | — | — | Sn+Se only |
| 1 | written_performed | — | **0.80** | 0.60 | — | — | Se+Sn only |
| 2 | musical_composition | — | 0.70 | **0.80** | — | — | Sn+Se only |
| 3 | design_structural | **0.80** | — | — | — | **0.80** | C+Te — ONLY option in entire block with Te |

**Diagnosis**: Option 3 is the lone exception in the entire block — it carries technique. But it also has ZERO sensory, making it an extreme outlier rather than a graduated signal.

---

### Q32 (DB 33) — creative_relaxation
*"How do you prefer to relax and unwind?"*

| # | Option | C | Se | Sn | T | Te | Flag |
|---|---|---|---|---|---|---|---|
| 0 | viewing_art_design | — | 0.60 | **0.75** | — | — | Sn+Se only |
| 1 | watching_story | — | **0.75** | 0.70 | — | — | Se+Sn only |
| 2 | listening_creating_music | — | 0.70 | **0.85** | — | — | Sn+Se only |
| 3 | exploring_architecture | **0.70** | — | 0.75 | — | — | C+Sn |

**Diagnosis**: Same pattern again. Back to the default.

---

### Q33 (DB 34) — art_role
*"What role do artistic elements play in your life?"*

| # | Option | C | Se | Sn | T | Te | Flag |
|---|---|---|---|---|---|---|---|
| 0 | inspiration_creativity | — | **0.75** | 0.80 | — | — | Se+Sn only |
| 1 | emotional_expression | — | **0.85** | 0.70 | — | — | Se+Sn only |
| 2 | connect_world | — | **0.80** | 0.65 | — | — | Se+Sn only |
| 3 | intellectual_stimulation | **0.80** | 0.60 | — | — | — | C+Se — no Sn but still Se |

**Diagnosis**: All 4 load Se. Options 0-2 all load Sn too. Option 3 is the only escape, and it still carries Se 0.60.

---

## Summary of Findings

### Vector distribution across 44 options (11 questions x 4)

| Vector | Options that load it | Min | Max | Avg |
|---|---|---|---|---|
| sensory_preference | **40 of 44** (91%) | 0.60 | 0.85 | ~0.74 |
| sentiment_preference | **42 of 44** (95%) | 0.60 | 0.85 | ~0.69 |
| complexity_preference | 12 of 44 (27%) | 0.70 | 0.80 | ~0.73 |
| technique_preference | **1 of 44** (2%) | 0.80 | 0.80 | 0.80 |
| time_preference | **0 of 44** (0%) | — | — | — |

### Structural problems

1. **Sn saturation**: 40 of 44 options load sensory_preference. Any answerer of this block will hit Sn >= 0.75 regardless of choices.

2. **Se saturation**: 42 of 44 options load sentiment_preference. Same ceiling compression.

3. **Te absence**: Only 1 option in the entire block (Q31 option 3: design_structural) carries technique_preference. An entire domain of 11 questions contributes almost nothing to Te.

4. **T absence**: Zero options in the block carry time_preference. This domain is invisible to the time dimension.

5. **Structural repetition**: Q25-Q30 (6 consecutive questions) use the IDENTICAL vector pattern: options 0-2 are Sn+Se, option 3 is C+Sn. Q27 and Q28 are literally the same option_keys with the same weights.

6. **Option 3 monotony**: In 8 of 11 questions, option 3 (the "architectural/design/structural" choice) is the only one that introduces complexity_preference. But it still carries Sn 0.75 in 7 of those 8 cases, so even the "cerebral" option saturates sensory.

### What this means for scoring

- A person who answers ALL architectural/design options (the most "structured" possible path through this block) will still accumulate Sn = 0.75 and Se = 0.60
- The block cannot distinguish a curator (low Sn, low Se) from a provocateur (high Sn) because both saturate Sn
- The block contributes nothing to separating archivist (high T) from oracle (high C, low Sn) because T is absent and Sn is everywhere
