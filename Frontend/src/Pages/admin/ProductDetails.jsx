import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  asyncDeletehandler,
  asyncUpdateProduct,
} from "../../Store/Actions/productActions";
import { asyncUpdateUser } from "../../Store/Actions/userActions";

const ProductDetails = () => {
  const { id } = useParams();
  const {
    productReducers: { products },
    userReducers: { users },
  } = useSelector((state) => state);

  const product = products?.find((product) => product.id.toString() === id);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (product) {
      reset(product);
    }
  }, [product, reset]);

  const updateProductHandler = (productData) => {
    dispatch(asyncUpdateProduct(id, productData));
  };

  const addtoCartHandler = (product) => {
    // Clone user safely and ensure cart is an array
    const copyUser = { ...users, cart: [...users.cart] };
    const x = copyUser.cart.findIndex((c) => c?.product?.id == product.id);
    if (x == -1) {
      copyUser.cart.push({ product, quantity: 1 });
    } else {
      copyUser.cart[x] = { product, quantity: copyUser.cart[x].quantity + 1 };
    }
    console.log(copyUser);

    dispatch(asyncUpdateUser(copyUser.id, copyUser));
    navigate("/cart");
  };

  const deleteHandler = () => {
    dispatch(asyncDeletehandler(id));
    navigate("/");
  };

  if (!product) {
    return (
      <div className="text-center text-red-600 text-xl mt-10">
        Product Not Found!
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-4xl flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="md:w-1/2 flex justify-center items-center">
          <img
            src={product.image}
            alt={product.title}
            className="w-96 h-96 object-cover rounded-lg"
          />
        </div>

        {/* Product Info Section */}
        <div className="md:w-1/2 md:pl-10 mt-6 md:mt-0">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {product.title}
          </h1>
          <p className="text-lg text-gray-600 mb-4">{product.description}</p>
          <div className="flex items-center mb-4">
            <span className="text-2xl font-semibold text-blue-600">
              ${product.price}
            </span>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            <span className="font-semibold">Category:</span> {product.category}
          </p>
          <button onClick={() => addtoCartHandler(product)} className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors text-lg font-medium">
            Add to Cart
          </button>
        </div>

        {/* Admin Controls */}
        {users && users?.isAdmin && (
          <form
            onSubmit={handleSubmit(updateProductHandler)}
            className="space-y-6 md:w-1/2 md:pl-10 mt-6 md:mt-0"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Title</label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                type="text"
                placeholder="Enter product title"
                {...register("title", { required: true })}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">Title is required</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Price ($)
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                type="number"
                step="0.01"
                placeholder="Enter price"
                {...register("price", { required: true })}
              />
              {errors.price && (
                <p className="text-red-500 text-sm">Price is required</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                placeholder="Enter product description"
                {...register("description", { required: true })}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">Description is required</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Category
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                type="text"
                placeholder="Enter category"
                {...register("category", { required: true })}
              />
              {errors.category && (
                <p className="text-red-500 text-sm">Category is required</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Image URL
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                type="url"
                placeholder="Enter image URL"
                {...register("image", { required: true })}
              />
              {errors.image && (
                <p className="text-red-500 text-sm">Image URL is required</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 font-medium"
            >
              Update Product
            </button>

            <button
              type="button"
              onClick={deleteHandler}
              className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-800 transition duration-200 font-medium"
            >
              Delete
            </button>

          </form>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
