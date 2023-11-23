"use client";
import React from "react";
import { useEffect, useState } from "react";
import { Payment } from "@components/payment";
import { useSearchParams } from "next/navigation";

const page = ({ params }) => {
  // get the property id from the url

  return (
    <div>
      <h1>{params.id}</h1>
      <Payment propertyId={params.id} />
    </div>
  );
};

export default page;
