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
        <Heading size="sm" letterSpacing={'normal'} ml={2}>
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
        <Link to="/app/quiz/mypage">
          <Icon as={UserIcon} w={6} h={6} />
        </Link>
      </Stack>

      <Box display="block" ml={5}>
        <Button
          size="sm"
          variant="outline"
          _hover={{ bg: 'primary.500', borderColor: 'primary.500' }}
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
      <Container color="white">{children}</Container>
    </>
  );
};
