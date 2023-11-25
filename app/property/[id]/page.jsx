"use client";
import React from "react";
import { useEffect, useState } from "react";
import PropertyCard from "@components/propertyCard";

const page = ({ params }) => {
  const [property, setProperty] = useState(null);

  useEffect(() => {
    // fetch properties from the api based on the id
    const fetchProperties = async () => {
      const res = await fetch(`/api/fetchProperty/seller/${params.id}`, {
        method: "GET",
        cache: "no-store",
      });
      const data = await res.json();

      setProperty(data.rows);
      console.log(data);
    };

    fetchProperties();
  }, []);

  return (
    <div>
      all properties belong to id no: {params.id}
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Your Properties
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {property &&
              property.map((property) => (
                <div key={property.property_id}>
                  <PropertyCard id={params.id} property={property} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
