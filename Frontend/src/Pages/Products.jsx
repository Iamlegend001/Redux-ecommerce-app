import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../Components/ProductCard";
import axios from "../api/axiosConfig";
import InfiniteScroll from "react-infinite-scroll-component";

const Products = () => {
  const users = useSelector((state) => state.userReducers.users);
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [start, setStart] = useState(0);
  const LIMIT = 6;

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`/products?_start=${start}&_limit=${LIMIT}`);
      if (data.length === 0) {
        setHasMore(false);
        return;
      }

      setProducts((prev) => [...prev, ...data]);
      setStart((prev) => prev + LIMIT);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
