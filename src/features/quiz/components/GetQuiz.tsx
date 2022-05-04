import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Heading, Spinner } from '@chakra-ui/react';
import { useAnimation, Variants } from 'framer-motion';

import { GetQuizResults } from './GetQuizResults';
import { ContentLayout } from '@/components/Layout';
import { MotionFlex, MotionBox, MotionHeading } from '@/components/FramerMotion';
import { useQuiz } from '../api/getQuiz';

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
      staggerChildren: 0.5
    }
  }
};

const contentAnimation: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 1
    }
  }
}

const choiceAnimation: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

export const GetQuiz = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gameEnded, setGameEnded] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]); 
  
  const { quizId } = useParams();

  const containerControls = useAnimation();
  const contentControls = useAnimation();

  if (!quizId) return null;

  const { data, isLoading } = useQuiz({quizId});
  
  useEffect(() => {
    const startAnimation = async () => {
      await contentControls.start("visible");
      await containerControls.start("visible");
    };
    startAnimation();
  }, [isLoading]);

  if (isLoading) return <Spinner size="xl" />

  if (!data) return null;
  
  if (data.questions.length === 0) return <Heading color="white">OMG</Heading>

  const answerQuestionHandler = async (answer: number) => {
    if (data.questions[currentIndex].correctAnswer === answer) {
      setScore(score + 1);
    }

    setAnswers([...answers, answer]);
    setCurrentIndex(currentIndex + 1);
    
    if (currentIndex + 1 >= data.questions.length) {
      setGameEnded(true);
    }

    await containerControls.start("hidden");
    await containerControls.start("visible");
  }

  return gameEnded ? (
    <GetQuizResults score={score} questions={data.questions} answers={answers} />
  ) : (
    <ContentLayout>
      <Heading mb={5}>第{currentIndex + 1}問目</Heading>
      <MotionFlex 
        direction="column"
        variants={container}
        initial="hidden"
        animate={containerControls}
      >
        <MotionHeading variants={contentAnimation} mb={5}>{data.questions[currentIndex].content}</MotionHeading>
        {data.questions[currentIndex].choices.map((choice, index) => (
          <MotionBox
            p={5}
            mb={3}
            height={20}
            borderRadius="md"
            color="white"
            bg="cyan.800"
            _hover={{ cursor: 'pointer', bg: 'cyan.600' }}
            variants={choiceAnimation}
            key={index}
            onClick={() => answerQuestionHandler(++index)}
          >
            {choice}
          </MotionBox>
        ))}
      </MotionFlex>
    </ContentLayout>
  );
}

