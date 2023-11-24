"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

// importing dynamic components
const TEInput = dynamic(
  () => import("tw-elements-react").then((mod) => mod.TEInput),
  {
    ssr: false,
  }
);

export function DialogDemo({ auction, user_id }) {
  const [bidAmount, setBidAmount] = useState(0);
  const router = useRouter();

  const handleNewBid = async (e) => {
    //
    e.preventDefault();
    //set the winner id to the user id
    auction.winning_bid = user_id;
    // update the highest bid
    auction.highest_bid = bidAmount;

    // send the data to the api
    const res = await fetch(`/api/auction/`, {
      method: "PATCH",
      body: JSON.stringify(auction),
    });

    // check if the response is ok
    if (res.ok) {
      alert("Bid submitted successfully");
      // redirect to the dashboard
      router.push("/");
    } else {
      // show an error message
      console.log("error");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="cursor-pointer mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 acti"
          style={{
            background:
              "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
          }}
          variant="outline"
        >
          + New Bid
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Bid</DialogTitle>
          <DialogDescription>
            Define new bid for this auction, your id :{user_id}
          </DialogDescription>
        </DialogHeader>
        <form
          action=""
          onSubmit={(e) => {
            handleNewBid(e);
          }}
        >
          <div className="grid grid-cols-4  gap-4 mb-4">
            <Label
              htmlFor="name"
              className=" col-span-1 flex justify-center items-center text-center"
            >
              Amount (SAR)
            </Label>

            {/* price range input */}
            <div className="col-span-3">
              <TEInput
                type="number"
                label="Your bid"
                className="col-span-3 "
                onChange={(e) => {
                  setBidAmount(e.target.value);
                }}
                min={parseInt(auction.highest_bid) + 1000}
                required
              ></TEInput>
            </div>
          </div>

          <DialogFooter>
            <Button
              className="cursor-pointer mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 acti"
              style={{
                background:
                  "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
              }}
              type="submit"
            >
              Submit My Bid
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
