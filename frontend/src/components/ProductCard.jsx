import React from 'react';
import PriceTag from './PriceTag';
const ProductCard = ({ productName, productImage, price, discountPrice }) => {
  return (
    <div className="w-64 h-80 border border-gray-300 rounded-lg overflow-hidden group">
      <div className="relative h-40 bg-gray-100">
        <img
          src={productImage}
          alt={productName}
          className="object-fill w-full h-full group-hover:brightness-50 transition-brightness duration-300"
        />
        <button className="absolute inset-16 flex items-center justify-center bg-blue-300 hover:bg-blue-400 transition-opacity duration-300 text-white font-bold text-lg opacity-0 group-hover:opacity-100">
          Add to cart
        </button>
      </div>
      <div className="p-4 text-lg font-bold">
        <p className="mb-1">{productName}</p>
        <PriceTag price={price} discount={discountPrice} />
      </div>
    </div>
  );
};

export default ProductCard;
