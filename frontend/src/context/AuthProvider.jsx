import { useState } from 'react';
import apiClient from '../api/client';
import { AuthContext } from './authContext';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('userInfo');

    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = async (email, password) => {
    try {
      const { data } = await apiClient.post('/login', { email, password });
 
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
    <AuthContext.Provider value={{ user, login, logout, isAdmin: user?.isAdmin }}>
      {}
      {children}
    </AuthContext.Provider>
  );
};
