import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';

import { Quiz } from '../types';

export type CreateQuizDTO = {
  data: {
    title: string;
    userId: string;
  };
};

export const createQuiz = ({ data }: CreateQuizDTO): Promise<Quiz> => {
  return axios.post('/quizzes', data);
};

type UseCreateQuizOptions = {
  userId: string;
  config?: MutationConfig<typeof createQuiz>;
};

export const useCreateQuiz = ({ config, userId }: UseCreateQuizOptions) => {
  return useMutation({
    onMutate: async (newQuiz) => {
      await queryClient.cancelQueries(['quizzes', userId]);

      const previousQuizzes = queryClient.getQueryData<Quiz[]>([
        'quizzes',
        userId,
      ]);

      queryClient.setQueryData(
        ['quizzes', userId],
        [...(previousQuizzes || []), newQuiz.data]
      );

      return { previousQuizzes };
    },
    onError: (_, __, context: any) => {
      if (context?.previousQuizzes) {
        queryClient.setQueryData(['quizzes', userId], context.previousQuizzes);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['quizzes', userId]);
    },
    ...config,
    mutationFn: createQuiz,
  });
};
