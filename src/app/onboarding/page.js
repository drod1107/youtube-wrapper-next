// src/app/onboarding/page.js

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

export default function OnboardingPage() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    org_name: '',
    permission: false
  });
  const router = useRouter();
  const { user } = useUser();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          email: user.primaryEmailAddress.emailAddress
        }),
      });

      if (response.ok) {
        router.push('/');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Onboarding failed');
      }
    } catch (error) {
      console.error('Onboarding error:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  if (!user) return null;

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Welcome to WGISTL</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="first_name" className="block mb-2">First Name</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="last_name" className="block mb-2">Last Name</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="org_name" className="block mb-2">Organization Name</label>
          <input
            type="text"
            id="org_name"
            name="org_name"
            value={formData.org_name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="permission" className="flex items-center">
            <input
              type="checkbox"
              id="permission"
              name="permission"
              checked={formData.permission}
              onChange={handleChange}
              className="mr-2"
            />
            <span>Permission to email</span>
          </label>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Complete Onboarding
        </button>
      </form>
    </div>
  );
}