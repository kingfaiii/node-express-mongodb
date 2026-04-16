import { useMemo, useState, useCallback } from 'react';
import useFetch from '../../hooks/useFetch';
import { useDeleteProduct } from './useDeleteProduct';

export const useProducts = () => {
  const [search, setSearch] = useState('');
  const { data: products, loading, error, refetch } = useFetch('/products');
  const { deleteProduct, loading: deleting, error: deleteError } = useDeleteProduct();

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    const query = search.trim().toLowerCase();

    return products.filter((product) => {
      if (!query) return true;
      return [product.productName, product.sku, product.brand]
        .filter(Boolean)
        .some((field) => field.toString().toLowerCase().includes(query));
    });
  }, [products, search]);

  const activeCount = useMemo(
    () => filteredProducts.filter((product) => product.isActive).length,
    [filteredProducts],
  );

  const handleDelete = useCallback(
    async (id) => {
      const deleted = await deleteProduct(id);
      if (deleted) {
        refetch();
      }
      return deleted;
    },
    [deleteProduct, refetch],
  );

  const clearSearch = useCallback(() => setSearch(''), []);

  return {
    products,
    filteredProducts,
    loading,
    error,
    search,
    setSearch,
    clearSearch,
    activeCount,
    handleDelete,
    deleting,
    deleteError,
  };
};
