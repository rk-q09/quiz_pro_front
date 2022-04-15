import { Heading, Flex, Box, Spacer } from '@chakra-ui/layout';
import type { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
  title: string;
};

export const Layout = ({ children, title }: LayoutProps) => {
  return (
    <Flex align="center" justify="center" height="100vh">
      <Flex
        direction="column"
        bg="primary.800"
        color="white"
        shadow="lg"
        h="lg"
        w="lg"
        borderRadius="lg"
      >
        <Spacer />
        <Heading mb="3" textAlign="center">
          {title}
        </Heading>
        <Box ml="50" mr="50">
          {children}
        </Box>
        <Spacer />
      </Flex>
    </Flex>
  );
};
