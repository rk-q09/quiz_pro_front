import { Flex, Heading } from '@chakra-ui/react';

import { DeleteQuiz } from './DeleteQuiz';

type QuizExcerptProps = {
  id: string;
  userId: string;
  title: string;
};

export const QuizExcerpt = ({ id, userId, title }: QuizExcerptProps) => {
  return (
    <Flex
      justify="space-between"
      bg="primary.600"
      borderRadius="lg"
      p={5}
      h={100}
    >
      <Heading as="h2" size="md">
        {title}
      </Heading>
      <DeleteQuiz id={id} userId={userId} />
    </Flex>
  );
};
