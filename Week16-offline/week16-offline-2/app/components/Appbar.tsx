"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";
export default function Appbar() {
  const session = useSession();

  return (
    <div>
      <div>
        <button
          onClick={() => {
            signIn();
          }}
        >
          SignIn
        </button>
        <button
          onClick={() => {
            signOut();
          }}
        >
          Logout
        </button>
      </div>
      <div>{JSON.stringify(session)}</div>
    </div>
  );
}
