import api from "./axios";
import { ApiCallResponse, ApiResponse, TaskModel } from "../models";
import { AxiosResponse } from "axios";

export const getTasksApiCall = (token: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const GetTasks = new Promise<ApiCallResponse<TaskModel[]>>((resolve) => {
    api
      .get(
        "/Task/getTasks",
        config
      )
      .then((response: AxiosResponse<ApiResponse<TaskModel[]>>) => {
        resolve({ data: response.data });
      })
      .catch((err: ApiResponse<ApiCallResponse<TaskModel[]>>["errors"]) => {
        resolve({ error: err });
      });
  });
  return GetTasks;
};

export const getTasksByUserIdApiCall = (token: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const GetTasksByUserId = new Promise<ApiCallResponse<TaskModel[]>>((resolve) => {
    api
      .get(
        `/Task/getTasksByUserId`,
        config
      )
      .then((response: AxiosResponse<ApiResponse<TaskModel[]>>) => {
        console.log(response);
        resolve({ data: response.data });
      })
      .catch((err: ApiResponse<ApiCallResponse<TaskModel[]>>["errors"]) => {
        resolve({ error: err });
      });
  });
  return GetTasksByUserId;
};