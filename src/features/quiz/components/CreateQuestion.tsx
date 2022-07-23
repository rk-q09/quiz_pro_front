import { useState, useEffect } from 'react';
import { Heading, Container, Button } from '@chakra-ui/react';
import * as z from 'zod';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { InputField, RadioGroup } from '@/components/Form';
import { CreateQuestionDTO } from '../api/createQuestion';
import { ContentLayout } from '@/components/Layout';

import { useQuestionStore } from '@/stores/questions';

const schema = z.object({
  content: z.string().min(1, 'Required'),
  choices1: z.string().min(1, 'Required'),
  choices2: z.string().min(1, 'Required'),
  choices3: z.string().min(1, 'Required'),
  choices4: z.string().min(1, 'Required'),
  answer: z.string().min(1, 'Required'),
});

export const CreateQuestion = () => {
  const [questionNum, setQuestionNum] = useState(0);
  const { quizId } = useParams();
  const navigate = useNavigate();

  const formData = useQuestionStore.getState().questions;
  const { register, control, reset, handleSubmit, formState } = useForm<
    CreateQuestionDTO['data']
  >({
    defaultValues: {
      content: formData[0]?.content,
      choices1: formData[0]?.choices1,
      choices2: formData[0]?.choices2,
      choices3: formData[0]?.choices3,
      choices4: formData[0]?.choices4,
      answer: formData[0]?.answer,
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: CreateQuestionDTO['data']) => {
    if (questionNum < 4) {
      useQuestionStore.getState().addQuestion(data);
      setQuestionNum((prev) => prev + 1);
    } else {
      useQuestionStore.getState().addQuestion(data);
      navigate(`../new/result/${quizId}`);
    }
  };

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      if (formData[questionNum]) {
        reset({
          content: formData[questionNum]?.content,
          choices1: formData[questionNum]?.choices1,
          choices2: formData[questionNum]?.choices2,
          choices3: formData[questionNum]?.choices3,
          choices4: formData[questionNum]?.choices4,
          answer: formData[questionNum]?.answer,
        });
      } else {
        reset({
          content: '',
          choices1: '',
          choices2: '',
          choices3: '',
          choices4: '',
          answer: '',
        });
      }
    }
  }, [formState, reset, questionNum]);

  if (!quizId) return <p>No quizId</p>;

  return (
    <ContentLayout>
      <Heading size="md" mb={3}>
        {questionNum + 1} 問目
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container color="white">
          <InputField
            type="text"
            label="内容"
            error={formState.errors['content']}
            registration={register('content')}
          />
          <InputField
            type="text"
            label="選択肢1"
            error={formState.errors['choices1']}
            registration={register('choices1')}
          />
          <InputField
            type="text"
            label="選択肢2"
            error={formState.errors['choices2']}
            registration={register('choices2')}
          />
          <InputField
            type="text"
            label="選択肢3"
            error={formState.errors['choices3']}
            registration={register('choices3')}
          />
          <InputField
            type="text"
            label="選択肢4"
            error={formState.errors['choices4']}
            registration={register('choices4')}
          />
          <RadioGroup<CreateQuestionDTO['data']>
            control={control}
            name="answer"
            label="正解番号"
            radioValues={['1', '2', '3', '4']}
          />
          <Button
            type="submit"
            width="full"
            mt={3}
            bg="primary.600"
            _hover={{ bg: 'primary.500' }}
          >
            Next
          </Button>
        </Container>
      </form>
    </ContentLayout>
  );
};
