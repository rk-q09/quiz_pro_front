import { useNavigate } from 'react-router-dom';
import { Flex, Heading } from '@chakra-ui/react';

import { DeleteQuiz } from './DeleteQuiz';

type QuizExcerptProps = {
  id: string;
  userId: string | null;
  title: string;
};

export const QuizExcerpt = ({ id, userId, title }: QuizExcerptProps) => {
  const navigate = useNavigate();

  return (
    <Flex
      justify="space-between"
      bg="primary.700"
      borderRadius="lg"
      p={5}
      h={100}
      _hover={{ bg: "primary.600", cursor: "pointer" }} 
      onClick={() => navigate(`../${id}`)}
    >
      <Heading as="h2" size="md">
        {title}
      </Heading>
      {userId && (<DeleteQuiz id={id} userId={userId} />)}
    </Flex>
  );
};
