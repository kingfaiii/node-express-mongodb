import apiClient from '../api/client';
import { useState, useEffect } from 'react';

export default function useFetch(route) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // Added: UX loading state
  const [error, setError] = useState(null); // Added: Error handling

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await apiClient.get(route);
        setData(response.data);
      } catch (err) {
        setError(err);
        console.log('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [route]); // <--- CRITICAL: Only re-run if the route changes

  return { data, loading, error }; // Return an object for better scalability
}
