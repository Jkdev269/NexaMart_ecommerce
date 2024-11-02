import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { auth, googleProvider } from './component/Firebase/firebase.js';
import { signInWithPopup, signOut } from 'firebase/auth';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(Cookies.get('token') || null);
  const [user, setUser] = useState(Cookies.get('username') || null);
  const [role, setRole] = useState(Cookies.get('role') || null);

  useEffect(() => {
    setUser(Cookies.get('username') || null);
    setRole(Cookies.get('role') || null);
  }, []);

  const login = (newUsername, newToken, newRole) => {
    Cookies.set('username', newUsername, { expires: 7 });
    Cookies.set('token', newToken, { expires: 7 }); // Expires in 7 days
    Cookies.set('role', newRole, { expires: 7 });
    setUser(newUsername); // Set the user with the new username
    setToken(newToken);
    setRole(newRole);
  };

  const logout = () => {
    Cookies.remove('username');
    Cookies.remove('token');
    Cookies.remove('role');
    setUser(null);
    setToken(null);
    setRole(null);
    signOut(auth);
  };

 
  const googleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const { user } = result;
      const token = await user.getIdToken();
      const username = user.displayName;
      const role = 'user'; // Assuming default role as 'user', change as needed
      login(username, token, role);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      throw new Error('Google Sign-In failed');
    }
  };
  return (
    <AuthContext.Provider value={{ user, token, role, login, logout,googleSignIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
