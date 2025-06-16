import React, { useEffect } from "react";
import Navbar from "./Components/Navbar.jsx";
import MainRoutes from "./Routes/MainRoutes.jsx";
import { asynCurrentuser } from "./Store/Actions/userActions.jsx";
import { useDispatch } from "react-redux";
import { asyncLoadProducts } from "./Store/Actions/productActions.jsx";

const App = () => {

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(asynCurrentuser())
    dispatch(asyncLoadProducts())
  },[])
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
