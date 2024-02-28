import { updateProfileSucess, refreshUser } from "../store/slice/authSlice";
import axiosClient from "./axiosClient";

class UserApi {
  editUser = async (editedUserInfo, dispatch) => {
    try {
      const res = await axiosClient.post("users", editedUserInfo)
      // // console.log("edited userrrrrr",res)
      dispatch(updateProfileSucess(res))
      // NAMTODO if(res._id){
      //      dispatch(loginSucess(res))
      //      navigate("/library")
      // }
      // else{
      //      dispatch(loginFailed(res))
      // }
    } catch (error) {
      // console.log("edit user api error", error)
    }
  }

  refreshCurrentUser = async (dispatch) => {
    try {
      const res = await axiosClient.get("currentUser")
      // // console.log("get current user after image upload",res)
      dispatch(refreshUser(res))
    } catch (error) {
      // console.log("refresh user api error", error)
    }
  }

  changePassword = async (passwords) => {
    try {
      const res = await axiosClient.post("users/updatePassword", passwords)
      // // console.log("update password api res: ",res)
      return res;
    } catch (error) {
      // console.log("update password api error: ", error)
    }
    return null;
  }

  updateAvatar = async (action, formData, config) => {
    try {
      return axiosClient.post(action, formData, config)
    } catch (error) {
      // console.log("update password api error: ", error)
    }
    return null;
  }

  sendMailForgetPassword = async (params) => {
    try {
      const url = "users/sendmail";
      return await axiosClient.get(url, { params });
    } catch (error) {
      // console.log("get user by email error: ", error)
    }
    return null;
  }

  checkTheRandomString = async (params) => {
    try {
      const url = "users/checkRandomString";
      return await axiosClient.post(url, params);
    } catch (error) {
      // console.log("check random string error: ", error);
    }
    return false;
  }

  resetForgottenPassword = async (params) => {
    try {
      const url = "users/resetForgottenPassword";
      return await axiosClient.post(url, params);
    } catch (error) {
      // console.log("rest password error: ", error);
    }
    return null;
  }
}

const userApi = new UserApi()
export default userApi;
