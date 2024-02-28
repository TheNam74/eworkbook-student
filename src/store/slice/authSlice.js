import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: null,
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    loginStart: (state) => {
      state.login.isFetching = true;
    },
    loginSucess: (state, action) => {
      state.login.isFetching = false;
      // console.log("login success paypload user, ", action.payload)
      state.login.currentUser = action.payload;
      state.login.error = false;
    },
    loginFailed: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
    logOutStart: (state) => {
      state.login.isFetching = true;
    },
    logOutSucess: (state) => {
      state.login.isFetching = false;
      state.login.currentUser = null;
      state.login.error = false;
      // window.location.href = '/signin'
    },
    logOutFailed: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
    },
    updateProfileSucess: (state, action) => {
      // // console.log("update successs, action payloadddd,", action.payload)
      state.login.currentUser.firstName = action.payload.firstName;
      state.login.currentUser.lastName = action.payload.lastName;
      state.login.currentUser.grade = action.payload.grade;
      state.login.currentUser.phone = action.payload.phone;
      state.login.currentUser.gender = action.payload.gender;
      state.login.currentUser.DOB = action.payload.DOB;
    },
    refreshUser: (state, action) => {
      // // console.log("actipn payloadddddddd, ", action.payload.data)
      state.login.currentUser.avatar = action.payload.data.avatar;
    },
  },
})

export const {
  loginStart,
  loginFailed,
  loginSucess,
  logOutStart,
  logOutSucess,
  logOutFailed,
  updateProfileSucess,
  refreshUser,
} = authSlice.actions;

export default authSlice.reducer
