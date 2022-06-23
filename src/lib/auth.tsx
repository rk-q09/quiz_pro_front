import { initReactQueryAuth } from 'react-query-auth';
import { isBefore } from 'date-fns';

import {
  loginWithEmailAndPassword,
  getUser,
  registerWithEmailAndPassword,
  UserResponse,
  LoginCredentialsDTO,
  RegisterCredentialsDTO,
  AuthUser,
} from '@/features/auth';
import storage from '@/utils/storage';

const checkExpiration = () => {
  const expiresAt = storage.getExpires();
  if (expiresAt) {
    const isExpired = isBefore(new Date(expiresAt), new Date());
    if (isExpired) return true
  }
  return false
}

async function handleUserResponse(data: UserResponse) {
  const { user, token, expiresIn } = data;
  storage.setToken(token);
  storage.setExpires(expiresIn);
  return user;
}

async function loadUser() {
  if (checkExpiration()) {
    return null
  }
  if (storage.getToken()) {
    const data = await getUser();
    return data;
  }
  return null;
}

async function loginFn(data: LoginCredentialsDTO) {
  const response = await loginWithEmailAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
}

async function registerFn(data: RegisterCredentialsDTO) {
  const response = await registerWithEmailAndPassword(data);
  const user = await handleUserResponse(response);
  return user;
}

async function logoutFn() {
  storage.clearToken();
  storage.clearExpires();
}

const authConfig = {
  loadUser,
  loginFn,
  registerFn,
  logoutFn,
  LoaderComponent() {
    return <p>Loading...</p>;
  },
};

export const { AuthProvider, useAuth } = initReactQueryAuth<
  AuthUser | null,
  unknown,
  LoginCredentialsDTO,
  RegisterCredentialsDTO
>(authConfig);
