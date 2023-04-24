import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

type FormValues = {
    fullName: string,
    email: string,
    phone: number,
    password: string,
    profile: {}[]
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

    const inputStyles = "px-3 py-2 bg-slate-200 m-2 rounded-md"
    const labelStyles = ""

    const {register, handleSubmit, formState: {errors}} = useForm<FormValues>({
        resolver: yupResolver(formSchema)
    })

    const onSubmit = (data: FormValues) => {
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex w-fit mx-auto flex-col mt-12 items-start">
            <label htmlFor="fullName" className={`flex flex-col ${labelStyles}`} >
                <p className="text-left">Full Name:</p>
                <input id="fullName" type="text" className={`${inputStyles}`} {...register("fullName")} />
            </label>
            <p className="text-rose-600">{errors.fullName?.message}</p>

            <label htmlFor="phone" className={`flex flex-col ${labelStyles}`}>
                <p className="text-left">Phone:</p>
                <input id="phone" type="number" className={`${inputStyles}`} {...register("phone")}/>
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
                <input id="profile" type="file" className="mt-2 text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100
                " 
                {...register("profile")}/>
            </label>

            <button type="submit" className="border-2 mt-3 text-sky-500 hover:text-white hover:bg-sky-500 rounded-md px-4 py-2 border-sky-500 w-fit block mx-auto">
                SUBMIT
            </button>
        </form>
    );
}
 
export default Form;