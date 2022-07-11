import { useNavigate } from 'react-router-dom';
import { Heading, Box, Text, Icon, HStack, Button } from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';

import { ContentLayout } from '@/components/Layout/ContentLayout';
import { Quiz } from '../types/index';

type GetQuizResultsProps = {
  score: number;
  questions: Quiz["questions"]; 
  answers: number[];
}

export const GetQuizResults = ({ score, questions, answers }: GetQuizResultsProps) => {
  const navigate = useNavigate();

  return (
    <ContentLayout>
      <Box my={5}>
        <Heading>{score}問正解でした!!</Heading>
      </Box>
      {questions.map((q, i) => {
        const questionIndex = i + 1;
        const answer = answers[i];
        const answerIndex = answers[i] - 1;

        return (
          <Box key={i} bg="gray.700" borderRadius="md" p={5} mb={3}>
            <HStack mb={3}>
              <Heading size="md" mb={3}>第{questionIndex}問目</Heading>
            </HStack>
            <Box
              key={i}
              mb={3}
              p={5}
              bg="gray.600"
              borderRadius="md"
            >
              {q.content}
            </Box>
            {answer === q.correctAnswer ? (
              <HStack>
                <Icon as={CheckIcon} color="green.400" />
                <Text>{q.choices[q.correctAnswer]}</Text>
              </HStack>
            ) : (
              <HStack>
                <Icon as={CloseIcon} color="red.400" />
                <Text>{q.choices[answerIndex]}</Text>
              </HStack>
            )}
          </Box>
        );
      })}
      <Box my={5}>
        <Button
          width="30%"
          bg="whiteAlpha.800"
          color="primary.600"
          border="2px"
          borderColor="primary.600"
          _hover={{ bg: 'primary.500', borderColor: 'primary.500', color: 'white' }}
          onClick={() => navigate(-1)}
        >
          戻る
        </Button>
      </Box>
    </ContentLayout>
  );
}
