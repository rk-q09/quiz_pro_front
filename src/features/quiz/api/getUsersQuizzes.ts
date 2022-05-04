import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';

import { Quiz } from '../types';

export const getUsersQuizzes = ({
  userId,
}: {
  userId: string;
}): Promise<Quiz[]> => {
  return axios.get(`/quizzes/users/${userId}`);
};

type UseUsersQuizzesOptions = {
  userId: string;
  config?: QueryConfig<typeof getUsersQuizzes>;
};

export const useUsersQuizzes = ({ userId, config }: UseUsersQuizzesOptions) => {
  return useQuery({
    ...config,
    queryKey: ['quizzes', userId],
    queryFn: () => getUsersQuizzes({ userId }),
  });
};
