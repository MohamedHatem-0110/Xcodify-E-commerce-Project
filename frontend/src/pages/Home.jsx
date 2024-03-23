import React, { useState, useEffect } from "react";
import axios from "axios";
import fetchProducts from "../functions/productFunctions";

const Home = () => {
  const [products, setProducts] = useState(null);
  let numberOfProducts = 8;
  useEffect(() => {
    fetchProducts(setProducts);
  }, []);

  return (
    <div>
      {products !== null &&
        products.slice(0, numberOfProducts).map((product) => (
          <div key={product._id}>
            {/* Add a unique key prop for each product */}
            <h2>{product.name}</h2>
            <p>{product.desc}</p>
            <p>Price: ${product.price}</p>
            <img
              src={`data:${product.image.contentType};base64,${product.image.dataString}`}
              alt={product.name}
              style={{ maxWidth: "100%" }}
            />
            {/* Render other product details as needed */}
          </div>
        ))}
    </div>
  );
};

export default Home;
