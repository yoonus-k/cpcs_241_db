"use client";

import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { DatePicker } from "@components/dataPicker";
import { tr } from "date-fns/locale";

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

const NewAuction = ({ params }) => {
  const router = useRouter();
  // define all variables here

  // property state
  const [property, setProperty] = useState([]);

  // auction status data
  const [auction, setAuction] = useState({
    property_id: "",
    starting_bid: "",
    auction_start_date: null,
    auction_end_date: null,
    highest_bid: "",
  });

  // handle create property
  const handleNewAuction = async (e) => {
    //
    e.preventDefault();
    //set the auction start date
    auction.auction_start_date = new Date();
    // set the highest bid
    auction.highest_bid = auction.starting_bid;

    try {
      // send the property to the server
      const res = await fetch("/api/auction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(auction),
      });

      // check if the response is ok
      if (!res.ok) {
        throw new Error(res);
      } else {
        alert("Auction started successfully");
        // redirect to the home page
        router.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  // fetch all the properties
  useEffect(() => {
    const fetchData = async () => {
      // fetch all the properties
      const res = await fetch(`/api/property/${params.id}/seller`, {
        method: "GET",
        cache: "no-store",
      });
      const data = await res.json();
      console.log(data.rows);
      // set the properties

      // customizing the data
      const properties = data.rows.map((property) => {
        if (property.buyer_id == null && property.auction_id == null) {
          //check if there is an auction for this property

          return {
            text:
              property.location +
              " - " +
              property.property_type +
              " - " +
              property.price +
              " SAR",
            id: property.property_id,
            value: property.property_id,
          };
        }
      });

      console.log(properties);

      setProperty(properties);
    };

    fetchData();
  }, []);

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
                    <form
                      onSubmit={(e) => {
                        console.log(auction);
                        handleNewAuction(e);
                      }}
                    >
                      {/* propery type intput */}
                      <TESelect
                        required
                        label="Which property?"
                        data={property}
                        onValueChange={(value) => {
                          setAuction({
                            ...auction,
                            property_id: value.id,
                          });
                        }}
                        className="mb-4"
                        preventFirstSelection
                      />
                      {/* <!--starting bid  input--> */}
                      <TEInput
                        required
                        type="number"
                        label="Starting bid (SAR)"
                        className="mb-4"
                        onChange={(value) => {
                          setAuction({
                            ...auction,
                            starting_bid: value.target.value,
                          });
                        }}
                        max={1000000000}
                        min={10000}
                      ></TEInput>

                      {/* <!--auction end date--> */}

                      {/* <TEInput
                        type="date"
                        label="Auction end date"
                        className="mb-4"
                        onChange={(e) => {}}
                      ></TEInput> */}

                      <DatePicker setAuction={setAuction} auction={auction} />

                      {/* <!--Submit button--> */}
                      <div className="mb-8 mt-4 pb-1 pt-1 text-center">
                        <TERipple rippleColor="light" className="w-full">
                          <button
                            className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                            type="submit"
                            style={{
                              background:
                                "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                            }}
                          >
                            Start Auction
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

export default NewAuction;
