import { useCallback } from 'react';
import { Spinner, Heading } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import {
  searchQuizzesCount,
  useSearchQuizzes,
  SearchQuizzesCountProps,
} from '../api/searchQuizzes';
import { QuizList } from './QuizList';
import { ContentLayout } from '@/components/Layout';
import { Pagination, usePagination } from '@/components/Pagination';

export const SearchQuizResults = () => {
  const { word } = useParams();

  if (!word) return <p>検索ワードの取得に失敗しました</p>;

  const getCount = useCallback(searchQuizzesCount, [word]);
  const { page, perPage, sum, setPage } =
    usePagination<SearchQuizzesCountProps>({
      getCountKey: { word },
      getCountWithKeyFn: getCount,
    });

  const { data, isLoading } = useSearchQuizzes({
    word,
    page,
    limit: perPage,
    config: { keepPreviousData: true },
  });

  if (isLoading) return <Spinner size="xl" />;

  if (!data) return <Heading>No Match Results</Heading>;

  return (
    <ContentLayout>
      <QuizList data={data} />
      <Pagination sum={sum} per={perPage} onChange={(e) => setPage(e.page)} />
    </ContentLayout>
  );
};
