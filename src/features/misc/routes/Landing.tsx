import { axios } from '@/lib/axios';
import { Flex, Box, Text, VStack, Button } from '@chakra-ui/react';

export const Landing = () => {
  const handleStart = async () => {
    await axios.get('/test').then((res) => console.log(res.data));
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
