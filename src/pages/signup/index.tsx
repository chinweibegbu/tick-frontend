import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { addUser, resetState } from "../../store/usersSlice";
import { AppDispatch, RootState } from "../../store/store";
import { SignupFormSchema } from "../../schemas";
import { SignupProps, SignupFormValues } from "../../models";

import Button from "../../components/Button";
import LinkText from "../../components/LinkText";
import ButtonWithLoader from "../../components/ButtonWithLoader";
import { notifyError } from "../../utils/notifications";

// ----------------------  END IMPORTS ---------------------------------

function Signup({ goToPage }: SignupProps) {
    const [ fileName, setFileName ] = useState("");
    const dispatch = useDispatch<AppDispatch>();

    const { errorMessage, loading } = useSelector((state: RootState) => state.usersReducer);

    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue,
        getValues
    } = useForm<SignupFormValues>({ resolver: yupResolver(SignupFormSchema) });

    const fileInputField = useRef<any>(null);

    const handleImageUploadClick = () => {
        // Trigger the onClick action for the <input type=file /> element
        fileInputField.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {        
        const files = event.target.files;
        if (files && files.length > 0) {
            const reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = () => {
                setValue("profileImage", files[0]);
                setFileName(files[0].name);
                console.log(getValues(), " >>> form values");
            };
        }
    };

    const onSubmit: SubmitHandler<SignupFormValues> = (data) => {
        // Add user
        dispatch(addUser(data))
            .then((response) => {
                if (response.type === "addUser/fulfilled") {
                    goToPage(MouseEvent, "signin");
                }
                if ((response.type === "addUser/rejected") && errorMessage) {
                    // Toggle error toast
                    notifyError(errorMessage);
                    dispatch(resetState());
                }
            });
    }

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const togglePassword = () => setShowPassword(!showPassword);
    const toggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

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
                                <input {...register("firstName")} type="text" className="font-tabular font-medium text-inputText md:w-[25vw] lg:w-[18vw] p-1.5 border border-neutral-0 rounded-md"></input>
                                <p className={"font-tabular text-small " + (errors.firstName ? "text-red-pure" : "invisible")}>
                                    {errors.firstName?.message || "Placeholder"}
                                </p>
                            </div>

                            {/* Last Name */}
                            <div className="ShortTextInput flex flex-col mb-1 md:mb-3">
                                <label className="font-tabular text-inputLabel">Last Name</label>
                                <input {...register("lastName")} type="text" className="font-tabular font-medium text-inputText md:w-[25vw] lg:w-[18vw] p-1.5 border border-neutral-0 rounded-md"></input>
                                <p className={"font-tabular text-small " + (errors.lastName ? "text-red-pure" : "invisible")}>
                                    {errors.lastName?.message || "Placeholder"}
                                </p>
                            </div>

                        </div>

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
                            <label className="font-tabular text-inputLabel">Password</label>
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
                            <label className="font-tabular text-inputLabel">Confirm Password</label>
                            <div className="flex border border-neutral-0 rounded-md p-1.5 focus-within:border-2 focus-within:p-[0.3rem]">
                                <input  {...register("confirmPassword")} type={showConfirmPassword ? "text" : "password"} className="font-tabular font-medium text-inputText w-full focus:outline-none focus:border-none"></input>
                                <i className={(showConfirmPassword ? "bi-eye-slash" : "bi-eye") + " text-neutral-0 text-icon-regular mr-2"} onClick={toggleConfirmPassword} />
                            </div>
                            <p className={"font-tabular text-small " + (errors.confirmPassword ? "text-red-pure" : "invisible")}>
                                {errors.confirmPassword?.message || "Placeholder"}
                            </p>
                        </div>

                        {/* Profile Image Upload */}
                        <div className="LongTextInput flex flex-col mb-1 md:mb-3">
                            <label className="font-tabular text-inputLabel" htmlFor="profileImage">Upload Profile Photo</label>
                            <div className="text-1xl">
                                <div
                                    className="border border-neutral-0 border-dotted rounded-md flex flex-col items-center py-4 hover:cursor-pointer"
                                    onClick={handleImageUploadClick}>
                                    <i className="bi-upload text-neutral-0 text-icon-regular mr-2" />
                                    <p className="font-tabular">Drag and Drop file here or <span className="underline">Choose file</span></p>
                                </div>
                                
                                <p className="font-tabular text-neutral-400">{fileName ? fileName : "No file chosen"}</p>

                                <input
                                    {...register("profileImage")}
                                    ref={fileInputField}
                                    type="file"
                                    accept=".jpg, .png, .jpeg, .gif, svg, webp, "
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </div>
                            <p className={"font-tabular text-small " + (errors.profileImage ? "text-red-pure" : "invisible")}>
                                {errors.profileImage?.message || "Placeholder"}
                            </p>
                        </div>

                        {/* Submit button */}
                        <div className="w-full text-center pt-6">
                            {
                                loading
                                    ? <ButtonWithLoader text="Creating account" />
                                    : <Button text="Create account" />
                            }

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