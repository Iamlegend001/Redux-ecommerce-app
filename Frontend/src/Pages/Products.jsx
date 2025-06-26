import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "../Components/ProductCard";
import InfiniteScroll from "react-infinite-scroll-component";
import useInfiniteProducts from "../Utils/useInfiniteProducts";

const Products = () => {
  const users = useSelector((state) => state.userReducers.users);
  const { products, fetchProducts, hasMore } = useInfiniteProducts(); // ✅ Only this

  const renderProductsSection = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products
          .filter((product) => product && (product.id || product._id))
          .map((product) => (
            <ProductCard
              key={product.id || product._id}
              product={{
                ...product,
                id: product.id || product._id,
              }}
              users={users}
            />
          ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <InfiniteScroll
        dataLength={products.length}
        next={fetchProducts}
        hasMore={hasMore}
        loader={<h4 className="text-center py-4 text-blue-600">Loading...</h4>}
        endMessage={
          <p className="text-center py-4 text-gray-500">
            <b>Yay! You have seen it all 🎉</b>
          </p>
        }
      >
        {renderProductsSection()}
      </InfiniteScroll>
    </div>
  );
};

export default Products;
