import { useNavigate } from 'react-router';
import { Flex, Box, Text, VStack, Button } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';

export const Landing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleStart = () => {
    if (user) {
      navigate('/app');
    } else {
      navigate('/auth/login');
    }
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
