import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { asynLogoutuser } from "../Store/Actions/userActions";

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.userReducers.users);
 const LogoutHandler = ()=>{
  dispatch(asynLogoutuser())
  navigate("/")
 }
  return (
    <nav className="bg-gradient-to-r from-gray-800 to-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side navigation */}
          <div className="flex items-center space-x-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-gray-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive ? "bg-gray-700 shadow-inner" : ""
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `text-gray-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive ? "bg-gray-700 shadow-inner" : ""
                }`
              }
            >
              Products
            </NavLink>
          </div>

          {/* Right side navigation */}
          <div className="flex items-center space-x-4">
            {user ? (
              <> <NavLink
                to="/admin/create-product"
                className={({ isActive }) =>
                  `text-gray-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive ? "bg-gray-700 shadow-inner" : ""
                  }`
                }
              >
                Create Product
              </NavLink>
              <button onClick={LogoutHandler} className="text-white">Logout</button>
              </>


            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `text-gray-100 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      isActive ? "bg-gray-700 shadow-inner" : ""
                    }`
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    `bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      isActive ? "ring-2 ring-blue-400" : ""
                    }`
                  }
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
