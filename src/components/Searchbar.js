import React, { useState } from "react";

import { BsSearch } from "react-icons/bs";

export default function Searchbar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    onSearch(newQuery);
  };

  return (
    <div>
      <div className="w-[40vw] h-[30px] bg-[#fff] flex items-center justify-between px-[30px] rounded-[20px] mt-[50px]">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={handleInputChange}
          className="w-[90%] px-[10px] outline-none"
        />
        <BsSearch className="stroke-0.4" />
      </div>
    </div>
  );
}
