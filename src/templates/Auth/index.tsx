import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const AuthTemplate: React.FC = () => {
  const { user } = useContext(UserContext);

  return <h1>Hello {user.first_name}</h1>;
};

export default AuthTemplate;
