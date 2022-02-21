import type { ReactNode } from 'react';
import { FieldError } from 'react-hook-form';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
} from '@chakra-ui/react';

type FieldWrapperProps = {
  label?: string;
  children: ReactNode;
  error?: FieldError | undefined;
};

export type FieldWrapperPassThroughProps = Omit<FieldWrapperProps, 'children'>;

export const FieldWrapper = (props: FieldWrapperProps) => {
  const { label, children, error } = props;
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel>
        {label}
        <Box mt={1}>{children}</Box>
      </FormLabel>
      {error?.message && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};
