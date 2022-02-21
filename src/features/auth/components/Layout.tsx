import { Heading, Flex, Box } from '@chakra-ui/layout';
import type { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
  title: string;
};

export const Layout = ({ children, title }: LayoutProps) => {
  return (
    <Flex align="center" justify="center" height="100vh">
      <Box>
        <Box
          bg="primary.800"
          color="white"
          shadow="lg"
          h="lg"
          w="lg"
          borderRadius="lg"
        >
          <Heading mt="5" mb="5" p="3" textAlign="center">
            {title}
          </Heading>
          <Box ml="50" mr="50">
            {children}
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};
