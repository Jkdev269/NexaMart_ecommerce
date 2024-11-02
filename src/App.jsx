import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './component/Home';
import Header from './component/Header';
import Mens from './component/Mens';
import Women from './component/Women';
import Collections from './component/Collections';
import Productcart from './component/Productcart';
import Cart from './component/Cart/Cart';
import LoginPage from './component/Page/LoginPage';
import SignupPage from './component/page/SigupPage';
import LoginAndSigupPage from './component/Page/LoginAndSigupPage';
import AdminProduct from './component/Admin/AdminProduct'; 
import { AuthProvider} from './AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './component/Footer/Footer';
import ProtectedRoute from './ProtectedRoute';
import About from './component/Footer/About';
import Security from './component/Footer/Security';
import TermsOfUse from './component/Footer/TermsOfUse';
import ReturnPolicy from './component/Footer/ReturnPolicy';
import ContactUs from './component/Footer/ContactUs';

function App() {

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  
  return (
    <div className="app-container">
      <AuthProvider>
        <Header onSearch={handleSearch} />
        <ToastContainer />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home searchQuery={searchQuery} />} />
            <Route path="/collections" element={<Collections  />} />
            <Route path="/mens" element={<Mens />} />
            <Route path="/women" element={<Women />} />
            <Route path="/product/:id" element={<Productcart />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/yourprofile" element={<LoginAndSigupPage />} />
            <Route
          path="/admin/products"
          element={
            <ProtectedRoute roleRequired="admin">
              <AdminProduct />
            </ProtectedRoute>
          }
        />       
             <Route path="*" element={<LoginAndSigupPage />} />
          <Route path="/About" element={<About />}/>
          <Route path="/security" element={<Security />}/>
          <Route path="/termsofuse" element={<TermsOfUse />}/>
          <Route path="/returnpolicies" element={<ReturnPolicy />}/>
          <Route path="/contactus" element={<ContactUs />}/>
          </Routes>
        </div>
        <Footer>
         
        </Footer>
      </AuthProvider>
    </div>
  );
}

export default App;
