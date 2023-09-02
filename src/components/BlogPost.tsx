"use client";
import axios from "axios";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";


interface Author {
    name: string;
    // Add other author properties if needed
  }
  interface Category {
    category: string;
    // Add other author properties if needed
  }
  interface BlogsInterface {
    _id: string; // Change the type accordingly
    title: string;
    shortDescription: string;
    blogBody: string;
    thumbnailUrl: string | any;
    authorId:Author;
    categoryId:Category;
    createdAt:string;
    // Add other properties if needed
  }

const BlogPost = () => {

    const router = useRouter();

  const [userToken, setUserToken] = useState<string | null>("null"); // Store the token
  const [userid, setUserid] = useState<string | Blob>(""); // Store the token
  const [userRole, setUserRole] = useState<string >(""); // Store the token
  const [showBlogs,setShowBlogs]=useState([])
  
  // Load token from storage when component mounts
  useEffect(() => {
    const tokenLocal = localStorage.getItem("Token"); // Adjust this to your token key
    const token = tokenLocal !== null ? JSON.parse(tokenLocal) : null;
    setUserToken(token?.access_token);
    setUserid(token?.user?._id);
    // userRole check for route protects
    setUserRole(token?.user?.role);
    // if (userRole !== "writer") {
    //   router.push("/");
    // }
    fetchBlogsAll();
  }, [userToken, router]);


  const fetchBlogsAll = async () => {
    try {
      const res = await axios.get("http://localhost:5000/blog", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      console.log("object",res.data)
      if(res.status === 200){
        setShowBlogs(res.data)
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  


  return (
    <>
    
    </>
  )
}

export default BlogPost
