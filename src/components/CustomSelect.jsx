import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const CustomSelect = ({ value, onChange, options, icon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { theme } = useTheme();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const selectedLabel = options.find((opt) => opt.value === value)?.label || value;

  return (
    <div className="custom-select-container" ref={dropdownRef}>
      <div 
        className={`control-group custom-select-trigger ${isOpen ? 'open' : ''}`} 
        onClick={() => setIsOpen(!isOpen)}
      >
        {icon && <span className="control-icon-wrapper">{icon}</span>}
        <span className="selected-value">{selectedLabel}</span>
        <span className={`custom-arrow ${isOpen ? 'rotated' : ''}`}></span>
      </div>

      {isOpen && (
        <div className="custom-dropdown-menu">
          {options.map((option) => (
            <div
              key={option.value}
              className={`custom-option ${option.value === value ? 'selected' : ''}`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
              {option.value === value && <span className="check-mark">✓</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
