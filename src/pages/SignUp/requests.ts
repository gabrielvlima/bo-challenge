import api, { getAuth } from '../../service/api';

export const registerUser = async (data: any) => {
  const response = await api.post('/register?delay=2', data);

  return response.data;
};

export const getUser = async (id: number, token: string) => {
  const response = await api.get(`/users/${id}`, { headers: getAuth(token) });

  return response.data.data;
};
