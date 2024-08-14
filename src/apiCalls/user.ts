import api from "./axios";
import { ApiCallResponse, ApiResponse, SigninFormValues, SignupFormValues, UserModel } from "../models";
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