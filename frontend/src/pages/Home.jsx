import React, { useState, useEffect } from "react";
import axios from "axios";
import fetchProducts from "../functions/productFunctions";
import Carousel from "../components/Carousel";
import Section from "../components/Section";
import Footer from "../components/Footer";

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
  }, []);

  return (
    <div>
      <div className="mt-20 flex-col mx-10">
        {images && <Carousel images={images} />}
        <Section title={"Popular"} />
        <Section title={"Category"} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
