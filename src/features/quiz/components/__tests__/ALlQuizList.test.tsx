import { render, screen, userEvent, waitFor } from '@/test/test-utils';

import { AllQuizList } from '../AllQuizList';

// クイズタイトルはh2タグで表示されており、全部で20個ある
test('16個のクイズが表示される', async () => {
  const { container } = await render(<AllQuizList />);

  // 20個あるクイズの内、1ページ目で16個が表示される
  const page1 = container.querySelectorAll('h2');
  expect(page1).toHaveLength(16);

  // 次ページに遷移すると、残りの4個が表示される 
  await userEvent.click(screen.getByRole('button', { name: /2/i }));

  await waitFor(() => {
    const page2 = container.querySelectorAll('h2');
    expect(page2).toHaveLength(4);
  });
});
