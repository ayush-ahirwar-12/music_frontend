import { axiosInstance } from "../../axios/AxiosInstance";
import { addUser, removeUser } from "../reducers/authSlice.jsx";


export const UserRegisterApi = (data) => async (dispatch) => {
  try {
    let response = await axiosInstance.post("/auth/register", data);

    dispatch(addUser(response.data.user));
    console.log(response.data);

  } catch (error) {
    console.log("error in user register thunk->", error);
  }
};

export const UserLoginApi = (data) => async (dispatch) => {
  try {
    let response = await axiosInstance.post("/auth/login", data);
    if (response) {
      dispatch(addUser(response.data.user),{token:response.data.token});
      console.log(response);
      return response;
      
    }
  } catch (error) {
    console.log("error in login", error);
  }
};

export const logoutUserApi = (data)=>async(dispatch)=>{
  try {
    let response = await axiosInstance.post("/auth/logout")
    dispatch(removeUser())
    console.log("user logout");
    

  } catch (error) {
    console.log("error in user logout",error);
    
  }
}


