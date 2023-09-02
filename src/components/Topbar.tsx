"use client";
import Link from "next/link";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Transition } from "@headlessui/react";

const Topbar = () => {
  let userLinks = [];

  const route = useRouter();

  const [token, setToken] = useState<any | null>("null"); // Store the token
  // const [userRole, setUserRole] = useState<string>(""); // Store the token
  const [userName, setUserName] = useState<string>(""); // Store the token

  // Load token from storage when component mounts
  useEffect(() => {
    const tokenLocal = localStorage.getItem("Token"); // Adjust this to your token key
    const token = tokenLocal !== null ? JSON.parse(tokenLocal) : null;
    setToken(token?.access_token);
    setUserName(token?.user.name)
    // userRole check for route protects
    // setUserRole(token?.user?.role);
  });

  const path = usePathname();

  const [toggle, setToggle] = useState<boolean>(false);
  const dropdownRef = useRef<any>(null);

  const handleBlur = () => {
    setToggle(false);
  };

  const handleDocumentClick = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setToggle(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("Token");
    // window.location.href = "/";
    route.push("/")
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  userLinks = [
    { href: "/profile", label: "My Profile" },
    { href: "/signin", label: "Sign out" },
  ];

  return (
    <>
      <div className="shadow-md">
        <nav className="container mx-auto px-8 md:px-16 w-full flex  items-center py-3  ">
          <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
            <Link href={"/"}>
              <p className=" text-black text-[18px] font-bold cursor-pointer flex">
              Codeing App
              </p>
            </Link>

            <ul className="list-none hidden sm:flex flex-row gap-10 ">
              <li>
                <Link
                  href="/"
                  className={` ${
                    path === "/" ? " text-[#570DF8] " : " text-black"
                  } hover:text-[#570DF8]`}
                >
                  Home
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/about"
                  className={` ${
                    path === "/about" ? " text-[#570DF8]" : " text-black"
                  } hover:text-[#570DF8]`}
                >
                  About
                </Link>
              </li> */}
              <li>
                <Link
                  href="/challenges"
                  className={` ${
                    path.includes("challenges") ? " text-[#570DF8]" : " text-black"
                  } hover:text-[#570DF8]`}
                >
                Challenges
                </Link>
              </li>
            </ul>
            {token == undefined ? (
              <div className=" hidden sm:flex gap-2">
                <Link href={"/login"}>
                  <button className="btn-primary">Login</button>
                </Link>
                <Link href={"/signup"}>
                  <button className="btn-primary">Signup</button>
                </Link>
              </div>
            ) : (
              <Menu as="div" className=" hidden sm:block relative ml-3">
                <div>
                  <Menu.Button
                    className="relative flex rounded-full 
                    bg-[#570DF8] ring-2 text-sm focus:outline-none ring-[#570DF8]
                    focus:ring-blue focus:ring-offset-2 focus:ring-offset-gray-800 
                    "
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                      <span className="font-semibold  text-lg">
                        {userName.slice(0, 2).toUpperCase()}
                      </span>
                    </div>
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white text-black flex flex-col py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {userLinks.map((link, index) => (
                      <Menu.Item key={index}>
                        {({ active }) => (
                          <Link
                            href={link.href}
                            className={`
                                ${active ? "bg-gray-100" : ""}
                                "block px-4 py-2 text-sm text-gray-700"
                              `}
                            onClick={
                              link.label === "Sign out"
                                ? handleLogout
                                : undefined
                            }
                          >
                            {link.label}
                          </Link>
                        )}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Transition>
              </Menu>
            )}

            {/* burger button  */}
            <div className=" sm:hidden flex gap-2 flex-1 justify-end items-center">
              {token == undefined ? (
                <div className=" hidden sm:flex gap-2">
                  <Link href={"/login"}>
                    <button className="btn-primary">Login</button>
                  </Link>
                  <Link href={"/signup"}>
                    <button className="btn-primary">Signup</button>
                  </Link>
                </div>
              ) : (
                <Menu as="div" className="  relative ml-3">
                  <div>
                    <Menu.Button
                      className="relative flex rounded-full 
                    bg-[#570DF8] ring-2 text-sm focus:outline-none ring-[#570DF8]
                    focus:ring-blue focus:ring-offset-2 focus:ring-offset-gray-800 
                    "
                    >
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                        <span className="font-semibold text-lg">
                          {/* {user.username.slice(0, 2).toUpperCase()} */}
                          lo
                        </span>
                      </div>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white text-black flex flex-col py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userLinks.map((link, index) => (
                        <Menu.Item key={index}>
                          {({ active }) => (
                            <Link
                              href={link.href}
                              className={`
                                ${active ? "bg-gray-100" : ""}
                                "block px-4 py-2 text-sm text-gray-700"
                              `}
                              onClick={
                                link.label === "Sign out"
                                  ? handleLogout
                                  : undefined
                              }
                            >
                              {link.label}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              )}
              {toggle && (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="#000"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => {
                    console.log("no object");
                    setToggle(true);
                  }}
                  className=" w-[24px] h-[24px] object-contain cursor-pointer"
                >
                  davaasfasf
                  <path
                    d="M10.4099 9L16.7099 2.71C16.8982 2.5217 17.004 2.2663 17.004 2C17.004 1.7337 16.8982 1.47831 16.7099 1.29C16.5216 1.1017 16.2662 0.995911 15.9999 0.995911C15.7336 0.995911 15.4782 1.1017 15.2899 1.29L8.99994 7.59L2.70994 1.29C2.52164 1.1017 2.26624 0.995911 1.99994 0.995911C1.73364 0.995911 1.47824 1.1017 1.28994 1.29C1.10164 1.47831 0.995847 1.7337 0.995847 2C0.995847 2.2663 1.10164 2.5217 1.28994 2.71L7.58994 9L1.28994 15.29C1.19621 15.383 1.12182 15.4936 1.07105 15.6154C1.02028 15.7373 0.994141 15.868 0.994141 16C0.994141 16.132 1.02028 16.2627 1.07105 16.3846C1.12182 16.5064 1.19621 16.617 1.28994 16.71C1.3829 16.8037 1.4935 16.8781 1.61536 16.9289C1.73722 16.9797 1.86793 17.0058 1.99994 17.0058C2.13195 17.0058 2.26266 16.9797 2.38452 16.9289C2.50638 16.8781 2.61698 16.8037 2.70994 16.71L8.99994 10.41L15.2899 16.71C15.3829 16.8037 15.4935 16.8781 15.6154 16.9289C15.7372 16.9797 15.8679 17.0058 15.9999 17.0058C16.132 17.0058 16.2627 16.9797 16.3845 16.9289C16.5064 16.8781 16.617 16.8037 16.7099 16.71C16.8037 16.617 16.8781 16.5064 16.9288 16.3846C16.9796 16.2627 17.0057 16.132 17.0057 16C17.0057 15.868 16.9796 15.7373 16.9288 15.6154C16.8781 15.4936 16.8037 15.383 16.7099 15.29L10.4099 9Z"
                    fill="#000"
                  />
                </svg>
              )}

              {!toggle && (
                <svg
                  width="20"
                  height="12"
                  viewBox="0 0 20 12"
                  fill="#000"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => {
                    console.log("object");
                    setToggle(true);
                  }}
                  className=" w-[24px] h-[24px] object-contain cursor-pointer"
                >
                  <path
                    d="M9 2L19 2C19.2652 2 19.5196 1.89464 19.7071 1.70711C19.8946 1.51957 20 1.26522 20 1C20 0.734784 19.8946 0.480429 19.7071 0.292892C19.5196 0.105356 19.2652 0 19 0L9 0C8.73478 0 8.48043 0.105356 8.29289 0.292892C8.10536 0.480429 8 0.734784 8 1C8 1.26522 8.10536 1.51957 8.29289 1.70711C8.48043 1.89464 8.73478 2 9 2ZM19 10L1 10C0.734784 10 0.480429 10.1054 0.292892 10.2929C0.105356 10.4804 0 10.7348 0 11C0 11.2652 0.105356 11.5196 0.292892 11.7071C0.480429 11.8946 0.734784 12 1 12L19 12C19.2652 12 19.5196 11.8946 19.7071 11.7071C19.8946 11.5196 20 11.2652 20 11C20 10.7348 19.8946 10.4804 19.7071 10.2929C19.5196 10.1054 19.2652 10 19 10V10ZM1 7L19 7C19.2652 7 19.5196 6.89464 19.7071 6.70711C19.8946 6.51957 20 6.26522 20 6C20 5.73478 19.8946 5.48043 19.7071 5.29289C19.5196 5.10536 19.2652 5 19 5L1 5C0.734784 5 0.480429 5.10536 0.292892 5.29289C0.105356 5.48043 0 5.73478 0 6C0 6.26522 0.105356 6.51957 0.292892 6.70711C0.480429 6.89464 0.734784 7 1 7Z"
                    fill="#000"
                  />
                </svg>
              )}
              <div
                className={`${
                  !toggle ? " hidden" : " flex"
                } px-6 py-4 bg-white border absolute top-14 right-4 mx-4 min-w-[120px] z-50 rounded-xl `}
                ref={dropdownRef}
                onBlur={handleBlur}
              >
                <ul className=" list-none flex justify-end items-start flex-col gap-4 ">
                  <li onClick={() => setToggle(!toggle)}>
                    <Link
                      href="/"
                      className={` ${
                        path === "/" ? " text-[#570DF8]" : " text-black"
                      } hover:text-[#570DF8]`}
                    >
                      Home
                    </Link>
                  </li>
                  {/* <li onClick={() => setToggle(!toggle)}>
                    <Link
                      href="/about"
                      className={` ${
                        path === "/about" ? " text-[#570DF8]" : " text-black"
                      } hover:text-[#570DF8]`}
                    >
                      About
                    </Link>
                  </li> */}
                  <li onClick={() => setToggle(!toggle)}>
                    <Link
                      href="/challenges"
                      className={` ${
                        path === "/challenges" ? " text-[#570DF8]" : " text-black"
                      } hover:text-[#570DF8]`}
                    >
                      Challenges
                    </Link>
                  </li>

                  {!token ? (
                    <div className="flex  gap-2">
                      <Link onClick={() => setToggle(!toggle)} href={"/login"}>
                        <button className="btn-primary">Login</button>
                      </Link>
                      <Link onClick={() => setToggle(!toggle)} href={"/signup"}>
                        <button className="btn-primary">Signup</button>
                      </Link>
                    </div>
                  ) : (
                    ""
                  )}
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Topbar;
