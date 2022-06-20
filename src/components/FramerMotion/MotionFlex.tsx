import { Flex, FlexProps } from '@chakra-ui/react';
import { motion } from 'framer-motion';

export const MotionFlex = motion<Omit<FlexProps, "transition">>(Flex);
