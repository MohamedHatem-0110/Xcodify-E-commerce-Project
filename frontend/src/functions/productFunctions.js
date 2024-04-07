import axios from "axios";

const fetchProducts = async (setProducts, setError) => {
  try {
    const response = await axios.get("/api/products");
    setProducts(response.data);
    console.log(response.data);
  } catch (error) {
    setError(error.message);
  }
};

const getImage = (productImage) => {
  return "data:image/webp;base64," + productImage.dataString;
};

export { fetchProducts, getImage };
