import React, { useEffect } from "react";
import Navbar from "./Components/Navbar.jsx";
import MainRoutes from "./Routes/MainRoutes.jsx";
import { asynCurrentuser } from "./Store/Actions/userActions.jsx";
import { useDispatch, useSelector } from "react-redux";
// import { asyncLoadProducts } from "./Store/Actions/productActions.jsx";

const App = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.productReducers.products);
  const users = useSelector((state) => state.userReducers.users);

  useEffect(() => {
    !users && dispatch(asynCurrentuser());
  }, [users]);
  // useEffect(() => {
  //   products.length == 0 && dispatch(asyncLoadProducts());
  // }, [products]);
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <MainRoutes />
      </main>
    </div>
  );
};

export default App;
