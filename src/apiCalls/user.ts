import api from "./axios";
import { ApiCallResponse, ApiResponse, SigninFormValues, UserModel } from "../models";
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
        resolve({ error: err });
      });
  });
  return AuthenticateUser;
}