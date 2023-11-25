"use client";

import React from "react";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
const TERipple = dynamic(
  () => import("tw-elements-react").then((mod) => mod.TERipple),
  {
    ssr: false,
  }
);

import Model from "@components/model";

export default function App() {
  // initializing state
  const [payments, setPayments] = useState([]);
  const [show, setShow] = useState(false);
  const [property, setProperty] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/payment", {
        method: "POST",
      });
      const result = await response.json();
      setPayments(result.rows);
      console.log(result.rows);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col">
      {show && <Model setShow={setShow} show={show} property={property} />}

      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-center text-sm font-light">
              <thead className="border-b bg-neutral-800 font-medium text-white dark:border-neutral-500 dark:bg-neutral-900">
                <tr>
                  <th scope="col" className=" px-6 py-4">
                    Status
                  </th>
                  <th scope="col" className=" px-6 py-4">
                    Method
                  </th>
                  <th scope="col" className=" px-6 py-4">
                    Amount
                  </th>

                  <th scope="col" className=" px-6 py-4">
                    Property
                  </th>
                </tr>
              </thead>
              <tbody>
                {payments &&
                  payments.map((payment) => (
                    <tr
                      key={payment.payment_id}
                      className="border-b dark:border-neutral-500"
                    >
                      <td className="whitespace-nowrap  px-6 py-4 font-medium">
                        {payment.payment_status}
                      </td>
                      <td className="whitespace-nowrap  px-6 py-4">
                        {payment.payment_method}
                      </td>
                      <td className="whitespace-nowrap  px-6 py-4">
                        {payment.amount}
                      </td>

                      <td className="whitespace-nowrap  px-6 py-4">
                        <TERipple rippleColor="white">
                          <button
                            type="button"
                            className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                            onClick={() => (
                              setShow(true), setProperty(payment)
                            )}
                          >
                            View Property
                          </button>
                        </TERipple>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
