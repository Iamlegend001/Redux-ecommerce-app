// hooks/useInfiniteProducts.js
import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "../api/axiosConfig";
import { loadLazyProduct } from "../Store/Reducers/productSlice";

const LIMIT = 6;

const useInfiniteProducts = () => {
  const { products } = useSelector((state) => state.productReducers);
  const dispatch = useDispatch();
  const [start, setStart] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchProducts = useCallback(async () => {
    if (!hasMore || loading) return;

    setLoading(true);
    try {
      const { data } = await axios.get(
        `/products?_start=${start}&_limit=${LIMIT}`
      );
      if (data.length === 0) {
        setHasMore(false);
      } else {
        dispatch(loadLazyProduct(data));
        setStart((prev) => prev + LIMIT);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [start, hasMore, loading, dispatch]);

  useEffect(() => {
    fetchProducts(); // initial load
  }, []);

  return { products, fetchProducts, hasMore };
};

export default useInfiniteProducts;
