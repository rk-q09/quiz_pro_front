import { useUsersQuizzes } from '../api/getUsersQuizzes';
import { Heading, Container, Grid, GridItem } from '@chakra-ui/react';

import { QuizExcerpt } from './QuizExcerpt';

type UsersQuizListProps = {
  userId: string;
};

export const UsersQuizList = ({ userId }: UsersQuizListProps) => {
  const { data, isLoading } = useUsersQuizzes({ userId });

  if (isLoading) return <Heading>Loading...</Heading>;

  if (!data?.length) return <Heading>No Quizzes Found</Heading>;

  console.log(data);

  return (
    <Container>
      <Heading as="h3" size="md" pt={5} mb={5}>
        Your Quiz
      </Heading>
      <Grid
        templateColumns={['null', 'repeat(1, 1fr)', 'repeat(2, 1fr)']}
        gap={5}
      >
        {data.map((quiz, index) => (
          <GridItem key={quiz.id || index}>
            <QuizExcerpt
              key={quiz.id || index}
              id={quiz.id}
              title={quiz.title}
              userId={userId}
            />
          </GridItem>
        ))}
      </Grid>
    </Container>
  );
};
