"use client";
import React from "react";

import { Bed, Bath, Grid2X2, MapPin, Car } from "lucide-react";

import { Badge } from "./ui/badge";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const TERipple = dynamic(
  () => import("tw-elements-react").then((mod) => mod.TERipple),
  {
    ssr: false,
  }
);

const PropertyCard = ({ property, id, rule }) => {
  // initializing router
  const router = useRouter();

  // function to handle buying a property
  const handleBuy = async (e) => {
    e.preventDefault();

    router.push(`/payment/${property.property_id}`);
  };
  return (
    <div>
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

            <div className="flex flex-col">
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
            <div className="grid grid-cols-4  ">
              <div className="relative mb-4 px-4 lg:mb-0 flex flex-row">
                <Bed className="text-xs" />
                <h5 className=" ml-1 font-bold text-primary">
                  {property.bedrooms}
                </h5>

                <div className="absolute right-0 top-0 hidden h-full min-h-[1em] w-px self-stretch border-t-0 bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100 lg:block" />
              </div>
              <div className="relative mb-4 px-2 lg:mb-0 flex flex-row">
                <Bath className="text-xs" />
                <h5 className=" ml-1 font-bold text-primary">
                  {property.bathrooms}
                </h5>

                <div className="absolute right-0 top-0 hidden h-full min-h-[1em] w-px self-stretch border-t-0 bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100 lg:block" />
              </div>
              <div className="relative mb-4 px-1 lg:mb-0 flex flex-row">
                <Grid2X2 className="text-xs" />
                <h5 className=" ml-1 font-bold text-primary">
                  {property.area_size + " m²"}
                </h5>

                <div className="absolute right-0 top-0 hidden h-full min-h-[1em] w-px self-stretch border-t-0 bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100 lg:block" />
              </div>
              <div className="relative mb-4 px-4 lg:mb-0 flex flex-row">
                <Car className="text-xs" />
                <h5 className=" ml-1 font-bold text-primary">
                  {property.garage}
                </h5>

                <div className="absolute right-0 top-0 hidden h-full min-h-[1em] w-px self-stretch border-t-0 bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100 lg:block" />
              </div>
            </div>
          </div>
          <hr className="my-4 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />

          {/*  description section */}
          <div className="properties-list mb-2 p-5">
            <div className="grid grid-cols-1  ">
              <h4 className="mb-5 text-xl font-semibold">Description:</h4>
              <p>{property.description}</p>
            </div>
          </div>
          <hr className="my-4 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-25 dark:opacity-100" />
          {/*  price section */}
          {property.seller_id == id ? (
            <div className="mb-12 pb-1 pt-1 text-center">
              <TERipple rippleColor="light" className="w-full">
                <button
                  disabled
                  className="pointer-events-none mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                  type="submit"
                  style={{
                    background:
                      "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                  }}
                >
                  {property.buyer_id ? (
                    <p className="mr-2">Sold</p>
                  ) : (
                    <p className="mr-2">{property.price + " SAR "}</p>
                  )}
                </button>
              </TERipple>
            </div>
          ) : (
            <div className="mb-12 pb-1 pt-1 text-center">
              <TERipple rippleColor="light" className="w-full">
                <button
                  onClick={handleBuy}
                  className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                  type="submit"
                  style={{
                    background:
                      "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                  }}
                >
                  {property.buyer_id ? (
                    <p className="mr-2">Sold</p>
                  ) : (
                    <p className="mr-2">{property.price + " SAR "}| Buy</p>
                  )}
                </button>
              </TERipple>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
