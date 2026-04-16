import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../api/client';

export const useUpdateProduct = (initialData = {}) => {
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
    productCategories: '',
    sku: '',
    imageAlt: '',
    isActive: true,
  });

  // Update formData when initialData changes (e.g., after fetch)
  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData((prev) => {
        const newData = { ...prev };
        Object.keys(initialData).forEach(key => {
          const value = initialData[key];
          if (value !== undefined && value !== null) {
            if (key === 'productCategories' && Array.isArray(value)) {
              newData[key] = value.join(', ');
            } else {
              newData[key] = value;
            }
          }
        });
        return newData;
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    const fileList = files || [];

    const fieldValue =
      type === 'file'
        ? fileList[0] ?? null
        : type === 'checkbox'
        ? checked
        : value;

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

  const updateProduct = async (e, id) => {
    if (e) e.preventDefault();
    setLoading(true);
    setErrors({});

    // Construct Multipart Form-Data
    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === 'productCategories') {
        const categoriesArray = formData[key]
          .split(',')
          .map((cat) => cat.trim())
          .filter(Boolean);

        categoriesArray.forEach((cat) => data.append('productCategories', cat));
      } else if (formData[key] !== null) {
        data.append(key, formData[key]);
      }
    });

    try {
      await apiClient.put(`/products/${id}`, data, {
        headers: { 'Content-Type': undefined },
      });
      navigate('/dashboard/products');
    } catch (err) {
      const apiErrors = err.response?.data?.data;

      if (Array.isArray(apiErrors)) {
        const errorMap = {};
        apiErrors.forEach((item) => {
          errorMap[item.field] = item.message;
        });
        setErrors(errorMap);
      } else {
        setErrors({
          global: err.response?.data?.message || 'Updating Product Failed',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return { formData, handleChange, updateProduct, loading, errors };
};