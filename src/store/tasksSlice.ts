import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTasks } from "../apiCalls/tasks";
import { TaskModel } from "../models";

const initialState = {
  tasks: [] as TaskModel[],
  currentTask: {} as TaskModel,
  loading: false
};

/*
  `createAsyncThunk()` takes three (3) (type) arguments:
  1. type: The type of return value when the thunk is fulfilled
  2. payloadCreator: The callback function which defines extra functionalities (????)
  3. options: The async function's options

  Source: https://redux-toolkit.js.org/api/createAsyncThunk#parameters
*/
export const fetchTasks = createAsyncThunk
  <
    TaskModel[],
    undefined,
    { rejectValue: string }
  >
  ("fetchTasks", async (_, thunkApi) => {
    // --> Case #1: API call is success
    try {
      // Destructure the object of type TasksResult which is returned via a Promise
      const { data, error } = await getTasks();

      // --> Case #1a: API calls return object has `error` property
      if (error) {
        // `rejectWithValue()` takes an argument that is of the type defined in the `createAsyncThunk()` type arguments
        return thunkApi.rejectWithValue(error.message ?? "an error occurred");
      }

      // --> Case #1b: API calls return object has `data` property
      if (data) {
        // The `data` property of the TasksResult object is of type `AxiosResponse<TaskModel[]>`
        // The `data` property of THAT `data` property is of type `TaskModel[]` which was passed as a type argument
        return data.data;
      }

      // --> Case #1c: API calls return object has neither `error` nor `data` property
      return thunkApi.rejectWithValue("An unexpected error occurred");
    }

    // --> Case #2: API call is not successful
    catch (error) {
      return thunkApi.rejectWithValue("An unexpected error occurred");
    }
  });

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    getTaskById: (state, action: PayloadAction<number>) => {
      const taskId = action.payload;
      
      const existingTask = state.tasks.find((task: TaskModel) => task.taskId === taskId);
      if (existingTask) {
        state.currentTask = existingTask;
      } else {
        console.log("Something is wrong");
      }
    },
    addTask: (state, action: PayloadAction<TaskModel>) => {
      // Call API

      // Update state with results of API call
      state.tasks = [action.payload, ...state.tasks];
    },
    editTask: (state, action: PayloadAction<TaskModel>) => {
      const { taskId, details, isImportant, isCompleted } = action.payload;
      
      state.tasks = state.tasks.map(task => {
        if (task.taskId === taskId) {
          return { taskId: taskId, details: details, isImportant: isImportant, isCompleted: isCompleted }
        } else {
          return task;
        }
      })
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      const taskId = action.payload;
      const existingTask = state.tasks.find((task: TaskModel) => task.taskId === taskId);
      if (existingTask) {
        state.tasks = state.tasks.filter((task: TaskModel) => task.taskId !== taskId);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchTasks.pending,
        (state) => {
          state.loading = true;
          console.log("fetchTasks() pending...");
        }
      )
      .addCase(
        fetchTasks.fulfilled,
        (state, action: PayloadAction<TaskModel[]>) => {
          state.loading = false;
          state.tasks = action.payload;
          console.log("fetchTasks() successful!");
        }
      )
      .addCase(
        fetchTasks.rejected,
        (state) => {
          state.loading = false;
          console.log("fetchTasks() failed");
        }
      );
  },
});

export const { addTask, editTask, deleteTask, getTaskById } = tasksSlice.actions;

export default tasksSlice.reducer;