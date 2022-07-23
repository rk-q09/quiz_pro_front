import { z } from 'zod';
import { Input, Icon, Flex, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon } from '@heroicons/react/solid';

import { Form } from '@/components/Form';

const schema = z.object({
  input: z.string().min(1),
});

type SearchQuizValues = {
  input: string;
};

export const SearchQuiz = () => {
  const navigate = useNavigate();

  return (
    <Form<SearchQuizValues>
      onSubmit={(values) => {
        navigate(`/app/quiz/search/${values.input}`);
      }}
      schema={schema}
    >
      {({ register }) => (
        <Flex align="center">
          <Input
            {...register('input')}
            type="text"
            borderRadius="3xl"
            bg="tertiary.100"
            color="black"
            autoComplete="off"
            placeholder="Search quiz"
          />
          <Button
            type="submit"
            aria-label="search-quiz"
            bg="none"
            _hover={{ bg: 'none' }}
          >
            <Icon
              as={SearchIcon}
              w={6}
              h={6}
              _hover={{ cursor: 'pointer', color: 'secondary.400' }}
            />
          </Button>
        </Flex>
      )}
    </Form>
  );
};
