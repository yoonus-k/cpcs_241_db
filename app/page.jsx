"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const TEToast = dynamic(
  () => import("tw-elements-react").then((mod) => mod.TEToast),
  {
    ssr: false,
  }
);
const TEAlert = dynamic(
  () => import("tw-elements-react").then((mod) => mod.TEAlert),
  {
    ssr: false,
  }
);

export default function Home() {
  // state to store the data from the api
  const [data, setData] = useState([]);
  // get the session data
  const { data: session } = useSession();

  // toast state
  const [open1, setOpen1] = useState(true);

  // use effect to fetch data from the api
  useEffect(() => {}, []);

  return (
    <div>
      <header></header>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {session?.user ? (
          <div>
            <TEToast
              staticToast
              open={open1}
              color="bg-success-100 text-success-700"
              className="mb-6"
            >
              <div className="flex items-center justify-between rounded-t-lg border-b-2 border-success/20 bg-clip-padding px-4 pb-2 pt-2.5">
                <p className="flex items-center font-bold">
                  <span className="[&>svg]:w-4 [&>svg]:h-4 mr-2 -mt-[2px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  Signed in as {session.user.source} successfully!
                </p>
                <div className="flex items-center">
                  <p className="text-xs text-success-700">1 mins ago</p>
                  <button
                    type="button"
                    className="ml-2 box-content rounded-none border-none opacity-80 hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                    onClick={() => setOpen1(false)}
                    aria-label="Close"
                  >
                    <span className="w-[1em] focus:opacity-100 disabled:pointer-events-none disabled:select-none disabled:opacity-25 [&.disabled]:pointer-events-none [&.disabled]:select-none [&.disabled]:opacity-25">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
              <div className="break-words rounded-b-lg px-4 py-4">
                <p>username: {session.user.name}</p>
                <p>email: {session.user.email}</p>
                <p>ID: {session.user.id}</p>
                <p>Rule: {session.user.source}</p>
                <p>Access_token: {session.user.jti}</p>
              </div>
            </TEToast>
          </div>
        ) : (
          <TEAlert
            staticAlert
            open={true}
            color="bg-danger-100 text-danger-700"
            className="text-center"
          >
            User not signed in!
          </TEAlert>
        )}
      </main>
    </div>
  );
}
