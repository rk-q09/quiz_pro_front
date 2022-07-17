import { render, screen, userEvent, waitFor } from '@/test/test-utils';

import { RegisterForm } from '../RegisterForm';

test('新規ユーザーを登録', async () => {
  const onSuccess = jest.fn();

  await render(<RegisterForm onSuccess={onSuccess} />, { user: null });

  await userEvent.type(screen.getByLabelText(/username/i), 'exampleuser');
  await userEvent.type(screen.getByLabelText(/email/i), 'example@exapmle.com');
  await userEvent.type(screen.getByLabelText(/password/i), 'password');

  await userEvent.click(screen.getByRole('button', { name: /sign up/i }));

  await waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(1));
});
