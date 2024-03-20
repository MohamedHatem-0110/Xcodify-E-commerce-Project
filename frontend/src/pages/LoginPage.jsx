import React, { useEffect, useState } from "react";
import TextInput from "../components/TextInput";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [disableSubmitButtom, setDisableSubmitButtom] = useState(true);

  const [isEmptyArray, setIsEmptyArray] = useState([false, false]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    // allFieldsFilled is a boolean that tells whether the fields are filled or not
    const allFieldsFilled = Object.values(formData).every(
      (value) => value.trim() !== ""
    );
    setDisableSubmitButtom(!allFieldsFilled);
  }, [formData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // You can handle form submission logic here
    if (disableSubmitButtom) {
      // Check if the value of the fields is empty and update isEmptyArray accordingly
      const updatedIsEmptyArray = Object.values(formData).map(
        (value) => value === ""
      );
      setIsEmptyArray(updatedIsEmptyArray);
      console.log(updatedIsEmptyArray);
    } else {
      // BACKEND
      // create a function that takes the formData and give it to the backend (onSubmit(formData))
      console.log("Login");

      navigate("/");
    }
  };

  return (
    <div
      className="
    max-w-lg mx-auto p-6 bg-gray-100 rounded-md shadow-md shadow-gray-300"
    >
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <TextInput
          name="email"
          label="Email Address"
          value={formData.email}
          onChange={handleChange}
          isFieldEmpty={isEmptyArray[0]}
        />
        <TextInput
          name="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
          isFieldEmpty={isEmptyArray[1]}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;