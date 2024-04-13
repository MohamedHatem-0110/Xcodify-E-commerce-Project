import axios from "axios";

const fetchProducts = async (setProducts, number) => {
  try {
    if (number) {
      const response = await axios.post("/api/products/getProductsByNumber", {
        number,
      });

      setProducts(response.data);
    } else {
      const response = await axios.post("/api/products");
      setProducts(response.data);
    }

    console.log(response.data);
  } catch (error) {}
};

const getImage = (productImage) => {
  return productImage.dataString;
};

export { fetchProducts, getImage };
