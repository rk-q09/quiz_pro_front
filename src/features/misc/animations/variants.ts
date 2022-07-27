import { Variants } from 'framer-motion';

export const letterAnimate: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
  },
};

export const blinkAnimate: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      ease: 'easeInOut',
      duration: 2,
      repeat: Infinity,
    },
  },
};

export const slideInAnimate: Variants = {
  hidden: {
    x: 100,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      bounce: 0.4,
      duration: 2,
    },
  },
};

export const popUpAnimate: Variants = {
  hidden: {
    y: -100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      bounce: 0.4,
      duration: 2,
    },
  },
};
