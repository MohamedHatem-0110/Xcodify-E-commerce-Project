import React from "react";
import Navbar from "../components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import RegisterPage from "./RegisterPage";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<RegisterPage />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
