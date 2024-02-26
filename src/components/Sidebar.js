import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsSliders } from "react-icons/bs";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ onSearch }) {
  const { currentUser } = useAuth();
  const { auth } = useAuth();
  const { navigate } = useNavigate();
  const [isDropdownAllVisible, setIsDropdownAllVisible] = useState(false);
  const [isDropdownPriceVisible, setIsDropdownPriceVisible] = useState(false);
  const [isDropdownCategoryVisible, setIsDropdownCategoryVisible] =
    useState(false);

  const toggleAllDropdown = () => {
    setIsDropdownAllVisible(!isDropdownAllVisible);

    if (isDropdownPriceVisible) {
      setIsDropdownPriceVisible(!isDropdownPriceVisible);
    }
    if (isDropdownCategoryVisible) {
      setIsDropdownCategoryVisible(!isDropdownCategoryVisible);
    }
    if (isDropdownAllVisible) {
      onSearch("");
    }
  };
  const toggleDropdownPrice = () => {
    setIsDropdownPriceVisible(!isDropdownPriceVisible);

    if (isDropdownAllVisible) {
      setIsDropdownAllVisible(!isDropdownAllVisible);
    }
    if (isDropdownCategoryVisible) {
      setIsDropdownCategoryVisible(!isDropdownCategoryVisible);
    }
    if (isDropdownPriceVisible) {
      onSearch("");
    }
  };

  const toggleDropdownCategory = () => {
    setIsDropdownCategoryVisible(!isDropdownCategoryVisible);
    if (isDropdownAllVisible) {
      setIsDropdownAllVisible(!isDropdownAllVisible);
    }

    if (isDropdownPriceVisible) {
      setIsDropdownPriceVisible(!isDropdownPriceVisible);
    }

    if (isDropdownCategoryVisible) {
      onSearch("");
    }
  };

  const handleLetterClick = (letter) => {
    onSearch(letter);
  };

  const handlePriceClick = (price) => {
    onSearch(price);
  };
  const handleCategoryClick = (category) => {
    onSearch(category);
  };

  const alphabetLetters = Array.from({ length: 26 }, (_, index) =>
    String.fromCharCode("A".charCodeAt(0) + index)
  );

  const prices = ["Free", "Freemium", "Premium"];
  const categories = ["Tech", "Image", "Video", "SEO"];

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error.message);
    }
  };

  return (
    <>
      <div className="w-[16%] h-[100vh] bg-[#1D2630] fixed top-0 left-0 border-[#1b1b1b] border-r-[0.5px] pl-[3%]">
        <Link to="/">
          <div className="h-[30px] w-[80px] bg-[#fff] mt-[50px]   rounded-tl-[10px] rounded-br-[10px]"></div>
        </Link>
        <div>
          <BsSliders className="text-[#fff] text-[24px] mt-[12vh] " />
        </div>
        <div
          className="text-[#fff] text-[16px] mt-[50px] display flex space-x-2 cursor-pointer"
          onClick={toggleAllDropdown}
        >
          <h3 className="font-semibold">All</h3>
          <MdOutlineKeyboardArrowDown className="text-[24px]" />
        </div>
        {isDropdownAllVisible && (
          <div className="text-[#fff] text-[10px] mt-[10px] grid grid-cols-5">
            {alphabetLetters.map((letter) => (
              <div
                key={letter}
                className="cursor-pointer w-[25%] mb-2 "
                onClick={() => handleLetterClick(letter)}
              >
                {letter}
              </div>
            ))}
          </div>
        )}
        <div
          className="text-[#fff] text-[16px] mt-[20px]   display flex space-x-2 cursor-pointer"
          onClick={toggleDropdownPrice}
        >
          <h3 className="font-semibold">Price</h3>
          <MdOutlineKeyboardArrowDown className=" text-[24px]" />
        </div>
        {isDropdownPriceVisible && (
          <div className="text-[#fff] text-[12px] mt-[10px] flex flex-col">
            {prices.map((price, index) => (
              <div
                key={index}
                className="cursor-pointer w-[25%] mb-2 "
                onClick={() => handlePriceClick(price)}
              >
                {price}
              </div>
            ))}
          </div>
        )}
        <div
          className="text-[#fff] text-[16px] mt-[20px]   display flex space-x-2 cursor-pointer"
          onClick={toggleDropdownCategory}
        >
          <h3 className="font-semibold">Category</h3>
          <MdOutlineKeyboardArrowDown className=" text-[24px]" />
        </div>
        {isDropdownCategoryVisible && (
          <div className="text-[#fff] text-[12px] mt-[10px] flex flex-col">
            {categories.map((category, index) => (
              <div
                key={index}
                className="cursor-pointer w-[25%] mb-2 "
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </div>
            ))}
          </div>
        )}

        {currentUser ? (
          <div className="flex space-x-2 fixed bottom-[50px]">
            <button
              onClick={handleLogout}
              className="flex justify-center items-center h-[30px] w-[65px] bg-white mt-[20px]   rounded-tl-[10px] font-bold text-[14px]"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex space-x-2 fixed bottom-[50px]">
            <Link to="/signin">
              <div className="flex justify-center items-center h-[30px] w-[65px] bg-white mt-[20px]   rounded-tl-[10px] font-bold text-[14px]">
                Login
              </div>
            </Link>
            <Link to="/signup">
              <div className="flex justify-center items-center h-[30px] w-[65px] bg-white mt-[20px]   rounded-br-[10px] font-bold text-[14px] ">
                Signup
              </div>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
