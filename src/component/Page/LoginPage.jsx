import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import styles from '../Stylesmodule/Loginpage.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, googleSignIn } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email || !password) {
      setError('All fields are required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        login(data.username, data.token, data.role); // Pass username, token, and role from response
        toast.success('Login successful!', {
          theme: "colored",
          autoClose: 2000,
          draggable: true,
        });
        navigate(data.role === 'admin' ? '/admin/products' : '/'); // Redirect based on role
      } else {
        const data = await response.json();
        toast.error(data.message || 'Login failed', {
          theme: "colored",
          autoClose: 2000,
          draggable: true,
        });
      }
    } catch (err) {
      toast.error('Something went wrong. Please try again later.', {
        theme: "colored",
        autoClose: 2000,
        draggable: true,
      });
    }
  };
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
      toast.success('Google Sign-In successful!', {
        theme: "colored",
        autoClose: 2000,
        draggable: true,
      });
      navigate('/');
    } catch (err) {
      console.error('Detailed Google Sign-In Error:', err);
      toast.error('Google Sign-In failed. Please try again later.', {
        theme: "colored",
        autoClose: 2000,
        draggable: true,
      });
    }
  };

  return (
    <>
      <div className={styles['login-container']}>
        <div className={styles['login-form']}>
          <h2>Welcome Back</h2>
          {error && <p className={styles['error-message']}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className={styles['input-container']}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <span className={styles['icon']}>✉️</span>
            </div>
            <div className={styles['input-container']}>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className={styles['icon']}>🔒</span>
            </div>
            <button className={styles['login-btn']} type="submit">Login </button>

          </form>
          <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
          <div className={styles['divider-container']}>
            <hr className={styles['divider']} />
            <span className={styles['divider-text']}>OR</span>
            <hr className={styles['divider']} />
          </div>
          <button onClick={handleGoogleSignIn} className={styles['google-btn']}>
            <div className={styles['google-icon-wrapper']}>
              <img className={styles['google-icon']} src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="Google icon" />
            </div>
            Log in with Google
          </button>
        </div>
      </div>

    </>
  );
};

export default LoginPage;
