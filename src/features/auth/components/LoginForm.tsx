import { z } from 'zod';
import { Center, Button, Text } from '@chakra-ui/react';

import { Link } from '@/components/Elements/Link';
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
            label="email"
            error={formState.errors['email']}
            registration={register('email')}
          />
          <InputField
            type="password"
            label="password"
            error={formState.errors['password']}
            registration={register('password')}
          />
          <Center>
            <Button
              isLoading={isLoggingIn}
              type="submit"
              width="full"
              mt={2}
              bg="primary.600"
              _hover={{ bg: 'primary.500' }}
            >
              Log in
            </Button>
          </Center>
          <Center mt={4}>
            <Text size="md">
              <Link to="../register">
                アカウントを作成する
              </Link>
            </Text>
          </Center>
        </>
      )}
    </Form>
  );
};
