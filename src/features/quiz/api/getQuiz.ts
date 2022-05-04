import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';

import { Quiz } from '../types';

export const getQuiz = (quizId: string): Promise<Quiz> => {
  return axios.get(`/quizzes/${quizId}`);
};

type UseQuizOptions = {
  config?: QueryConfig<typeof getQuiz>;
  quizId: string;
};

export const useQuiz = ({ config, quizId }: UseQuizOptions) => {
  return useQuery({
    ...config,
    queryKey: ['quiz', quizId],
    queryFn: () => getQuiz(quizId),
  });
};
