"use client";
import React, { useEffect, useState } from "react";

interface BlogData {
    name: string;
    email: string;
  }

const UserProfile = () => {
  const [userToken, setUserToken] = useState<string | null>("null"); // Store the token
  const [user, setUser] = useState<BlogData>(); // Store the token

  // Load token from storage when component mounts
  useEffect(() => {
    const tokenLocal = localStorage.getItem("Token"); // Adjust this to your token key
    const token = tokenLocal !== null ? JSON.parse(tokenLocal) : null;
    setUserToken(token?.access_token);
    setUser(token?.user);
    // userRole check for route protects
  }, [userToken]);

  return (
    <>
      <div className="py-10">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden md:max-w-md">
          <div className="md:flex">
            <div className="w-full p-2 py-10">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border border-black  text-black flex items-center justify-center font-semibold text-lg">
                      {user?.name?.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="absolute border-white border-4 h-5 w-5 top-12 left-10 bg-green-700 rounded-full"></span>
                </div>
              </div>

              <div className="flex flex-col text-center mt-3 mb-4">
                <span className="text-2xl font-medium">{user?.name}</span>
                <span className="text-md text-gray-400">{user?.email}</span>
              </div>

              <p className="px-16 text-center text-md text-gray-800">
                Actress, musician, songwriter, and artist.DM for work inquires
                or{" "}
                <a className="text-blue-800 text-md font-bold" href="#">
                  #tag{" "}
                </a>
                me in your message.
              </p>

              {/* <div className="px-16 mt-3 text-center">
                <span className="bg-gray-100 h-5 p-1 px-3 rounded cursor-pointer hover:shadow hover:bg-gray-200">
                  #art
                </span>
                <span className="bg-gray-100 h-5 p-1 px-3 rounded cursor-pointer hover:shadow hover:bg-gray-200">
                  #photography
                </span>
                <span className="bg-gray-100 h-5 p-1 px-3 rounded cursor-pointer hover:shadow hover:bg-gray-200">
                  #music
                </span>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
