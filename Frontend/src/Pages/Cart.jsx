import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { asyncUpdateUser } from "../Store/Actions/userActions";

const Cart = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducers.users);

  if (!user || !user.cart || user.cart.length === 0) {
    return (
      <div className="container mx-auto mt-10 p-4 text-center">
        <h1 className="text-3xl font-semibold text-gray-800">
          Your Cart is Empty
        </h1>
        <p className="text-gray-500 mt-2">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      handleRemoveItem(productId);
      return;
    }

    const updatedCart = user.cart.map((item) =>
      item.product.id === productId ? { ...item, quantity: newQuantity } : item
    );

    const updatedUser = { ...user, cart: updatedCart };
    dispatch(asyncUpdateUser(user.id, updatedUser));
  };

  const handleRemoveItem = (productId) => {
    const updatedCart = user.cart.filter(
      (item) => item.product.id !== productId
    );
    const updatedUser = { ...user, cart: updatedCart };
    dispatch(asyncUpdateUser(user.id, updatedUser));
  };

  const calculateSubtotal = () => {
    return user.cart
      .reduce(
        (total, item) => total + Number(item.product.price) * item.quantity,
        0
      )
      .toFixed(2);
  };

  return (
    <div className="container mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Your Shopping Cart
      </h1>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="bg-white shadow-md rounded-lg">
            {user.cart.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex items-center p-4 border-b last:border-b-0"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-24 h-24 object-cover rounded-md mr-4"
                />
                <div className="flex-grow">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {product.title}
                  </h2>
                  <p className="text-gray-600">
                    ${Number(product.price).toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border rounded-md">
                    <button
                      onClick={() =>
                        handleUpdateQuantity(product.id, quantity - 1)
                      }
                      className="px-3 py-1 text-gray-700 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 font-medium">{quantity}</span>
                    <button
                      onClick={() =>
                        handleUpdateQuantity(product.id, quantity + 1)
                      }
                      className="px-3 py-1 text-gray-700 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemoveItem(product.id)}
                    className="text-red-500 hover:text-red-700 font-semibold"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:w-1/3">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              Order Summary
            </h2>
            <div className="flex justify-between mb-2 text-gray-600">
              <span>Subtotal</span>
              <span>${calculateSubtotal()}</span>
            </div>
            <div className="flex justify-between mb-2 text-gray-600">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between font-bold text-xl text-gray-800">
              <span>Total</span>
              <span>${calculateSubtotal()}</span>
            </div>
            <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
