import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { asyncUpdateUser } from "../Store/Actions/userActions";

const ProductCard = ({ product, users }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addtoCartHandler = (product) => {
    const productId = product.id;

    // Clone user safely and ensure cart is an array
    const copyUser = { ...users, cart: [...(users.cart || [])] };

    const index = copyUser.cart.findIndex(
      (item) => item?.product?.id === productId
    );

    if (index === -1) {
      copyUser.cart.push({ product, quantity: 1 });
    } else {
      copyUser.cart[index] = {
        product,
        quantity: copyUser.cart[index].quantity + 1,
      };
    }

    console.log("Updated user cart:", copyUser);

    dispatch(asyncUpdateUser(copyUser.id, copyUser));
    navigate("/cart");
  };

  return (
    <div className="relative bg-gradient-to-br from-white via-blue-50 to-indigo-100 rounded-2xl shadow-2xl p-5 w-full max-w-xs flex flex-col items-center border border-gray-100 hover:shadow-blue-200 hover:-translate-y-2 hover:scale-105 transition-all duration-300 group">
      <div className="relative w-40 h-40 mb-4 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="w-36 h-36 object-cover rounded-xl border-4 border-white shadow-lg group-hover:ring-4 group-hover:ring-blue-200 transition-all duration-300"
        />
        <span className="absolute top-2 right-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
          ${Number(product.price).toFixed(2)}
        </span>
      </div>
      <h2 className="text-lg font-extrabold text-gray-800 text-center mb-1 truncate w-full">
        {product.title}
      </h2>
      <p className="text-xs text-gray-500 h-12 overflow-hidden text-center mb-2">
        {product.description}
      </p>
      <span className="inline-block bg-indigo-100 text-indigo-600 text-xs font-semibold px-3 py-1 rounded-full mb-4 shadow-sm">
        {product.category}
      </span>
      <button
        onClick={() => addtoCartHandler(product)}
        className="mt-auto w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 rounded-xl font-bold shadow-md hover:from-blue-600 hover:to-indigo-600 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 text-base group"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7A2 2 0 008.48 19h7.04a2 2 0 001.83-1.3L17 13M7 13V6a1 1 0 011-1h5a1 1 0 011 1v7"
          />
        </svg>
        Add to Cart
      </button>
      <Link
        to={`/product/${product.id}`}
        className="mt-3 inline-block text-indigo-600 hover:text-indigo-800 hover:underline text-sm font-semibold text-center transition-colors"
      >
        More Info
      </Link>
    </div>
  );
};

export default ProductCard;
