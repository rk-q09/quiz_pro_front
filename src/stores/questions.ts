import create from 'zustand';

export type Question = {
  content: string;
  choices1: string;
  choices2: string;
  choices3: string;
  choices4: string;
  answer: string;
}

type QuestionStore = {
  questions: Question[];
  addQuestion: (question: Question) => void;
};

export const useQuestionStore = create<QuestionStore>((set) => ({
  questions: [],
  addQuestion: (question) => { 
    set((state) => ({
      questions: [
        ...state.questions,
        { ...question },
      ]
    }))},
  deleteEverything: () => set({}, true), 
}));
                                                      
