import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';

import { Quiz } from '../types';

export const deleteQuiz = ({ quizId }: { quizId: string }) => {
  return axios.delete(`/quizzes/${quizId}`);
};

type UseDeleteQuizOptions = {
  userId: string;
  config?: MutationConfig<typeof deleteQuiz>;
};

export const useDeleteQuiz = ({ config, userId }: UseDeleteQuizOptions) => {
  return useMutation({
    onMutate: async (deletedQuiz: any) => {
      await queryClient.cancelQueries(['quizzes', userId]);

      const previousQuizzes = queryClient.getQueryData<Quiz[]>([
        'quizzes',
        userId,
      ]);

      queryClient.setQueryData(
        ['quizzes', userId],
        previousQuizzes?.filter((quiz: any) => quiz.id !== deletedQuiz.id)
      );
    },
    onError: (_, __, context: any) => {
      if (context?.previousQuizzes) {
        queryClient.setQueryData('quizzes', context.previousQuizzes);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['quizzes', userId]);
    },
    ...config,
    mutationFn: deleteQuiz,
  });
};
