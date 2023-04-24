const Form = () => {

    const inputStyles = "px-3 py-2 bg-slate-200 m-2 rounded-md"
    const labelStyles = ""

    return (
        <form className="flex flex-col mt-4 ">
            <label htmlFor="fullName" className={`${labelStyles}`} >
                Full Name:
                <input id="fullName" type="text" className={`${inputStyles}`} name="fullName" />
            </label>

            <label htmlFor="phone" className={`${labelStyles}`}>
                Phone:
                <input id="phone" type="text" className={`${inputStyles}`} name="phone" />
            </label>

            <label htmlFor="email" className={`${labelStyles}`}>
                Email:
                <input id="email" type="email" className={`${inputStyles}`} name="email" />
            </label>

            <label htmlFor="password" className={`${labelStyles}`}>
                Password:
                <input id="password" type="text" className={`${inputStyles}`} name="password" />
            </label>

            <label htmlFor="profile" className={`${labelStyles}`}>
                Profile:
                <input id="profile" type="file" className="mt-2 text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-violet-50 file:text-violet-700
                hover:file:bg-violet-100
                " 
                name="profile" />
            </label>

            <button type="submit" className="border-2 mt-3 text-sky-500 hover:text-white hover:bg-sky-500 rounded-md px-4 py-2 border-sky-500 w-fit block mx-auto">
                SUBMIT
            </button>
        </form>
    );
}
 
export default Form;