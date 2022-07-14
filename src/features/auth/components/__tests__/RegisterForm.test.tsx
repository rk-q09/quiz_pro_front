import { render, screen, userEvent, waitFor } from '@/test/test-utils';
import { axios } from '@/lib/axios';

import { RegisterForm } from '../RegisterForm';

test('should register new user and call onSucccess cb which should navigate the user to the app', async () => {
  const onSuccess = jest.fn();
  jest.spyOn(axios, 'post').mockResolvedValue({"data": "ok"}); 

  await render(<RegisterForm onSuccess={onSuccess} />, { user: null });

  await userEvent.type(screen.getByLabelText(/username/i), 'exampleuser');
  await userEvent.type(screen.getByLabelText(/email/i), 'example@exapmle.com');
  await userEvent.type(screen.getByLabelText(/password/i), 'password');

  await userEvent.click(screen.getByRole('button', { name: /Sign Up/i }));

  await waitFor(() => expect(onSuccess).toHaveBeenCalledTimes(1));
});
