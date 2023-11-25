"use client";
import React from "react";

import { UserCircle2 } from "lucide-react";
import { useState, useEffect } from "react";

const Profile = ({ params }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const result = await fetch(`/api/users/${params.id}`, {
        method: "GET",
        cache: "no-store",
      });
      const body = await result.json();
      console.log(body);
      setUser(body.rows[0]);
    };
    if (params.id) {
      console.log(params.id);
      fetchUser();
    }
  }, []);

  return (
    <div className="flex items-center h-screen w-full justify-center">
      <div className="min-w-max w-5/6 lg:w-1/2">
        <div className="bg-white shadow-xl rounded-lg py-3">
          <div className="photo-wrapper p-2 flex justify-center ">
            <UserCircle2 width={100} height={100} />
          </div>
          {user && (
            <div className="p-2">
              <h3 className="text-center text-xl text-gray-900 font-medium leading-8">
                {user.seller_name}
              </h3>
              <div className="text-center text-gray-400 text-xs font-semibold">
                <p>{user.source}</p>
              </div>
              <table className="text-xs my-3">
                <tbody>
                  <tr>
                    <td className="px-2 py-2 text-gray-500 font-semibold">
                      name
                    </td>
                    <td className="px-2 py-2">{user.seller_name}</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 text-gray-500 font-semibold">
                      Phone
                    </td>
                    <td className="px-2 py-2">{user.phone}</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-2 text-gray-500 font-semibold">
                      Email
                    </td>
                    <td className="px-2 py-2">{user.email}</td>
                  </tr>
                </tbody>
              </table>
              <div className="text-center my-3">
                <a
                  className="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium"
                  href="#"
                >
                  Contact Seller
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
