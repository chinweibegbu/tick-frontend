import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addUserApiCall, authenticateUserApiCall, resetPasswordApiCall, sendResetUserEmailApiCall, logoutApiCall } from "../apiCalls/user";
import { SigninFormValues, SignupFormValues, ResetUserFormValues, UserModel, ResetPasswordApiRequest } from "../models";

const initialState = {
  currentUser: {} as UserModel,
  loading: false,
  errorMessage: "",
  signUpErrorMessage: ""
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
        return thunkApi.rejectWithValue(error.response?.data.message ?? "Failed to authenticate user");
      }

      // --> Case #1b: API calls return object has `data` property
      if (data) {
        // The `data` property is of type `ApiResponse<UserModel>` which was passed as a type argument to AxiosResponse<>
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

export const logoutUser = createAsyncThunk
  <
    string,
    { token: string },
    { rejectValue: string }
  >
  ("logoutUser", async (values, thunkApi) => {
    try {
      const { data, error } = await logoutApiCall(values.token);

      if (error) {
        return thunkApi.rejectWithValue(error.response?.data.message ?? "an error occurred");
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

export const addUser = createAsyncThunk
  <
    string,
    SignupFormValues,
    { rejectValue: string }
  >
  ("addUser", async (values, thunkApi) => {
    try {
      const { data, error } = await addUserApiCall(values);

      if (error) {
        return thunkApi.rejectWithValue(error.response?.data.message ?? "an error occurred");
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

export const resetUser = createAsyncThunk
  <
    string,
    ResetUserFormValues,
    { rejectValue: string }
  >
  ("resetUser", async (values, thunkApi) => {
    try {
      const { data, error } = await sendResetUserEmailApiCall(values);

      if (error) {
        return thunkApi.rejectWithValue(error.response?.data.message ?? "an error occurred");
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

export const resetPassword = createAsyncThunk
  <
    string,
    ResetPasswordApiRequest,
    { rejectValue: string }
  >
  ("resetPassword", async (values, thunkApi) => {
    try {
      const { data, error } = await resetPasswordApiCall(values);

      if (error) {
        return thunkApi.rejectWithValue(error.response?.data.message ?? "an error occurred");
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

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Authenticate user
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
      )

      // Logout user
      .addCase(
        logoutUser.pending,
        (state) => {
          state.loading = true;
          console.log("logoutUser() pending...");
        }
      )
      .addCase(
        logoutUser.fulfilled,
        (state) => {
          state.currentUser = {} as UserModel;
          state.loading = false;
          state.errorMessage = "";
          localStorage.removeItem("token");
          console.log("logoutUser() successful!");
        }
      )
      .addCase(
        logoutUser.rejected,
        (state) => {
          state.loading = false;
          console.log("logoutUser() failed");
        }
      )

      // Add User
      .addCase(
        addUser.pending,
        (state) => {
          state.loading = true;
          console.log("addUser() pending...");
        }
      )
      .addCase(
        addUser.fulfilled,
        (state) => {
          state.loading = false;
          console.log("addUser() successful!");
        }
      )
      .addCase(
        addUser.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.signUpErrorMessage = action.payload!;
          console.log("addUser() failed");
        }
      )

      // Reset User
      .addCase(
        resetUser.pending,
        (state) => {
          state.loading = true;
          console.log("resetUser() pending...");
        }
      )
      .addCase(
        resetUser.fulfilled,
        (state) => {
          state.loading = false;
          console.log("resetUser() successful!");
        }
      )
      .addCase(
        resetUser.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.signUpErrorMessage = action.payload!;
          console.log("resetUser() failed");
        }
      )

      // Reset Password
      .addCase(
        resetPassword.pending,
        (state) => {
          state.loading = true;
          console.log("resetPassword() pending...");
        }
      )
      .addCase(
        resetPassword.fulfilled,
        (state) => {
          state.loading = false;
          console.log("resetPassword() successful!");
        }
      )
      .addCase(
        resetPassword.rejected,
        (state) => {
          state.loading = false;
          console.log("resetPassword() failed");
        }
      );
  },
});

export const { } = usersSlice.actions;

export default usersSlice.reducer;