/* eslint-disable @typescript-eslint/consistent-type-assertions */
import React, { createContext, useState } from 'react';
import { localStorageConstants } from '../utils/constants';
import { z } from 'zod';

const ZUser = z.object({
  id: z.number(),
  email: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  avatar: z.string(),
});

export type User = z.infer<typeof ZUser>;

const emptyUser = {
  id: 0,
  email: '',
  first_name: '',
  last_name: '',
  avatar: '',
};

export const UserContext = createContext({
  user: emptyUser,
  token: '',
  loading: true,
  isUserEmpty: (): boolean => false,
  setUserData: (_: User) => {},
  setToken: (_: string) => {},
  logout: () => {},
  verifyUser: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState(emptyUser);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);

  const isUserEmpty = () => !user.id || !user.first_name;

  const verifyUser = (): void => {
    setLoading(true);

    const lsUser = localStorage.getItem(localStorageConstants.user);
    let newUser = undefined;

    try {
      if (lsUser) {
        const objUser = JSON.parse(lsUser);
        newUser = ZUser.parse(objUser);
      }
    } catch (err) {
      console.error(err);
    }

    if (newUser) {
      setUserData(newUser);
    }

    setLoading(false);
  };

  const changeToken = (token: string): void => {
    setToken(token);

    localStorage.setItem(localStorageConstants.token, token);
  };

  const setUserData = (newUser: User): void => {
    setLoading(true);

    localStorage.setItem(localStorageConstants.user, JSON.stringify(newUser));
    setUser(newUser);

    setLoading(false);
  };

  const logout = (): void => {
    setLoading(true);

    localStorage.removeItem(localStorageConstants.token);
    localStorage.removeItem(localStorageConstants.user);
    setUser(emptyUser);

    setLoading(false);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        loading,
        isUserEmpty,
        setUserData,
        setToken: changeToken,
        logout,
        verifyUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
