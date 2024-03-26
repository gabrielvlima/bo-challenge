import axios from 'axios';
import { localStorageConstants } from '../utils/constants';

const baseUrl = 'https://reqres.in/api';

export const getAuth = (token: string | undefined = undefined) => {
  const tokenLocalStorage = localStorage.getItem(localStorageConstants.token);
  return { Authorization: `Bearer ${token ?? tokenLocalStorage}` };
};

const api = axios.create({
  baseURL: baseUrl,
});

api.interceptors.response.use(
  response => response,
  error => {
    const { status } = error.response;
    if (status === 401) {
      localStorage.clear();
    }
    throw error;
  },
);

export default api;
