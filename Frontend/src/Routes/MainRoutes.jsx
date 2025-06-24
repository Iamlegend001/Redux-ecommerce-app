import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

// Lazy loaded components
const Register = lazy(() => import("../Pages/Register"));
const Login = lazy(() => import("../Pages/Login"));
const Products = lazy(() => import("../Pages/Products"));
const CreateProduct = lazy(() => import("../Pages/admin/CreateProduct"));
const ProductDetails = lazy(() => import("../Pages/admin/ProductDetails"));
const UserProfile = lazy(() => import("../Pages/Users/UserProfile"));
const PageNotFound = lazy(() => import("../PageNotFound"));
const Cart = lazy(() => import("../Pages/Cart"));
const AuthWrapper = lazy(() => import("./AuthWrapper"));

const MainRoutes = () => {
  return (
    <Suspense fallback={<div className="text-center mt-10 text-gray-500">Loading...</div>}>
      <Routes>
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/admin/create-product"
          element={
            <AuthWrapper>
              <CreateProduct />
            </AuthWrapper>
          }
        />
        <Route
          path="/admin/user-profile"
          element={
            <AuthWrapper>
              <UserProfile />
            </AuthWrapper>
          }
        />
        <Route
          path="/product/:id"
          element={
            <AuthWrapper>
              <ProductDetails />
            </AuthWrapper>
          }
        />
        <Route
          path="/cart"
          element={
            <AuthWrapper>
              <Cart />
            </AuthWrapper>
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Suspense>
  );
};

export default MainRoutes;
