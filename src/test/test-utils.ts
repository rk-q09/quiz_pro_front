import { render as rtlRender, screen, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { FunctionComponent } from 'react';

import { AppProvider } from '@/provider/app';
import storage from '@/utils/storage';
import { userGenerator } from './data/data-generators';
import { authenticate, hash } from './server/utils';
import { db } from './server/db';


export const createUser = () => {
  const user = userGenerator();
  db.user.create({ ...user, password: hash(user.password) });
  return user;
};

export const loginAsUser = (user: any) => {
  const authUser = authenticate(user);
  storage.setToken(authUser.token);
  return authUser.user;
};

export const waitForLoadingToFinish = () => 
  waitForElementToBeRemoved(
    () => [...screen.queryAllByTestId(/loading/i), ...screen.queryAllByText(/loading/i)],
      { timeout: 4000 }
  );

const initializeUser = async (user: any) => {
  if (typeof user === 'undefined') {
    return loginAsUser(createUser());
  } else if (user) {
    return loginAsUser(user);
  } else {
    return null;
  }
};

export const render = async (
  ui: any,
  { route = '/', user, ...renderOptions }: Record<string, any> = {}
) => {
  user = await initializeUser(user);

  window.history.pushState({}, 'Test Page', route);

  const returnValue = {
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
