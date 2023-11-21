"use client";
import React from "react";
import { Menu } from "@/components/navbar/menu";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";

import { Database } from "lucide-react";

const Nav = () => {
  // incilize the router
  const router = useRouter();
  // get the session data
  const { data: session } = useSession();

  return (
    <header className="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm dark:bg-gray-800">
      {/* Main navigation container */}
      <nav
        className="relative flex w-full flex-wrap items-center justify-between bg-[#FBFBFB] py-2 text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:py-4"
        data-te-navbar-ref
      >
        <div className="flex w-full flex-wrap items-center justify-between px-3">
          <div>
            <a
              className="mx-2 my-1 flex items-center text-neutral-900 hover:text-neutral-900 focus:text-neutral-900 lg:mb-0 lg:mt-0"
              href="/"
            >
              <Database className="text-red-500" />
            </a>
          </div>
          {/* Hamburger button for mobile view */}
          {session?.user ? (
            <Menu user_type={session.user.source} user_id={session.user.id} />
          ) : (
            <button
              type="button"
              data-te-ripple-init
              data-te-ripple-color="light"
              className="mr-3 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:bg-neutral-100 hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700 motion-reduce:transition-none"
            >
              <Link href="/login">Login</Link>
            </button>
          )}

          {/* Collapsible navbar container */}
        </div>
      </nav>
    </header>
  );
};

export default Nav;
