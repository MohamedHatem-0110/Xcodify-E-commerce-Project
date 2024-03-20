import React from "react";
import Navbar from "../components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import RegisterPage from "./RegisterPage";
import Breadcrumb from "../components/Breadcrumb";
import LoginPage from "./LoginPage";

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
    </Router>
  );
};

export default App;
