import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useBreadcrumb } from '../providers/breadcrumbProvider';
import ProductCard from '../components/ProductCard';
import axios from 'axios';
import PriceTag from '../components/PriceTag';
const ProductPage = () => {
  const { updateBreadcrumbs, clearBreadcrumbs } = useBreadcrumb();
  const navigate = useNavigate();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  const [size, setSize] = useState(0 || 'Small');
  const [quantity, setQuantity] = useState(1);

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value);
    setQuantity(newQuantity);
  };

  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
  };

  const decreaseQuantity = () => {
    const newQuantity = quantity - 1;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const response = await axios.get(`/api/products/${productId}`);
        console.log(response);
        if (response.statusText !== 'OK') {
          // If product not found or any other error occurs
          throw new Error('Product not found');
        }
        setProduct(response.data);
        updateBreadcrumbs(response.data.name);
      } catch (error) {
        console.error('Error fetching product:', error);
        navigate('/');
      }
    };

    if (!productId) {
      navigate('/');
    } else {
      getProductDetails();
    }

    return () => clearBreadcrumbs();
  }, [productId]);
  return (
    <div className="w-100% py-4 px-2">
      {
        // TODO: Complete the product's details from API
      }
      {product && (
        <>
          <div className="flex gap-2 w-100%">
            <div className="w-1/2 flex justify-center items-center border border-gray-300 rounded-sm p-2">
              <img
                src={'data:image/webp;base64,' + product.image.dataString}
                className=" md:w-1/2 w-full h-64"
                alt={product.name}
              />
            </div>
            <div className="bg-white rounded-lg shadow-md p-6 w-1/2 flex flex-col gap-1">
              <div className="text-2xl font-bold">{product.name}</div>
              <div className="flex items-center gap-2 my-2 ">
                <i className="fas fa-star text-xs text-yellow-400"></i>
                <span className="font-semibold ">4.6</span>·
                <i class="fa-solid fa-basket-shopping text-xs"></i>
                {`21`} ·<i class="fa-solid fa-box-open"></i>
                {`21 orders`} ·
                <span className="italic font-medium text-green-400">
                  in-stock
                </span>
              </div>
              <PriceTag price={123} discount={100} />
              <div className="text-gray-600 mb-6">DESC</div>
              <div className="flex items-center mb-2">
                <div className="text-sm font-semibold">Type:</div>
                <div className="text-xs text-gray-500 ml-2">123</div>
              </div>
              <div className="text-sm font-semibold">aaaaa</div>
              <hr className="mt-4" />
              <div className="flex items-center mt-4 mb-6">
                <div className="text-sm font-semibold mr-2">Size:</div>
                <select
                  value={size}
                  onChange={handleSizeChange}
                  className="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm py-1 px-2 mr-4"
                >
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                  <option value="X-Large">X-Large</option>
                </select>
                <div className="text-sm font-semibold mr-2">Quantity:</div>
                <button
                  onClick={decreaseQuantity}
                  className="bg-gray-200 text-gray-800 font-semibold py-1 px-2 rounded mr-2"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  className="border-gray-600 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm py-1 px-2 w-10 mr-4"
                />
                <button
                  onClick={increaseQuantity}
                  className="bg-gray-200 text-gray-800 font-semibold py-1 px-2 rounded"
                >
                  +
                </button>
              </div>
              <div className="flex items-center mt-6">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                  Buy now
                </button>
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded ml-4">
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="flex flex-col gap-2 w-full my-2">
        <div>
          <h3 className="text-2xl">See Also</h3>
          <hr />
        </div>
        {
          // TODO: Add products based on category of the current object
        }
        <div className="flex gap-2 w-full">
          <ProductCard
            key={'pro1'}
            productName="Product Name"
            productImage="https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&h=1280&q=80"
            price={123}
          />
          <ProductCard
            key={'pro2'}
            productName="Product Name"
            productImage="https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&h=1280&q=80"
            price={123}
            discountPrice={100}
          />
          <ProductCard
            key={'pro13'}
            productName="Product Name"
            productImage="https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&h=1280&q=80"
            price={1234}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;