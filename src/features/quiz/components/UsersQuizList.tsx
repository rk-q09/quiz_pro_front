import { useCallback } from 'react';
import { Heading, Spinner } from '@chakra-ui/react';

import {
  useUsersQuizzes,
  getUsersQuizzesCount,
  GetUsersQuizzesCountProps,
} from '../api/getUsersQuizzes';
import { QuizList } from './QuizList';
import { Pagination, usePagination } from '@/components/Pagination';

type UsersQuizListProps = {
  userId: string;
};

export const UsersQuizList = ({ userId }: UsersQuizListProps) => {
  const getCount = useCallback(getUsersQuizzesCount, [userId]);
  const { page, perPage, sum, setPage } =
    usePagination<GetUsersQuizzesCountProps>({
      getCountKey: { userId },
      getCountWithKeyFn: getCount,
    });
  const { data, isLoading } = useUsersQuizzes({
    userId,
    page,
    limit: perPage,
    config: { keepPreviousData: true },
  });

  if (isLoading) return <Spinner size="xl" />;

  if (!data?.length) return <Heading>No Quizzes Found</Heading>;

  return (
    <>
      <QuizList data={data} userId={userId} />
      <Pagination sum={sum} per={perPage} onChange={(e) => setPage(e.page)} />
    </>
  );
};
