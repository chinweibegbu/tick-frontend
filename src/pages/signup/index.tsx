import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import Button from "../../components/Button";
import LinkText from "../../components/LinkText";

type SignupProps = {
    goToPage: Function
}

type FormValues = {
    firstName: string,
    lastName: string,
    email: string,
    password: string
}

function Signup({ goToPage }: SignupProps) {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        // Add user to DB
        console.log(data);
        
        // Go to dashboard
        goToPage(MouseEvent, "dashboard");
    }

    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className="Signup h-full flex flex-col md:flex-row">

            {/* Back arrow */}
            <i className="bi-arrow-left-short text-icon-large" onClick={(e) => goToPage(e)} />

            {/* Signup form */}
            <div className="FormContainer w-full my-auto">

                <div className="md:w-[60vw] lg:w-[40vw] p-4 bordered mx-auto">

                    <p className="font-exo font-medium text-subtitle">Sign up to Tick</p>
                    <p className="font-tabular text-small mb-6">Create a free, lifetime account with Tick today!</p>

                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="flex flex-wrap justify-between">

                            {/* First Name */}
                            <div className="ShortTextInput flex flex-col mb-1 md:mb-3">
                                <label className="font-tabular text-inputLabel">First Name</label>
                                <input {...register("firstName", { required: true })} type="text" className="font-tabular font-medium text-inputText md:w-[25vw] lg:w-[18vw] p-1.5 border border-neutral-0 rounded-md"></input>
                                <p className={"font-tabular text-small " + (errors.firstName ? "text-red-pure" : "text-neutral-100")}>
                                    This field is required
                                </p>
                            </div>

                            {/* Last Name */}
                            <div className="ShortTextInput flex flex-col mb-1 md:mb-3">
                                <label className="font-tabular text-inputLabel">Last Name</label>
                                <input {...register("lastName", { required: true })} type="text" className="font-tabular font-medium text-inputText md:w-[25vw] lg:w-[18vw] p-1.5 border border-neutral-0 rounded-md"></input>
                                <p className={"font-tabular text-small " + (errors.lastName ? "text-red-pure" : "text-neutral-100")}>
                                    This field is required
                                </p>
                            </div>

                        </div>

                        {/* Email */}
                        <div className="LongTextInput flex flex-col mb-1 md:mb-3">
                            <label className="font-tabular text-inputLabel">Email</label>
                            <input {...register("email", { required: true })} type="text" className="font-tabular font-medium text-inputText w-full p-1.5 border border-neutral-0 rounded-md"></input>
                            <p className={"font-tabular text-small " + (errors.email ? "text-red-pure" : "text-neutral-100")}>
                                This field is required
                            </p>
                        </div>

                        {/* Password */}
                        <div className="LongTextInput flex flex-col mb-1 md:mb-3">
                            <label className="font-tabular text-inputLabel">Password</label>
                            <div className="flex border border-neutral-0 rounded-md p-1.5 focus-within:border-2 focus-within:p-[0.3rem]">
                                <input  {...register("password", { required: true })} type={showPassword ? "text" : "password"} className="font-tabular font-medium text-inputText w-full focus:outline-none focus:border-none"></input>
                                <i className={(showPassword ? "bi-eye-slash" : "bi-eye") + " text-neutral-0 text-icon-regular mr-2"} onClick={togglePassword} />
                            </div>
                            <p className={"font-tabular text-small " + (errors.password ? "text-red-pure" : "text-neutral-100")}>
                                This field is required
                            </p>
                        </div>

                        {/* Submit button */}
                        <div className="w-full text-center pt-6">
                            <Button text="Create account" />
                            <div className="flex justify-center">
                                <p className="font-tabular text-small">Already have an account?</p>
                                &nbsp;
                                <LinkText text="Sign in" path="signin" goToPage={goToPage} />
                            </div>
                        </div>
                        
                    </form>

                </div>

            </div>

        </div>
    );
}

export default Signup;