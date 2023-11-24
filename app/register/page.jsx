"use client";

import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";

import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
const TESelect = dynamic(
  () => import("tw-elements-react").then((mod) => mod.TESelect),
  {
    ssr: false,
  }
);

export default function App() {
  // declare state variables

  // companyies data
  const [companies, setCompanies] = useState([]);

  // property types data
  const property_types = [
    { text: "residential", id: 1, value: 1 },
    { text: "commercial", id: 2, value: 2 },
    { text: "land", id: 3, value: 3 },
  ];

  // buyer credentials
  const [buyerCredentials, setBuyerCredentials] = useState({
    username: "",
    email: "",
    phone: "",
    location: "",
    property_type: "",
    price_range: "",
    company_id: null,
  });

  // seller credentials
  const [sellerCredentials, setSellerCredentials] = useState({
    username: "",
    email: "",
    phone: "",
    company_id: "",
  });

  // agent credentials
  const [agentCredentials, setAgentCredentials] = useState({
    username: "",
    email: "",
    phone: "",

    commission_rate: "",
  });

  // function to handle the login/register button click
  const handleLoginRegisterClick = (tab) => {
    if (loginRegisterActive !== tab) {
      setloginRegisterActive(tab);
    }
  };

  useEffect(() => {
    // fetch the companies data
    fetch("/api/company", {
      method: "GET",
      cache: "no-cache",
    })
      .then((res) => res.json())
      .then((data) => {
        // store the value in this format {text: "Google", id: 1, value: 1}
        const companies = data.rows.map((company) => {
          return {
            text: company.company_name,
            id: company.company_id,
            value: company.company_id,
          };
        });
        // add the default value
        companies.unshift({
          text: "None",
          id: null,
          value: 0,
        });
        console.log(companies);
        // set the companies state
        setCompanies(companies);
      });
  }, []);

  // check if the user is logged in
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session]);

  // function to handle the login/register button click
  const handleLogIn = async (e, credentials) => {
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

  // function to handle the register button click
  const handleRegister = async (e, type, credentials) => {
    e.preventDefault();
    console.log(credentials);
    // check if the user already exists

    try {
      const res = await fetch(`/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: credentials.email }),
      });

      if (res.status === 200) {
        console.log("user already exists");
        alert("user already exists, please log in");

        // reset the forms
        document.getElementById(`${type}-form`).reset();
        document.getElementById(`${type}-form`).focus();
      } else if (res.status === 404) {
        // if the user does not exist

        try {
          const res = await fetch(`/api/${type}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },

            body: JSON.stringify(credentials),
          });
          const data = await res.json();
          console.log(data);
          if (data.error) {
            alert(data.error);
          } else {
            handleLogIn(e, credentials);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        alert("something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="h-full bg-neutral-200 dark:bg-neutral-700">
      <div className="container h-full p-10 ">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div className="g-0 ">
                <Tabs defaultValue="buyer" className="w-full text-center">
                  <TabsList>
                    <TabsTrigger value="buyer">Buyer</TabsTrigger>
                    <TabsTrigger value="seller">Seller</TabsTrigger>
                    <TabsTrigger value="agent">Agent</TabsTrigger>
                  </TabsList>
                  <TabsContent value="buyer" className="flex justify-center">
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
                          name="buyer_form"
                          id="buyer-form"
                          onSubmit={(e) => {
                            handleRegister(e, "buyer", buyerCredentials);
                          }}
                        >
                          <p className="mb-4">
                            Please register to your buyer account
                          </p>
                          {/* <!--Username input--> */}
                          <TEInput
                            type="text"
                            label="Username"
                            className="mb-4"
                            onChange={(e) => {
                              setBuyerCredentials({
                                ...buyerCredentials,
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
                              setBuyerCredentials({
                                ...buyerCredentials,
                                email: e.target.value,
                              });
                            }}
                            required
                          ></TEInput>
                          {/* <!--phone input--> */}
                          <TEInput
                            type="tel"
                            label="Phone Number"
                            className="mb-4"
                            onChange={(e) => {
                              setBuyerCredentials({
                                ...buyerCredentials,
                                phone: e.target.value,
                              });
                            }}
                            maxLength={10}
                          ></TEInput>

                          {/* location input */}

                          <TEInput
                            type="text"
                            label="Location"
                            className="mb-4"
                            onChange={(e) => {
                              setBuyerCredentials({
                                ...buyerCredentials,
                                location: e.target.value,
                              });
                            }}
                          ></TEInput>

                          {/* propery type intput */}
                          <TESelect
                            label="Property Type ?"
                            data={property_types}
                            onValueChange={(value) => {
                              // get the company id from the companies array
                              setBuyerCredentials({
                                ...buyerCredentials,
                                property_type: value.text,
                              });
                            }}
                            className="mb-4"
                          />

                          {/* price range input */}
                          <TEInput
                            type="number"
                            label="Price Range"
                            className="mb-4"
                            onChange={(e) => {
                              setBuyerCredentials({
                                ...buyerCredentials,
                                price_range: e.target.value,
                              });
                            }}
                            max={1000000000}
                          ></TEInput>

                          {/* <!--company input--> */}

                          <TESelect
                            label="From which company?"
                            data={companies}
                            onValueChange={(value) => {
                              // get the company id from the companies array
                              setBuyerCredentials({
                                ...buyerCredentials,
                                company_id: value.id,
                              });
                            }}
                            className="mb-4"
                          />

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
                                Register
                              </button>
                            </TERipple>

                            {/* <!--Forgot password link--> */}
                          </div>

                          {/* <!--Register button--> */}
                          <div className="flex items-center justify-between pb-6">
                            <p className="mb-0 mr-2">Already a client ?</p>
                            <TERipple rippleColor="light">
                              <Link href="/login">
                                <button
                                  type="button"
                                  className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                                >
                                  Log In
                                </button>
                              </Link>
                            </TERipple>
                          </div>
                        </form>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="seller" className="flex justify-center">
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
                          name="seller_form"
                          id="seller-form"
                          onSubmit={(e) => {
                            handleRegister(e, "seller", sellerCredentials);
                          }}
                        >
                          <p className="mb-4">Please register your account</p>
                          {/* <!--Username input--> */}
                          <TEInput
                            type="text"
                            label="Username"
                            className="mb-4"
                            onChange={(e) => {
                              setSellerCredentials({
                                ...sellerCredentials,
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
                              setSellerCredentials({
                                ...sellerCredentials,
                                email: e.target.value,
                              });
                            }}
                            required
                          ></TEInput>
                          {/* <!--phone input--> */}
                          <TEInput
                            type="tel"
                            label="Phone Number"
                            className="mb-4"
                            onChange={(e) => {
                              setSellerCredentials({
                                ...sellerCredentials,
                                phone: e.target.value,
                              });
                            }}
                            maxLength={10}
                          ></TEInput>

                          {/* <!--company input--> */}

                          <TESelect
                            label="From which company?"
                            data={companies}
                            onValueChange={(value) => {
                              // get the company id from the companies array
                              setSellerCredentials({
                                ...sellerCredentials,
                                company_id: value.id,
                              });
                            }}
                          />

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
                                Register
                              </button>
                            </TERipple>

                            {/* <!--Forgot password link--> */}
                          </div>

                          {/* <!--Log in button--> */}
                          <div className="flex items-center justify-between pb-6">
                            <p className="mb-0 mr-2">Already a client ?</p>
                            <TERipple rippleColor="light">
                              <Link href="/login">
                                <button
                                  type="button"
                                  className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                                >
                                  Log In
                                </button>
                              </Link>
                            </TERipple>
                          </div>
                        </form>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="agent" className="flex justify-center">
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
                          name="agent_form"
                          id="agent-form"
                          onSubmit={(e) => {
                            handleRegister(e, "agent", agentCredentials);
                          }}
                        >
                          <p className="mb-4">
                            Please register your agent account
                          </p>
                          {/* <!--Username input--> */}
                          <TEInput
                            type="text"
                            label="Username"
                            className="mb-4"
                            onChange={(e) => {
                              setAgentCredentials({
                                ...agentCredentials,
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
                              setAgentCredentials({
                                ...agentCredentials,
                                email: e.target.value,
                              });
                            }}
                            required
                          ></TEInput>
                          {/* <!--phone input--> */}
                          <TEInput
                            type="tel"
                            label="Phone Number"
                            className="mb-4"
                            onChange={(e) => {
                              setAgentCredentials({
                                ...agentCredentials,
                                phone: e.target.value,
                              });
                            }}
                            maxLength={10}
                          ></TEInput>

                          {/* <!--commision rate input--> */}
                          <TEInput
                            type="number"
                            label="Commision Rate %"
                            className="mb-4"
                            max="100"
                            onChange={(e) => {
                              setAgentCredentials({
                                ...agentCredentials,
                                commission_rate: e.target.value,
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
                                Register
                              </button>
                            </TERipple>

                            {/* <!--Forgot password link--> */}
                          </div>

                          {/* <!--Register button--> */}
                          <div className="flex items-center justify-between pb-6">
                            <p className="mb-0 mr-2">Already a client ?</p>
                            <TERipple rippleColor="light">
                              <Link href="/login">
                                <button
                                  type="button"
                                  className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                                >
                                  Log in
                                </button>
                              </Link>
                            </TERipple>
                          </div>
                        </form>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
