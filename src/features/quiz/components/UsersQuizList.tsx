import { useUsersQuizzes } from '../api/getUsersQuizzes';
import { Heading, Spinner } from '@chakra-ui/react';

import { QuizList } from './QuizList';

type UsersQuizListProps = {
  userId: string;
};

export const UsersQuizList = ({ userId }: UsersQuizListProps) => {
  const { data, isLoading } = useUsersQuizzes({ userId });

  if (isLoading) return <Spinner size="xl" />;

  if (!data?.length) return <Heading>No Quizzes Found</Heading>;

  return (
    <QuizList data={data} userId={userId} />
  );
};
