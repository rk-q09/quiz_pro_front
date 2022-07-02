import { Spinner, Heading } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';

import { useSearchQuizzes } from '../api/searchQuizzes';
import { QuizList } from './QuizList';

export const SearchQuizResults = () => {
  const { word } = useParams();
  
  if (!word) return <p>検索ワードの取得に失敗しました</p>;
  
  const { data, isLoading } = useSearchQuizzes({ word });

  if (isLoading) return <Spinner size="xl" />

  if (!data) return <Heading>No Match Results</Heading> 

  return (
    <QuizList data={data} />
  );
};
