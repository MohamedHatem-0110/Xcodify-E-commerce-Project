import React, { useState, useEffect } from "react";
import axios from "axios";
import { fetchProducts } from "../functions/productFunctions";
import Carousel from "../components/Carousel";
import Section from "../components/Section";

import ProductCard from "../components/ProductCard";

const Home = () => {
  const [products, setProducts] = useState(null);
  let numberOfProducts = 8;

  const images = [
    "https://random.imagecdn.app/1080/300",
    "https://random.imagecdn.app/1080/300",
    "https://random.imagecdn.app/1080/300",
  ];
  useEffect(() => {
    fetchProducts(setProducts);
    console.log(products);
  }, []);

  return (
    <div>
      <div className="mt-20 flex flex-col gap-10">
        {images && <Carousel images={images} />}

        <div className="p-4 rounded-lg bg-white">
          <h1 className="font-bold text-3xl mb-4">Products</h1>
          <div className="flex flex-wrap gap-5 justify-center sm:justify-start">
            {products &&
              products.map((product) => (
                <ProductCard
                  productName={product.name}
                  productImage={product.image}
                  price={product.price}
                  discountPrice={product.discountPrice}
                  productId={product._id}
                  productDesc={product.desc}
                />
              ))}
          </div>
        </div>
        <Section title={"Category"} />
      </div>
    </div>
  );
};

export default Home;
