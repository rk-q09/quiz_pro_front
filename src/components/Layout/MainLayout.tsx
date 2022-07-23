import { useRef } from 'react';
import type { ReactNode } from 'react';
import {
  Box,
  Button,
  HStack,
  Heading,
  Flex,
  Container,
  IconButton,
  Divider,
  Spacer,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  useBreakpointValue,
  useDisclosure
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { UserIcon } from '@heroicons/react/solid';
import { LogoutIcon, DocumentAddIcon } from '@heroicons/react/outline';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/lib/auth';
import { Link, NavLink, NavButton } from '@/components/Elements';
import { SearchQuiz } from '@/features/quiz/components/SearchQuiz';

const Header = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();
  const btnRef = useRef<HTMLButtonElement>(null);
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

      <Box>
        <SearchQuiz />
      </Box>

      <Spacer />

        {isMobile ? (
          <>
            <IconButton 
              as={HamburgerIcon} 
              ref={btnRef} 
              aria-label="menu" 
              bg="none" 
              _hover={{ cursor: 'pointer', color: 'secondary.400' }} 
              onClick={onOpen} 
            />
            <Drawer
              isOpen={isOpen}
              placement="right"
              onClose={onClose}
              finalFocusRef={btnRef}
            >
              <DrawerOverlay />
              <DrawerContent bg="tertiary.300">
                <DrawerCloseButton />
                <DrawerBody>
                  <DrawerHeader>Quiz Pro</DrawerHeader>
                  <NavLink icon={UserIcon} to="/app/mypage" onClick={onClose}>My Page</NavLink>
                  <NavLink icon={DocumentAddIcon} to="/app/quiz/new" onClick={onClose}>Post a Quiz</NavLink>
                  <NavButton icon={LogoutIcon} onClick={() => onLogout()}>Logout</NavButton>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </>
        ) : (
          <HStack
            alignItems="center"
          >
            <IconButton 
              as={LogoutIcon} 
              aria-label="logout"
              w={6} 
              h={6} 
              size="sm"
              bg="none"
              _hover={{ cursor: 'pointer', color: 'secondary.400' }} 
              onClick={() => onLogout()}
            />
            <IconButton 
              as={UserIcon} 
              aria-label="mypage"
              w={6} 
              h={6} 
              size="sm"
              bg="none"
              _hover={{ color: 'secondary.400' }}  
              onClick={() => navigate('/app/quiz/mypage')}
            />
            <Button
              size="sm"
              variant="outline"
              _hover={{ bg: 'primary.500', borderColor: 'primary.500' }}
              onClick={() => navigate('/app/quiz/new')}
            >
              Post a Quiz
            </Button>
          </HStack>
        )}

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
