import api from "./axios";
import { ApiGetUserResponse, SigninFormValues } from "../models";

export const authenticateUserApiCall = (formValues: SigninFormValues) => {
  const AuthenticateUser = new Promise<ApiGetUserResponse>((resolve) => {
    api
      .post(
        "/User/authenticate",
        formValues
      )
      .then((response: ApiGetUserResponse["data"]) => {
        resolve({ data: response });
      })
      .catch((err: ApiGetUserResponse["error"]) => {
        resolve({ error: err });
      });
  });
  return AuthenticateUser;
}