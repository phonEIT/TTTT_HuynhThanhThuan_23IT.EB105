// src/services/categoryService.js
import axiosClient from '../config/axiosClient';

const API_URL = '/admin/category';

export const getCategoriesApi = async () => {
  const res = await axiosClient.get(API_URL);

  const categories = (res.data.data || [])
    .filter(cat => cat.status === true)
    .map(cat => ({
      id: cat.id,
      name: cat.category_name,
    }));

  return categories;
};
