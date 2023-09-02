"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import moment from "moment";
import Link from "next/link";
import { BsArrowLeft } from "react-icons/bs";
import { toast } from "react-toastify";
import Loading from "./Loading";

interface Author {
  name: string;
  // Add other author properties if needed
}
interface Category {
  category: string;
  // Add other author properties if needed
}

interface BlogData {
  _id: string; // Change the type accordingly
  title: string;
  shortDescription: string;
  blogBody: string;
  thumbnailUrl: string | any;
  authorId: Author;
  categoryId: Category;
  createdAt: string;
}

interface UserID {
  name: string;
  email: string;
}
interface CommentInterface {
  _id: string; // Change the type accordingly
  blogID: string;
  content: string;
  createdAt: string;
  userID: UserID;
}

const SingleBlog = () => {
  const { singleBlogs } = useParams();
  // console.log("id", singleBlogs[1]);

  const [userToken, setUserToken] = useState<string | null>("null");
  const [userid, setUserid] = useState<string | Blob>("");
  const [blogID, setBlogID] = useState<string | Blob>("");
  const [blogData, setBlogData] = useState<BlogData | null>(null);

  const [comment, setComment] = useState(""); // Add this state variable

  const [comments, setComments] = useState([]);

  // comment posting
  const submitComment = async () => {
    // console.log("userid", userid,"comment",comment,"blog id ",blogID);
    if (!userToken) {
      // alert("Please log in to post a comment.");
      toast.error("Please log in to post a comment.", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setComment("")
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASEPATH}/comment/${blogID}/comments`,
        {
          content: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      // console.log("Comment submitted:", response.data);

      // Clear the comment input
    fetchComments();
      setComment("");
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  useEffect(() => {
    const tokenLocal = localStorage.getItem("Token");
    const token = tokenLocal !== null ? JSON.parse(tokenLocal) : null;
    setUserToken(token?.access_token);
    setUserid(token?.user?._id);

    // Fetch blogs only if user is logged in

    fetchSingleBlog();
    // fetchComments();
  }, [singleBlogs[1], userToken]);

  useEffect(() => {
    fetchComments();
  }, [blogID]);

  // fetch all comments agisnt blogID
  const fetchComments = async () => {
    // if (!userToken) {
    //   return;
    // }
    try {
      setInterval(async() => {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASEPATH}/comment/${singleBlogs[1]}/comments`
        );
        console.log(response.data);
        setComments(response.data);
      }, 3000);
      // const response = await axios.get(
      //   `http://localhost:5000/comment/${blogID}/comments`
      // );
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  //fetech single blog
  const fetchSingleBlog = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASEPATH}/blog/${singleBlogs[1]}`
      );
      setBlogData(response.data);
      setBlogID(response?.data._id);
      console.log(response);
    } catch (error) {
      console.error("Error fetching single blog:", error);
    }
  };
  if (!blogData) {
    return <div><Loading/></div>;
  }

  //   console.log("blog", blogData);

  return (
    <>
      <div className=" text-center pt-5">
        <p className=" leading-5 text-green-600 pb-1">
          {blogData?.categoryId?.category}
        </p>
        <h1 className=" text-2xl md:text-4xl  font-bold">{blogData?.title}</h1>
        <div className="flex items-center justify-center  leading-none p-2 md:px-4 md:pt-2 md:pb-4">
          <a className="flex items-center no-underline  text-black" href="#">
            <img
              alt="Placeholder"
              className="block rounded-full w-10 h-10"
              src="https://picsum.photos/32/32/?random"
            />
            <div className=" text-start flex flex-col items-start">
              <p className="ml-2 text-lg font-bold">
                {blogData?.authorId?.name}
              </p>
              <p className="ml-2 text-green-600 text-sm">
                {moment(blogData?.createdAt).format("MMM Do YY")}. 6 min read
              </p>
            </div>
          </a>
        </div>
        {/* <a href="#">
          <img
            alt="Placeholder"
            className="block h-auto w-full "
            src={`http://localhost:5000/${blogData.thumbnailUrl}`}
          />
        </a> */}
      </div>
      <div className="px-8 md:px-16 w-full flex items-center py-3">
        <div className="w-full max-w-3xl mx-auto">
          <section
            className=" code-wrapper whitespace-normal break-words"
            dangerouslySetInnerHTML={{ __html: blogData?.blogBody }}
          />
        </div>
      </div>

      {/* Display Comments */}
      <section className="bg-white dark:bg-gray-900 py-8 lg:py-8">
        <p className=" text-2xl text-black font-bold">Comments</p>
          {comments.length > 0 && comments.map((comment : CommentInterface , index)=>(
        <div className=" w-full mx-auto ">
          <article  key={index} className="p-6 mb-6 text-base bg-white shadow-lg rounded-lg dark:bg-gray-900">
            <footer className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                  <div className=" mr-2 w-8 h-8 rounded-full border border-black  text-black flex items-center justify-center font-semibold text-md">
                    {comment?.userID?.name.slice(0, 2).toUpperCase()}
                  </div>
                  {/* Michael Gough */}
                  {comment?.userID?.name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                {/* {moment(comment?.createdAt).format("MMM Do YY")} */}
                  {/* <time pubdate datetime="2022-02-08"
                        title="February 8th, 2022">Feb. 8, 2022</time>*/}
                </p>
              </div>
              {/* <button
                id="dropdownComment1Button"
                data-dropdown-toggle="dropdownComment1"
                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                type="button"
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                </svg>
                <span className="sr-only">Comment settings</span>
              </button> */}
              {/* <!-- Dropdown menu --> */}
              {/* <div
                id="dropdownComment1"
                className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
              >
                <ul
                  className="py-1 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownMenuIconHorizontalButton"
                >
                  <li>
                    <a
                      href="#"
                      className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Edit
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Remove
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Report
                    </a>
                  </li>
                </ul>
              </div> */}
            </footer>
            <p className="text-gray-500 dark:text-gray-400" style={{ wordWrap: 'break-word' }}>
            {comment?.content}
            </p>
            <div className="flex items-center justify-end mt-4 space-x-4">
              <p className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
              {moment(comment?.createdAt).format("MMM Do YY")}
                
              </p>
              {/* <p className="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
                Reply
              </p> */}
            </div>
          </article>
        </div>
          ))
        }
      </section>

      {/* Comment Box */}
      {/* {userToken ? ( */}
        <div className="mt-8 w-full">
          <div className="w-full  mx-auto">
            <h2 className="text-xl font-semibold mb-2">Leave a Comment</h2>
            <textarea
              className="w-full border rounded p-2"
              rows={4}
              placeholder="Write your comment..."
              value={comment} // Bind value to the comment state
              onChange={(e) => setComment(e.target.value)} // Update comment state
            />
            <button
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={submitComment}
            >
              Submit Comment
            </button>
          </div>
        </div>
      {/* ) : ( */}
        {/* // Display message if user is not logged in */}
        {/* <div className="text-center mt-4">
          <p className="text-lg text-gray-600">
            "Please log in to post a comment."
          </p>
        </div> */}
      {/* )} */}
      <div className="flex items-center justify-center my-4">
        <Link href={"/challenges"}>
          <button className=" text-blue-700 flex items-center space-x-2">
            <BsArrowLeft className=" w-6 text-blue-700" />{" "}
            {/* Left arrow icon */}
            View All Challenges
          </button>
        </Link>
      </div>


     
    </>
  );
};

export default SingleBlog;
