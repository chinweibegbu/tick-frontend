import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authenticateUserApiCall } from "../apiCalls/user";
import { SigninFormValues, UserModel } from "../models";

const initialState = {
  currentUser: {} as UserModel,
  loading: false,
  errorMessage: ""
};

/*
  `createAsyncThunk()` takes three (3) (type) arguments:
  1. type: The type of return value when the thunk is fulfilled
  2. payloadCreator: The callback function which defines extra functionalities (????)
  3. options: The async function's options

  Source: https://redux-toolkit.js.org/api/createAsyncThunk#parameters
*/
export const authenticateUser = createAsyncThunk
  <
    UserModel,
    SigninFormValues,
    { rejectValue: string }
  >
  ("authenticateUser", async (formValues, thunkApi) => {
    // --> Case #1: API call is success
    try {
      // Destructure the object of type ApiGetUserResponse which is returned via a Promise
      const { data, error } = await authenticateUserApiCall(formValues);

      // --> Case #1a: API calls return object has `error` property
      if (error) {
        // `rejectWithValue()` takes an argument that is of the type defined in the `createAsyncThunk()` type arguments
        return thunkApi.rejectWithValue(error.message ?? "Failed to authenticate user");
      }

      // --> Case #1b: API calls return object has `data` property
      if (data) {
        // The `data` property of the TasksResult object is of type `AxiosResponse<ApiResponse<UserModel>>`
        // The `data` property of THAT `data` property is of type `ApiResponse<UserModel>` which was passed as a type argument
        // The `data` property of THAT `data` property is of type `UserModel` which was passed as a type argument
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

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout: (state) => {
      state.currentUser = {} as UserModel;
      state.loading = false;
      state.errorMessage = "";
      localStorage.removeItem("token");
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        authenticateUser.pending,
        (state) => {
          state.loading = true;
          console.log("authenticateUser() pending...");
        }
      )
      .addCase(
        authenticateUser.fulfilled,
        (state, action: PayloadAction<UserModel>) => {
          state.loading = false;
          state.currentUser = action.payload;
          state.errorMessage = "";
          localStorage.setItem("token", action.payload.jwToken as string);
          console.log("authenticateUser() successful!");
        }
      )
      .addCase(
        authenticateUser.rejected,
        (state) => {
          state.loading = false;
          state.errorMessage = "Incorrect email or password";
          console.log("authenticateUser() failed");
        }
      );
  },
});

export const { logout } = usersSlice.actions;

export default usersSlice.reducer;