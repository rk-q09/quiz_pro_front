import { Button, Icon } from '@chakra-ui/react';
import { TrashIcon } from '@heroicons/react/solid';

import { useDeleteQuiz } from '../api/deleteQuiz';

type DeleteQuizProps = {
  id: string;
  userId: string;
};

export const DeleteQuiz = ({ id, userId }: DeleteQuizProps) => {
  const { isLoading, mutateAsync } = useDeleteQuiz({ userId });

  const handleChildElementClick = async (e: any) => {
    e.stopPropagation();
    if (window.confirm('本当に削除してもよいですか？')) {
      await mutateAsync({ quizId: id });
    }
  };

  return (
    <Button
      size="sm"
      bg="transparent"
      color="black"
      _hover={{ bg: 'transparent', color: 'grey' }}
      isLoading={isLoading}
      onClick={async (e) => {
        await handleChildElementClick(e);
      }}
    >
      <Icon as={TrashIcon} w={5} h={5} color="whiteAlpha.600"/>
    </Button>
  );
};
