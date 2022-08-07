import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Flex, Button, Heading, Icon, Text } from '@chakra-ui/react';
import { ChevronDoubleDownIcon } from '@heroicons/react/outline';
import { GoMarkGithub } from 'react-icons/go';
import { motion, useAnimation, useInView } from 'framer-motion';

import { useAuth } from '@/lib/auth';
import { MotionBox, MotionFlex } from '@/components/FramerMotion';
import {
  letterAnimate,
  blinkAnimate,
  slideInAnimate,
  popUpAnimate,
} from '../animations/variants';

export const Landing = () => {
  const ref = useRef(null);
  const navigate = useNavigate();
  const isInView = useInView(ref, { amount: 'all' });
  const { user } = useAuth();

  const welcomeLetters = [...'Welcome to QUIZPRO'];

  const headingControls = useAnimation();
  const scrollIconControls = useAnimation();
  const startBtnControls = useAnimation();

  // スクロールしたら、2ページ目のアニメーションを開始し
  // スクロールアイコンを非表示にする
  useEffect(() => {
    async function startPage1() {
      await headingControls.start('visible');
      await scrollIconControls.start('visible');
    }

    async function startPage2() {
      await scrollIconControls.start('hidden');
      await startBtnControls.start('visible');
    }

    if (isInView) {
      startPage2();
    } else {
      startPage1();
    }
  }, [startBtnControls, isInView]);

  const handleStart = () => {
    if (user) {
      navigate('/app');
    } else {
      navigate('/auth/login');
    }
  };

  return (
    <>
      {/* ---- Page 1 ----- */}
      <Flex
        w="full"
        h="100vh"
        align="center"
        justify="center"
        color="white"
        position="relative"
      >
        <MotionBox
          initial="hidden"
          animate={headingControls}
          transition={{ delayChildren: 0.3, staggerChildren: 0.1 }}
          mb={5}
        >
          <Heading size={{ base: '2xl', md: '3xl' }}>
            {welcomeLetters.map((l, i) => (
              <motion.span key={i} variants={letterAnimate}>
                {l}
              </motion.span>
            ))}
          </Heading>
        </MotionBox>
        <MotionFlex
          initial="hidden"
          animate={scrollIconControls}
          variants={blinkAnimate}
          align="center"
          direction="column"
          pos="absolute"
          bottom="10"
        >
          <Heading size="xl">Scroll</Heading>
          <Icon as={ChevronDoubleDownIcon} h={10} w={10} />
        </MotionFlex>
      </Flex>

      {/* ---- Page 2 ----- */}
      <MotionFlex
        w="full"
        h="100vh"
        align="center"
        justify="center"
        color="white"
        initial="hidden"
        animate={startBtnControls}
        transition={{ staggerChildren: 0.3 }}
      >
        <MotionBox variants={slideInAnimate}>
          <Button
            size="lg"
            color="tertiary.900"
            bg="secondary.500"
            _hover={{ bg: 'secondary.400' }}
            onClick={() => handleStart()}
          >
            get started
          </Button>
        </MotionBox>
        <MotionFlex
          w="full"
          h="90px"
          direction="row"
          justify="space-between"
          pos="absolute"
          left="0"
          bottom="0"
          variants={popUpAnimate}
        >
          {/* ---- Footer ---- */}
          <Flex align="center" justify="center" ml={5} fontSize="sm">
            <Text>
              このWebサイトは転職活動の為のポートフォリオとして作成したものです。
            </Text>
          </Flex>

          <Flex gap={4} ref={ref}>
            <Flex align="center" gap={3} fontSize={{ base: 'xs', md: 'sm' }}>
              <Icon as={GoMarkGithub} w={8} h={8} />
              <a
                target="_blank"
                rel="noreferrer"
                href="https://github.com/rk-q09/quiz_pro_api"
              >
                Express API
              </a>
            </Flex>

            <Flex
              align="center"
              gap={3}
              mr={5}
              fontSize={{ base: 'xs', md: 'sm' }}
            >
              <Icon as={GoMarkGithub} w={8} h={8} />
              <a
                target="_blank"
                rel="noreferrer"
                href="https://github.com/rk-q09/quiz_pro_front"
              >
                React App
              </a>
            </Flex>
          </Flex>
        </MotionFlex>
      </MotionFlex>
    </>
  );
};
