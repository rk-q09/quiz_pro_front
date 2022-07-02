import { useQuizzes } from '../api/getQuizzes';
import { Spinner } from '@chakra-ui/react';

import { QuizList } from './QuizList';

export const AllQuizList = () => {
  const { data, isLoading } = useQuizzes();

  if (isLoading) return <Spinner size="xl" />;

  if (!data) return null;

  return (
    <QuizList data={data} />
  );
};
