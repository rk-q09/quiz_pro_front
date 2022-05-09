import type { ReactNode } from 'react';
import { Container } from '@chakra-ui/react';

export const ContentLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Container color="white" width="full">
      {children}
    </Container>
  );
};
