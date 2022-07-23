import { Heading, SimpleGrid } from '@chakra-ui/react';

import { ContentLayout } from '@/components/Layout';
import { QuizExcerpt } from './QuizExcerpt';
import { Quiz } from '../types';

type QuizListProps = {
  data: Quiz[];
  userId?: string;
};

export const QuizList = ({ data, userId }: QuizListProps) => {
  return (
    <ContentLayout>
      <Heading as="h1" size="md" pt={5} mb={5}>
        Quiz
      </Heading>
      <SimpleGrid columns={[null, 1, 2]} gap={5}>
        {data.map((quiz, index) => (
          <QuizExcerpt
            key={quiz.id || index}
            id={quiz.id}
            title={quiz.title}
            userId={userId ? userId : null}
          />
        ))}
      </SimpleGrid>
    </ContentLayout>
  );
};
