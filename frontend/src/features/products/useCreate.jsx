import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/client';

export const useCreateProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    productName: '',
    productDescription: '',
    inventoryStock: '',
    price: '',
    brand: '',
    mainImage: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    // Handle File inputs vs Text inputs
    const fieldValue = type === 'file' ? files[0] : value;

    setFormData((prev) => ({ ...prev, [name]: fieldValue }));

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const createProduct = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setErrors({});

    // 🚀 THE SENIOR MOVE: Construct Multipart Form-Data
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === 'productCategories') {
        // 🚀 THE FIX: Convert "Shoes, Running" -> ["Shoes", "Running"]
        const categoriesArray = formData[key]
          .split(',')
          .map((cat) => cat.trim())
          .filter(Boolean); // Remove empty strings

        // Append each one to the SAME key
        categoriesArray.forEach((cat) => data.append('productCategories', cat));
      } else if (formData[key] !== null) {
        data.append(key, formData[key]);
      }
    });
    try {
      await apiClient.post('/products', data, {
        headers: { 'Content-Type': undefined },
      });
      navigate('/dashboard/products');
    } catch (err) {
      const apiErrors = err.response?.data?.data;

      if (Array.isArray(apiErrors)) {
        const errorMap = {};
        apiErrors.forEach((item) => {
          // Sync with your Backend: Zod 'field' or 'path'
          errorMap[item.field] = item.message;
          console.log('Error Field:', item.field, 'Message:', item.message);
        });
        setErrors(errorMap);
      } else {
        setErrors({
          global: err.response?.data?.message || 'Creating Product Failed',
        });
      }
    } finally {
      setLoading(false);
    }
  };
  return { formData, handleChange, createProduct, loading, errors };
};
