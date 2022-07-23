import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';

import { Quiz, QuizCount } from '../types';

export type GetUsersQuizzesCountProps = {
  userId: string;
};

export const getUsersQuizzesCount = ({
  userId,
}: GetUsersQuizzesCountProps): Promise<QuizCount> => {
  return axios.get(`/quizzes/users/${userId}/count`);
};

export const getUsersQuizzes = ({
  userId,
  page,
  limit,
}: {
  userId: string;
  page: number;
  limit?: number;
}): Promise<Quiz[]> => {
  return axios.get(`/quizzes/users/${userId}?page=` + page + '&limit=' + limit);
};

type UseUsersQuizzesOptions = {
  userId: string;
  page: number;
  limit?: number;
  config?: QueryConfig<typeof getUsersQuizzes>;
};

export const useUsersQuizzes = ({
  userId,
  page,
  limit,
  config,
}: UseUsersQuizzesOptions) => {
  return useQuery({
    ...config,
    queryKey: ['quizzes', userId, String(page)],
    queryFn: () => getUsersQuizzes({ userId, page, limit }),
  });
};
