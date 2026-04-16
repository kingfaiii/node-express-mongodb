import useFetch from '../../hooks/useFetch';
import { useDeleteProduct } from './useDeleteProduct';

export const useProduct = (id) => {
  const { data, loading, error } = useFetch(`/products/${id}`);
  const { deleteProduct, loading: deleting, error: deleteError } = useDeleteProduct();

  return {
    product: data,
    loading,
    error,
    deleteProduct,
    deleting,
    deleteError,
  };
};
