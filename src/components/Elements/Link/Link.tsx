import { Link as RouterLink, LinkProps } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';

export const Link = ({ children, ...props }: LinkProps) => {
  return (
    <ChakraLink as={RouterLink} {...props}>
      {children}
    </ChakraLink>
  );
};
