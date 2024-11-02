import React, { useState } from 'react';
import { Link } from 'react-router-dom';
function Header({ onSearch }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row text-white ">
       
          <nav className="flex justify-between items-center w-full">
            <div className="xl:px-12 py-6 flex w-full items-center">
              <a className="text-2xl font-bold font-heading shadow-lg shadow-indigo-500/50 font-serif">
                NexaMart
              </a>
              <ul className={`hidden lg:flex px-4 mx-auto font-semibold font-heading space-x-12 text-lg ${isMobileMenuOpen ? 'hidden' : 'flex'}`}>
                <li><Link className="hover:text-gray-200" to={'/'}>Shop</Link></li>
                <li><Link className="hover:text-gray-200" to={'/collections'}>Collection</Link></li>
                <li><Link className="hover:text-gray-200" to={'/mens'}>Mens</Link></li>
                <li><Link className="hover:text-gray-200" to={'/women'}>Women</Link></li>
               </ul>
              <div className="hidden lg:flex items-center space-x-5">
              <input type="text" className="w-3/6 p-1 rounded-md bg-white text-black" placeholder="Search..." value={searchQuery}
                onChange={handleSearchChange} />
                
                <Link to={'/cart'} className="flex items-center hover:text-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="flex absolute -mt-5 ml-4">
                    <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                  </span>
                </Link>
               
                  <Link to={'/yourprofile'} className="flex items-center hover:text-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  </Link>
                
              </div>
              <div className="lg:hidden flex items-center ml-auto gap-1.5">
              <Link to={'/cart'} className="flex items-center hover:text-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="flex absolute -mt-5 ml-4">
                    <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                  </span>
                </Link>
                
                <Link to={'/yourprofile'} className="flex items-center hover:text-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  </Link>
                <button onClick={toggleMobileMenu} className="navbar-burger self-cente mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-full  hover:text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </nav>
          {isMobileMenuOpen && (
            <div className="lg:hidden bg-gray text-white w-screen">
              
              <ul className="px-4 py-6 space-y-4">
                <li><Link className="block hover:text-gray-200" to={'/'}>Shop</Link></li>
                <li><Link className="block hover:text-gray-200" to={'/collections'}>Collections</Link></li>
                <li><Link className="block hover:text-gray-200" to={'/mens'}>Mens</Link></li>
                <li><Link className="block hover:text-gray-200" to={'/women'}>Women</Link></li>
                {/* <li><Link className="block hover:text-gray-200" to={'/cart'}>AddToCart</Link></li>
                <li><Link className="block hover:text-gray-200" to={'/yourprofile'}>Your Profile</Link></li> */}
              </ul>
              <div className="px-4 py-4">
                <input type="text" className="w-full p-2 rounded-md bg-gray-800 text-white" placeholder="Search..." value={searchQuery}
                onChange={handleSearchChange}/>
              </div>
            </div>
          )}
      
      </div>
     
    </>
  );
}

export default Header;
