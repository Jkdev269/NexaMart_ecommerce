import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from './Cart/CartContext.jsx';
import styles from './Stylesmodule/Productcart.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getProductById } from '../api/products'; // Import your API function to fetch a product by ID

function Productcart() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await getProductById(id);
        console.log('API Response:', response);
        if (!response || !response.data) {
          throw new Error('Product not found');
        }
        setProductDetails(response.data);
      } catch (err) {
        setError('Failed to fetch product details. Please try again later.');
        console.error(err); // Log the error
      } finally {
        setLoading(false);
      }
    };
    

    fetchProductDetails();
  }, []);

  const notify = () => {
    toast.success("Added to cart successfully!!", {
      theme: "light",
      autoClose: 2000,
      draggable: true,
    });
  };

  const handleAddToCart = (product) => {
    addToCart({ id: product._id, ...product }); // Ensure the added product has a unique ID
    notify();
  };

  if (loading) return <h3>Loading...</h3>; // Show loading message while fetching
  if (error) return <h3>{error}</h3>; // Show error message if there's an error
  if (!productDetails) return <h3>Product not found!</h3>; // Show not found message if product is missing

  return (
    <>
      <div className={styles['cart-container']}>
        <div key={productDetails._id} className={styles['cart-item']}>
          <img src={productDetails.image} alt={productDetails.name} className={styles['product-image']} />
        </div>
        <div className={styles['product-details']}>
          <h2 className={styles['product-name']}>{productDetails.name}</h2>
          <div className={styles['btn-size']}>
            <h1 className={styles['size-title']}>Select Size:</h1>
            {['SM', 'M', 'L', 'XL', 'S'].map(size => (
              <button key={size} className={`${styles['btn-size-child']} ${styles['size-button']}`}>{size}</button>
            ))}
          </div>
          <p className={styles['product-price']}>
            <span className={styles['new-price']}>₹{productDetails.new_price.toFixed(2)}</span>
            <span className={styles['old-price']}>₹{productDetails.old_price.toFixed(2)}</span>
          </p>
          <div>
            <button className={styles['add-to-cart']} onClick={() => handleAddToCart(productDetails)}>Add to Cart</button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
  
}

export default Productcart;
