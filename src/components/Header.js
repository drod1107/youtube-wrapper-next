// src/components/Header.js
import Navbar from './Navbar';
import { UserButton, useUser, SignInButton, SignOutButton, SignUp, SignedIn, SignedOut } from '@clerk/nextjs';


export default function Header() {
  return (
    <header>
    <Navbar />
    <h1 className="text-4xl font-bold">WGISTL</h1>
    <SignedOut>
      <SignInButton />
    </SignedOut>
    <SignedIn>
      <UserButton />
    </SignedIn>
  </header>
  );
}