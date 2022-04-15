import { z } from 'zod';
import {Center, Button, Link } from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';

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
            <Button 
              isLoading={isLoggingIn} 
              type="submit" 
              width="full"
              bg="purple.800"
              _hover={{ bg: "purple.700" }}>
                Log in
            </Button>
          </Center>
          <Center mt={4} fontSize="xs">
            <Link as={ReachLink} to="../register">
              アカウントを作成する
            </Link>
          </Center>
        </>
      )}
    </Form>
  );
};
