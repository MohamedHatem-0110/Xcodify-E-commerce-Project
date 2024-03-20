import React, { useEffect, useState } from "react";
import TextInput from "../components/TextInput";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [disableSubmitButtom, setDisableSubmitButtom] = useState(true);

  const [isEmptyArray, setIsEmptyArray] = useState([
    false,
    false,
    false,
    false,
  ]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

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
      // Check if the value is empty and update isEmptyArray accordingly
      const updatedIsEmptyArray = formData.map((value) => value === "");
      setIsEmptyArray(updatedIsEmptyArray);
      console.log(updatedIsEmptyArray);
    } else {
      // BACKEND
      navigate("/");
    }
  };

  useEffect(() => {
    const allFieldsFilled = Object.values(formData).every(
      (value) => value.trim() !== ""
    );
    setDisableSubmitButtom(!allFieldsFilled);
  }, [formData]);

  return (
    <div
      className="
    max-w-lg mx-auto mt-8 p-6 bg-gray-100 rounded-md shadow-md shadow-gray-300"
    >
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit}>
        <TextInput
          name="firstName"
          label="First Name"
          value={formData.firstName}
          onChange={handleChange}
        />
        <TextInput
          name="lastName"
          label="Last Name"
          value={formData.lastName}
          onChange={handleChange}
        />
        <TextInput
          name="email"
          label="Email Address"
          value={formData.email}
          onChange={handleChange}
        />
        <TextInput
          name="password"
          label="Password"
          value={formData.password}
          onChange={handleChange}
          isFieldEmpty={formData.password === ""}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
