// src/components/Navbar.js

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex items-center space-x-4">
      <Link href="/" className="text-lg font-semibold text-white">
        Home
      </Link>
      <Link href="/upload" className="text-lg font-semibold text-white">
        Upload
      </Link>
    </nav>
  );
}
