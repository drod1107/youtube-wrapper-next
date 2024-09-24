// src/components/OnboardingCheck.js

'use client';

import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function OnboardingCheck({ children }) {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && user && !user.publicMetadata.org_name) {
      router.push('/onboarding');
    }
  }, [isLoaded, user, router]);

  if (!isLoaded) return null;

  return children;
}