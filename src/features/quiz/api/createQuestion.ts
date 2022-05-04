import { axios } from '@/lib/axios';

export type CreateQuestionDTO = {
  quizId: string;
  data: {
    content: string;
    choices1: string;
    choices2: string;
    choices3: string;
    choices4: string;
    answer: string;
  };
};

export const createQuestion = ({ quizId, data }: CreateQuestionDTO) => {
  const { content, choices1, choices2, choices3, choices4, answer } = data;
  const choices = [choices1, choices2, choices3, choices4];
  return axios.post(`/quizzes/${quizId}`, { content, choices, answer });
};
