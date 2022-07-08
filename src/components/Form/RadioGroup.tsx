import type { ReactNode } from 'react';
import {
  Box,
  HStack,
  useRadio,
  useRadioGroup,
  UseRadioProps,
  FormControl,
  FormLabel,
  FormErrorMessage
} from '@chakra-ui/react';
import {
  FieldValues,
  useController,
  UseControllerProps,
} from 'react-hook-form';

const RadioCard = (props: UseRadioProps & { children: ReactNode }) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  return (
    <Box as="label">
      <input {...getInputProps()} />
      <Box {...getCheckboxProps()} 
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{ 
          bg: "primary.500",
          borderColor: "primary.500",
          color: 'white' 
        }}
        px={8}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
};

export const RadioGroup = <TRadioValue extends FieldValues>(
  props: UseControllerProps<TRadioValue> & { radioValues: string[], label: string }) => {
  const { field, fieldState: { error } } = useController(props);

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: props.name,
    onChange: field.onChange,
    value: field.value,
  });

  return (
    <FormControl isInvalid={!!error} mt={3} mb={3}>
      <FormLabel>{props.label}</FormLabel>
      <HStack {...getRootProps()} justify="space-between" mt={3}>
        {props.radioValues.map((item) => (
          <RadioCard key={item} {...getRadioProps({ value: item })}>
            {item}
          </RadioCard>
        ))}
      </HStack>
      {error && (<FormErrorMessage>{error.message}</FormErrorMessage>)}
    </FormControl>
  );
};
