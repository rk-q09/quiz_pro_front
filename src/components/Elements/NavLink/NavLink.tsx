import { Flex, Icon, Text } from '@chakra-ui/react';
import { Link, LinkProps } from 'react-router-dom';

type NavLinkProps = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>; 
  onClick: () => void;
} & LinkProps;

export const NavLink = ({ icon, onClick, children, ...props }: NavLinkProps) => {
  return (
    <Link {...props} onClick={onClick}>
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
      >
        {icon && (
          <Icon
            as={icon}
            mr={4}
          />
        )}
        <Text>{children}</Text>
      </Flex> 
    </Link>
  );
};
