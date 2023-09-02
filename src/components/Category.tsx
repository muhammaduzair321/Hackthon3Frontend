"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

interface CategoryList {
  _id: string; // Change the type accordingly
  category: string;
  // Add other properties if needed
}

const Category = () => {
  const router = useRouter();
  const [category, setCategory] = useState<string>("");
  const [categories, setCategories] = useState([]); // State to store fetched categories
  const [editedcategory, setEditCategorie] = useState(false);
  const [cateID, setCateID] = useState("");

  const [userToken, setUserToken] = useState<string | null>("null"); // Store the token
  const [userid, setUserid] = useState<string | Blob>(""); // Store the token
  // Load token from storage when component mounts
  useEffect(() => {
    const tokenLocal = localStorage.getItem("Token"); // Adjust this to your token key
    const token = tokenLocal !== null ? JSON.parse(tokenLocal) : null;
    setUserToken(token?.access_token);
    setUserid(token?.user?._id);
    // userRole check for route protects
    const userRole = token?.user?.role;
    if (userRole !== "admin") {
      router.push("/");
    }
    fetchCategories();
  }, [userToken, router]);

  // Fetch categories from backend
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASEPATH}/categorylist`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      setCategories(response.data); // Assuming your API response has a 'categories' field
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!category) {
      toast.error("Category Cann't be Empty", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    // console.log("cate", category);
    try {
      if (editedcategory) {
        const res = await axios.patch(
          `${process.env.NEXT_PUBLIC_BASEPATH}/categorylist/${cateID}`,
          {
            category: category,
          },
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );
        if (res.status === 200) {
          toast("Category successfully Updated", {
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
        // console.log("res", res);
        setEditCategorie(false);
        setCategory("");
        fetchCategories();
      } else {
        let res = await axios({
          method: "post",
          url: `${process.env.NEXT_PUBLIC_BASEPATH}/categorylist`,
          headers: {
            Authorization: `Bearer ${userToken}`, // Include the token in the request headers
          },
          data: { category },
        });
        // console.log("res", res);
        if (res.status === 201) {
          toast("Category successfully created", {
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
        setCategory("");
        fetchCategories();
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
  };

  const handleDeleteCategory = (categoryId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this category!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `${process.env.NEXT_PUBLIC_BASEPATH}/categorylist/${categoryId}`,
            {
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            }
          );

          if (response.status === 200) {
            Swal.fire("Deleted!", "The category has been deleted.", "success");
            fetchCategories();
          }
        } catch (error) {
          Swal.fire("Error", "Failed to delete category.", "error");
        }
      }
    });
  };

  function handleEditedCategory(category:any) {
    // console.log(category)
    setEditCategorie(true);
    setCategory(category.category);
    setCateID(category._id);
  }
  return (
    <>
      <div className="container flex flex-col justify-center items-center mx-auto">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-4">
          Create a New Category
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Add new categories to enhance your content organization. Admins can
          manage and create categories here.
        </p>
        <form onSubmit={handleSubmit} className="lg:w-1/2 md:w-2/3 w-full">
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              {editedcategory   
                ? `Edit category ${category}`
                : " Category Name "}

            </label>
            <input
              type="text"
              id="category"
              placeholder="Enter category name"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="flex gap-2">
            {editedcategory && (
              <button
                type="button"
                onClick={() => {
                  setEditCategorie(false);
                  setCategory("");
                }}
                className="bg-red-500 text-white py-2 px-2 sm:px-4 rounded-md hover:bg-red-600"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-2 sm:px-4 rounded-md hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>

      {!editedcategory && (
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Category</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {categories.map((cate: CategoryList, ind) => (
                <tr key={cate?._id}>
                  <th>{ind + 1}</th>
                  <td>{cate?.category}</td>
                  <td>
                    <div className=" flex gap-2">
                      <button
                        className=" text-black  hover:text-gray-700 "
                        onClick={() => handleEditedCategory(cate)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                      </button>
                      {/* del  */}
                      <button
                        className=" text-red-600 hover:text-red-500 "
                        onClick={() => handleDeleteCategory(cate._id)}
                      >
                        {" "}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default Category;
