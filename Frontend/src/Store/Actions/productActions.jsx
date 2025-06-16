import axios from "../../api/axiosConfig";
import { loadProduct } from "../Reducers/productSlice";
import { loadUser } from "../Reducers/userSlice";

export const asyncLoadProducts = () => async (dispatch, getState) => {
  try {
    const { data } = await axios.get("/products");
    dispatch(loadProduct(data));
  } catch (error) {
    console.log(error);
  }
};

export const asyncCreateProduct = (product) => async (dispatch, getState) => {
  try {
     await axios.post("/products",product);
    dispatch(asyncLoadProducts())
  } catch (error) {
    console.log(error);
  }
};
export const asyncUpdateProduct = (id, product) => async (dispatch, getState) => {
  try {
    await axios.patch("/products/" + id, product);
    dispatch(asyncLoadProducts());
  } catch (error) {
    console.log(error);
  }
};
export const asyncDeletehandler = (id, product) => async (dispatch, getState) => {
  try {
    await axios.delete("/products/" + id);
    dispatch(asyncLoadProducts());
  } catch (error) {
    console.log(error);
  }
};

