import React, { useEffect, useState } from 'react';
import { getProducts, addProduct, updateProduct, deleteProduct } from '../../api/products'; 
import { useAuth } from '../../AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './AdminProduct.module.css';

const AdminProduct = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ name: '', new_price: '', old_price: '', image: '' });
  const { token, role } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token || role !== 'admin') {
      navigate('/login');
      return;
    }
    fetchProducts();
  }, [token, role, navigate]);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
    } catch (err) {
      setError('Failed to fetch products. Please try again later.');
    }
  };

  const handleAddProduct = async () => {
    if (!token || role !== 'admin') {
      alert('You must be logged in as admin to add products.');
      return;
    }
    
    const { name, new_price, old_price, image } = newProduct;
    const newPriceNumber = parseFloat(new_price);
    const oldPriceNumber = parseFloat(old_price);
  
    if (isNaN(newPriceNumber) || isNaN(oldPriceNumber)) {
      setError('Prices must be numbers');
      toast.error('Prices must be numbers');
      return;
    }
  
    setLoading(true);
    try {
      await addProduct(
        {
          name,
          new_price: newPriceNumber,
          old_price: oldPriceNumber,
          image,
        },
        token
      );
      fetchProducts();
      setNewProduct({ name: '', new_price: '', old_price: '', image: '' }); // Clear form after add
      toast.success('Product added successfully!');
    } catch (err) {
      console.error('Failed to add product:', err); // Log the error details
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
        toast.error(err.response.data.message);
      } else {
        setError('Failed to add product. Please try again later.');
        toast.error('Failed to add product. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProduct = async (id) => {
    if (!token || role !== 'admin') {
      alert('You must be logged in as admin to update products.');
      return;
    }
  
    const updatedProduct = products.find(product => product._id === id);
  
    // Convert prices to numbers
    const newPriceNumber = parseFloat(updatedProduct.new_price);
    const oldPriceNumber = parseFloat(updatedProduct.old_price);
  
    if (isNaN(newPriceNumber) || isNaN(oldPriceNumber)) {
      setError('Prices must be numbers');
      toast.error('Prices must be numbers');
      return;
    }
  
    setLoading(true);
    try {
      await updateProduct(id, { ...updatedProduct, new_price: newPriceNumber, old_price: oldPriceNumber }, token);
      fetchProducts();
      toast.success('Product updated successfully!');
    } catch (err) {
      console.error('Failed to update product:', err); // Log the error details
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
        toast.error(err.response.data.message);
      } else {
        setError('Failed to update product. Please try again later.');
        toast.error('Failed to update product. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!token || role !== 'admin') {
      alert('You must be logged in as admin to delete products.');
      return;
    }
    setLoading(true);
    try {
      await deleteProduct(id, token);
      fetchProducts();
      toast.success('Product deleted successfully!');
    } catch (err) {
      console.error('Failed to delete product:', err); // Log the error details
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
        toast.error(err.response.data.message);
      } else {
        setError('Failed to delete product. Please try again later.');
        toast.error('Failed to delete product. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
    
      <h1>Admin Product Management</h1>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.addProductForm}>
        <h2>Add New Product</h2>
        <input
          className={styles.inputField}
          type="text"
          placeholder="Product Name"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          className={styles.inputField}
          type="number"
          placeholder="New Price"
          value={newProduct.new_price}
          onChange={(e) => setNewProduct({ ...newProduct, new_price: e.target.value })}
        />
        <input
          className={styles.inputField}
          type="number"
          placeholder="Old Price"
          value={newProduct.old_price}
          onChange={(e) => setNewProduct({ ...newProduct, old_price: e.target.value })}
        />
        <input
          className={styles.inputField}
          type="text"
          placeholder="Image URL"
          value={newProduct.image}
          onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
        />
        <button className={styles.button} onClick={handleAddProduct} disabled={loading}>
          {loading ? 'Adding...' : 'Add Product'}
        </button>
      </div>
      <h2>Existing Products</h2>
      <div className={styles.productList}>
        {products.map(product => (
          <div className={styles.productItem} key={product._id}>
            <img className={styles.productImage} src={product.image} alt={product.name} />
            <input
              className={styles.inputField}
              type="text"
              value={product.name}
              onChange={(e) => setProducts(products.map(p => p._id === product._id ? { ...p, name: e.target.value } : p))}
            />
            <input
              className={styles.inputField}
              type="number"
              value={product.new_price}
              onChange={(e) => setProducts(products.map(p => p._id === product._id ? { ...p, new_price: e.target.value } : p))}
            />
            <input
              className={styles.inputField}
              type="number"
              value={product.old_price}
              onChange={(e) => setProducts(products.map(p => p._id === product._id ? { ...p, old_price: e.target.value } : p))}
            />
            <input
              className={styles.inputField}
              type="text"
              value={product.image}
              onChange={(e) => setProducts(products.map(p => p._id === product._id ? { ...p, image: e.target.value } : p))}
            />
            <button className={styles.button} onClick={() => handleUpdateProduct(product._id)} disabled={loading}>
              {loading ? 'Updating...' : 'Update'}
            </button>
            <button className={styles.button} onClick={() => handleDeleteProduct(product._id)} disabled={loading}>
              {loading ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProduct;

