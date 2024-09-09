'use client'

import { useSession } from 'next-auth/react'
import Login from '../components/Login'
import SignupForm from '../components/SignupForm'

export default function Home() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl font-bold">Loading...</div>
      </div>
    )
  }

  if (!session) {
    return (
      <div className="custom-test-class">
        <div className="relative py-3 sm:max-w-xl sm:mx-auto w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
          <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
            <div className="max-w-md mx-auto text-center">
              <div className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <h2 className="text-3xl font-extrabold text-gray-900">What's Good in St. Louis</h2>
                  <Login />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!session.user.organization) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <SignupForm />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-2xl font-bold">User Dashboard (to be implemented)</div>
    </div>
  )
}