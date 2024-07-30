import api from "./axios";
import { TasksResults } from "../models";

export const getTasks = () => {
  const FetchTasks = new Promise<TasksResults>((resolve) => {
    api
      .get(
        "https://66a8b3b5e40d3aa6ff590940.mockapi.io/api/v1/tasks"
      )
      .then((response: TasksResults["data"]) => {
        resolve({ data: response });
      })
      .catch((err: TasksResults["error"]) => {
        resolve({ error: err });
      });
  });
  return FetchTasks;
};