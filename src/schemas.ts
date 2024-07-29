import * as yup from "yup";

export const SignupFormSchema = yup.object().shape({
    firstName: yup
        .string()
        .required("Entry is required"),
    lastName: yup
        .string()
        .required("Entry is required"),
    email: yup
        .string()
        .email("Entry must be a valid email address")
        .required("Entry is required"),
    password: yup
        .string()
        .required("Entry is required")
        .min(8, "Entry must be at least 8 characters long")
        .matches(/^(?=.*[a-z]).{8,}$/, "Entry must contain at least one lowercase letter")
        .matches(/^(?=.*[A-Z]).{8,}$/, "Entry must contain at least one uppercase letter")
        .matches(/^(?=.*[0-9]).{8,}$/, "Entry must contain at least one number")
        .matches(/^(?=.*[!@#$%^&*(),.?\":{}|<>]).{8,}$/, "Entry must contain at least one special character")
        .matches(/^(?!.* ).{8,}$$/, "Entry must NOT contain a space"),
});

export const SigninFormSchema = yup.object().shape({
    email: yup
        .string()
        .email("Entry must be a valid email address")
        .required("Entry is required"),
    password: yup
        .string()
        .required("Entry is required"),
});

export const AddTaskFormSchema = yup.object().shape({
    details: yup
        .string()
        .required("Entry is required"),
    isImportant: yup
        .boolean()
        .required()
});

export const EditTaskFormSchema = yup.object().shape({
    details: yup
        .string()
        .required("Entry is required"),
    isImportant: yup
        .boolean()
        .required()
});