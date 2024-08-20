import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { authenticateUser } from "../../store/usersSlice";
import { AppDispatch, RootState } from "../../store/store";
import { SigninFormSchema } from "../../schemas";
import { SigninProps, SigninFormValues } from "../../models";

import Button from "../../components/Button";
import LinkText from "../../components/LinkText";

// ----------------------  END IMPORTS ---------------------------------

function Signin({ goToPage }: SigninProps) {
    const dispatch = useDispatch<AppDispatch>();

    const { errorMessage } = useSelector((state: RootState) => state.usersReducer);

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<SigninFormValues>({ resolver: yupResolver(SigninFormSchema) });

    const onSubmit: SubmitHandler<SigninFormValues> = async (data) => {
        // Login user
        dispatch(authenticateUser(data))
            .then((response) => {
                if (response.type === "authenticateUser/fulfilled") {
                    goToPage(MouseEvent, "dashboard");
                }
            });
    }

    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className="Signin h-full flex flex-col md:flex-row">

            {/* Back arrow */}
            <i className="bi-arrow-left-short text-icon-large" onClick={(e) => goToPage(e)} />

            {/* Signin form */}
            <div className="FormContainer w-full my-auto">

                <div className="md:w-[60vw] lg:w-[40vw] p-4 bordered mx-auto">

                    <p className="font-exo font-medium text-subtitle">Sign in to Tick</p>
                    <p className="font-tabular text-small mb-6">Manage your tasks with ease and efficiency!</p>

                    <p className={"font-tabular text-small " + (errorMessage ? "text-red-pure" : "invisible")}>
                        {errorMessage || "Placeholder"}
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)}>

                        {/* Email */}
                        <div className="LongTextInput flex flex-col mb-1 md:mb-3">
                            <label className="font-tabular text-inputLabel">Email</label>
                            <input {...register("email")} type="text" className="font-tabular font-medium text-inputText w-full p-1.5 border border-neutral-0 rounded-md"></input>
                            <p className={"font-tabular text-small " + (errors.email ? "text-red-pure" : "invisible")}>
                                {errors.email?.message || "Placeholder"}
                            </p>
                        </div>

                        {/* Password */}
                        <div className="LongTextInput flex flex-col mb-1 md:mb-3">
                            <div className="flex justify-between">
                                <label className="font-tabular text-inputLabel">Password</label>
                                <LinkText text="Forgot password?" goToPage={() => goToPage(MouseEvent, "resetUser")} />
                            </div>
                            <div className="flex border border-neutral-0 rounded-md p-1.5 focus-within:border-2 focus-within:p-[0.3rem]">
                                <input  {...register("password")} type={showPassword ? "text" : "password"} className="font-tabular font-medium text-inputText w-full focus:outline-none focus:border-none"></input>
                                <i className={(showPassword ? "bi-eye-slash" : "bi-eye") + " text-neutral-0 text-icon-regular mr-2"} onClick={togglePassword} />
                            </div>
                            <p className={"font-tabular text-small " + (errors.password ? "text-red-pure" : "invisible")}>
                                {errors.password?.message || "Placeholder"}
                            </p>
                        </div>

                        {/* Submit button */}
                        <div className="w-full text-center pt-6">
                            <Button text="Log in" />
                            <div className="flex justify-center">
                                <p className="font-tabular text-small">Don't have an account yet?</p>
                                &nbsp;
                                <LinkText text="Sign up" path="signup" goToPage={goToPage} />
                            </div>
                        </div>
                    </form>

                </div>

            </div>

        </div>
    );
}

export default Signin;