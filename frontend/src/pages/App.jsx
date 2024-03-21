import React from "react";
import Navbar from "../components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import RegisterPage from "./RegisterPage";
import Breadcrumb from "../components/Breadcrumb";
import LoginPage from "./LoginPage";
import axios from "axios";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.baseURL = "http://localhost:3000";
const App = () => {
  return (
    <Router>
      <Navbar />
      <Breadcrumb />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
      <ToastContainer theme="colored" pauseOnHover={false} autoClose={3000} />
    </Router>
  );
};

export default App;
