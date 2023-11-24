"use client";
import React from "react";

import { Plus, CalendarClock, MapPin, MoveUpRight } from "lucide-react";

import { Badge } from "./ui/badge";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { DialogDemo } from "@components/dialog";

const TERipple = dynamic(
  () => import("tw-elements-react").then((mod) => mod.TERipple),
  {
    ssr: false,
  }
);

const AuctionCard = ({ auction, id, user_id }) => {
  // initializing router
  const router = useRouter();

  const [property, setProperty] = useState(null);

  // function to handle buying a property

  useEffect(() => {
    // fetch properties from the api based on the id
    const fetchProperties = async () => {
      const res = await fetch(`/api/property/${id}`, {
        method: "GET",
        cache: "no-cache",
      });
      const data = await res.json();
      setProperty(data.rows[0]);
    };

    fetchProperties();
  }, []);

  // function to close the bid
  const handleCloseBid = async (e) => {
    //
    e.preventDefault();

    // send the data to the api
    const res = await fetch(`/api/auction/${auction.auction_id}`, {
      method: "POST",
      body: JSON.stringify(auction),
    });

    // check if the response is ok
    if (res.ok) {
      alert("Bid closed successfully");
      alert("New bill created successfully");
      // redirect to the dashboard
      router.push("/");
    } else {
      // show an error message
      console.log("error", res);
    }
  };

  return (
    <div>
      {property != null ? (
        <div key={id} className="group relative">
          <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
              <img
                src={property.image}
                alt={property.location}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
              />
            </div>

            {/*  location  */}
            <div className="mt-4 flex justify-between  mb-2">
              <div className="flex flex-row">
                <MapPin className="text-xs ml-2"></MapPin>
                <h3 className="text-sm text-gray-700 ">{property.location}</h3>
              </div>

              <div className="flex flex-row">
                <Badge className="mr-2">
                  <Link href={`/profile/${property.seller_id}`}>
                    Contact Seller
                  </Link>
                </Badge>
                <Badge className="mr-2">
                  <p className="text-sm font-medium  ">
                    {property.property_type}
                  </p>
                </Badge>
              </div>
            </div>

            <hr className="my-4 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
            {/* properties list */}
            <div className="properties-list mb-1">
              <div className="grid grid-cols-2  ">
                <div className="relative mb-4 px-4 lg:mb-0 flex flex-row">
                  <MoveUpRight className="text-xs" />
                  <h3 className=" ml-1 font-bold text-primary">
                    {auction.highest_bid + " SAR"}
                    <p>
                      +{" "}
                      {((parseInt(auction.highest_bid) -
                        parseInt(auction.starting_bid)) /
                        parseInt(auction.starting_bid)) *
                        100 +
                        "%"}
                    </p>
                  </h3>

                  <div className="absolute right-0 top-0 hidden h-full min-h-[1em] w-px self-stretch border-t-0 bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100 lg:block" />
                </div>
                <div className="relative mb-4 px-2 lg:mb-0 flex flex-row">
                  <CalendarClock className="text-xs" />
                  <h5 className=" ml-1 font-bold text-primary">
                    {Date(auction.end_date).slice(0, 15)}
                  </h5>

                  <div className="absolute right-0 top-0 hidden h-full min-h-[1em] w-px self-stretch border-t-0 bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100 lg:block" />
                </div>
              </div>
            </div>
            <hr className="my-4 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />

            {/*  description section */}

            {/*  price section */}
            {property.seller_id != user_id ? (
              <DialogDemo auction={auction} user_id={user_id}></DialogDemo>
            ) : (
              <div className="mb-12 pb-1 pt-1 text-center">
                <TERipple rippleColor="light" className="w-full">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleCloseBid(e);
                    }}
                    className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                    type="submit"
                    style={{
                      background:
                        "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                    }}
                  >
                    <p className="mr-2">
                      Highest bid so far: {auction.highest_bid} | close bid
                    </p>
                  </button>
                </TERipple>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default AuctionCard;
