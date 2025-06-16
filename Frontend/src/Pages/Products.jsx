// src/Pages/Products.jsx

import React from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../Components/ProductCard';

const Products = () => {
  const products = useSelector((state) => state.productReducers.products);
  console.log(products);

  return (
    <div className="container mx-auto px-4 py-8">
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center text-lg font-semibold text-gray-600">
          Loading...
        </div>
      )}
    </div>
  );
};

export default Products;
