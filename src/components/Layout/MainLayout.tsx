import type { ReactNode } from 'react';
import {
  Box,
  Button,
  Stack,
  Heading,
  Flex,
  Container,
  Icon,
  Divider,
} from '@chakra-ui/react';
import { UserIcon, LogoutIcon } from '@heroicons/react/solid';
import { useNavigate } from 'react-router-dom';

import { Link } from '@/components/Elements/Link';

const Header = () => {
  const navigate = useNavigate();
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={4}
      color="white"
    >
      <Flex align="center">
        <Heading as="h3" size="sm" letterSpacing={'tighter'}>
          Quiz Pro
        </Heading>
      </Flex>

      <Stack
        direction="row-reverse"
        display="flex"
        alignItems="center"
        width="auto"
        flexGrow={1}
      >
        <Icon as={LogoutIcon} w={6} h={6} />
        <Link to="/app/quiz">
          <Icon as={UserIcon} w={6} h={6} />
        </Link>
      </Stack>

      <Box display="block" ml={5}>
        <Button
          size="sm"
          variant="outline"
          _hover={{ bg: 'teal.700', borderColor: 'teal.700' }}
          onClick={() => navigate('/app/quiz/new')}
        >
          Post a Quiz
        </Button>
      </Box>
      <Divider mt={2} color="whiteAlpha.500" />
    </Flex>
  );
};

type MainLayoutProps = {
  children: ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <>
      <Header />
      <Container>{children}</Container>
    </>
  );
};
