// src/components/Footer.js

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="fixed bottom-0 flex w-full items-center justify-between bg-gray-800 p-4">
      <div className="container mx-auto">
        <div className="flex space-x-4">
          <Link
            href="https://www.windroseandco.com"
            className="text-sm text-white"
          >
            © 2024 Windrose and Company, LLC. All Rights Reserved.
          </Link>
        </div>
        <div className="flex space-x-4">
          <Link href="/privacy-policy" className="text-sm text-white">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="text-sm text-white">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
