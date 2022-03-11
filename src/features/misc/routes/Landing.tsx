import { useNavigate } from 'react-router';
import { Flex, Box, Text, VStack, Button } from '@chakra-ui/react';

export const Landing = () => {
  const navigate = useNavigate();

  const handleStart = async () => {
    navigate('/auth/signin');
  };

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" h="lg" w="lg" borderRadius="lg">
        <VStack m={40}>
          <Text color="black">Welcome to QUIZPRO</Text>
          <Button onClick={handleStart} colorScheme="teal">
            get started
          </Button>
        </VStack>
      </Box>
    </Flex>
  );
};
