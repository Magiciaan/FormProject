import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

type FormValues = {
    fullName: string,
    email: string,
    phone: number,
    password: string,
    file: {}
}

const formSchema = yup.object().shape({
    fullName: yup
        .string()
        .required("Full Name is required"),
    email: yup
        .string()
        .email()
        .required("Email is required"),
    phone: yup
        .string()
        .matches(/^[0-9]*$/, "Only numbers are allowed")
        .required("Phone Number is required")
})

const Form = () => {
    const inputStyles = "px-3 py-2 bg-slate-200 my-2 rounded-md"
    const labelStyles = ""

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: yupResolver(formSchema)
    })

    const onSubmit = (data: any) => {
        const formData = new FormData();
        formData.append("fullName", data.fullName);
        formData.append("phone", data.phone);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("file", data.file[0]);
        return axios.post("http://localhost:3000/api/submit", formData)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-start mx-auto mt-12 w-fit">
            <label htmlFor="fullName" className={`flex flex-col ${labelStyles}`} >
                <p className="text-left">Full Name:</p>
                <input id="fullName" type="text" className={`${inputStyles}`} {...register("fullName")} />
            </label>
            <p className="text-rose-600">{errors.fullName?.message}</p>

            <label htmlFor="phone" className={`flex flex-col ${labelStyles}`}>
                <p className="text-left">Phone:</p>
                <input id="phone" type="number" className={`${inputStyles}`} {...register("phone")} />
            </label>
            <p className="text-rose-600">{errors.phone?.message}</p>

            <label htmlFor="email" className={` flex flex-col ${labelStyles}`}>
                <p className="text-left">Email:</p>
                <input id="email" type="email" className={`${inputStyles}`} {...register("email")} />
            </label>
            <p className="text-rose-600">{errors.email?.message}</p>

            <label htmlFor="password" className={` flex flex-col ${labelStyles}`}>
                <p className="text-left">Password:</p>
                <input id="password" type="password" className={`${inputStyles}`} {...register("password")} />
            </label>
            <p className="text-rose-600">{errors.password?.message}</p>

            <label htmlFor="profile" className={` flex flex-col mt-9 ${labelStyles}`}>
                <p className="text-left">Profile:</p>
                <input id="profile" type="file" className="mt-2 text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 "
                    {...register("file")} />
            </label>

            <button type="submit" className="block px-4 py-2 mx-auto mt-3 border-2 rounded-md text-sky-500 hover:text-white hover:bg-sky-500 border-sky-500 w-fit">
                SUBMIT
            </button>
        </form>
    );
}

export default Form;