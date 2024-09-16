// src/app/onboarding/page.js
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const OnboardingPage = () => {
  const router = useRouter();

  useEffect(() => {
    const completeOnboarding = async () => {
      try {
        // Call your API route for playlist creation
        const publicResponse = await fetch('/api/youtube', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title: 'Public Playlist', privacyStatus: 'public' }),
        });

        const unlistedResponse = await fetch('/api/youtube', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title: 'Unlisted Playlist', privacyStatus: 'unlisted' }),
        });

        const publicData = await publicResponse.json();
        const unlistedData = await unlistedResponse.json();

        // Handle the response and update your user data here...

        router.push('/home');
      } catch (error) {
        console.error('Onboarding error:', error);
      }
    };

    completeOnboarding();
  }, [router]);

  return <div>Onboarding...</div>;
};

export default OnboardingPage;
