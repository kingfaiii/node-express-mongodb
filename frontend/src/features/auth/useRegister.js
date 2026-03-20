import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/client';

export const useRegister = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({}); 
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    birthDay: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const register = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      await apiClient.post('/users/register', formData);
      navigate('/login');
    } catch (err) {
      const apiErrors = err.response?.data?.data;
      
      if (Array.isArray(apiErrors)) {
        const errorMap = {};
        apiErrors.forEach((item) => {
          // Sync with your Backend: Zod 'field' or 'path'
          errorMap[item.field] = item.message;
        });
        setErrors(errorMap);
      } else {
        setErrors({ global: err.response?.data?.message || 'Registration failed' });
      }
    } finally {
      setLoading(false);
    }
  };

  return { formData, handleChange, register, loading, errors };
};