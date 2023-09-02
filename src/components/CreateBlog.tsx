"use client";
import React, { useState, useEffect } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { FaTrash } from "react-icons/fa";
import Link from "next/link";
import { CreateBlogSchema } from "@/validation";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import draftToHtml from "draftjs-to-html"; // Import the library for converting Draft.js content to HTML
import { useRouter } from "next/navigation";

interface CreateBlogValues {
  title: string;
  // shortDescription: string;
  // thumbnailImage: File | null;
  blogbody: string;
}

const initialValues: CreateBlogValues = {
  title: "",
  // shortDescription: "",
  // thumbnailImage: null,
  blogbody: "",
};

interface CategoryList {
  _id: string; // Change the type accordingly
  category: string;
  // Add other properties if needed
}

const BlogDisplay: React.FC = () => {
  const router = useRouter();

  // const [selectedCategory, setSelectedCategory] = useState<string | null | any>(
  //   ""
  // );

  const [userToken, setUserToken] = useState<string | null>("null"); // Store the token
  const [userid, setUserid] = useState<string | Blob>(""); // Store the token
  // Load token from storage when component mounts
  useEffect(() => {
    const tokenLocal = localStorage.getItem("Token"); // Adjust this to your token key
    const token = tokenLocal !== null ? JSON.parse(tokenLocal) : null;
    setUserToken(token?.access_token);
    setUserid(token?.user?._id);
    // userRole check for route protects
  }, []);

  if (!userToken) {
    router.push("/");
  }

  const [thumbnail, setThumbnail] = useState<any>(null);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const onEditorStateChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const htmlContent = draftToHtml(rawContentState);
    setFieldValue("blogbody", htmlContent);
  };

  const handleThumbnailChange = (e: string | any) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(URL.createObjectURL(file));
      setFieldValue("thumbnailImage", file);
    }
  };
  const handleDeleteThumbnail = () => {
    setThumbnail(null);
  };
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: CreateBlogSchema,
    onSubmit: async (values, action) => {
      const contentState = editorState.getCurrentContent();
      const rawContentState = convertToRaw(contentState);
      const htmlContent = draftToHtml(rawContentState); // Convert Draft.js content to HTML

      const formData = new FormData();
      formData.append("title", values.title);
      // formData.append("shortDescription", values.shortDescription);
      // if (values.thumbnailImage) {
      //   formData.append("thumbnailImage", values.thumbnailImage);
      // }
      formData.append("blogBody", htmlContent);
      formData.append("authorId", userid);
      console.log("data::", formData);
      try {
        console.log(userToken);
        let res = await axios({
          method: "post",
          url: `${process.env.NEXT_PUBLIC_BASEPATH}/blog/new`,
          headers: {
            Authorization: `Bearer ${userToken}`, // Include the token in the request headers
          },
          data: {
            title: values.title,
            blogBody: htmlContent,
            authorId: userid,
          },
        });
        console.log("res", res);
        if (res.status === 201) {
          toast(`Blog successfully created`, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => {
            action.resetForm();
            router.push("challenges");
          }, 2000);
        }
      } catch (error) {
        if (error.response.data.message) {
          toast.error(error.response.data.message, {
            position: "top-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
    },
  });

  return (
    <>
      <div className="container flex flex-col justify-center items-center mx-auto ">
        <h1 className=" text-2xl sm:text-3xl font-semibold mb-4">
          Create a New Challenge
        </h1>
        <form onSubmit={handleSubmit} className="lg:w-1/2 md:w-2/3 w-full">
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              placeholder="Enter Challenge title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border ${
                errors.title && touched.title
                  ? "border-red-600" // Apply red border for errors
                  : "border-gray-300" // Apply default border color
              } rounded-md p-2`}
            />
            {errors.title && touched.title ? (
              <p className=" text-sm text-red-600 ml-1 ">{errors.title}</p>
            ) : null}
          </div>

          {/* <div className="mb-4">
            <label
              htmlFor="thumbnail"
              className="block text-sm font-medium text-gray-700"
            >
              Thumbnail Image
            </label>
            <input
              type="file"
              id="thumbnailImage"
              onChange={handleThumbnailChange}
              className={`mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border ${
                errors.thumbnailImage && touched.thumbnailImage
                  ? "border-red-600" // Apply red border for errors
                  : "border-gray-300" // Apply default border color
              } rounded-md p-2`}
            />
          </div>
          {thumbnail && (
            <div className="mb-4 flex items-end">
              <img
                src={thumbnail}
                alt="Thumbnail"
                className="w-16 h-16 mr-2 rounded-md"
              />
              <button
                type="button"
                onClick={handleDeleteThumbnail}
                className="text-red-600 hover:text-red-700 pb-1"
              >
                <FaTrash />
              </button>
            </div>
          )}
          {errors.thumbnailImage && touched.thumbnailImage ? (
            <p className=" text-sm text-red-600 ml-1 ">
              {errors.thumbnailImage}
            </p>
          ) : null} */}

          <div className="mb-4">
            <label
              htmlFor="blogBody"
              className="block text-sm font-medium text-gray-700"
            >
              Challenge Body
            </label>
            <div
              className={`mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border ${
                errors.blogbody && touched.blogbody
                  ? "border-red-600" // Apply red border for errors
                  : "border-gray-300" // Apply default border color
              } rounded-md p-2`}
            >
              <Editor
                editorStyle={{ height: "200px", overflow: "auto" }}
                editorState={editorState}
                toolbarClassName="toolbarClassName"
                wrapperClassName="wrapperClassName"
                editorClassName="editorClassName"
                onEditorStateChange={onEditorStateChange}
              />
            </div>
            {errors.blogbody && touched.blogbody ? (
              <p className=" text-sm text-red-600 ml-1 ">{errors.blogbody}</p>
            ) : null}
          </div>
          <div className="flex gap-2">
            <Link href={"/challenges"}>
              <button
                type="button"
                className="bg-red-500 text-white py-2 px-2 sm:px-4 rounded-md hover:bg-red-600"
              >
                Cancel
              </button>
            </Link>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-2 sm:px-4 rounded-md hover:bg-blue-600"
            >
              Create Challenge
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default BlogDisplay;
