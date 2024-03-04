import {
  loginFailed,
  loginStart,
  loginSucess,
  logOutFailed,
  logOutStart,
  logOutSucess,
} from "../store/slice/authSlice";
import axiosClient from "./axiosClient";
import axiosClientForLogin from "./axiosClientForLogin";

class AuthApi {
  loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
      const res = await axiosClientForLogin.post("/auth/local/signin", user);
      if (res.id) {
        await dispatch(loginSucess(res));
        navigate("/library");
      } else {
        dispatch(loginFailed(res));
      }
    } catch (error) {
      dispatch(loginFailed());
    }
  };

  logOut = async (dispatch, navigate) => {
    dispatch(logOutStart());
    try {
      await axiosClient.post("/auth/logout");
      navigate("/signin");
      dispatch(logOutSucess());
    } catch (error) {
      dispatch(logOutFailed());
    }
  };

  registerUser = async (user, dispatch, navigate) => {
    try {
      const res = await axiosClient.post("/auth/local/signup", {
        ...user,
        role: "Student",
      });
      await dispatch(loginSucess(res));
      navigate("/library");
      return res;
    } catch (error) {
      // console.log("Register error", error)
      return error;
    }
  };

  getCurrentUser = async (dispatch) => {
    try {
      const res = await axiosClient.get("/currentUser");
      dispatch(loginSucess(res.data));
      return {
        success: true,
        user: res,
      };
    } catch (error) {
      console.log("Get current user error", error);
      throw error;
    }
  };

  loginWithGoogle = async (dispatch, navigate) => {
    try {
      const res = await axiosClient.get("/auth/google/login");
      if (res.id) {
        dispatch(loginSucess(res));
        navigate("/library");
      } else {
        dispatch(loginFailed(res));
      }
    } catch (error) {
      dispatch(loginFailed());
    }
  };
}
const authApi = new AuthApi();
export default authApi;
