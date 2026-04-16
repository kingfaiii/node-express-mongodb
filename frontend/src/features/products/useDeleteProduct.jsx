import { useState } from 'react';
import apiClient from '../../api/client';

export const useDeleteProduct = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteProduct = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await apiClient.delete(`/products/${id}`);
      return true;
    } catch (err) {
      setError(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { deleteProduct, loading, error };
};
