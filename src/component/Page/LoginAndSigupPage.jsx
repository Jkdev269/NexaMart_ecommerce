import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import styles from '../Stylesmodule/LoginAndSigupPage.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '../Firebase/firebase';

function LoginAndSignupPage() {
  const { user, logout } = useAuth();

  const notify = () => {
    toast.warning("You’ve logged out! Now, let’s see how long it takes before you come back!");
  };

  const handleLogout = async () => {
    try {
      logout(auth); // Log out from your application context
      notify();
    } catch (error) {
      toast.error('Logout failed. Please try again.', {
        theme: 'colored',
        autoClose: 2000,
        draggable: true,
      });
    }
  };

  
  return (
    <div className={styles.container}>
      {user ? (
        <div className={styles.welcome}>
          <div className={styles.profileLetter}>
            {user.charAt(0).toUpperCase()}
          </div>
          <h1>Welcome! <hr /></h1>
          <h2>{user.toUpperCase()} <hr /> </h2>
          
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className={styles.container}>
          <div>
            <img src="hero_image.png" alt="Hero" />
          </div>
          <div className={styles.buttons}>
            <Link to="/login">
              <button>Login</button>
            </Link>
            <Link to="/signup">
              <button>Signup</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginAndSignupPage;
