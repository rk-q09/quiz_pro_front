import { Heading, Button, Box, Text, Flex } from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { useNavigate, useParams } from 'react-router-dom';

import { useQuiz } from '../api/getQuiz';
import { createQuestion } from '../api/createQuestion';
import { useQuestionStore } from '@/stores/questions';
import { ContentLayout } from '@/components/Layout/ContentLayout';

export const CreateQuestionResult = () => {
  const { questions } = useQuestionStore();
  const navigate = useNavigate();
  const { quizId } = useParams();

  const onSubmit = () => {
    if (quizId) {
      const requests = questions.map(q => {
        const { content, choices1, choices2, choices3, choices4, answer } = q;
        return createQuestion({ 
          quizId, 
          data: { content, choices1, choices2, choices3, choices4, answer }
        });   
      });
      Promise.all(requests)
        .then(() => {
          navigate("../../");
        });
    }
  } 

  if (questions.length === 0) {
    if (quizId) {
      const { data, isLoading } = useQuiz({quizId});
      
      if (isLoading) {
        <p>Loading...</p>
      }
      
      if (!data) {
        return null
      }

      return (
        <ContentLayout>
          <Heading>{data.title}</Heading>
          <Button
            width="30%"
            bg="whiteAlpha.800"
            color="purple.800"
            border="2px"
            borderColor="purple.800"
            _hover={{ bg: 'purple.700', color: 'whiteAlpha.800' }}
            onClick={() => navigate(-1)}
          >
            入力画面に戻る
          </Button>
        </ContentLayout>
      );
    } else {
      return null
    }
  }

  return (
    <ContentLayout>
      <Heading mb={5}>確認画面</Heading> 

      {questions.map((q, i) => {
        const choices = [q.choices1, q.choices2, q.choices3, q.choices4];
        const answer = Number(q.answer);

        return (
          <Box key={i} bg="gray.700" borderRadius="md" p={5} mb={3}>
            <Heading size="md" mb={3}>第{++i}問目</Heading>
            <Box
              key={i}
              mb={3}
              p={5}
              bg="gray.600"
              borderRadius="md"
            >
              {q.content}
            </Box>
            {choices.map((choice, i) => { 
              const index = ++i;
              return(
                <Flex key={i} color={answer === index ? "green.500" : ""} gap="2">
                  {answer === index ? <CheckIcon mt={0.5} /> : null}
                  <Text key={i} mb={3}>{choice}</Text>
                </Flex>
              );
            })}
          </Box>
        );
      })}

      <Flex mt={3} justifyContent="space-between">
        <Button
          width="30%"
          bg="whiteAlpha.800"
          color="purple.800"
          border="2px"
          borderColor="purple.800"
          _hover={{ bg: 'purple.700', color: 'whiteAlpha.800' }}
          onClick={() => navigate(-1)}
        >
          入力画面に戻る
        </Button>
        <Button
          width="30%"
          bg="purple.800"
          _hover={{ bg: 'purple.700' }}
          onClick={onSubmit}
        >
          送信
        </Button>
      </Flex>
    </ContentLayout>
  );
} 