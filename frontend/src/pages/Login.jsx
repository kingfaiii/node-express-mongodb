import { useEffect, useState } from 'react';
import apiClient from '../api/client';
import LoginForm from '../components/auth/LoginForm';

export default function Login() {
  //   const [email, setEmail] = useState('');
  //   const [password, setPassword] = useState('');
  const [productName, setProductName] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await apiClient.get('/products');
        setProductName(data[0]?.productName || 'Product Name');
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);
  return (
    <>
      <LoginForm />
    </>
  );
}
