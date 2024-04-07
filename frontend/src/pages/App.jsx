import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import ProductPage from "./ProductPage";
import RegisterPage from "./RegisterPage";
import Breadcrumb from "../components/Breadcrumb";
import LoginPage from "./LoginPage";
import axios from "axios";
import { BreadcrumbProvider } from "../providers/breadcrumbProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductsPage from "./ProductsPage";
import CartPage from "./CartPage";

axios.defaults.baseURL = "http://localhost:3000";
const App = () => {
  return (
    <Router>
      <BreadcrumbProvider>
        <Navbar />

        <div className="mx-10">
          <Breadcrumb />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/products/search/:word?" element={<ProductsPage />} />
            <Route path="/products/:productId" element={<ProductPage />} />
            <Route path="/products/" element={<ProductsPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </div>
        <Footer />
        <ToastContainer theme="colored" pauseOnHover={false} autoClose={3000} />
      </BreadcrumbProvider>
    </Router>
  );
};

export default App;
