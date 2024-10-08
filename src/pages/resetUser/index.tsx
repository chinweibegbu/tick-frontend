import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { resetUser, resetState } from "../../store/usersSlice";
import { AppDispatch, RootState } from "../../store/store";
import { ResetUserFormSchema } from "../../schemas";
import { ResetUserProps, ResetUserFormValues } from "../../models";

import Button from "../../components/Button";
import ButtonWithLoader from "../../components/ButtonWithLoader";
import { notifySuccess, notifyError } from "../../utils/notifications";

// ----------------------  END IMPORTS ---------------------------------

function ResetUser({ goToPage }: ResetUserProps) {
    const dispatch = useDispatch<AppDispatch>();

    const { errorMessage, loading } = useSelector((state: RootState) => state.usersReducer);

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<ResetUserFormValues>({ resolver: yupResolver(ResetUserFormSchema) });

    const onSubmit: SubmitHandler<ResetUserFormValues> = async (data) => {
        // Send resetUser email
        dispatch(resetUser(data))
            .then((response) => {
                if (response.type === "resetUser/fulfilled") {
                    // goToPage(MouseEvent, "dashboard");

                    // Toggle success toast
                    notifySuccess("Email sent successfully");
                }
            });
    }

    useEffect(() => {
        if (errorMessage) {
            notifyError(errorMessage);
            dispatch(resetState());
        }
    }, [errorMessage]);

    return (
        <div className="ResetUser h-full flex flex-col md:flex-row">

            {/* Back arrow */}
            <i className="bi-arrow-left-short text-icon-large" onClick={(e) => goToPage(e)} />

            {/* ResetUser form */}
            <div className="FormContainer w-full my-auto">

                <div className="md:w-[60vw] lg:w-[40vw] p-4 bordered mx-auto">

                    <p className="font-exo font-medium text-subtitle">Forgot your password?</p>
                    <p className="font-tabular text-small mb-6">No worries! We'll send reset instructions.</p>

                    <form onSubmit={handleSubmit(onSubmit)}>

                        {/* Email */}
                        <div className="LongTextInput flex flex-col mb-1 md:mb-3">
                            <label className="font-tabular text-inputLabel">Email</label>
                            <input {...register("email")} type="text" className="font-tabular font-medium text-inputText w-full p-1.5 border border-neutral-0 rounded-md"></input>
                            <p className={"font-tabular text-small " + (errors.email ? "text-red-pure" : "invisible")}>
                                {errors.email?.message || "Placeholder"}
                            </p>
                        </div>

                        {/* Submit button */}
                        <div className="w-full text-center pt-6">
                            {
                                loading
                                ? <ButtonWithLoader text="Sending email" />
                                : <Button text="Send email" />
                            }
                        </div>
                    </form>

                </div>

            </div>

        </div>
    );
}

export default ResetUser;