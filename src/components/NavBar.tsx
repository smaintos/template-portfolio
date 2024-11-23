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
      <nav className="fixed top-0 left-0 w-full bg-background text-white z-50 border-b border-white border-opacity-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Gauche : @smaintos */}
            <div className="flex-shrink-0">
              <div className="text-sm font-bold text-white">
                @smaintos
              </div>
            </div>

            {/* Centre : Liens de Navigation pour Desktop */}
            <div className="hidden md:flex space-x-8">
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

            {/* Droite : Avatar et Bouton Menu Mobile */}
            <div className="flex items-center space-x-4">
              {/* Avatar avec Infos (visible uniquement sur Desktop) */}
              <div className="hidden md:flex items-center gap-4 p-3 rounded-lg bg-transparent shadow-none">
                <div className="w-12 h-12 rounded-full bg-gray-400 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold ">
                    William
                  </p>
                  <p className="text-sm ">
                    Mariamon
                  </p>
                </div>
              </div>

              {/* Bouton Menu Mobile */}
              <div className="md:hidden flex items-center">
                <button
                  onClick={toggleMobileMenu}
                  className="p-2 rounded-md text-white hover:bg-gray-700 transition duration-300"
                  aria-label="Main menu"
                >
                  {!isMobileMenuOpen ? (
                    <span className="block h-6 w-6">&#9776;</span> // Icône Hamburger
                  ) : (
                    <span className="block h-6 w-6">&times;</span> // Icône Fermer
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Mobile */}
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

            {/* Optionnel : Avatar dans le Menu Mobile */}
            {/* <div className="flex items-center gap-4 p-3 rounded-lg bg-transparent shadow-none">
              <div className="w-12 h-12 rounded-full bg-gray-400 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-400">
                  William
                </p>
                <p className="text-sm text-gray-400">
                  Mariamon
                </p>
              </div>
            </div> */}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
