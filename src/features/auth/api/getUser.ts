import { axios } from '@/lib/axios';

// import { AuthUser } from '../types';

export const getUser = (): Promise<any> => {
  return axios.get('/users/auth/me');
};
