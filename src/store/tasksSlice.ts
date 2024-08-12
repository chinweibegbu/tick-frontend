import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getTasksApiCall, getTasksByUserIdApiCall, addTaskApiCall, toggleCompleteTaskApiCall, editTaskApiCall } from "../apiCalls/tasks";
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

export const editTask = createAsyncThunk
  <
    TaskModel,
    {
      token: string,
      updatedTask: TaskModel
    },
    { rejectValue: string }
  >
  ("editTask", async (values, thunkApi) => {
    try {
      const { data, error } = await editTaskApiCall(values.token, values.updatedTask);

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

export const toggleCompleteTask = createAsyncThunk
  <
    TaskModel,
    {
      token: string,
      taskId: string
    },
    { rejectValue: string }
  >
  ("toggleCompleteTask", async (values, thunkApi) => {
    try {
      const { data, error } = await toggleCompleteTaskApiCall(values.token, values.taskId);

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
    getTaskById: (state, action: PayloadAction<string>) => {
      const id = action.payload;

      const existingTask = state.tasks.find((task: TaskModel) => task.id === id);
      if (existingTask) {
        state.currentTask = existingTask;
      } else {
        console.log("Something is wrong");
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const existingTask = state.tasks.find((task: TaskModel) => task.id === id);
      if (existingTask) {
        state.tasks = state.tasks.filter((task: TaskModel) => task.id !== id);
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
      )

      // Edit task
      .addCase(
        editTask.pending,
        (state) => {
          state.loading = true;
          console.log("editTask() pending...");
        }
      )
      .addCase(
        editTask.fulfilled,
        (state) => {
          state.loading = false;
          console.log("editTask() successful!");
        }
      )
      .addCase(
        editTask.rejected,
        (state) => {
          state.loading = false;
          console.log("editTask() failed");
        }
      )

      // Toggle Complete task
      .addCase(
        toggleCompleteTask.pending,
        (state) => {
          state.loading = true;
          console.log("toggleCompleteTask() pending...");
        }
      )
      .addCase(
        toggleCompleteTask.fulfilled,
        (state) => {
          state.loading = false;
          console.log("toggleCompleteTask() successful!");
        }
      )
      .addCase(
        toggleCompleteTask.rejected,
        (state) => {
          state.loading = false;
          console.log("toggleCompleteTask() failed");
        }
      );
  },
});

export const { deleteTask, getTaskById } = tasksSlice.actions;

export default tasksSlice.reducer;