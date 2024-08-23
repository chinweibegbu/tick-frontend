import { useDispatch, useSelector } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { resetUser } from "../../store/usersSlice";
import { AppDispatch, RootState } from "../../store/store";
import { ResetUserFormSchema } from "../../schemas";
import { ResetUserProps, ResetUserFormValues } from "../../models";

import Button from "../../components/Button";
import ButtonWithLoader from "../../components/ButtonWithLoader";

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
                if (response.type === "rset/fulfilled") {
                    goToPage(MouseEvent, "dashboard");
                }
            });
    }

    return (
        <div className="ResetUser h-full flex flex-col md:flex-row">

            {/* Back arrow */}
            <i className="bi-arrow-left-short text-icon-large" onClick={(e) => goToPage(e)} />

            {/* ResetUser form */}
            <div className="FormContainer w-full my-auto">

                <div className="md:w-[60vw] lg:w-[40vw] p-4 bordered mx-auto">

                    <p className="font-exo font-medium text-subtitle">Forgot your password?</p>
                    <p className="font-tabular text-small mb-6">No worries! We'll send reset instructions.</p>

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