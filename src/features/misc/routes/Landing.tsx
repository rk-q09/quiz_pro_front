import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Flex, VStack, Button, Heading, Icon } from '@chakra-ui/react';
import { ChevronDoubleDownIcon } from '@heroicons/react/outline';
import { motion, Variants, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import { useAuth } from '@/lib/auth';
import { MotionBox, MotionFlex } from '@/components/FramerMotion';

const container: Variants = {
  hidden: {
    opacity: 1,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.1
    }
  }
};

const letterAnimation: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1
  }
};

export const Landing = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const welcomeLetters = [..."Welcome to QUIZPRO"];

  const headingControls = useAnimation();
  const arrowControls = useAnimation();
  const detailControls = useAnimation(); 
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true
  });

  useEffect(() => {
    const startAnimations = async () => {
      await detailControls.start({
        opacity: 1,
        transition: {
          duration: 2
        }
      });
      arrowControls.start({
        opacity: 0
      });
    }
    const startAnimation = async () => {
      await headingControls.start("visible");
      await arrowControls.start({
        opacity: 1,
        transition: {
          ease: "easeInOut",
          duration: 2,
          repeat: Infinity
        }
      });
    }
    if (inView) {
      startAnimations();
    } else {
      startAnimation();
    }
  }, [detailControls, inView]);

  const handleStart = () => {
    if (user) {
      navigate('/app');
    } else {
      navigate('/auth/login');
    }
  };

  return (
    <>
      <Flex align="center" justify="center" height="100vh" color="white" pos="relative">
        <VStack>
          <MotionBox initial="hidden" animate={headingControls} variants={container} mb={5}>
            <Heading size="4xl">
              {welcomeLetters.map((l, i) => (
                  <motion.span key={i} variants={letterAnimation}>{l}</motion.span>
              ))}
            </Heading>
          </MotionBox>
          <MotionFlex 
            initial={{ opacity: 0 }} 
            animate={arrowControls} 
            align="center" 
            direction="column" 
            pos="absolute"
            bottom="10"
          >
            <Heading size="xl">Scroll</Heading>
            <Icon as={ChevronDoubleDownIcon} h={10} w={10}/>
          </MotionFlex>
        </VStack>
      </Flex>
      <Flex align="center" justify="center" height="100vh" color="white">
          <MotionBox ref={ref} initial={{ opacity: 0 }} animate={detailControls}>
            <Button onClick={handleStart} colorScheme="teal">
              get started
            </Button>
          </MotionBox>
      </Flex>
    </>
  );
};
