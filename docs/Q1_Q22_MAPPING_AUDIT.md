# Q1-Q22 Mapping Audit

**Legend**: C = complexity, Se = sentiment, Sn = sensory, T = time, Te = technique

---

## Q1-Q11: Lifestyle Dynamics

### Q1 — everyday_item_guide
| # | Option | C | Se | Sn | T | Te |
|---|---|---|---|---|---|---|
| 0 | functionality_practicality | 0.30 | 0.40 | — | — | — |
| 1 | aesthetic_appeal_design | — | 0.70 | **0.80** | — | — |
| 2 | brand_reputation | — | 0.50 | — | — | 0.60 |
| 3 | ethical_environmental | — | **0.80** | 0.60 | — | — |

**Issue**: Option 1 pushes Sn to 0.80. Options 0+2 are low-signal. No T anywhere.

### Q2 — rewarding_indulgence
| # | Option | C | Se | Sn | T | Te |
|---|---|---|---|---|---|---|
| 0 | new_hobby_skill | 0.70 | — | — | — | **0.80** |
| 1 | luxury_item | — | **0.80** | **0.90** | — | — |
| 2 | gourmet_meal | — | 0.70 | **0.90** | — | — |
| 3 | nature_traveling | — | 0.60 | 0.70 | — | — |

**CRITICAL**: Options 1+2 push Sn to **0.90** — the ceiling. This single question can max out sensory for any warm/indulgent persona. No T.

### Q3 — ideal_weekend_activity
| # | Option | C | Se | Sn | T | Te |
|---|---|---|---|---|---|---|
| 0 | creative_physical | 0.60 | — | — | — | 0.70 |
| 1 | new_trends_tech | **0.80** | — | — | — | **0.90** |
| 2 | relaxing_home | — | 0.40 | 0.50 | — | — |
| 3 | socializing_events | — | 0.60 | 0.60 | — | — |

**Issue**: Option 1 pushes Te to 0.90. No T. But reasonable spread otherwise.

### Q4 — choice_priority
| # | Option | C | Se | Sn | T | Te |
|---|---|---|---|---|---|---|
| 0 | sustainability_ethical | — | **0.85** | 0.60 | — | — |
| 1 | quality_durability | 0.60 | — | — | — | 0.65 |
| 2 | cost_effectiveness | 0.40 | 0.30 | — | — | — |
| 3 | cultural_artistic | — | 0.75 | **0.80** | — | — |

**Issue**: Option 3 pushes Sn to 0.80. Options 0+3 both high Se. No T.

### Q5 — trend_response
| # | Option | C | Se | Sn | T | Te |
|---|---|---|---|---|---|---|
| 0 | early_explorer | 0.70 | — | — | 0.25 | — |
| 1 | measured_adoption | 0.50 | — | — | 0.60 | — |
| 2 | timeless_preference | — | 0.50 | — | **0.75** | — |
| 3 | blended_modern_classic | 0.55 | — | — | 0.50 | — |

**GOOD**: Only question in Q1-Q11 with strong T signal. No Sn, no Te. Clean time axis.

### Q6 — online_content
| # | Option | C | Se | Sn | T | Te |
|---|---|---|---|---|---|---|
| 0 | educational_skill | **0.75** | — | — | — | 0.70 |
| 1 | lifestyle_wellness | — | 0.65 | 0.60 | — | — |
| 2 | news_current_events | 0.60 | 0.50 | — | — | — |
| 3 | entertainment_humor | — | 0.50 | 0.60 | — | — |

OK spread. C+Te vs Se+Sn split. No T.

### Q7 — life_focus
| # | Option | C | Se | Sn | T | Te |
|---|---|---|---|---|---|---|
| 0 | personal_professional_dev | **0.80** | — | — | — | **0.80** |
| 1 | health_wellbeing | — | 0.65 | 0.60 | — | — |
| 2 | relationships_social | — | **0.80** | 0.65 | — | — |
| 3 | leisure_travel | — | — | **0.80** | 0.35 | — |

**Issue**: Option 0 pushes both C and Te to 0.80. Option 3 pushes Sn to 0.80. A "structured" persona picking option 0 gets craft-weight, not just intellectual weight.

### Q8 — decision_influence
| # | Option | C | Se | Sn | T | Te |
|---|---|---|---|---|---|---|
| 0 | personal_research | **0.75** | — | — | — | 0.70 |
| 1 | friends_family_recs | — | 0.70 | 0.50 | — | — |
| 2 | expert_opinions | **0.75** | — | — | — | 0.70 |
| 3 | intuition_spontaneous | — | 0.60 | — | 0.30 | — |

**Issue**: Options 0 and 2 are IDENTICAL in vectors. No discrimination between research and expert reliance. Both push C+Te equally.

### Q9 — self_investment
| # | Option | C | Se | Sn | T | Te |
|---|---|---|---|---|---|---|
| 0 | learning_education | **0.75** | — | — | — | 0.70 |
| 1 | physical_fitness | — | 0.65 | — | — | 0.60 |
| 2 | grooming_presentation | — | 0.50 | 0.70 | — | — |
| 3 | mental_emotional | — | **0.80** | 0.50 | — | — |

Reasonable. But option 0 again pushes C+Te together (the craft conflation).

### Q10 — community_engagement
| # | Option | C | Se | Sn | T | Te |
|---|---|---|---|---|---|---|
| 0 | volunteering | — | **0.90** | 0.60 | — | — |
| 1 | local_events_clubs | — | 0.70 | 0.65 | — | — |
| 2 | online_forums_social | 0.60 | — | — | — | 0.50 |
| 3 | workshops_talks | 0.65 | — | — | — | **0.75** |

**Issue**: Option 0 pushes Se to 0.90 — the ceiling. Options 0+1 both Se+Sn. No T.

### Q11 — weekend_domain
| # | Option | C | Se | Sn | T | Te |
|---|---|---|---|---|---|---|
| 0 | arts_culture | — | 0.65 | **0.75** | — | — |
| 1 | nature_outdoors | — | 0.65 | 0.65 | — | — |
| 2 | culinary_experiences | — | 0.70 | **0.90** | — | — |
| 3 | technology_innovation | **0.85** | — | — | — | **0.85** |

**CRITICAL**: Option 2 pushes Sn to **0.90**. Option 3 pushes both C and Te to 0.85. No T in any option.

---

## Q1-Q11 Summary

### Vector coverage (44 options)

| Vector | Options loading it | Max value | Ceiling risk |
|---|---|---|---|
| Sn | 22/44 (50%) | **0.90** (Q2, Q11) | HIGH — two options hit absolute ceiling |
| Se | 28/44 (64%) | **0.90** (Q10) | HIGH |
| C | 20/44 (45%) | 0.85 | moderate |
| Te | 16/44 (36%) | **0.90** (Q3) | HIGH — but only from "trends/tech" |
| T | 6/44 (14%) | 0.75 | LOW — only Q5 carries meaningful T signal |

### Critical compression points in Q1-Q11

1. **Q2 options 1+2**: Sn = 0.90. Any warm/indulgent persona maxes sensory here.
2. **Q11 option 2**: Sn = 0.90. Culinary = sensory ceiling.
3. **Q10 option 0**: Se = 0.90. Volunteering = sentiment ceiling.
4. **C and Te always travel together**: In 14 of 16 options that carry Te, C is also present. This makes it impossible to be high-technique without also being high-complexity, which conflates artisan (high Te, moderate C) with oracle (high C, moderate Te).
5. **T is nearly absent**: Only Q5 carries time signal. The entire Lifestyle Dynamics block barely contributes to separating archivist/sentinel/mystic from everything else.

---

## Q12-Q22: Future Orientations

### Q12 — change_adaptation
| # | Option | C | Se | Sn | T | Te |
|---|---|---|---|---|---|---|
| 0 | embrace_enthusiastically | 0.70 | — | — | 0.25 | — |
| 1 | adapt_gradually | 0.60 | — | — | 0.60 | — |
| 2 | prefer_stability | — | 0.50 | — | **0.85** | — |
| 3 | blend_old_new | 0.65 | — | — | 0.45 | — |

**GOOD**: Clean time axis question. All 4 options carry T. No Sn.

### Q13 — future_excitement
| # | Option | C | Se | Sn | T | Te |
|---|---|---|---|---|---|---|
| 0 | tech_advancements | **0.90** | — | — | — | **0.90** |
| 1 | social_cultural_shifts | — | 0.70 | 0.60 | — | — |
| 2 | personal_family_milestones | — | **0.80** | 0.70 | — | — |
| 3 | career_educational | **0.80** | — | — | — | **0.80** |

**CRITICAL**: Options 0 and 3 both push C+Te to extreme levels (0.90 and 0.80). Again C and Te are bonded. Option 2 pushes Se+Sn.

### Q14 — valued_experiences
| # | Option | C | Se | Sn | T | Te |
|---|---|---|---|---|---|---|
| 0 | adventures_travels | — | — | **0.80** | 0.35 | — |
| 1 | career_academic | **0.80** | — | — | — | 0.75 |
| 2 | relationships_connections | — | **0.90** | 0.65 | — | — |
| 3 | growth_realization | 0.60 | 0.75 | — | — | — |

**Issue**: Option 0 pushes Sn to 0.80. Option 2 pushes Se to 0.90. Option 1 is C+Te bonded again.

### Q15 — innovation_tradition
| # | Option | C | Se | Sn | T | Te |
|---|---|---|---|---|---|---|
| 0 | favor_cutting_edge | **0.90** | — | — | — | **0.85** |
| 1 | tried_true_open | 0.50 | — | — | 0.65 | — |
| 2 | stick_traditional | — | 0.60 | — | **0.80** | — |
| 3 | blend_both | 0.55 | — | — | 0.50 | — |

**Issue**: Option 0 is another C+Te bomb (0.90/0.85). Good T signal on options 1-3 though.

### Q16 — satisfying_accomplishment
| # | Option | C | Se | Sn | T | Te |
|---|---|---|---|---|---|---|
| 0 | fitness_health_goal | — | 0.65 | — | — | 0.60 |
| 1 | creative_project | — | — | **0.75** | — | 0.70 |
| 2 | career_milestone | **0.80** | — | — | — | 0.75 |
| 3 | meaningful_relationships | — | **0.90** | 0.65 | — | — |

**Issue**: Option 3 pushes Se to 0.90. Option 1 pushes Sn to 0.75. Option 2 is C+Te bonded.

### Q17 — interest_cultivation
| # | Option | C | Se | Sn | T | Te |
|---|---|---|---|---|---|---|
| 0 | online_research_virtual | **0.75** | — | — | — | 0.70 |
| 1 | classes_workshops | 0.65 | — | — | — | **0.75** |
| 2 | travel_real_world | — | — | **0.80** | 0.35 | — |
| 3 | knowledgeable_individuals | 0.65 | 0.70 | — | — | — |

Options 0+1 are C+Te bonded. Option 2 pushes Sn to 0.80.

### Q18 — sensory_preference
| # | Option | C | Se | Sn | T | Te |
|---|---|---|---|---|---|---|
| 0 | visual | — | — | **0.80** | — | — |
| 1 | auditory | — | — | **0.80** | — | — |
| 2 | tactile | — | — | 0.75 | — | — |
| 3 | gustatory_olfactory | — | — | **0.90** | — | — |

**CRITICAL**: ALL 4 options load ONLY sensory. This is a pure Sn pump — every answerer gets Sn >= 0.75 from this question alone. Zero discrimination on any other dimension.

### Q19 — relaxation_style
| # | Option | C | Se | Sn | T | Te |
|---|---|---|---|---|---|---|
| 0 | quiet_solitary | — | 0.40 | 0.50 | — | — |
| 1 | friends_family | — | **0.85** | 0.65 | — | — |
| 2 | active_sports_outdoor | — | — | **0.75** | 0.40 | — |
| 3 | entertainment_media | — | 0.50 | 0.60 | — | — |

Se+Sn dominant. No C, no Te.

### Q20 — technology_role
| # | Option | C | Se | Sn | T | Te |
|---|---|---|---|---|---|---|
| 0 | central_to_life | **0.90** | — | — | — | **0.90** |
| 1 | important_balanced | 0.60 | — | — | — | 0.60 |
| 2 | minimal_traditional | 0.30 | — | — | — | 0.30 |
| 3 | communication_basic | 0.40 | — | — | — | 0.40 |

**CRITICAL for C+Te bonding**: ALL 4 options load C and Te in lockstep. Option 0 pushes both to 0.90. This question makes it structurally impossible to be high-C without being high-Te. This is the single biggest contributor to the curator/oracle → artisan/alchemist collapse.

### Q21 — legacy_motivation
| # | Option | C | Se | Sn | T | Te |
|---|---|---|---|---|---|---|
| 0 | professional_career | **0.80** | — | — | — | **0.80** |
| 1 | personal_familial | — | **0.85** | 0.60 | — | — |
| 2 | creative_artistic | — | 0.75 | **0.80** | — | — |
| 3 | community_social | — | **0.90** | 0.60 | — | — |

C+Te bonded on option 0. Se ceiling (0.90) on option 3. Sn 0.80 on option 2.

### Q22 — worldview
| # | Option | C | Se | Sn | T | Te |
|---|---|---|---|---|---|---|
| 0 | optimism_potential | — | **0.80** | — | 0.35 | — |
| 1 | realism_pragmatism | 0.70 | 0.50 | — | — | — |
| 2 | idealism_better_world | — | **0.90** | 0.60 | — | — |
| 3 | traditionalism_established | — | 0.70 | — | **0.80** | — |

Option 2 pushes Se to 0.90. Good T on option 3.

---

## Q12-Q22 Summary

### Vector coverage (44 options)

| Vector | Options loading it | Max value | Ceiling risk |
|---|---|---|---|
| Sn | 16/44 (36%) | **0.90** (Q18) | HIGH — Q18 is a pure Sn pump |
| Se | 20/44 (45%) | **0.90** (Q14, Q16, Q21, Q22) | HIGH — 4 ceiling options |
| C | 20/44 (45%) | **0.90** (Q13, Q15, Q20) | HIGH |
| Te | 16/44 (36%) | **0.90** (Q13, Q20) | HIGH — always bonded with C |
| T | 14/44 (32%) | **0.85** (Q12) | moderate — Q12, Q15, Q22 are good |

---

## The Two Structural Problems in Q1-Q22

### Problem 1: C and Te are bonded

In Q1-Q22, there are **32 options** that carry either C or Te. Of those, **26 carry BOTH**. The correlation is ~81%.

Worst offenders (C and Te in lockstep):
- **Q20** (technology_role): ALL 4 options have identical C and Te values
- **Q13 opt 0** (tech_advancements): C=0.90, Te=0.90
- **Q15 opt 0** (cutting_edge): C=0.90, Te=0.85
- **Q7 opt 0** (professional_dev): C=0.80, Te=0.80
- **Q21 opt 0** (professional_career): C=0.80, Te=0.80

**Consequence**: The system cannot distinguish "I think abstractly" (oracle: high C, moderate Te) from "I make things with my hands" (artisan: moderate C, high Te). They always score together.

### Problem 2: Sn ceiling is set early

Three options in Q1-Q11 push Sn to 0.90:
- Q2 opt 1 (luxury_item)
- Q2 opt 2 (gourmet_meal)
- Q11 opt 2 (culinary_experiences)

One option in Q12-Q22 pushes Sn to 0.90:
- Q18 opt 3 (gustatory_olfactory)

And Q18 (sensory_preference) pushes Sn to at least 0.75 for EVERY answerer.

**Consequence**: By the time the calibrated Q23-Q33 block runs, Sn is already at ceiling. The block can't lower it because max() only takes the highest value.

---

## Highest-Value Calibration Targets

### For separating curator/oracle from artisan/alchemist:

**Break the C+Te bond** on these questions:
1. **Q20** (technology_role) — decouple C from Te entirely
2. **Q13 opt 0** (tech_advancements) — reduce Te, keep C high
3. **Q15 opt 0** (cutting_edge) — reduce Te, keep C high
4. **Q7 opt 0** (professional_dev) — add T instead of Te
5. **Q8 opts 0+2** — differentiate research from expert opinions

### For protecting provocateur from drifting to alchemist:

**Lower Sn ceiling** so provocateur's high-Sn target (0.85) isn't matched by everyone:
1. **Q2 opts 1+2** — reduce Sn from 0.90 to 0.70-0.75
2. **Q11 opt 2** — reduce Sn from 0.90 to 0.75
3. **Q18** — add secondary vectors so it's not a pure Sn pump
4. **Q15 opt 0** (adventures_travels) — reduce Sn from 0.80

### For giving archivist/sentinel more T signal:

**Add T to more options** so time-oriented personas separate:
1. **Q7** — add T to "professional_dev" (disciplined practice = temporal commitment)
2. **Q9 opt 0** — add T to "learning_education" (long-term investment)
3. **Q21 opt 1** — add T to "personal_familial" (legacy = time)
