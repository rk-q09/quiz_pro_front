import type { ReactNode } from 'react';
import {
  Box,
  Button,
  HStack,
  Heading,
  Flex,
  Container,
  Icon,
  Divider,
  Spacer
} from '@chakra-ui/react';
import { UserIcon } from '@heroicons/react/solid';
import { LogoutIcon } from '@heroicons/react/outline';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/lib/auth';
import { Link } from '@/components/Elements/Link';
import { SearchQuiz } from '@/features/quiz/components/SearchQuiz';

const Header = () => {
  const navigate = useNavigate();
  const { logout } = useAuth(); 

  const onLogout = async () => {
    await logout();
    navigate('/');
  }

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={4}
      color="white"
    >
      <Box> 
        <Heading size="sm" letterSpacing={'normal'} ml={2} _hover={{ color: 'secondary.400' }} >
          <Link to="/app">
            Quiz Pro
          </Link>
        </Heading>
      </Box>

      <Spacer />

      <Box width={[null, "200px", "300px"]}>
        <SearchQuiz />
      </Box>

      <Spacer />

      <HStack
        alignItems="center"
      >
        <Icon 
          as={LogoutIcon} 
          w={6} 
          h={6} 
          mb={1}
          _hover={{ cursor: 'pointer', color: 'secondary.400' }} 
          onClick={() => onLogout()}
        />
        <Link to="/app/quiz/mypage">
          <Icon as={UserIcon} w={6} h={6} _hover={{ color: 'secondary.400' }}  />
        </Link>
        <Button
          size="sm"
          variant="outline"
          _hover={{ bg: 'primary.500', borderColor: 'primary.500' }}
          onClick={() => navigate('/app/quiz/new')}
        >
          Post a Quiz
        </Button>
      </HStack>

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
