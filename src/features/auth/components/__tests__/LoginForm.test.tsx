import { render, screen, userEvent, waitFor } from '@/test/test-utils';

import { testUser } from '@/test/data/testUser';
import { LoginForm } from '../LoginForm';

test('テストユーザーとしてログイン', async () => {
  const onSuccess = jest.fn();

  await render(<LoginForm onSuccess={onSuccess} />, { user: null });

  await userEvent.type(screen.getByLabelText(/email/i), testUser.email);
  await userEvent.type(screen.getByLabelText(/password/i), testUser.password);

  await userEvent.click(screen.getByRole('button', { name: /log in/i }));

  await waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(1));
});
