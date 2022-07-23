import type { ReactNode } from 'react';
import { Flex, Icon, Text } from '@chakra-ui/react';

type NavButtonProps = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  onClick: () => void;
  children: ReactNode;
};

export const NavButton = ({ icon, onClick, children }: NavButtonProps) => {
  return (
    <Flex
      align="center"
      p={4}
      mx={4}
      w="full"
      maxH="50px"
      borderRadius="lg"
      cursor="pointer"
      _hover={{
        bg: 'secondary.400',
      }}
      onClick={onClick}
    >
      {icon && <Icon as={icon} mr={4} />}
      <Text fontWeight="normal">{children}</Text>
    </Flex>
  );
};
