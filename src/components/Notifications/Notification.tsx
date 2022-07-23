import type { FC, ReactNode } from 'react';
import { Box, Text, VStack, Spacer } from '@chakra-ui/layout';
import { Icon, InfoIcon, CheckCircleIcon, WarningIcon } from '@chakra-ui/icons';
import { XCircleIcon } from '@heroicons/react/solid';
import { XIcon } from '@heroicons/react/solid';
import { AnimatePresence, AnimatePresenceProps } from 'framer-motion';

import { MotionFlex } from '@/components/FramerMotion';

const icons = {
  info: <InfoIcon w={5} h={5} color="blue.500" />,
  success: <CheckCircleIcon w={5} h={5} color="green.400" />,
  warning: <WarningIcon w={5} h={5} color="orange.400" />,
  error: <Icon as={XCircleIcon} w={6} h={6} color="red.400" />,
};

const HackyAnimatePresence = AnimatePresence as unknown as FC<
  AnimatePresenceProps & { children: ReactNode }
>;

export type NotificationProps = {
  notification: {
    id: string;
    type: keyof typeof icons;
    title: string;
    message?: string;
  };
  onDismiss: (id: string) => void;
};

export const Notification = ({
  notification: { id, type, title, message },
  onDismiss,
}: NotificationProps) => {
  return (
    <HackyAnimatePresence>
      <MotionFlex
        w={80}
        h={20}
        bg="primary.600"
        borderRadius="md"
        p={3}
        m={1}
        position="relative"
        layout
        initial={{ opacity: 0, y: 0, scale: 0.3 }}
        animate={{ opacity: 1, y: 10, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      >
        <Box>{icons[type]}</Box>
        <VStack color="gray.300" align="left" ml={4}>
          <Text
            color={
              type === 'info'
                ? 'blue.500'
                : type === 'success'
                ? 'green.400'
                : type === 'warning'
                ? 'orange.400'
                : 'red.400'
            }
          >
            {title}
          </Text>
          <Text align="left" fontSize="xs">
            {message}
          </Text>
        </VStack>
        <Spacer />
        <button
          onClick={() => {
            onDismiss(id);
          }}
        >
          <Icon as={XIcon} w={4} h={4} color="gray.300" />
        </button>
      </MotionFlex>
    </HackyAnimatePresence>
  );
};
