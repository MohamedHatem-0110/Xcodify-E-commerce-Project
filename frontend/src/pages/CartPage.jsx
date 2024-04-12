import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useSelector } from "react-redux";
import CartProduct from "../components/CartProduct";
import { useNavigate } from "react-router-dom";
const CartPage = () => {
  const { cart, totalPrice, totalDiscount } = useSelector(
    (state) => state.cart
  );
  const navigate = useNavigate();
  return (
    <>
      <div className="p-2">
        <h3 className="text-2xl">Your Shopping Cart</h3>
        <hr className="mb-2" />
        {cart.length == 0 ? (
          <h1 className="text-xl">Nothing to see here!</h1>
        ) : (
          <div className="flex gap-2 justify-between">
            <div className="flex flex-col gap-2 border border-gray-400 rounded-sm p-2">
              {cart.map((product) => {
                return (
                  <>
                    <CartProduct
                      key={product.id + " cart"}
                      productId={product.id}
                      prodQuantity={product.quantity}
                      productName={product.name}
                      productImage={product.image}
                      productDesc={product.desc ?? ""}
                      productPrice={product.price}
                      productDiscount={product.discount}
                    />
                    {cart.length > 1 && <hr />}
                  </>
                );
              })}
            </div>
            <div className="w-1/3 p-4 bg-white shadow-md">
              {/*
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Have coupon?</p>
                <div className="mt-2">
                  <input
                    className="border p-2 rounded w-full"
                    type="text"
                    placeholder="Coupon code"
                  />
                </div>
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded">
                APPLY
              </button>
            </div>
              */}

              <div className="mt-4">
                <div className="flex justify-between">
                  <p>Total price:</p>
                  <p className="font-semibold">
                    {totalPrice + totalDiscount} EGP
                  </p>
                </div>
                <div className="flex justify-between mt-2">
                  <p>Discount:</p>
                  <p className="font-semibold text-red-500">
                    -{totalDiscount} EGP
                  </p>
                </div>
                <div className="flex justify-between mt-4 border-t pt-4">
                  <p>Total price:</p>
                  <p className="font-semibold">{totalPrice} EGP</p>
                </div>
              </div>
              <div className="mt-4">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => {
                    navigate("/checkout");
                  }}
                >
                  Checkout
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded ml-4"
                >
                  BACK TO SHOP
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="w-full py-2">
          <h3 className="text-2xl">Recommended</h3>
          <hr />
          <div className="flex gap-2 w-full mt-2"></div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
