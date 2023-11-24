"use client";

import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

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

const TETextarea = dynamic(
  () => import("tw-elements-react").then((mod) => mod.TETextarea),
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

const Page = () => {
  //
  const router = useRouter();
  // define all variables here
  const { data: session, status } = useSession();
  // property types data
  const property_types = [
    { text: "residential", id: 1, value: 1 },
    { text: "commercial", id: 2, value: 2 },
    { text: "land", id: 3, value: 3 },
  ];

  // number of bedrooms data
  const bedrooms_bathrooms = [
    { text: "1", id: 1, value: 1 },
    { text: "2", id: 2, value: 2 },
    { text: "3", id: 3, value: 3 },
    { text: "4", id: 4, value: 4 },
    { text: "5", id: 5, value: 5 },
    { text: "6", id: 6, value: 6 },
    { text: "7", id: 7, value: 7 },
    { text: "8", id: 8, value: 8 },
    { text: "9", id: 9, value: 9 },
    { text: "10", id: 10, value: 10 },
  ];

  // number of garages data
  const garages = [
    { text: "1", id: 1, value: 1 },
    { text: "2", id: 2, value: 2 },
    { text: "3", id: 3, value: 3 },
    { text: "4", id: 4, value: 4 },
    { text: "5", id: 5, value: 5 },
  ];

  // property state
  const [property, setProperty] = useState({
    agent_id: null,
    seller_id: null,
    buyer_id: null,
    property_type: "residential",
    price: 0,
    bedrooms: 1,
    bathrooms: 1,
    garages: 1,
    area: "",
    location: "",
    description: "",
    image: null,
  });

  // state to store the image
  const [image, setImage] = useState(null);
  const imageRef = useRef(null);

  // handle create property
  const handleNewProperty = async (e) => {
    //
    e.preventDefault();

    //upload image to local storage
    const file = imageRef.current.files[0];
    if (!file) {
      // check if image is selected or not
      // assign the default image
      property.image = "/assets/images/default_home.jpg";
    } else {
      const response = await fetch(`/api/upload?filename=${file.name}`, {
        method: "POST",
        body: file,
      });
      const newBlob = await response.json();
      console.log(newBlob.url);
      // assign the image url to the property
      property.image = newBlob.url;
    }

    // assign the agent id or seller id or buyer id
    if (session.user.source === "agent") {
      property.agent_id = session.user.id;
    } else if (session.user.source === "seller") {
      property.seller_id = session.user.id;
    } else if (session.user.source === "buyer") {
      property.buyer_id = session.user.id;
    }

    try {
      // send the property to the server
      const res = await fetch("/api/property/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(property),
      });

      // check if the response is ok
      if (!res.ok) {
        throw new Error(res);
      } else {
        alert("Property added successfully");
        // redirect to the home page
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    }

    console.log(property);
  };

  return (
    <section className="h-full bg-neutral-200 dark:bg-neutral-700">
      <div className="container h-full p-10 ">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div className="g-0 flex justify-around ">
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div
                    defaultValue="buyer"
                    className="w-full p-10  text-center"
                  >
                    <form onSubmit={handleNewProperty}>
                      {/* propery type intput */}
                      <TESelect
                        required
                        label="Property Type ?"
                        data={property_types}
                        onValueChange={(e) => {
                          // get the company id from the companies array
                          setProperty({
                            ...property,
                            property_type: e.text,
                          });
                        }}
                        className="mb-4"
                      />
                      {/* <!--Price  input--> */}
                      <TEInput
                        required
                        type="number"
                        label="Price (SAR)"
                        className="mb-4"
                        onChange={(e) => {
                          setProperty({
                            ...property,
                            price: e.target.value,
                          });
                        }}
                        max={1000000000}
                        min={1000000}
                      ></TEInput>

                      {/* number bedroom, bathroom and garage */}
                      <TESelect
                        data={bedrooms_bathrooms}
                        size="sm"
                        label="# Bedrooms"
                        className="mb-4"
                        onValueChange={(value) => {
                          setProperty({
                            ...property,
                            bedrooms: value.value,
                          });
                        }}
                        preventFirstSelection
                      />
                      <TESelect
                        data={bedrooms_bathrooms}
                        size="sm"
                        label="# Bathrooms"
                        className="mb-4"
                        onValueChange={(value) => {
                          setProperty({
                            ...property,
                            bathrooms: value.value,
                          });
                        }}
                        preventFirstSelection
                      />
                      <TESelect
                        data={garages}
                        size="sm"
                        label="# Garages"
                        className="mb-4"
                        onValueChange={(value) => {
                          setProperty({
                            ...property,
                            garages: value.value,
                          });
                        }}
                        preventFirstSelection
                      />

                      {/* <!--Area input input--> */}

                      <TEInput
                        type="number"
                        label="Area in sqm"
                        className="mb-4"
                        onChange={(e) => {
                          setProperty({
                            ...property,
                            area: e.target.value,
                          });
                        }}
                        max={10000000}
                        required
                      ></TEInput>

                      {/* location input */}

                      <TEInput
                        type="text"
                        label="Location"
                        className="mb-4"
                        onChange={(e) => {
                          setProperty({
                            ...property,
                            location: e.target.value,
                          });
                        }}
                        required
                      ></TEInput>

                      {/* <!--description input textarea--> */}
                      <div className="relative mb-6">
                        <TETextarea
                          id="exampleFormControlTextarea13"
                          label="Description"
                          rows={3}
                          onChange={(e) => {
                            setProperty({
                              ...property,
                              description: e.target.value,
                            });
                          }}
                        />
                      </div>

                      {/* photo upload input */}

                      <input
                        className="mb-4 m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                        type="file"
                        id="formFile"
                        ref={imageRef}
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
                            + add property
                          </button>
                        </TERipple>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
