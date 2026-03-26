type Visual = {
  src: string;
  alt: string;
  caption?: string;
};

type VisualConfig = {
  default: Visual;
  questions?: Record<number, Visual>;
};

const QUESTIONNAIRE_VISUALS: Record<number, VisualConfig> = {
  3: {
    default: {
      src: "/assets/images/question-main.png",
      alt: "Questionnaire background",
    },
    questions: {
      1: {
        src: "/assets/images/question-1.png",
        alt: "Daily essentials",
        caption: "Artist Highlight: Vola, Choice, 2023 (Acrylic on canvas)",
      },
      2: {
        src: "/assets/images/question-2.png",
        alt: "Personal indulgences",
        caption:
          "Artist Highlight: Ivan Arlaud,Bali, Extérieur, 2024. (Acrylic on canvas)",
      },
      3: {
        src: "/assets/images/question-3.png",
        alt: "Lifestyle preferences",
        caption:
          "Artist Highlight: Marco Verde, Sustainability Matters, 2024 (Eco-mixed media)",
      },
      4: {
        src: "/assets/images/question-4.png",
        alt: "Values and Ethics",
        caption:
          "Artist Highlight: Ivan Arlaud, Ciel Bleu d'Automne, 2022 (Acrylic on canvas)",
      },      
      5: {
        src: "/assets/images/question-5.png",
        alt: "Interaction with Trends",
        caption:
          "Artist Highlight: Ivan Arlaud, Fauvisme et Framboises, 2023 (Acrylic on canvas)",
      },
      6: {
        src: "/assets/images/question-6.png",
        alt: "Social and Digital Engagement",
        caption:
          "Artist Highlight: Ivan Arlaud, Les Citrons sur le Buffet, 2023 (Acrylic on canvas)",
      },
      7: {
        src: "/assets/images/question-7.png",
        alt: "Aspirational Goals",
        caption:
          "Artist Highlight: Ivan Arlaud, Les Wassily, 2022 (Acrylic on canvas)",
      },
      8: {
        src: "/assets/images/question-8.png",
        alt: "Decision Influence",
        caption:
          "Artist Highlight: Ivan Arlaud, Matin Pitiüse, 2023 (Acrylic on canvas)",
      },
      9: {
        src: "/assets/images/question-9.png",
        alt: "Investment in self",
        caption:
          "Artist Highlight: Ivan Arlaud, Nature Morte aux Citrons, 2023 (Acrylic on canvas)",
      },
      10: {
        src: "/assets/images/question-10.png",
        alt: "Community Interaction",
        caption:
          "Artist Highlight: Ivan Arlaud, Notre Matin, 2022 (Acrylic on canvas)",
      },
      11: {
        src: "/assets/images/question-11.png",
        alt: "Leisure and culture",
        caption:
          "Artist Highlight: Ivan Arlaud, Poèmes et Clin d'Oeil, 2023 (Acrylic on canvas)",
      },            
    },
  },
  4: {
    default: {
      src: "/assets/images/question2-main.png",
      alt: "Questionnaire section two background",
    },
    questions: {
      13: {
        src: "/assets/images/question2-1.png",
        alt: "Adapting to change",
        caption:
          "Artist Highlight: Luciano Ventrone, IL CEDRO SPACCATO (oil on canvas)",
      },
      14: {
        src: "/assets/images/question2-2.png",
        alt: "Future perspectives",
        caption:
          "Artist Highlight: Luciano Ventrone, Confine 2011 (oil on canvas)",
      },
      15: {
        src: "/assets/images/question2-3.png",
        alt: "Valued experiences",
        caption:
          "Artist Highlight: Luciano Ventrone, Incontro a Giarre, 2011 (oil on canvas)",
      },
      16: {
        src: "/assets/images/question2-4.png",
        alt: "Innovation and tradition",
        caption:
          "Artist Highlight: Luciano Ventrone, Trenino, 2010-2018 (oil on canvas)",
      }, 
      17: {
        src: "/assets/images/question2-5.png",
        alt: "Personal Accomplishment",
        caption:
          "Artist Highlight: Luciano Ventrone, Le tonde, 1999 (oil on canvas)",
      },
      18: {
        src: "/assets/images/question2-6.png",
        alt: "Exploration and interests",
        caption:
          "Artist Highlight: Luciano Ventrone, Monocromo, 2016 (oil on canvas)",
      },
      19: {
        src: "/assets/images/question2-7.png",
        alt: "Sensory Experiences",
        caption:
          "Artist Highlight: Luciano Ventrone, Dove l'ombra s'addensa (oil on canvas)",
      },
      20: {
        src: "/assets/images/question2-8.png",
        alt: "Relaxation and Downtime",
        caption:
          "Artist Highlight: Luciano Ventrone, The shopping leaves, executed in 1991 (oil on canvas)",
      },
      21: {
        src: "/assets/images/question2-9.png",
        alt: "Role of Technology",
        caption:
          "Artist Highlight: Luciano Ventrone, Una punta di verde, 2015 (oil on linen)",
      },
      22: {
        src: "/assets/images/question2-10.png",
        alt: "Impact and Legacy",
        caption:
          "Artist Highlight: Luciano Ventrone, 'East' (oil on canvas)",
      },
      23: {
        src: "/assets/images/question2-11.png",
        alt: "World View and Perspectives",
        caption:
          "Artist Highlight: Luciano Ventrone, L'addio a Marco Polo, 1999 (oil on canvas)",
      },
    },
  },
  5: {
    default: {
      src: "/assets/images/question3-main.png",
      alt: "Questionnaire section three background",
    },
    questions: {
      24: {
        src: "/assets/images/question3-1.png",
        alt: "Sources of inspiration",
        caption:
          "Artist Highlight: Leisure Time Artists, Personal Moments, 2024 (Oil painting)",
      },
      25: {
        src: "/assets/images/question3-2.png",
        alt: "Enriching experiences",
        caption:
          "Artist Highlight: Home Design Collective, Living Spaces, 2024 (Architecture photography)",
      },
      26: {
        src: "/assets/images/question3-3.png",
        alt: "Cultural exploration",
        caption:
          "Artist Highlight: Marco Verde, Sustainability Matters, 2024 (Eco-mixed media)",
      },
      27: {
        src: "/assets/images/question3-4.png",
        alt: "Emotional connection",
        caption:
          "Artist Highlight: Pierre Bergian, Ladder in Blue Room, 2018 (oil on panel)",
      },
      28: {
        src: "/assets/images/question3-5.png",
        alt: "Social events",
        caption:
          "Artist Highlight: Pierre Bergian, Purple Room with Screen, 2018 (oil on paper)",
      },
      29: {
        src: "/assets/images/question3-6.png",
        alt: "Creative interests",
        caption:
          "Artist Highlight: Pierre Bergian, Fragments, 2023 (oil on panel)",
      },
      30: {
        src: "/assets/images/question3-7.png",
        alt: "Historical preferences",
        caption:
          "Artist Highlight: Pierre Bergian, Cube, 2022 (oil on panel)",
      },
      31: {
        src: "/assets/images/question3-8.png",
        alt: "Influence and personal style",
        caption:
          "Artist Highlight: Pierre Bergian, My personal collection, 2024 (oil on panel)",
      },
      32: {
        src: "/assets/images/question3-9.png",
        alt: "Preferred form of expression",
        caption:
          "Artist Highlight: Pierre Bergian, Snow Reflections, 2022 (oil on canvas)",
      },
      33: {
        src: "/assets/images/question3-10.png",
        alt: "Relaxation through arts",
        caption:
          "Artist Highlight: Pierre Bergian, L'atelier, 2018 (oil on paper)",
      },
      34: {
        src: "/assets/images/question3-11.png",
        alt: "Impact of art on life",
        caption:
          "Artist Highlight: Pierre Bergian, Veduta, 2022 (oil on panel)",
      }            
    },
  },
};

const FALLBACK_VISUAL: Visual = {
  src: "/assets/images/question-main.png",
  alt: "Questionnaire background",
};

export function getQuestionVisual(
  questionnaireId: number,
  questionId: number,
): Visual {
  const config = QUESTIONNAIRE_VISUALS[questionnaireId];
  if (!config) return FALLBACK_VISUAL;

  const specific = config.questions?.[questionId];
  if (specific) return specific;

  return config.default ?? FALLBACK_VISUAL;
}
