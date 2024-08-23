import { useState } from "react";
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { resetPassword } from "../../store/usersSlice";
import { AppDispatch, RootState } from "../../store/store";
import { ResetPasswordFormSchema } from "../../schemas";
import { ResetPasswordProps, ResetPasswordFormValues } from "../../models";

import Button from "../../components/Button";
import ButtonWithLoader from "../../components/ButtonWithLoader";

// ----------------------  END IMPORTS ---------------------------------

function ResetPassword({ goToPage }: ResetPasswordProps) {
    const dispatch = useDispatch<AppDispatch>();
    const [searchParams, _] = useSearchParams();

    const { errorMessage, loading } = useSelector((state: RootState) => state.usersReducer);

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<ResetPasswordFormValues>({ resolver: yupResolver(ResetPasswordFormSchema) });

    const onSubmit: SubmitHandler<ResetPasswordFormValues> = async (data) => {
        // Get email and token from URL
        const email = searchParams.get('email');
        const token = searchParams.get('token');

        // Create resetPassword API call request body
        const resetPasswordRequestBody = { ...data, email: email!, token: token! };

        // Call resetPassword API call
        dispatch(resetPassword(resetPasswordRequestBody))
            .then((response) => {
                if (response.type === "resetPassword/fulfilled") {
                    goToPage(MouseEvent, "/");
                }
            });
    }

    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => {
        setShowPassword(!showPassword)
    }
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const toggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

    return (
        <div className="ResetPassword h-full flex flex-col md:flex-row">

            {/* Back arrow */}
            <i className="bi-arrow-left-short text-icon-large" onClick={(e) => goToPage(e)} />

            {/* ResetPassword form */}
            <div className="FormContainer w-full my-auto">

                <div className="md:w-[60vw] lg:w-[40vw] p-4 bordered mx-auto">

                    <p className="font-exo font-medium text-subtitle">Reset your password</p>

                    <p className={"font-tabular text-small " + (errorMessage ? "text-red-pure" : "invisible")}>
                        {errorMessage || "Placeholder"}
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)}>

                        {/* Password */}
                        <div className="LongTextInput flex flex-col mb-1 md:mb-3">
                            <label className="font-tabular text-inputLabel">New Password</label>
                            <div className="flex border border-neutral-0 rounded-md p-1.5 focus-within:border-2 focus-within:p-[0.3rem]">
                                <input  {...register("password")} type={showPassword ? "text" : "password"} className="font-tabular font-medium text-inputText w-full focus:outline-none focus:border-none"></input>
                                <i className={(showPassword ? "bi-eye-slash" : "bi-eye") + " text-neutral-0 text-icon-regular mr-2"} onClick={togglePassword} />
                            </div>
                            <p className={"font-tabular text-small " + (errors.password ? "text-red-pure" : "invisible")}>
                                {errors.password?.message || "Placeholder"}
                            </p>
                        </div>

                        {/* Confirm Password */}
                        <div className="LongTextInput flex flex-col mb-1 md:mb-3">
                            <div className="flex justify-between">
                                <label className="font-tabular text-inputLabel">Confirm New Password</label>
                            </div>
                            <div className="flex border border-neutral-0 rounded-md p-1.5 focus-within:border-2 focus-within:p-[0.3rem]">
                                <input  {...register("confirmPassword")} type={showConfirmPassword ? "text" : "password"} className="font-tabular font-medium text-inputText w-full focus:outline-none focus:border-none"></input>
                                <i className={(showConfirmPassword ? "bi-eye-slash" : "bi-eye") + " text-neutral-0 text-icon-regular mr-2"} onClick={toggleConfirmPassword} />
                            </div>
                            <p className={"font-tabular text-small " + (errors.confirmPassword ? "text-red-pure" : "invisible")}>
                                {errors.confirmPassword?.message || "Placeholder"}
                            </p>
                        </div>

                        {/* Submit button */}
                        <div className="w-full text-center pt-6">
                            {
                                loading
                                    ? <ButtonWithLoader text="Resetting password" />
                                    : <Button text="Reset password" />
                            }
                        </div>
                    </form>

                </div>

            </div>

        </div>
    );
}

export default ResetPassword;