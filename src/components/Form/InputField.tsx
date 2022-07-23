import { UseFormRegisterReturn } from 'react-hook-form';
import { Input } from '@chakra-ui/react';
import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper';

type InputFieldProps = FieldWrapperPassThroughProps & {
  type?: 'text' | 'username' | 'email' | 'password';
  registration: Partial<UseFormRegisterReturn>;
};

export const InputField = (props: InputFieldProps) => {
  const { type = 'text', label, registration, error } = props;
  return (
    <FieldWrapper label={label} error={error}>
      <Input
        type={type}
        {...registration}
        border="none"
        bg="tertiary.400"
        color="tertiary.900"
      />
    </FieldWrapper>
  );
};
