import { User } from '../../context/UserContext';
import api, { getAuth } from '../../service/api';

export const getUsers = async () => {
  // force get user
  const response = await api.get('/users?page=1&per_page=12', {
    headers: getAuth(),
  });

  return response.data.data as User[];
};
