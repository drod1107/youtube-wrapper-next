import { ClerkProvider } from '@clerk/nextjs';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">

        <body>
        <ClerkProvider>
          <Header />

          <main>{children}</main>
          </ClerkProvider>
          <Footer />
        </body>

    </html>
  );
}