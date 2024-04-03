import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import LoadingSpinner from "../components/LoadingSpinner";

const ProductsPage = () => {
  const { word } = useParams();
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (word) {
          response = await axios.get("api/products/search/" + word);
        } else {
          response = await axios.get("api/products/");
        }

        setProducts(response.data);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [word]);

  return (
    <div className="grid grid-cols-[1fr,3fr] py-4 px-2">
      <div className="">left</div>
      {loading ? ( // Show loading indicator if data is being fetched
        <div className="flex justify-center items-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {products &&
            products.map((product, index) => (
              <ProductCard
                key={index}
                price={product.price}
                productName={product.name}
                discountPrice={product.discountPrice}
                productImage={product.image}
                productId={product._id}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
