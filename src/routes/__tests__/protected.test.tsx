import { render, screen } from '@/test/test-utils';

import { TopPage } from '../protected';
import { testUser } from '@/test/data/testUser';

test('認証済のユーザーの名前が表示される', async () => {
  await render(<TopPage />, {
    user: {
      email: testUser.email,
      password: testUser.password,
    },
  });

  const userName = screen.getByText(/testuser/);
  expect(userName).toBeInTheDocument();
});
