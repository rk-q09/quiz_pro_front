import { Heading, Box, Flex, Text } from '@chakra-ui/react';
// import { CheckIcon, CloseIcon } from '@chakra-ui/icons';

import { ContentLayout } from '@/components/Layout/ContentLayout';
import { Quiz } from '../types/index';

type GetQuizResultsProps = {
  score: number;
  questions: Quiz["questions"]; 
  answers: number[];
}

export const GetQuizResults = ({ score, questions, answers }: GetQuizResultsProps) => {
  console.log(answers);

  return (
    <ContentLayout>
      <Box my={5}>
        <Heading>{score}問正解でした!!</Heading>
      </Box>
      {questions.map((q, i) => {
        const questionIndex = ++i;
        return (
          <Box key={i} bg="gray.700" borderRadius="md" p={5} mb={3}>
            <Heading size="md" mb={3}>第{questionIndex}問目</Heading>
            <Box
              key={i}
              mb={3}
              p={5}
              bg="gray.600"
              borderRadius="md"
            >
              {q.content}
            </Box>
            {q.choices.map((choice, i) => { 
              return(
                <Flex
                  key={i}
                  gap={3}
                >
                  <Text key={i} mb={3}>{choice}</Text>
                </Flex>
              );
            })}
              {/*  <Flex 
                  key={i} 
                  color={q.correctAnswer === choiceIndex ? "green.500" 
                    : answers[choiceIndex] === choiceIndex ? "red.500"
                    : ""} 
                  gap="2"
                >
                  {q.correctAnswer === choiceIndex ? <CheckIcon mt={0.5} /> 
                    : answers[choiceIndex] === choiceIndex ? <CloseIcon mt={0.5} /> : null
                  }
                  <Text key={i} mb={3}>{choice}</Text>
                </Flex>
              */}
          </Box>
        );
      })}
      <Box my={5}>
        
      </Box>
    </ContentLayout>
  );
}
