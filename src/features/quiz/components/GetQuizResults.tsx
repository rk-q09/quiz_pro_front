import { useNavigate } from 'react-router-dom';
import { Heading, Box, Text, Icon, HStack, Button } from '@chakra-ui/react';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';

import { ContentLayout } from '@/components/Layout';
import { Quiz } from '../types/index';

type GetQuizResultsProps = {
  score: number;
  questions: Quiz['questions'];
  answers: number[];
};

export const GetQuizResults = ({
  score,
  questions,
  answers,
}: GetQuizResultsProps) => {
  const navigate = useNavigate();

  return (
    <ContentLayout>
      <Box mt={5} mb={8}>
        <Heading>{score}問正解でした!!</Heading>
      </Box>
      {questions.map((q, i) => {
        const answerIndex = answers[i] - 1;
        const questionIndex = i + 1;

        return (
          <Box key={i}>
            <Heading size="sm" mt={10} mb={2}>
              第{questionIndex}問目
            </Heading>
            <Box bg="tertiary.800" borderRadius="md" mb={3} overflow="hidden">
              {/* ---- クイズ本文 ---- */}
              <Box mb={3} p={5} bg="tertiary.700">
                {q.content}
              </Box>
              {/* ---- 解答 ---- */}
              {answers[i] === q.correctAnswer ? (
                <HStack m={3}>
                  <Icon as={CheckIcon} color="secondary.500" />
                  <Text>{q.choices[answerIndex]}</Text>
                </HStack>
              ) : (
                <>
                  <HStack m={3}>
                    <Icon as={CloseIcon} color="red.400" />
                    <Text>{q.choices[answerIndex]}</Text>
                  </HStack>
                  <HStack m={3} gap={1}>
                    <Text>正解は...</Text>
                    <Text>{q.choices[q.correctAnswer - 1]}</Text>
                  </HStack>
                </>
              )}
            </Box>
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
          _hover={{
            bg: 'primary.500',
            borderColor: 'primary.500',
            color: 'white',
          }}
          onClick={() => navigate(-1)}
        >
          戻る
        </Button>
      </Box>
    </ContentLayout>
  );
};
