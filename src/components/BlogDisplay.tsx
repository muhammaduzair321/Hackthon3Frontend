"use client";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loading from "./Loading";

interface Author {
  name: string;
  // Add other author properties if needed
}

interface BlogsInterface {
  _id: string; // Change the type accordingly
  title: string;
  shortDescription: string;
  blogBody: string;
  thumbnailUrl: string | any;
  authorId: Author;
  createdAt: string;
  // Add other properties if needed
}

const BlogDisplay = () => {
  const router = useRouter();

  const [load, setLoad] = useState(false);

  const [userToken, setUserToken] = useState<string | null>("null"); // Store the token
  const [userid, setUserid] = useState<string | Blob>(""); // Store the token
  const [showBlogs, setShowBlogs] = useState([]);

  // Load token from storage when component mounts
  useEffect(() => {
    const tokenLocal = localStorage.getItem("Token"); // Adjust this to your token key
    const token = tokenLocal !== null ? JSON.parse(tokenLocal) : null;
    setUserToken(token?.access_token);
    setUserid(token?.user?._id);
    // userRole check for route protects
    fetchBlogsAll();
  }, [userToken, router]);

  console.log("showBlogs", showBlogs);

  const fetchBlogsAll = async () => {
    setLoad(true);
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_BASEPATH}/blog`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      console.log("object", res);
      if (res.status === 200) {
        setShowBlogs(res.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
    setLoad(false);
  };
  console.log("object", userToken);
  const handleCreateChallengeClick = () => {
    // Check if the user is logged in
    if (userToken !== undefined) {
      // User is logged in, navigate to the create challenge page
      router.push("/create-challenges");
    } else {
      // User is not logged in, display a message or show a login modal
      // alert("Please log in to create a Codeing challenge.");
      toast.error("Please log in to create a Codeing challenge.", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // You can also redirect to the login page here if you have one
      // Example: router.push("/login");
    }
  };

  return (
    <>
      <div className="px-8 md:px-16 text-center pt-9">
        <h1 className=" text-4xl font-bold">Archive</h1>
        <p className=" text-lg from-neutral-500 pt-2">
          See all posts we have ever written.
        </p>
        {/* Create new blog button */}
        <div className=" pt-2">
          <p className="text-lg font-semibold text-gray-600">
            Ready to share your thoughts? Create a new Codeing challenge post
            now!
          </p>
          {/* <Link href={"/create-challenges"}> */}
          <button
            onClick={handleCreateChallengeClick}
            className="btn-primary mt-2"
          >
            Create Codeing challenge
          </button>
          {/* </Link> */}
        </div>
      </div>

      {load ? (
        <Loading />
      ) : (
        <div className="px-8 md:px-16 w-full flex items-center  py-3">
          <div className="flex flex-wrap -mx-1 lg:-mx-4">
            {/* <!-- Column --> */}
            {showBlogs?.length > 0 &&
              showBlogs?.map((blogs: BlogsInterface, ind) => (
                <div
                  key={blogs?._id}
                  className="my-2 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3"
                >
                  <Link href={`/challenges/${blogs?._id}`}>
                    {/* <!-- Article --> */}
                    <article className="overflow-hidden rounded-lg shadow-lg transition-transform duration-300 ease-in transform hover:scale-105">
                      {/* <a href="#">
                <img
                  alt="Placeholder"
                  className="block h-auto w-full "
                  src={`http://localhost:5000/${blogs.thumbnailUrl}`}
                />
              </a> */}

                      <header className="flex items-start flex-col leading-tight p-2 md:px-4 md:pt-4 md:pb-1">
                        {/* <p className=" leading-5 text-green-600 pt-2 pb-1">
                  {blogs?.categoryId?.category}
                </p> */}

                        <h1 className="text-lg">
                          <a
                            className="no-underline hover:underline font-semibold text-black"
                            href="#"
                          >
                            {blogs?.title}
                          </a>
                        </h1>

                        <div className=" text-green-600 flex items-center gap-1 leading-none my-2">
                          <p>By {blogs?.authorId?.name}</p>
                          <p className="text-grey-darker text-sm">
                            | {moment(blogs?.createdAt).format("MMM Do YY")}
                          </p>
                        </div>

                        <p className="text-gray-500 h-[120px]">
                          {blogs?.blogBody?.length > 100
                            ? `${blogs.blogBody.slice(0, 100)}...`
                            : blogs?.blogBody}
                        </p>
                        <br />
                        {/* <br /> */}
                        <p className=" text-blue-600">Read More</p>
                      </header>

                      <footer className="flex items-center justify-between leading-none p-2 md:px-4 md:pt-2 md:pb-4">
                        <a
                          className="flex items-center no-underline hover:underline text-black"
                          href="#"
                        >
                          <img
                            alt="Placeholder"
                            className="block rounded-full"
                            src="https://picsum.photos/32/32/?random"
                          />
                          <p className="ml-2 text-sm">
                            {blogs?.authorId?.name}
                          </p>
                        </a>
                        <p className="text-grey-darker text-sm">
                          {moment(blogs?.createdAt).format("MMM Do YY")}
                        </p>
                      </footer>
                    </article>
                  </Link>
                  {/* <!-- END Article --> */}
                </div>
              ))}
            {/* <!-- END Column --> */}
            {/* <!-- Column --> */}
          </div>
        </div>
      )}
    </>
  );
};

export default BlogDisplay;
