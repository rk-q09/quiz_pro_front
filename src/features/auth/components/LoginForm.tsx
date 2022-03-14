import { z } from 'zod';
import {Center, Button } from '@chakra-ui/react';

import { Form, InputField } from '@/components/Form';
import { useAuth } from '@/lib/auth';

const schema = z.object({
  email: z.string().email({ message: '有効なメールアドレスを入力して下さい' }),
  password: z
    .string()
    .min(8, { message: '8~15文字以内で入力して下さい' })
    .max(15, { message: '8~15文字以内で入力して下さい' }),
});

type LoginValues = {
  email: string;
  password: string;
};

type LoginFormProps = {
  onSuccess: () => void;
};

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const { login, isLoggingIn } = useAuth();

  return (
    <div>
      <Form<LoginValues>
        onSubmit={async (values) => {
          await login(values);
          onSuccess();
        }}
        schema={schema}
      >
        {({ register, formState }) => (
          <>
            <InputField
              type="email"
              label="EMAIL"
              error={formState.errors['email']}
              registration={register('email')}
            />
            <InputField
              type="password"
              label="PASSWORD"
              error={formState.errors['password']}
              registration={register('password')}
            />
            <Center>
              {/* <Box
                as="button"
                type="submit"
                width="full"
                p="3"
                mt="3"
                borderRadius="md"
                bg="purple.800"
                _hover={{ bg: 'purple.700' }}
              >
                Log in
              </Box> */}
              <Button isLoading={isLoggingIn} type="submit">
                Log in
              </Button>
            </Center>
          </>
        )}
      </Form>
    </div>
  );
};
