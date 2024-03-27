import { User } from '../../context/UserContext';
import api, { getAuth } from '../../service/api';

export const login = async (data: any) => {
  const response = await api.post('/login?delay=2', data);

  return response.data.token;
};

export const getUser = async (email: string, token: string) => {
  // force get user
  const response = await api.get('/users?page=1&per_page=12&delay=2', {
    headers: getAuth(token),
  });

  const users = response.data.data as User[];

  return users.find(u => u.email === email);
};
