import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';

import { Quiz } from '../types';

export const searchQuizzes = (word: string): Promise<Quiz[]> => {
  return axios.get(`/quizzes?title=${word}`);
};

type UseSearchQuizzesOptions = {
  config?: QueryConfig<typeof searchQuizzes>;
  word: string;
};

export const useSearchQuizzes = ({ word, config }: UseSearchQuizzesOptions) => {
  return useQuery({
    ...config,
    queryKey: ['quizzes', word],
    queryFn: () => searchQuizzes(word),
  });
}
