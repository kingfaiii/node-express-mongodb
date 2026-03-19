import { useState } from 'react';
import apiClient from '../api/client';
import { AuthContext } from './authContext';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('userInfo');

      // 1. THE BOUNCER: If it's empty, null, or the literal string "undefined", STOP.
      if (!savedUser || savedUser === 'undefined') return null;

      // 2. THE PARSER: Only parse if we have a real string
      return JSON.parse(savedUser);
    } catch (error) {
      // 3. THE CLEANUP: If data is corrupted, wipe it and start fresh
      console.error('Corrupted localStorage data:', error);
      localStorage.removeItem('userInfo');
      return null;
    }
  });

  const login = async (email, password) => {
    try {
      const { data } = await apiClient.post('/users/login', {
        email,
        password,
      });
      localStorage.setItem('token', data.token);
      localStorage.setItem('userInfo', JSON.stringify(data.userProfile));

      setUser(data.userProfile);
      return data;
    } catch (error) {
      throw error.response?.data?.message || 'Login Failed';
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAdmin: user?.isAdmin }}
    >
      {}
      {children}
    </AuthContext.Provider>
  );
};
