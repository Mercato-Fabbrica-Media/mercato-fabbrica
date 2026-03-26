export interface QuestionData {
  id: number;
  text: string;
  options: string[];
  image?: {
    src: string;
    alt: string;
    caption?: string;
  };
  description?: string;
}

export const questions: QuestionData[] = [
  {
    id: 1,
    text: "When selecting an everyday item, what primarily guides your choice?",
    options: [
      "functionality and practicality",
      "aesthetic appeal and design",
      "brand reputation or recommendations",
      "ethical and environmental considerations",
    ],
    description: "<div>DAILY</div><div>ESSENTIALS</div>",
    image: {
      src: "/assets/images/question-1.png",
      alt: "Everyday choice selection",
      caption: "Artist Highlight: Vola, Choice, 2023 (Acrylic on canvas)"
    }
  },
  {
    id: 2,
    text: "which of these indulgences do you find most rewarding?",
    options: [
      "discovering a new hobby or skill",
      "treating myself to a luxury item",
      "enjoying a gourmet meal or delicacy",
      "spending time in nature or traveling",
    ],
    description: "<div>PERSONAL</div><div>INDULGENCES</div>",
    image: {
      src: "/assets/images/question-2.png",
      alt: "Personal indulgences",
      caption: "Artist Highlight: Ivan Arlaud,Bali, Extérieur, 2024. (Acrylic on canvas)"
    }
  },
  {
    id: 3,
    text: "your ideal weekend is most likely to include:",
    options: [
      "engaging in a creative or physical activity",
      "exploring new trends or technologies",
      "relaxing at home with a book or film",
      "socializing with friends or attending an event",
    ],
    description: "<div>LIFESTYLE</div><div>PREFERENCES</div>",
    image: {
      src: "/assets/images/question-3.png",
      alt: "Weekend activities",
      caption: "Artist Highlight: Marco Verde, Sustainability Matters, 2024 (Eco-mixed media)"
    }
  }
];

export const getTotalQuestions = () => questions.length;

export const getQuestionById = (id: number): QuestionData | undefined => {
  return questions.find(q => q.id === id);
};

export const getNextQuestionId = (currentId: number): number | null => {
  const currentIndex = questions.findIndex(q => q.id === currentId);
  if (currentIndex === -1 || currentIndex === questions.length - 1) {
    return null;
  }
  const nextQuestion = questions[currentIndex + 1];
  return nextQuestion ? nextQuestion.id : null;
};

export const getPreviousQuestionId = (currentId: number): number | null => {
  const currentIndex = questions.findIndex(q => q.id === currentId);
  if (currentIndex <= 0) {
    return null;
  }
  const previousQuestion = questions[currentIndex - 1];
  return previousQuestion ? previousQuestion.id : null;
};
