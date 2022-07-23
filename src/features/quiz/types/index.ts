import { BaseEntity } from '@/types';

export type Question = {
  content: string;
  choices1: string;
  choices2: string;
  choices3: string;
  choices4: string;
  answer: string;
};
export type Quiz = {
  title: string;
  questions: {
    content: string;
    choices: string[];
    correctAnswer: number;
  }[];
} & BaseEntity;

export type QuizCount = {
  count: number;
};
