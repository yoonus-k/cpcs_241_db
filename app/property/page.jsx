"use client";
import React from "react";
import { useEffect, useState } from "react";
import PropertyCard from "@components/propertyCard";
import { useSession } from "next-auth/react";

const page = () => {
  const [property, setProperty] = useState(null);

  const { data: session } = useSession();

  useEffect(() => {
    // fetch properties from the api based on the id
    const fetchProperties = async () => {
      const res = await fetch(`/api/property`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      setProperty(data.rows);
      console.log(data);
    };

    fetchProperties();
  }, []);

  return (
    <div>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            For Sale
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {property &&
              property.map((property) => (
                <div key={property.property_id}>
                  <>
                    {property.buyer_id === null ? (
                      <div>
                        <PropertyCard
                          id={session?.user?.id}
                          property={property}
                        />
                      </div>
                    ) : null}
                  </>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
