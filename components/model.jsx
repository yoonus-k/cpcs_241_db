"use client";
import React, { useState } from "react";
import {
  TERipple,
  TEModal,
  TEModalDialog,
  TEModalContent,
  TEModalHeader,
  TEModalBody,
  TEModalFooter,
} from "tw-elements-react";
import PropertyCard from "./propertyCard";

export default function Model({ setShow, show, property }) {
  const [
    showVerticalyCenteredScrollModal,
    setShowVerticalyCenteredScrollModal,
  ] = useState(show);
  return (
    <div>
      {/* <!--Verically centered scrollable modal--> */}
      <TEModal
        show={showVerticalyCenteredScrollModal}
        setShow={setShowVerticalyCenteredScrollModal}
        scrollable
      >
        <TEModalDialog centered>
          <TEModalContent>
            <TEModalHeader>
              {/* <!--Modal title--> */}
              <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                Property Details
              </h5>
              {/* <!--Close button--> */}
              <button
                type="button"
                className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                onClick={() => {
                  setShowVerticalyCenteredScrollModal(false), setShow(false);
                }}
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </TEModalHeader>
            {/* <!--Modal body--> */}

            <TEModalBody>
              <PropertyCard property={property}></PropertyCard>
            </TEModalBody>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>
    </div>
  );
}
