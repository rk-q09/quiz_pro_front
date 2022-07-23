import { HStack, Button, Heading, Divider } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';

import { Form, InputField } from '@/components/Form';
import { ContentLayout } from '@/components/Layout';

import { useAuth } from '@/lib/auth';
import { CreateQuizDTO, useCreateQuiz } from '../api/createQuiz';

const schema = z.object({
  title: z.string().min(1, 'Required'),
});

export const CreateQuiz = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user) return <Heading size="md">Not Authorized</Heading>;

  const userId = user.id;

  const createQuizMutation = useCreateQuiz({ userId });

  return (
    <ContentLayout>
      <HStack justify="center">
        <Form<CreateQuizDTO['data'], typeof schema>
          id="create-quiz"
          onSubmit={(values) => {
            createQuizMutation
              .mutateAsync({
                data: {
                  title: values.title,
                  userId,
                },
              })
              .then((res) => {
                navigate(`./${res.id}`);
              });
          }}
          schema={schema}
        >
          {({ register, formState }) => (
            <HStack width="xl">
              <InputField
                type="text"
                label="TITLE"
                error={formState.errors['title']}
                registration={register('title')}
              />
              <Button
                isLoading={createQuizMutation.isLoading}
                aria-label="create-quiz"
                type="submit"
                size="lg"
                bg="primary.600"
                _hover={{ bg: 'primary.500' }}
              >
                <ArrowForwardIcon w={6} h={6} />
              </Button>
            </HStack>
          )}
        </Form>
      </HStack>
      <Divider mt={5} />
    </ContentLayout>
  );
};
