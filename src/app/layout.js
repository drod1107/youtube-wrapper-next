import './globals.css'
import { Inter } from 'next/font/google'
import SessionProvider from '../components/SessionProvider'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'YouTube Wrapper',
  description: 'A custom interface for WGISTL YouTube channel',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-gray-100">
      <body className={`${inter.className} h-full`}>
        <SessionProvider>
          <header>
          <div className="min-h-full">
          <nav className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex">
                  <div className="flex-shrink-0 flex items-center">
                    <Link href="/" className="text-2xl font-bold text-indigo-600">
                      WGISTL
                    </Link>
                  </div>
                </div>
                <div className="flex items-center">
                  <Link href="/upload" className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Upload
                  </Link>
                  <Link href="/auth/signin" className="ml-6 inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    Sign In
                  </Link>
                </div>
              </div>
            </div>
          </nav>
          </div>
          </header>
          <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
            </div>
          </main>
          <footer className="bg-white">
            <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
              <p className="text-center text-sm text-gray-500">

              © 2024 WGISTL and What's Good in ST. Louis are registered trademarks of Windrose & Company, LLC. All rights reserved.
              </p>
            </div>
          </footer>
        </SessionProvider>
      </body>
    </html>
  )
}

