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
        resolve({ data: response.data });
      })
      .catch((err: ApiResponse<ApiCallResponse<TaskModel[]>>["errors"]) => {
        resolve({ error: err });
      });
  });
  return GetTasksByUserId;
};

export const addTaskApiCall = (token: string, newTask: TaskModel) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const AddTask = new Promise<ApiCallResponse<TaskModel>>((resolve) => {
    api
      .post(
        "/Task/addTask",
        newTask,
        config
      )
      .then((response: AxiosResponse<ApiResponse<TaskModel>>) => {
        resolve({ data: response.data });
      })
      .catch((err: ApiResponse<ApiCallResponse<TaskModel>>["errors"]) => {
        resolve({ error: err });
      });
  });
  return AddTask;
};

export const editTaskApiCall = (token: string, updatedTask: TaskModel) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const EditTask = new Promise<ApiCallResponse<TaskModel>>((resolve) => {
    api
      .post(
        `/Task/editTask/${updatedTask.id}`,
        updatedTask,
        config
      )
      .then((response: AxiosResponse<ApiResponse<TaskModel>>) => {
        resolve({ data: response.data });
      })
      .catch((err: ApiResponse<ApiCallResponse<TaskModel>>["errors"]) => {
        resolve({ error: err });
      });
  });
  return EditTask;
};

export const toggleCompleteTaskApiCall = (token: string, taskIdToToggle: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const ToggleCompleteTask = new Promise<ApiCallResponse<TaskModel>>((resolve) => {
    api
      .post(
        `/Task/toggleCompleteTask/${taskIdToToggle}`,
        undefined,
        config
      )
      .then((response: AxiosResponse<ApiResponse<TaskModel>>) => {
        resolve({ data: response.data });
      })
      .catch((err: ApiResponse<ApiCallResponse<TaskModel>>["errors"]) => {
        resolve({ error: err });
      });
  });
  return ToggleCompleteTask;
};

export const deleteTaskApiCall = (token: string, taskIdToDelete: string) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const DeleteTask = new Promise<ApiCallResponse<string>>((resolve) => {
    api
      .post(
        `/Task/deleteTask/${taskIdToDelete}`,
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
  return DeleteTask;
};
