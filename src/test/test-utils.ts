import { render as rtlRender, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { FunctionComponent } from 'react';

import { AppProvider } from '@/provider/app';


// export const loginAsUser = async (user: any) => {};

export const waitForLoadingToFinish = () => 
  waitForElementToBeRemoved(
    () => [...screen.queryAllByTestId(/loading/i), ...screen.queryAllByText(/loading/i)],
      { timeout: 4000 }
  );

/**
const initializeUser = async (user: any) => {
  if (typeof user === 'undefined') {
    return await loginAsUser(await createUser());
  } else if (user) {
    return await loginAsUser(user);
  } else {
    return null;
  }
};
**/

export const render = async (
  ui: any,
  { route = '/', user, ...renderOptions }: Record<string, any> = {}
) => {

  window.history.pushState({}, 'Test Page', route);

  const returnValue= {
    ...rtlRender(ui, {
      wrapper: AppProvider as FunctionComponent<unknown>,
      ...renderOptions,
    }),
    user,
  };

  await waitForLoadingToFinish();

  return returnValue;
};

export * from '@testing-library/react';
export { userEvent, rtlRender };
