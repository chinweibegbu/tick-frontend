import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTasksApiCall, getTasksByUserIdApiCall, addTaskApiCall } from "../apiCalls/tasks";
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
    { token: string },
    { rejectValue: string }
  >
  ("fetchTasks", async (values, thunkApi) => {
    // --> Case #1: API call is success
    try {
      // Destructure the object of type TasksResult which is returned via a Promise
      const { data, error } = await getTasksApiCall(values.token);

      // --> Case #1a: API calls return object has `error` property
      if (error) {
        // `rejectWithValue()` takes an argument that is of the type defined in the `createAsyncThunk()` type arguments
        return thunkApi.rejectWithValue(error.message ?? "an error occurred");
      }

      // --> Case #1b: API calls return object has `data` property
      if (data) {
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


export const fetchTasksByUserId = createAsyncThunk
  <
    TaskModel[],
    { token: string },
    { rejectValue: string }
  >
  ("fetchTasksByUserId", async (values, thunkApi) => {
    // --> Case #1: API call is success
    try {
      // Destructure the object of type TasksResult which is returned via a Promise
      const { data, error } = await getTasksByUserIdApiCall(values.token);

      // --> Case #1a: API calls return object has `error` property
      if (error) {
        // `rejectWithValue()` takes an argument that is of the type defined in the `createAsyncThunk()` type arguments
        return thunkApi.rejectWithValue(error.message ?? "an error occurred");
      }

      // --> Case #1b: API calls return object has `data` property
      if (data) {
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


export const addTask = createAsyncThunk
  <
    TaskModel,
    {
      token: string,
      newTask: TaskModel
    },
    { rejectValue: string }
  >
  ("addTask", async (values, thunkApi) => {
    try {
      const { data, error } = await addTaskApiCall(values.token, values.newTask);

      if (error) {
        return thunkApi.rejectWithValue(error.message ?? "an error occurred");
      }

      if (data) {
        return data.data;
      }

      return thunkApi.rejectWithValue("An unexpected error occurred");
    }

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
    editTask: (state, action: PayloadAction<TaskModel>) => {
      const { taskId, details, isImportant } = action.payload;

      console.log(state.tasks);

      state.tasks = state.tasks.map(task => {
        if (task.taskId === taskId) {
          return { ...task, details: details, isImportant: isImportant }
        } else {
          return task;
        }
      })
    },
    toggleCompleteTask: (state, action: PayloadAction<number>) => {
      const taskId = action.payload;

      state.tasks = state.tasks.map(task => {
        if (task.taskId === taskId) {
          return { ...task, isCompleted: !(task.isCompleted) }
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
      // Fetch all tasks
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
      )

      // Fetch tasks by user ID
      .addCase(
        fetchTasksByUserId.pending,
        (state) => {
          state.loading = true;
          console.log("fetchTasksByUserId() pending...");
        }
      )
      .addCase(
        fetchTasksByUserId.fulfilled,
        (state, action: PayloadAction<TaskModel[]>) => {
          state.loading = false;
          state.tasks = action.payload;
          console.log("fetchTasksByUserId() successful!");
        }
      )
      .addCase(
        fetchTasksByUserId.rejected,
        (state) => {
          state.loading = false;
          console.log("fetchTasksByUserId() failed");
        }
      )

      // Add task
      .addCase(
        addTask.pending,
        (state) => {
          state.loading = true;
          console.log("addTask() pending...");
        }
      )
      .addCase(
        addTask.fulfilled,
        (state) => {
          state.loading = false;
          console.log("addTask() successful!");
        }
      )
      .addCase(
        addTask.rejected,
        (state) => {
          state.loading = false;
          console.log("addTask() failed");
        }
      );
  },
});

export const { editTask, toggleCompleteTask, deleteTask, getTaskById } = tasksSlice.actions;

export default tasksSlice.reducer;