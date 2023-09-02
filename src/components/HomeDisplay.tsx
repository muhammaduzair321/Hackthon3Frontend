"use client";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
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
    authorId:Author;
    createdAt:string;
    // Add other properties if needed
  }


const HomeDisplay = () => {


  const [load,setLoad]=useState(false)



    const router = useRouter();

    const [userToken, setUserToken] = useState<string | null>("null"); // Store the token
    const [userid, setUserid] = useState<string | Blob>(""); // Store the token
    const [showBlogs,setShowBlogs]=useState([])
    

    // Load token from storage when component mounts
    useEffect(() => {
      const tokenLocal = localStorage.getItem("Token"); // Adjust this to your token key
      const token = tokenLocal !== null ? JSON.parse(tokenLocal) : null;
      setUserToken(token?.access_token);
      setUserid(token?.user?._id);
      // userRole check for route protects
      fetchBlogsAll();
    }, [userToken, router]);
  
    console.log("showBlogs",showBlogs)
  
    const fetchBlogsAll = async () => {
    setLoad(true)
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BASEPATH}/blog`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        console.log("object",res)
        if(res.status === 200){
          setShowBlogs(res.data)
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    setLoad(false)

    };
    const latestTenBlogs = showBlogs.slice(0, 10); // Extract the first ten blogs

  return (
    <>
      {/* two card  */}

      {/* all card */}

      {load? 
      <Loading/> 
      : 

      <div>
      <div className="px-8 md:px-16 w-full flex items-center  py-3">
        <div className="flex flex-wrap -mx-1 lg:-mx-4">
          {/* <!-- Column --> */}
          {latestTenBlogs?.length > 0 && latestTenBlogs?.map((blogs:BlogsInterface,ind) => (
          <div key={blogs?._id} className="my-2 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
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
          )) }
          {/* <!-- END Column --> */}
          {/* <!-- Column --> */}
        </div>
      </div>



      {/* button for go blog page to see all  */}
      <div className=" flex items-center justify-center mb-4">
        <Link href={"/challenges"}>
          <button className=" btn-secondary">View All Posts</button>{" "}
        </Link>
      </div>
      </div>
      }
    </>
  );
};

export default HomeDisplay;
