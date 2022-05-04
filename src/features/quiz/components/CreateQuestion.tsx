import { useState, useEffect } from 'react';
import { Heading, Container, Button, Text } from '@chakra-ui/react';
import * as z from 'zod';
import { useParams, useNavigate} from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { InputField } from '@/components/Form';
import { CreateQuestionDTO } from '../api/createQuestion';
import { RadioGroup } from '@/components/Form/RadioGroup';
import { ContentLayout } from '@/components/Layout/ContentLayout';

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
  const { register, control, reset, handleSubmit, formState } = useForm<CreateQuestionDTO['data']>({
    defaultValues: {
      content: formData[0]?.content,
      choices1: formData[0]?.choices1,
      choices2: formData[0]?.choices2,
      choices3: formData[0]?.choices3,
      choices4: formData[0]?.choices4,
      answer: formData[0]?.answer
    },
    resolver: zodResolver(schema) 
  });

  const onSubmit = (data: CreateQuestionDTO['data']) => {
    if (questionNum < 4) {
      useQuestionStore.getState().addQuestion(data);
      setQuestionNum(prev => prev + 1);
    } else {
      useQuestionStore.getState().addQuestion(data);
      navigate(`../new/result/${quizId}`); 
    }
  }

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      if (formData[questionNum]) {
        reset({
          content: formData[questionNum]?.content,
          choices1: formData[questionNum]?.choices1,
          choices2: formData[questionNum]?.choices2,
          choices3: formData[questionNum]?.choices3,
          choices4: formData[questionNum]?.choices4,
          answer: formData[questionNum]?.answer
        });
      } else {
        reset({ 
          content: "",
          choices1: "",
          choices2: "",
          choices3: "",
          choices4: "",
          answer: ""
        });
      }
    }
  }, [formState, reset, questionNum]); 

  if (!quizId) return <p>No quizId</p>;

  return (
    <ContentLayout>
      <Heading color="white" size="lg" mb={5}>
        Create Question
      </Heading>
      <Text color="white" mb={3}>{questionNum + 1} 問目</Text>
      <form onSubmit={handleSubmit(onSubmit)}>
          <Container color="white">
            <InputField
              type="text"
              label="内容"
              registration={register('content')}
            />
            <InputField
              type="text"
              label="選択肢1"
              registration={register('choices1')}
            />
            <InputField
              type="text"
              label="選択肢2"
              registration={register('choices2')}
            />
            <InputField
              type="text"
              label="選択肢3"
              registration={register('choices3')}
            />
            <InputField
              type="text"
              label="選択肢4"
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
              bg="purple.800"
              _hover={{ bg: 'purple.700' }}
            >
              Next
            </Button>
          </Container>
      </form>
    </ContentLayout>
  );
};
