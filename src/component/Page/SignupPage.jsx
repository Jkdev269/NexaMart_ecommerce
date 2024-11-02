import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from '../Stylesmodule/SigupPage.module.css';
import { useAuth } from '../../AuthContext';


const SignupPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { googleSignIn } = useAuth();
  const navigate = useNavigate();

  const validateForm = (data) => {
    const errors = {};

    if (!data.username.trim()) {
      errors.username = 'Username is required';
    } else if (data.username.length < 4) {
      errors.username = 'Username must be at least 4 characters long';
    }

    if (!data.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Email is invalid';
    }

    if (!data.password) {
      errors.password = 'Password is required';
    } else if (data.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    }

    if (data.confirmPassword !== data.password) {
      errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { username, email, password, confirmPassword };
    const errors = validateForm(data);

    if (Object.keys(errors).length > 0) {
      // Display errors using toast notifications
      for (const key in errors) {
        toast.error(errors[key]);
      }
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: username, email, password,confirmPassword }),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success('Signup successful!');
        navigate('/login');
      } else {
        const data = await response.json();
        toast.error(data.message || 'Signup failed');
      }
    } catch (error) {
      toast.error('Something went wrong. Please try again later.');
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
    <div className={styles['signup-container']}>
      <div className={styles['signup-form']}>
        <h1>Create your account</h1>
        <form onSubmit={handleSubmit}>
          <div className={styles['input-container']}>
            <input type="text" placeholder="Username" required value={username} onChange={(e) => setUsername(e.target.value)} />
            <span className={styles['icon']}>👤</span>
          </div>
          <div className={styles['input-container']}>
            <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <span className={styles['icon']}>✉️</span>
          </div>
          <div className={styles['input-container']}>
            <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            <span className={styles['icon']}>🔒</span>
          </div>
          <div className={styles['input-container']}>
            <input type="password" placeholder="Confirm Password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <span className={styles['icon']}>🔒</span>
          </div>
          <button className={styles['signup-btn']} type="submit">Sign Up</button>
        </form>
        <p>Already have an account? <Link to='/login'>Login</Link></p>
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
  );
};

export default SignupPage;
