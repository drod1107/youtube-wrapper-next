// src/app/layout.js
import { ClerkProvider } from '@clerk/nextjs';
import Header from '../components/Header';
import Footer from '../components/Footer';
import OnboardingCheck from '../components/OnboardingCheck';
import '../styles/globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body>
          <Header />
          <OnboardingCheck>
            <main>{children}</main>
          </OnboardingCheck>
          <Footer />
        </body>
      </ClerkProvider>
    </html>
  );
}