import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const formSchema = yup.object().shape({
    fullName: yup
        .string()
        .reauired("Full Name is required"),
    email: yup 
        .string()
        .email("Email must be a valid email")
        .required("Email is required"),
    phone: yup
        .string()
        .matches(/^[0-9]*$/, "Only numbers are allowed")
        .required("Phone Number is required")
    
})

export default yupResolver(formSchema);