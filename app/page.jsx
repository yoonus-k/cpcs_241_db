"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

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
const TERipple = dynamic(
  () => import("tw-elements-react").then((mod) => mod.TERipple),
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
      <main className="flex min-h-screen flex-col items-center justify-between p-10">
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
            <section className="content">
              <div className="relative isolate px-6 pt-14 lg:px-8">
                <div
                  className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                  aria-hidden="true"
                >
                  <div
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style={{
                      clipPath:
                        "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                  />
                </div>
                <div className="mx-auto max-w-2xl py-16 sm:py-20 lg:py-56">
                  <div className="hidden sm:mb-8 sm:flex sm:justify-center">
                    <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                      Announcing our next round of funding.{" "}
                      <a href="#" className="font-semibold text-indigo-600">
                        <span className="absolute inset-0" aria-hidden="true" />
                        Read more <span aria-hidden="true">&rarr;</span>
                      </a>
                    </div>
                  </div>
                  <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                      Real Estate Database
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                      Register as a seller or buyer to start your journey with
                      us
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                      <div className="mb-12 pb-1 pt-1 text-center">
                        <Link href="/property">
                          <TERipple rippleColor="light" className="w-full">
                            <button
                              className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                              type="submit"
                              style={{
                                background:
                                  "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                              }}
                            >
                              Explore the market
                            </button>
                          </TERipple>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                  aria-hidden="true"
                >
                  <div
                    className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                    style={{
                      clipPath:
                        "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                    }}
                  />
                </div>
              </div>
            </section>
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
