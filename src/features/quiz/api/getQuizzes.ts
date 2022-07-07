import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';

import { Quiz, QuizCount } from '../types';

export const getQuizCount = (): Promise<QuizCount> => {
  return axios.get('/quizzes/count');
};

export const getQuizzes = ({ page, limit}: { page: number, limit?: number}): Promise<Quiz[]> => {
  return axios.get(`/quizzes?page=` + page + '&limit=' + limit);
};

type UseQuizzesOptions = {
  page: number;
  limit?: number;
  config?: QueryConfig<typeof getQuizzes>;
};

export const useQuizzes = ({ page, limit, config }: UseQuizzesOptions) => {
  return useQuery({
    ...config,
    queryKey: ['quizzes', String(page)],
    queryFn: () => getQuizzes({page, limit}),
  });
};
