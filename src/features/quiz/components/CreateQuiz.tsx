import { Center, Button, Heading, Divider } from '@chakra-ui/react';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';

import { Form, InputField } from '@/components/Form';
import { ContentLayout } from '@/components/Layout/ContentLayout';

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
      <Heading size="lg" mb={5}>
        Post Quiz
      </Heading>
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
          <>
            <InputField
              type="text"
              label="TITLE"
              error={formState.errors['title']}
              registration={register('title')}
            />
            <Center>
              <Button
                isLoading={createQuizMutation.isLoading}
                type="submit"
                width="full"
                bg="purple.800"
                _hover={{ bg: 'purple.700' }}
              >
                Submit
              </Button>
            </Center>
          </>
        )}
      </Form>
      <Divider mt={10} />
    </ContentLayout>
  );
};
