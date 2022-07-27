import { useCallback } from 'react';
import { useQuizzes, getQuizCount } from '../api/getQuizzes';
import { Spinner } from '@chakra-ui/react';

import { QuizList } from './QuizList';
import { ContentLayout } from '@/components/Layout';
import { Pagination, usePagination } from '@/components/Pagination';

export const AllQuizList = () => {
  const getCount = useCallback(getQuizCount, []);
  const { page, perPage, sum, setPage } = usePagination({
    getCountFn: getCount,
  });
  const { data, isLoading } = useQuizzes({
    page,
    limit: perPage,
    config: { keepPreviousData: true },
  });

  if (isLoading) return <Spinner size="xl" />;

  if (!data) return null;

  return (
    <ContentLayout>
      <QuizList data={data} />
      <Pagination sum={sum} per={perPage} onChange={(e) => setPage(e.page)} />
    </ContentLayout>
  );
};
