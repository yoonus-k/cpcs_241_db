"use client";
import React from "react";
import { useEffect, useState } from "react";
import AuctionCard from "@components/auctionCard";
import { useSession } from "next-auth/react";

const page = () => {
  const [auctions, setAuctions] = useState(null);

  const { data: session } = useSession();

  useEffect(() => {
    // fetch properties from the api based on the id
    const fetchAuctions = async () => {
      const res = await fetch(`/api/auction/`, {
        method: "GET",
        cache: "no-store",
      });
      const data = await res.json();
      setAuctions(data.rows);
      console.log(data.rows);
      console.log(data.command);
    };

    fetchAuctions();
  }, []);

  return (
    <div>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Latest Auctions
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {/* auction cards */}
            {auctions &&
              session?.user?.id &&
              auctions.map(
                (auction, id) =>
                  // render only the auctions that are not won
                  auction.buyer_id == null &&
                  auction.buyer_seller_id == null && (
                    <AuctionCard
                      key={id}
                      auction={auction}
                      id={auction.property_id}
                      user_id={session?.user?.id}
                    />
                  )
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
