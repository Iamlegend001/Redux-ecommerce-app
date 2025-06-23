// src/Components/ProductCard.jsx

import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { asyncUpdateUser } from "../Store/Actions/userActions";

const ProductCard = ({ product, users }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const addtoCartHandler = (product) => {
    // Clone user safely and ensure cart is an array
    const copyUser = { ...users, cart: [...users.cart] };
    const x = copyUser.cart.findIndex((c) => c?.product?.id == product.id);
    if (x == -1) {
      copyUser.cart.push({product, quantity:1})
    }else{
      copyUser.cart[x] = {product,quantity:copyUser.cart[x].quantity+1}
    }
    console.log(copyUser)

    dispatch(asyncUpdateUser(copyUser.id, copyUser));
    navigate("/cart")
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 w-60 hover:scale-105 transition-transform">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h2 className="text-lg font-semibold text-gray-800 truncate">
        {product.title}
      </h2>
      <p className="text-gray-600 font-medium">${product.price}</p>
      <p className="text-sm text-gray-500 h-16 overflow-hidden">
        {product.description}
      </p>
      <p className="text-xs text-blue-500 mt-2">{product.category}</p>

      <button
        onClick={() => addtoCartHandler(product)}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors duration-200"
      >
        Add to Cart
      </button>

      <Link
        to={`/product/${product.id}`}
        className="mt-2 inline-block text-blue-600 hover:underline text-sm font-medium"
      >
        More Info
      </Link>
    </div>
  );
};

export default ProductCard;
