import apiClient from '../api/client';
import { useState, useEffect, useCallback } from 'react';

export default function useFetch(route) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // Added: UX loading state
  const [error, setError] = useState(null); // Added: Error handling

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiClient.get(route);
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [route]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData }; // Return refetch for manual refresh
}
