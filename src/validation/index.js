import * as Yup from "yup";

export const signUpSchema = Yup.object({
    name:Yup.string().min(2).max(25).required("Please Enter Your User Name"),
    email:Yup.string().email().required("Please Enter Your Email"),
    password:Yup.string().min(6).required("Please Enter Your Password"),
    confirmpassword:Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .min(6)
    .required("Please Confirm Your Password"),
})

export const logInSchema = Yup.object({
    email:Yup.string().email().required("Please Enter Your Email"),
    password:Yup.string().min(6).required("Please Enter Your Password"),
})

export const CreateBlogSchema = Yup.object({
    title:Yup.string().min(5).max(50).required("Please Enter Your Blog Title"),
    // shortDescription:Yup.string().min(15).max(200).required("Please Enter Short Description"),
    // thumbnailImage:Yup.mixed()
    // .required("Please upload a thumbnail image")
    blogbody:Yup.string().min(20).max(2000).required("Blog content must be at least 20 words."),
})

// export const logInRestauratSchema = Yup.object({
//     username:Yup.string().min(2).required("Please Enter Your User Name"),
//     password:Yup.string().min(6).required("Please Enter Your Password"),
// })
// // dishesschema 
// export const dishSchema = Yup.object({
//     name:Yup.string().required("Dish name is required").min(3, "enter minimum 3 characters"),
//     price:Yup.number().required("Price is required"),
//     deliveryType:Yup.string().required("Delivery type is required"),
//     category:Yup.string().required("Category is required")
// })