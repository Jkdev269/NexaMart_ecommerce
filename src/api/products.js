// api/products.js
import axios from 'axios';
const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/api/products`;

export const getProducts = () => axios.get(API_URL);

export const addProduct = (product, token) => axios.post(API_URL, product, {
  headers: { Authorization: `Bearer ${token}` }
});

export const updateProduct = (id, product, token) => axios.put(`${API_URL}/${id}`, product, {
  headers: { Authorization: `Bearer ${token}` }
});

export const deleteProduct = (id, token) => axios.delete(`${API_URL}/${id}`, {
  headers: { Authorization: `Bearer ${token}` }
});

export const getProductById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response; // or return response.data if you only need the data
};

// Optionally, you can export other functions here
export const getAllProducts = async () => {
  const response = await axios.get(API_URL);
  return response;
};