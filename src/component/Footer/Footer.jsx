import React from 'react';
import { Link,Routes,Route } from 'react-router-dom';
import About from './About';


function Footer() {
  return (
    <div className="footer-container w-full bg-black text-white fixed bottom-0">
      <div className="footer-content flex gap-5 flex-wrap p-5 items-center justify-between">
        <div className="flex gap-5 flex-wrap">
          <Link to="/About">About</Link>
          <Link to="/contactus">Contact Us</Link>
        
          
          <span>
            Policies:<Link to="/returnpolicies">Return Policies</Link>
          </span>
          <Link to="/termsofuse">Terms of Use</Link>
          <Link to="/security">Security</Link>
        </div>
        <div>
          <span>Copyright © 2024 NexaMart</span>
        </div>
      </div>
    </div>
  );
}

export default Footer;


