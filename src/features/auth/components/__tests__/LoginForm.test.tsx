import { render, screen, userEvent, waitFor } from '@/test/test-utils';
import { axios } from '@/lib/axios';

import { LoginForm } from '../LoginForm';

test('should login new user and call onSucccess cb which should navigate the user to the app', async () => {
  const onSuccess = jest.fn();
  jest.spyOn(axios, 'post').mockResolvedValue({"data": "ok"}); 

  await render(<LoginForm onSuccess={onSuccess} />, { user: null });

  await userEvent.type(screen.getByLabelText(/email/i), 'example@exapmle.com');
  await userEvent.type(screen.getByLabelText(/password/i), 'password0000');

  await userEvent.click(screen.getByRole('button', { name: /Log in/i }));

  await waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(1));
});
