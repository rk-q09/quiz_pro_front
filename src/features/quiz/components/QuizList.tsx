import { useQuizzes } from '../api/getQuizzes';
import { Heading, SimpleGrid, Spinner } from '@chakra-ui/react';

import { ContentLayout } from '@/components/Layout/ContentLayout';
import { QuizExcerpt } from './QuizExcerpt';

export const QuizList = () => {
  const { data, isLoading } = useQuizzes();

  if (isLoading) return <Spinner size="xl" />;

  if (!data) return null;

  return (
    <ContentLayout>
      <Heading as="h1" size="md" pt={5} mb={5}>
        Quiz
      </Heading>
      <SimpleGrid columns={[null, 1, 2]} gap={5}>
        {data.map((quiz, index) => (
          <QuizExcerpt key={quiz.id || index} id={quiz.id} title={quiz.title} />
        ))}
      </SimpleGrid>
    </ContentLayout>
  );
};
