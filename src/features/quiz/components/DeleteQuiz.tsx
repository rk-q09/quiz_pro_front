import { Button, Icon } from '@chakra-ui/react';
import { TrashIcon } from '@heroicons/react/solid';

import { useDeleteQuiz } from '../api/deleteQuiz';

type DeleteQuizProps = {
  id: string;
  userId: string;
};

export const DeleteQuiz = ({ id, userId }: DeleteQuizProps) => {
  const { isLoading, mutateAsync } = useDeleteQuiz({ userId });

  return (
    <Button
      size="sm"
      bg="transparent"
      color="black"
      _hover={{ bg: 'transparent', color: 'grey' }}
      isLoading={isLoading}
      onClick={async () => {
        if (window.confirm('Are you sure?')) await mutateAsync({ quizId: id });
      }}
    >
      <Icon as={TrashIcon} w={5} h={5} />
    </Button>
  );
};
