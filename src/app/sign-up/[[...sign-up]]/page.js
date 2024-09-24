// src/app/sign-up/[[...sign-up]]/page.js

'use client';

import { SignUp, useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useState } from "react";

export default function SignUpPage() {
  const router = useRouter();
  const { isLoaded, signUp } = useSignUp();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [emailPermission, setEmailPermission] = useState(false);

  const handleSignUp = async (event) => {
    event.preventDefault();

    if (!isLoaded) return;

    try {
      await signUp.update({
        first_name: firstName,
        last_name: lastName,
        organization_name: organizationName,
        email_permission: emailPermission,
      });

      await signUp.create({
        // Assuming the user signs up with their email and password
        emailAddress: signUp.emailAddress,
        password: signUp.password,
      });

      router.push("/onboarding"); // Redirect to onboarding page

    } catch (err) {
      console.error("Sign-up error: ", err);
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" />
      <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />
      <input type="text" value={organizationName} onChange={(e) => setOrganizationName(e.target.value)} placeholder="Organization Name" />
      <label>
        <input type="checkbox" checked={emailPermission} onChange={(e) => setEmailPermission(e.target.checked)} />
        Permission to email
      </label>
      <button type="submit">Sign Up</button>
    </form>
  );
}
