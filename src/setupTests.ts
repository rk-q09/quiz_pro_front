import '@testing-library/jest-dom/extend-expect';

import { queryClient } from '@/lib/react-query';
import { server } from '@/test/server/server';

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => {
  server.resetHandlers();
  queryClient.clear();
});
