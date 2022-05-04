import { useUsersQuizzes } from '../api/getUsersQuizzes';
import { Heading, SimpleGrid, Spinner } from '@chakra-ui/react';

import { QuizExcerpt } from './QuizExcerpt';
import { ContentLayout } from '@/components/Layout/ContentLayout';

type UsersQuizListProps = {
  userId: string;
};

export const UsersQuizList = ({ userId }: UsersQuizListProps) => {
  const { data, isLoading } = useUsersQuizzes({ userId });

  if (isLoading) return <Spinner size="xl" />;

  if (!data?.length) return <Heading>No Quizzes Found</Heading>;

  return (
    <ContentLayout>
      <Heading as="h1" size="md" pt={5} mb={5}>
        Your Quiz
      </Heading>
      <SimpleGrid columns={[null, 1, 2]} gap={5}>
        {data.map((quiz, index) => (
          <QuizExcerpt
            key={quiz.id || index}
            id={quiz.id}
            title={quiz.title}
            userId={userId}
          />
        ))}
      </SimpleGrid>
    </ContentLayout>
  );
};
