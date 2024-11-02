import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Stylesmodule/Homecss.module.css';
import { getProducts } from '../api/products'; // Import your API function
import { Oval } from 'react-loader-spinner'; // Import the spinner

function Productitem({searchQuery }) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
      }
       catch (err) {
        setError('Failed to fetch products. Please try again later.');
        console.error(err);
      } 
      finally {
        setLoading(false); // Set loading to false after fetch attempt
      }
    };

    fetchProducts();
  }, []);
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles['cart-container']}>
      {loading ? ( // Show spinner while loading
        <div className="flex items-center justify-center h-screen">
          <Oval
            height={80}
            width={80}
            color="white"
            visible={true}
            ariaLabel="loading"
          />
        </div>
      ) : (
        <>
          {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message if there's an error */}
          {filteredProducts.map((product) => (
            <Link to={`/product/${product._id}`} key={product._id}> {/* Use product._id for the key */}
              <div className={styles['cart-item']}>
                <img src={product.image} alt={product.name} className={styles['product-image']} />
                <div className={styles['product-details']}>
                  <h2 className={styles['product-name']}>{product.name}</h2>
                  <p className={styles['product-price']}>
                    <span className={styles['new-price']}>₹{product.new_price.toFixed(2)}</span>
                    <span className={styles['old-price']}>₹{product.old_price.toFixed(2)}</span>
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </>
      )}
    </div>
  );
}

export default Productitem;
