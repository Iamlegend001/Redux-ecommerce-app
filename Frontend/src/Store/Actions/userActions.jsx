import axios from "../../api/axiosConfig";
import { loadUser, removeUser } from "../Reducers/userSlice";

export const asyncRegisterUser = (user) => async (dispatch, getState) => {
  try {
    const res = await axios.post("/users", user);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
export const asyncUpdateUser = (id, user) => async (dispatch, getState) => {
  try {
    const { data } = await axios.patch("/users/" + id, user);

    localStorage.setItem("user", JSON.stringify(data));
    dispatch(asynCurrentuser())
  } catch (error) {
    console.log(error);
  }
};

export const asynLoginuser = (user) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(
      `/users?email=${user.email}&password=${user.password}`
    );
    console.log(data[0]);

    if (data.length > 0) {
      localStorage.setItem("user", JSON.stringify(data[0]));
      dispatch(loadUser(data[0]));
    } else {
      console.log("Invalid credentials");
    }
  } catch (error) {
    console.log(error);
  }
};

export const asynLogoutuser = () => async (dispatch, getState) => {
  try {
    localStorage.removeItem("user");
    dispatch(removeUser(null));
  } catch (error) {
    console.log(error);
  }
};

export const asynCurrentuser = () => async (dispatch, getState) => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) dispatch(loadUser(user));
    else console.log("User not found");
  } catch (error) {
    console.log(error);
  }
};

export const asyncDeleteUser = (id) => async (dispatch, getState) => {
  try {
    await axios.delete("/users/" + id);

    dispatch(asynLogoutuser());
  } catch (error) {
    console.log(error);
  }
};
