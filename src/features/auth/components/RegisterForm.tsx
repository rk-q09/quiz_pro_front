import { z } from 'zod';
import { Box, Center } from '@chakra-ui/react';
import { axios } from '@/lib/axios';
import { Form, InputField } from '@/components/Form';

const schema = z.object({
  username: z
    .string()
    .min(4, { message: '4~15文字以内で入力して下さい' })
    .max(15, { message: '4~15文字以内で入力して下さい' }),
  email: z.string().email({ message: '有効なメールアドレスを入力して下さい' }),
  password: z
    .string()
    .min(8, { message: '8~15文字以内で入力して下さい' })
    .max(15, { message: '8~15文字以内で入力して下さい' }),
});

type RegisterValues = {
  username: string;
  email: string;
  password: string;
};

type RegisterFormProps = {
  onSuccess: () => void;
};

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  return (
    <Box>
      <Form<RegisterValues>
        onSubmit={async (values) => {
          const response = await axios.post('/users/signup', values);
          console.log('dev: on RegisterForm', response);
          onSuccess();
        }}
        schema={schema}
      >
        {({ register, formState }) => (
          <>
            <InputField
              type="username"
              label="USERNAME"
              error={formState.errors['username']}
              registration={register('username')}
            />
            <InputField
              type="email"
              label="EMAIL"
              error={formState.errors['password']}
              registration={register('email')}
            />
            <InputField
              type="password"
              label="PASSWORD"
              error={formState.errors['password']}
              registration={register('password')}
            />
            <Center>
              <Box
                as="button"
                type="submit"
                width="full"
                p="3"
                mt="3"
                borderRadius="md"
                bg="purple.800"
                _hover={{ bg: 'purple.700' }}
              >
                Sign Up
              </Box>
            </Center>
          </>
        )}
      </Form>
    </Box>
  );
};
