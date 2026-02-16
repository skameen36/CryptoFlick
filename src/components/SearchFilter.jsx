import React, { useState, useEffect } from 'react'
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const SearchFilter = ({ text, setText }) => {
  const [searchTerm, setSearchTerm] = useState(text);

  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setText(searchTerm);
    }, 300); // 300ms debounce

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, setText]);

  // Sync local state if parent prop changes (e.g. from local storage reload or reset)
  useEffect(() => {
      setSearchTerm(text);
  }, [text]);

  return (
    <>
    <div className="control-group search-group">
      <svg className="control-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <input
        type="text"
        name='search'
        id='search'
        value={searchTerm}
        placeholder='Search...'
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
        className="control-input"
      />
    </div>
    </>
  );
}

export default SearchFilter