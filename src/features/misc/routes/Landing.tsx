import { useNavigate } from 'react-router';
import { Flex, Heading, VStack, Button } from '@chakra-ui/react';

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
    <Flex align="center" justify="center" height="100vh" color="white">
      <VStack>
        <Heading size="4xl" mb={3}>Welcome to QUIZPRO</Heading>
        <Button onClick={handleStart} colorScheme="teal">
          get started
        </Button>
      </VStack>
    </Flex>
  );
};
