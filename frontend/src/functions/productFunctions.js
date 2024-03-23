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

export default fetchProducts;
