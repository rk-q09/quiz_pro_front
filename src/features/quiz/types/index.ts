import { BaseEntity } from '@/types';

export type Quiz = {
  title: string;
  questions: {
    content: string;
    choices: string[];
    correctAnswer: number;
  }[];
} & BaseEntity;
