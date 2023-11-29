"use client";
import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
// importing dynamic components
const TEInput = dynamic(
  () => import("tw-elements-react").then((mod) => mod.TEInput),
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

export default function Login() {
  // get the session data
  const { data: session } = useSession();
  // initializing router
  const router = useRouter();

  // creating state for credentials
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        redirect: false,
        username: credentials.username,
        email: credentials.email,
      });
      console.log(res);

      if (res.error) {
        alert(res.error);
      } else {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // do not allow users to access this page if they are already logged in
  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]);

  return (
    <section className="h-full bg-neutral-200 dark:bg-neutral-700">
      <div className="container h-full p-10">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div className="g-0 lg:flex lg:flex-wrap">
                {/* <!-- Left column container--> */}
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                    {/* <!--Logo--> */}
                    <div className="text-center">
                      <img
                        className="mx-auto w-48"
                        src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                        alt="logo"
                      />
                      <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                        We are The Lotus Team
                      </h4>
                    </div>

                    <form
                      name="login_form"
                      id="login-form"
                      onSubmit={handleLogIn}
                    >
                      <p className="mb-4">Please login to your account</p>
                      {/* <!--Username input--> */}
                      <TEInput
                        type="text"
                        label="Username"
                        className="mb-4"
                        onChange={(e) => {
                          setCredentials({
                            ...credentials,
                            username: e.target.value,
                          });
                        }}
                        required
                      ></TEInput>

                      {/* <!--email input--> */}
                      <TEInput
                        type="email"
                        label="Email"
                        className="mb-4"
                        onChange={(e) => {
                          setCredentials({
                            ...credentials,
                            email: e.target.value,
                          });
                        }}
                        required
                      ></TEInput>

                      {/* <!--Submit button--> */}
                      <div className="mb-12 pb-1 pt-1 text-center">
                        <TERipple rippleColor="light" className="w-full">
                          <button
                            className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                            type="submit"
                            style={{
                              background:
                                "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                            }}
                          >
                            Log in
                          </button>
                        </TERipple>
                      </div>

                      {/* <!--Register button--> */}
                      <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 mr-2">Don't have an account?</p>
                        <TERipple rippleColor="light">
                          <Link href="/register">
                            <button
                              type="button"
                              className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                            >
                              Register
                            </button>
                          </Link>
                        </TERipple>
                      </div>
                    </form>
                  </div>
                </div>

                {/* <!-- Right column container with background and description--> */}
                <div
                  className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                  style={{
                    background:
                      "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                  }}
                >
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                    <h4 className="mb-6 text-xl font-semibold">
                      We are more than just a Students
                    </h4>
                    <p className="text-sm">
                      This project is a part of the Database course at King
                      Abdul-aziz University. It is a real estate website that
                      allows users to buy and sell properties. It also allows
                      users to auction their properties. please contact us if
                      you found any bugs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
