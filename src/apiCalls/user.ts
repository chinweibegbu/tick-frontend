import api from "./axios";
import { ApiCallResponse, ApiResponse, ResetUserFormValues, ResetPasswordApiRequest, SigninFormValues, SignupFormValues, UserModel } from "../models";
import { AxiosResponse } from "axios";

export const authenticateUserApiCall = (formValues: SigninFormValues) => {
  const AuthenticateUser = new Promise<ApiCallResponse<UserModel>>((resolve) => {
    api
      .post(
        "/User/authenticate",
        formValues
      )
      .then((response: AxiosResponse<ApiResponse<UserModel>>) => {
        resolve({ data: response.data });
      })
      .catch((err: ApiResponse<ApiCallResponse<UserModel>>["errors"]) => {
        // console.log(err, "Error in API"); >>> Logging POST error here
        resolve({ error: err });
      });
  });
  return AuthenticateUser;
}

export const logoutApiCall = (token: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const LogoutUser = new Promise<ApiCallResponse<string>>((resolve) => {
    api
      .post(
        "/User/logout",
        undefined,
        config
      )
      .then((response: AxiosResponse<ApiResponse<string>>) => {
        resolve({ data: response.data });
      })
      .catch((err: ApiResponse<ApiCallResponse<string>>["errors"]) => {
        resolve({ error: err });
      });
  });
  return LogoutUser;
}

export const addUserApiCall = (formValues: SignupFormValues) => {
  const addUserRequest = {...formValues, userName: formValues.email, role: 2};
  const AddUser = new Promise<ApiCallResponse<string>>((resolve) => {
    api
      .post(
        "/User/addUser",
        addUserRequest
      )
      .then((response: AxiosResponse<ApiResponse<string>>) => {
        resolve({ data: response.data });
      })
      .catch((err: ApiResponse<ApiCallResponse<string>>["errors"]) => {
        resolve({ error: err });
      });
  });
  return AddUser;
}

export const sendResetUserEmailApiCall = (formValues: ResetUserFormValues) => {
  const SendResetUserEmail = new Promise<ApiCallResponse<string>>((resolve) => {
    api
      .post(
        "/User/resetUser",
        formValues
      )
      .then((response: AxiosResponse<ApiResponse<string>>) => {
        resolve({ data: response.data });
      })
      .catch((err: ApiResponse<ApiCallResponse<string>>["errors"]) => {
        resolve({ error: err });
      });
  });
  return SendResetUserEmail;
}

export const resetPasswordApiCall = (requestBody: ResetPasswordApiRequest) => {
  const ResetPassword = new Promise<ApiCallResponse<string>>((resolve) => {
    api
      .post(
        "/User/passwordReset",
        requestBody
      )
      .then((response: AxiosResponse<ApiResponse<string>>) => {
        resolve({ data: response.data });
      })
      .catch((err: ApiResponse<ApiCallResponse<string>>["errors"]) => {
        resolve({ error: err });
      });
  });
  return ResetPassword;
}