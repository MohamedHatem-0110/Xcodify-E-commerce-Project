import React, { useState, useEffect } from "react";
import axios from "axios";
import fetchProducts from "../functions/productFunctions";
import Carousel from "../components/Carousel";

const Home = () => {
  const [products, setProducts] = useState(null);
  let numberOfProducts = 8;

  const images = [
    "https://random.imagecdn.app/1080/300",
    "https://random.imagecdn.app/1080/300",
    "https://random.imagecdn.app/1080/300",
    // Add more image URLs as needed
  ];
  useEffect(() => {
    fetchProducts(setProducts);
  }, []);

  return <div className="mx-10">{images && <Carousel images={images} />}</div>;
};

export default Home;
