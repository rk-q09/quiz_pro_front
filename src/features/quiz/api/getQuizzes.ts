import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';

import { Quiz } from '../types';

export const getQuizzes = (): Promise<Quiz[]> => {
  return axios.get('/quizzes');
};

type UseQuizzesOptions = {
  config?: QueryConfig<typeof getQuizzes>;
};

export const useQuizzes = ({ config }: UseQuizzesOptions = {}) => {
  return useQuery({
    ...config,
    queryKey: ['quizzes'],
    queryFn: () => getQuizzes(),
  });
};
