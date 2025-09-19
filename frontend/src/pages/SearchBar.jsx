// src/components/SearchBar.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/searched/${keyword}`);
      setKeyword(""); // optional: clear input after search
    }
  };

  return (
    <form onSubmit={handleSearch} style={{ display: "flex", gap: "5px" }}>
      <input
        type="text"
        placeholder="Search products here..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
    </form>
  );
};

export default SearchBar;
