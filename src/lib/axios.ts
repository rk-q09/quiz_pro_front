import Axios from 'axios';

import { useNotificationStore } from '@/stores/notifications';

export const axios = Axios.create({
  baseURL: '/api',
});

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
