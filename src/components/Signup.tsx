"use client";
import Link from "next/link";
import React, { useState } from "react";
import { signUpSchema } from "../validation";
import { useFormik } from "formik";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmpassword: string;
}

const initialValues: FormValues = {
  name: "",
  email: "",
  password: "",
  confirmpassword: "",
};
const Signup: React.FC = () => {
  const router = useRouter();
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: async (values, action) => {
        const { name, email, password } = values;
        const data = { name, password, email};
        // console.log("data::", data);
        try {
          let res = await axios.post(`${process.env.NEXT_PUBLIC_BASEPATH}/auth/signup`, data);
          if (res.status === 201) {
            toast(`User successfully created`, {
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
              router.push("/login")
            }, 2000);
          }
        } catch (error) {
          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            // Handle the error message sent from the backend
            // console.log("Error:", error.response.data.message);
            toast.error("Username or email already exists", {
              position: "top-right",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            // You can display this error message to the user on your frontend
          } else if (error.message) {
            // Handle other errors or network issues
            console.log("An error occurred:", error.message);
          } else {
            // Handle cases where error.response.data.message is not available
            console.log("An unknown error occurred.");
          }
        }
        // action.resetForm();
      },
    });

  return (
    <>
      <div
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80)",
        }}
        className=" bg-cover bg-center bg-no-repeat min-h-[89.9vh] h-auto w-full flex justify-center items-center"
      >
        <div className=" max-w-[500px]  w-full  flex-1  bg-white p-5 rounded-lg mx-5">
          <h1 className=" text-2xl sm:text-3xl  text-center text-primary">
            User Registration
          </h1>
          <form onSubmit={handleSubmit}>
            <div className=" flex-col gap-4 mt-3 flex ">
              <div className=" max-w-2xl w-full">
                <input
                  type="text"
                  id="name"
                  placeholder="User Name"
                  className={`input input-bordered input-primary w-full ${
                    errors.name && touched.name ? " border-red-600" : ""
                  }`}
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.name && touched.name ? (
                  <p className=" text-sm text-red-600 ml-1 ">{errors.name}</p>
                ) : null}
              </div>
              <div className=" max-w-2xl w-full">
                <input
                  type="text"
                  id="email"
                  placeholder="email"
                  className={`input input-bordered input-primary w-full ${
                    errors.email && touched.email ? " border-red-600" : ""
                  }`}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email ? (
                  <p className=" text-sm text-red-600 ml-1 ">{errors.email}</p>
                ) : null}
              </div>
              <div className=" max-w-2xl w-full">
                <input
                  type="password"
                  id="password"
                  placeholder="password"
                  className={`input input-bordered input-primary w-full ${
                    errors.password && touched.password ? " border-red-600" : ""
                  }`}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && touched.password ? (
                  <p className=" text-sm text-red-600 ml-1 ">
                    {errors.password}
                  </p>
                ) : null}
              </div>
              <div className=" max-w-2xl w-full">
                <input
                  type="password"
                  id="confirmpassword"
                  placeholder="Confirm Password"
                  className={`input input-bordered input-primary w-full ${
                    errors.confirmpassword && touched.confirmpassword
                      ? " border-red-600"
                      : ""
                  }`}
                  value={values.confirmpassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.confirmpassword && touched.confirmpassword ? (
                  <p className=" text-sm text-red-600 ml-1 ">
                    {errors.confirmpassword}
                  </p>
                ) : null}
              </div>

              <button type="submit" className=" btn-primary w-full ">
                Sign Up
              </button>
            </div>
          </form>
          <div className="  text-center">
            <p className="mt-2 text-md">
              Already have an account?{" "}
              <Link href={"/login"} className="text-primary">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
