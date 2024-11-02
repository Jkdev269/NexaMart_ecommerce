import React from 'react';
import { useCart } from './CartContext.jsx';
import { FaTrash } from 'react-icons/fa';
import styles from '../Stylesmodule/Cart.module.css';
import { Link } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Cart() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
  
  const notify = (itemName) => {
    toast.error(`${itemName} Remove From The Cart `, {
      theme:"dark",
      autoClose: 2000,
      draggable: true,
    });
  };
  const handleremovecart=(item) => {
    removeFromCart(item.id);
    notify(item.name);
  };


  const totalPrice = cart.reduce((total, item) => total + item.new_price * item.quantity, 0);
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
    <div className={styles.cartPage}>
      <div className={styles.cartContainer}>
        <h2 className={styles['cart-h2']}>Cart</h2>
        {cart.length === 0 ? (
          <div>
            
            <p className={styles['cart-heading']}>Your cart is empty</p>
            <img src="shoppingcart.png" alt="not found" width={300} height={300}  className={styles['shoopingcart-img']}/>
            <Link to={'/'}><button className={styles.checkoutButton}>Continue Shopping</button>
            </Link>
          </div>
        ) : (
          
          cart.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <img src={item.image} alt={item.name} className={styles.productImage} />
              <div className={styles.productDetails}>
                <h3>{item.name}</h3>
                <p>₹{item.new_price.toFixed(2)}</p>
                <div className={styles.quantityControl}>
                  <button onClick={() => decreaseQuantity(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.id)}>+</button>
                </div>
                <button onClick={() =>handleremovecart(item)} className={styles.removeButton}>
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className={styles.summaryContainer}>
        <h2>Summary</h2>
        <div className={styles.summaryItem}>
          <span>Total Items:</span>
          <span>{totalItems}</span>
        </div>
        <div className={styles.summaryItem}>
          <span>Total Price:</span>
          <span>₹{totalPrice.toFixed(2)}</span>
        </div>
        <button className={styles.checkoutButton}>Proceed to Checkout</button>
      </div>
    </div>
    <ToastContainer />
    </>
  );
}

export default Cart;
