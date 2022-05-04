import Axios, { AxiosRequestConfig } from 'axios';

import { useNotificationStore } from '@/stores/notifications';
import storage from '@/utils/storage';

function authRequestInterceptor(config: AxiosRequestConfig) {
  if (config.headers === undefined) {
    config.headers = {};
  }
  const token = storage.getToken();
  if (token) {
    config.headers.authorization = `${token}`;
  }
  config.headers.Accept = 'application/json';
  return config;
}

export const axios = Axios.create({
  baseURL: '/api',
});

axios.interceptors.request.use(authRequestInterceptor);
axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const errors = error.response?.data?.errors || error.message;
    const message = errors[0].message;

    console.log(error.response);

    useNotificationStore.getState().addNotification({
      type: 'error',
      title: 'エラー',
      message,
    });

    return Promise.reject(error);
  }
);
