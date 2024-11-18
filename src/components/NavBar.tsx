// src/components/Navbar.tsx
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between p-6 bg-gray-800">
      <div className="text-white text-2xl font-bold">
        Mon Portfolio
      </div>
      <div className="space-x-4">
        <Link href="/" className="border border-white text-white px-4 py-2 rounded-full hover:bg-white hover:text-gray-800 transition duration-300">
          Accueil
        </Link>
        <Link href="/about" className="border border-white text-white px-4 py-2 rounded-full hover:bg-white hover:text-gray-800 transition duration-300">
          À Propos
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
