import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';

import { Quiz, QuizCount } from '../types';

export type SearchQuizzesCountProps = {
  word: string;
}

export const searchQuizzesCount = ({ word }: SearchQuizzesCountProps): Promise<QuizCount> => {
  return axios.get(`/quizzes/search/count?title=${word}`);
}

export const searchQuizzes = ({ word, page, limit }: { word: string; page: number; limit: number; }): Promise<Quiz[]> => {
  return axios.get(`/quizzes?title=${word}` + '&page' + page + '&limit=' + limit);
};

type UseSearchQuizzesOptions = {
  config?: QueryConfig<typeof searchQuizzes>;
  word: string;
  page: number;
  limit: number;
};

export const useSearchQuizzes = ({ word, page, limit, config }: UseSearchQuizzesOptions) => {
  return useQuery({
    ...config,
    queryKey: ['quizzes', word],
    queryFn: () => searchQuizzes({ word, page, limit }),
  });
}
