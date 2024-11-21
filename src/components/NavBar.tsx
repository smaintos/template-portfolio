// src/components/Navbar.tsx
'use client';

import Link from 'next/link';
import { useState } from 'react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Liste des liens de navigation
  const navigationLinks = [
    { name: 'Accueil', href: '/' },
    { name: 'À Propos', href: '/about' },
    { name: 'Vertical', href: '/vertical' },
    { name: 'Horizontal', href: '/horizontal' },
    { name: 'Me Contacter', href: '/contact' },
  ];

  return (
    <>
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-background text-white border-b-[0.3px] border-white border-opacity-20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo ou Nom du Site */}
            <div className="text-white font-bold text-lg">
              Mon Site
            </div>

            {/* Liens de Navigation pour Desktop */}
            <div className="hidden md:flex space-x-8 items-center">
              {navigationLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className="text-sm font-medium text-white hover:text-gray-300 transition duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Menu Mobile Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-md text-white hover:bg-gray-700 transition duration-300"
                aria-label="Main menu"
              >
                {!isMobileMenuOpen ? (
                  <span className="block h-6 w-6">&#9776;</span> // Hamburger Icon
                ) : (
                  <span className="block h-6 w-6">&times;</span> // Close Icon
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-background text-white px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigationLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="block text-sm font-medium text-white hover:text-gray-300 transition duration-300"
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
