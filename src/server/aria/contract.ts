// ── Canonical Questionnaire Contract ──
// enigmatic_choices v1.0
//
// Single source of truth for:
//   - Front-end rendering (Joyous Living)
//   - ARIA scoring (mappings.ts)
//   - Payload assembly (assembler.ts)
//
// DB IDs: 1-11, 13-23, 24-34 (no ID 12)
// Display numbering: 1-33 continuous

export const QUESTIONNAIRE_ID = "enigmatic_choices";
export const QUESTIONNAIRE_VERSION = "1.0";
export const TOTAL_QUESTIONS = 33;

export interface DomainDef {
  domain_key: string;
  label: string;
  db_id_range: [number, number];
  display_range: [number, number];
}

export const DOMAINS: DomainDef[] = [
  {
    domain_key: "lifestyle_dynamics",
    label: "Lifestyle Dynamics",
    db_id_range: [1, 11],
    display_range: [1, 11],
  },
  {
    domain_key: "future_orientations",
    label: "Future Orientations",
    db_id_range: [13, 23],
    display_range: [12, 22],
  },
  {
    domain_key: "sensory_signature",
    label: "Sensory Signature",
    db_id_range: [24, 34],
    display_range: [23, 33],
  },
];

export interface OptionDef {
  option_key: string;
  label: string;
}

export interface QuestionDef {
  db_id: number;
  display_number: number;
  question_key: string;
  domain_key: string;
  prompt: string;
  options: [OptionDef, OptionDef, OptionDef, OptionDef];
}

export const QUESTIONS: QuestionDef[] = [
  // ═══════════════════════════════════
  // DOMAIN: Lifestyle Dynamics (1-11)
  // ═══════════════════════════════════
  {
    db_id: 1,
    display_number: 1,
    question_key: "everyday_item_guide",
    domain_key: "lifestyle_dynamics",
    prompt: "When selecting an everyday item, what primarily guides your choice?",
    options: [
      { option_key: "functionality_practicality", label: "Functionality and practicality" },
      { option_key: "aesthetic_appeal_design", label: "Aesthetic appeal and design" },
      { option_key: "brand_reputation_recommendations", label: "Brand reputation or recommendations" },
      { option_key: "ethical_environmental", label: "Ethical and environmental considerations" },
    ],
  },
  {
    db_id: 2,
    display_number: 2,
    question_key: "rewarding_indulgence",
    domain_key: "lifestyle_dynamics",
    prompt: "Which of these indulgences do you find most rewarding?",
    options: [
      { option_key: "new_hobby_skill", label: "Discovering a new hobby or skill" },
      { option_key: "luxury_item", label: "Treating myself to a luxury item" },
      { option_key: "gourmet_meal", label: "Enjoying a gourmet meal or delicacy" },
      { option_key: "nature_traveling", label: "Spending time in nature or traveling" },
    ],
  },
  {
    db_id: 3,
    display_number: 3,
    question_key: "ideal_weekend_activity",
    domain_key: "lifestyle_dynamics",
    prompt: "Your ideal weekend is most likely to include:",
    options: [
      { option_key: "creative_physical", label: "Engaging in a creative or physical activity" },
      { option_key: "new_trends_tech", label: "Exploring new trends or technologies" },
      { option_key: "relaxing_home", label: "Relaxing at home with a book or film" },
      { option_key: "socializing_events", label: "Socializing with friends or attending an event" },
    ],
  },
  {
    db_id: 4,
    display_number: 4,
    question_key: "choice_priority",
    domain_key: "lifestyle_dynamics",
    prompt: "When making choices, what factor do you prioritize?",
    options: [
      { option_key: "sustainability_ethical", label: "Sustainability and ethical production" },
      { option_key: "quality_durability", label: "Quality and durability" },
      { option_key: "cost_effectiveness", label: "Cost-effectiveness and budget" },
      { option_key: "cultural_artistic", label: "Cultural or artistic significance" },
    ],
  },
  {
    db_id: 5,
    display_number: 5,
    question_key: "trend_response",
    domain_key: "lifestyle_dynamics",
    prompt: "How do you typically respond to emerging trends?",
    options: [
      { option_key: "early_explorer", label: "i\u2019m usually one of the first to explore them" },
      { option_key: "measured_adoption", label: "I wait to see if they fit my style and needs" },
      { option_key: "timeless_preference", label: "I rarely follow trends, preferring timeless choices" },
      { option_key: "blended_modern_classic", label: "I blend trendiness with classic elements" },
    ],
  },
  {
    db_id: 6,
    display_number: 6,
    question_key: "online_content",
    domain_key: "lifestyle_dynamics",
    prompt: "What kind of online content are you most drawn to?",
    options: [
      { option_key: "educational_skill", label: "Educational or skill-building resources" },
      { option_key: "lifestyle_wellness", label: "Lifestyle and wellness tips" },
      { option_key: "news_current_events", label: "News and current events" },
      { option_key: "entertainment_humor", label: "Entertainment and humor" },
    ],
  },
  {
    db_id: 7,
    display_number: 7,
    question_key: "life_focus",
    domain_key: "lifestyle_dynamics",
    prompt: "Looking ahead, what area of your life are you most focused on enhancing?",
    options: [
      { option_key: "personal_professional_dev", label: "Personal or professional development" },
      { option_key: "health_wellbeing", label: "Health and wellbeing" },
      { option_key: "relationships_social", label: "Relationships and social connections" },
      { option_key: "leisure_travel", label: "Leisure and travel experiences" },
    ],
  },
  {
    db_id: 8,
    display_number: 8,
    question_key: "decision_influence",
    domain_key: "lifestyle_dynamics",
    prompt: "What usually influences your decisions the most?",
    options: [
      { option_key: "personal_research", label: "Personal research and knowledge" },
      { option_key: "friends_family_recs", label: "Recommendations from friends or family" },
      { option_key: "expert_opinions", label: "Professional or expert opinions" },
      { option_key: "intuition_spontaneous", label: "Intuition or spontaneous feeling" },
    ],
  },
  {
    db_id: 9,
    display_number: 9,
    question_key: "self_investment",
    domain_key: "lifestyle_dynamics",
    prompt: "When investing in yourself, what do you prioritize?",
    options: [
      { option_key: "learning_education", label: "Learning new skills or education" },
      { option_key: "physical_fitness", label: "Physical health and fitness" },
      { option_key: "grooming_presentation", label: "Personal grooming and presentation" },
      { option_key: "mental_emotional", label: "Mental and emotional well-being" },
    ],
  },
  {
    db_id: 10,
    display_number: 10,
    question_key: "community_engagement",
    domain_key: "lifestyle_dynamics",
    prompt: "Which of these community engagements is most appealing to you?",
    options: [
      { option_key: "volunteering", label: "Volunteering for a cause or charity" },
      { option_key: "local_events_clubs", label: "Participating in local events or clubs" },
      { option_key: "online_forums_social", label: "Joining online forums or social media groups" },
      { option_key: "workshops_talks", label: "Attending workshops or talks" },
    ],
  },
  {
    db_id: 11,
    display_number: 11,
    question_key: "weekend_domain",
    domain_key: "lifestyle_dynamics",
    prompt: "Your ideal leisure activity would likely involve:",
    options: [
      { option_key: "arts_culture", label: "Arts and culture (e.g., museums, galleries, theater)" },
      { option_key: "nature_outdoors", label: "Nature and the outdoors (e.g., hiking, gardening)" },
      { option_key: "culinary_experiences", label: "Culinary experiences (e.g., cooking, food tasting)" },
      { option_key: "technology_innovation", label: "Technology and innovation (e.g., gadgets, gaming)" },
    ],
  },

  // ═══════════════════════════════════════
  // DOMAIN: Future Orientations (13-23)
  // ═══════════════════════════════════════
  {
    db_id: 13,
    display_number: 12,
    question_key: "change_adaptation",
    domain_key: "future_orientations",
    prompt: "How do you typically adapt to significant changes in life or routine?",
    options: [
      { option_key: "embrace_enthusiastically", label: "I embrace change enthusiastically" },
      { option_key: "adapt_gradually", label: "I adapt gradually with some planning" },
      { option_key: "prefer_stability", label: "I prefer stability and minimal changes" },
      { option_key: "blend_old_new", label: "find new ways to blend old and new routines" },
    ],
  },
  {
    db_id: 14,
    display_number: 13,
    question_key: "future_excitement",
    domain_key: "future_orientations",
    prompt: "When thinking about the future, what excites you the most?",
    options: [
      { option_key: "tech_advancements", label: "Technological advancements" },
      { option_key: "social_cultural_shifts", label: "Social and cultural shifts" },
      { option_key: "personal_family_milestones", label: "Personal or family milestones" },
      { option_key: "career_educational", label: "Career or educational opportunities" },
    ],
  },
  {
    db_id: 15,
    display_number: 14,
    question_key: "valued_experiences",
    domain_key: "future_orientations",
    prompt: "Looking back, which type of past experiences do you value the most?",
    options: [
      { option_key: "adventures_travels", label: "Adventures and travels" },
      { option_key: "career_academic", label: "Career or academic achievements" },
      { option_key: "relationships_connections", label: "Personal relationships and connections" },
      { option_key: "growth_realization", label: "Moments of personal growth and realization" },
    ],
  },
  {
    db_id: 16,
    display_number: 15,
    question_key: "innovation_tradition",
    domain_key: "future_orientations",
    prompt: "When considering new products or ideas, how do you balance innovation with tradition?",
    options: [
      { option_key: "favor_cutting_edge", label: "I generally favor cutting-edge innovations" },
      { option_key: "tried_true_open", label: "i prefer tried and true methods, but I'm open to new ideas" },
      { option_key: "stick_traditional", label: "I mostly stick with traditional options" },
      { option_key: "blend_both", label: "I blend both equally in my choices" },
    ],
  },
  {
    db_id: 17,
    display_number: 16,
    question_key: "satisfying_accomplishment",
    domain_key: "future_orientations",
    prompt: "Which of these accomplishments would bring you the most satisfaction?",
    options: [
      { option_key: "fitness_health_goal", label: "Achieving a personal fitness or health goal" },
      { option_key: "creative_project", label: "Completing a creative project or hobby" },
      { option_key: "career_milestone", label: "Reaching a significant career milestone" },
      { option_key: "meaningful_relationships", label: "Fostering meaningful relationships" },
    ],
  },
  {
    db_id: 18,
    display_number: 17,
    question_key: "interest_cultivation",
    domain_key: "future_orientations",
    prompt: "How do you prefer to explore and cultivate new interests?",
    options: [
      { option_key: "online_research_virtual", label: "Through online research and virtual experiences" },
      { option_key: "classes_workshops", label: "By attending classes or workshops" },
      { option_key: "travel_real_world", label: "Through travel and real-world experiences" },
      { option_key: "knowledgeable_individuals", label: "By connecting with knowledgeable individuals" },
    ],
  },
  {
    db_id: 19,
    display_number: 18,
    question_key: "sensory_preference",
    domain_key: "future_orientations",
    prompt: "Which type of sensory experience do you find most appealing?",
    options: [
      { option_key: "visual", label: "Visual (e.g., art, photography, scenic views)" },
      { option_key: "auditory", label: "Auditory (e.g., music, nature sounds, spoken word)" },
      { option_key: "tactile", label: "Tactile (e.g., textures, hands-on activities)" },
      { option_key: "gustatory_olfactory", label: "Gustatory/olfactory (e.g., tasting, cooking, fragrances)" },
    ],
  },
  {
    db_id: 20,
    display_number: 19,
    question_key: "relaxation_style",
    domain_key: "future_orientations",
    prompt: "What is your preferred way to unwind and relax?",
    options: [
      { option_key: "quiet_solitary", label: "Engaging in a quiet, solitary activity" },
      { option_key: "friends_family", label: "Spending time with friends or family" },
      { option_key: "active_sports_outdoor", label: "Being active, such as sports or outdoor activities" },
      { option_key: "entertainment_media", label: "Consuming entertainment like movies or books" },
    ],
  },
  {
    db_id: 21,
    display_number: 20,
    question_key: "technology_role",
    domain_key: "future_orientations",
    prompt: "How does technology play a role in your daily life?",
    options: [
      { option_key: "central_to_life", label: "it\u2019s central to most of what I do" },
      { option_key: "important_balanced", label: "it\u2019s important, but I maintain a balance" },
      { option_key: "minimal_traditional", label: "I use it minimally and prefer traditional methods" },
      { option_key: "communication_basic", label: "I use it mainly for communication and basic needs" },
    ],
  },
  {
    db_id: 22,
    display_number: 21,
    question_key: "legacy_motivation",
    domain_key: "future_orientations",
    prompt: "What kind of impact or legacy are you most motivated to leave?",
    options: [
      { option_key: "professional_career", label: "A professional or career-oriented impact" },
      { option_key: "personal_familial", label: "A personal or familial legacy" },
      { option_key: "creative_artistic", label: "A creative or artistic contribution" },
      { option_key: "community_social", label: "An impact on community or social causes" },
    ],
  },
  {
    db_id: 23,
    display_number: 22,
    question_key: "worldview",
    domain_key: "future_orientations",
    prompt: "Which perspective or world view resonates most with you?",
    options: [
      { option_key: "optimism_potential", label: "Optimism and constantly seeing potential" },
      { option_key: "realism_pragmatism", label: "Realism and pragmatism in approach" },
      { option_key: "idealism_better_world", label: "Idealism and striving for a better world" },
      { option_key: "traditionalism_established", label: "Traditionalism and preserving established ways" },
    ],
  },

  // ═══════════════════════════════════════
  // DOMAIN: Sensory Signature (24-34)
  // ═══════════════════════════════════════
  {
    db_id: 24,
    display_number: 23,
    question_key: "inspiration_source",
    domain_key: "sensory_signature",
    prompt: "When seeking inspiration, which of these are you most likely to turn to?",
    options: [
      { option_key: "crafted_object_scene", label: "A beautifully crafted object or scene" },
      { option_key: "moving_storytelling", label: "An emotionally moving piece of storytelling" },
      { option_key: "captivating_sound", label: "A harmonious and captivating sound or melody" },
      { option_key: "abstract_concept", label: "A thought-provoking abstract concept" },
    ],
  },
  {
    db_id: 25,
    display_number: 24,
    question_key: "enriching_experience",
    domain_key: "sensory_signature",
    prompt: "In your downtime, what type of experience do you find most enriching?",
    options: [
      { option_key: "unfamiliar_settings", label: "Exploring new and unfamiliar settings or environments" },
      { option_key: "compelling_narrative", label: "Engaging with a compelling narrative or plot" },
      { option_key: "rhythmic_melodic", label: "Being immersed in rhythmic and melodic creations" },
      { option_key: "visual_aesthetics", label: "Observing or creating visual aesthetics" },
    ],
  },
  {
    db_id: 26,
    display_number: 25,
    question_key: "cultural_intrigue",
    domain_key: "sensory_signature",
    prompt: "What aspect of a new culture do you find most intriguing to explore?",
    options: [
      { option_key: "artistic_expressions", label: "Traditional and contemporary artistic expressions" },
      { option_key: "storytelling_folklore", label: "The storytelling and folklore" },
      { option_key: "sounds_music", label: "The distinctive sounds and music" },
      { option_key: "architectural_heritage", label: "The architectural and design heritage" },
    ],
  },
  {
    db_id: 27,
    display_number: 26,
    question_key: "emotional_resonance",
    domain_key: "sensory_signature",
    prompt: "Which of these experiences resonates with you on a deeper emotional level?",
    options: [
      { option_key: "breathtaking_visual", label: "Witnessing a breathtaking visual display" },
      { option_key: "gripping_story", label: "Getting lost in a gripping story or performance" },
      { option_key: "powerful_melody", label: "Feeling moved by a powerful melody or rhythm" },
      { option_key: "ingenious_design", label: "Discovering an ingenious design or structure" },
    ],
  },
  {
    db_id: 28,
    display_number: 27,
    question_key: "gathering_activity",
    domain_key: "sensory_signature",
    prompt: "At a social gathering, which activity are you most likely to enjoy?",
    options: [
      { option_key: "visual_arts_photo", label: "Visual arts and photography" },
      { option_key: "writing_theatrical", label: "Writing or theatrical arts" },
      { option_key: "music_sound_design", label: "Music and sound design" },
      { option_key: "architectural_spatial", label: "Architectural and spatial design" },
    ],
  },
  {
    db_id: 29,
    display_number: 28,
    question_key: "creative_identity",
    domain_key: "sensory_signature",
    prompt: "Which of these creative interests do you most identify with?",
    options: [
      { option_key: "visual_arts_photo", label: "Visual arts and photography" },
      { option_key: "writing_theatrical", label: "Writing or theatrical arts" },
      { option_key: "music_sound_design", label: "Music and sound design" },
      { option_key: "architectural_spatial", label: "Architectural and spatial design" },
    ],
  },
  {
    db_id: 30,
    display_number: 29,
    question_key: "historical_fascination",
    domain_key: "sensory_signature",
    prompt: "Which historical aspect fascinates you the most?",
    options: [
      { option_key: "artistic_movements", label: "Artistic movements and styles" },
      { option_key: "legendary_narratives", label: "Legendary narratives and epics" },
      { option_key: "music_genre_evolution", label: "Evolution of music genres" },
      { option_key: "architectural_eras", label: "Architectural eras and design philosophies" },
    ],
  },
  {
    db_id: 31,
    display_number: 30,
    question_key: "style_influence",
    domain_key: "sensory_signature",
    prompt: "What influences your personal style or aesthetics the most?",
    options: [
      { option_key: "visual_art_trends", label: "Visual art trends" },
      { option_key: "cinematic_theatrical", label: "Cinematic or theatrical genres" },
      { option_key: "musical_styles_icons", label: "Musical styles or icons" },
      { option_key: "design_architectural", label: "Design and architectural innovations" },
    ],
  },
  {
    db_id: 32,
    display_number: 31,
    question_key: "creative_expression",
    domain_key: "sensory_signature",
    prompt: "If you were to express yourself creatively, which form would it take?",
    options: [
      { option_key: "visual_art_piece", label: "A visual art piece" },
      { option_key: "written_performed", label: "A written or performed piece" },
      { option_key: "musical_composition", label: "A musical composition" },
      { option_key: "design_structural", label: "A design or structural concept" },
    ],
  },
  {
    db_id: 33,
    display_number: 32,
    question_key: "creative_relaxation",
    domain_key: "sensory_signature",
    prompt: "How do you prefer to relax and unwind?",
    options: [
      { option_key: "viewing_art_design", label: "Viewing art or design pieces" },
      { option_key: "watching_story", label: "Watching a story unfold on screen or stage" },
      { option_key: "listening_creating_music", label: "Listening to or creating music" },
      { option_key: "exploring_architecture", label: "Exploring architectural spaces or designs" },
    ],
  },
  {
    db_id: 34,
    display_number: 33,
    question_key: "art_role",
    domain_key: "sensory_signature",
    prompt: "What role do artistic elements play in your life?",
    options: [
      { option_key: "inspiration_creativity", label: "A source of inspiration and creativity" },
      { option_key: "emotional_expression", label: "A means of emotional expression and release" },
      { option_key: "connect_world", label: "A way to connect with others and the world" },
      { option_key: "intellectual_stimulation", label: "An avenue for intellectual stimulation and thought" },
    ],
  },
];

// ── Lookups ──

export const QUESTION_BY_DB_ID = new Map(
  QUESTIONS.map((q) => [q.db_id, q]),
);

export const QUESTION_BY_KEY = new Map(
  QUESTIONS.map((q) => [q.question_key, q]),
);
