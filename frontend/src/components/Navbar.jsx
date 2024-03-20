import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <nav className="bg-gray-800 py-2 px-10">
        <div className="container mx-auto flex justify-between items-center gap-20">
          {/* Logo */}
          <div className="text-white text-xl font-bold">YourLogo</div>

          {/* Search bar */}
          <div className="flex items-center w-full">
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-700 text-white px-4 py-2 rounded-l-lg focus:outline-none w-full"
            />
            <button className="bg-gray-700 text-white px-4 py-2 rounded-r-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          </div>

          {/* User and Cart icons */}
          <div className="flex items-center space-x-4 text-white">
            <div className="relative flex items-center">
              <button
                className="text-white focus:outline-none"
                onClick={handleMenuToggle}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </button>
              {/* User menu */}
              {isMenuOpen && (
                <div className="absolute top-10 -left-10 bg-gray-800 text-white rounded-md shadow-lg flex-col">
                  <button className="block w-full py-2 px-4 text-center hover:bg-gray-700 rounded-md">
                    Login
                  </button>
                  <button
                    className="block w-full py-2 px-4 text-center hover:bg-gray-700 rounded-md"
                    onClick={() => navigate("/register")}
                  >
                    Register
                  </button>
                </div>
              )}
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
