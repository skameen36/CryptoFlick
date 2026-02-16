import React from 'react';
import CustomSelect from './CustomSelect';

const SortBy = ({ Change, onSetChange }) => {
  const options = [
    { value: "market_cap_desc", label: "Market Cap (High ↓)" },
    { value: "market_cap_asc", label: "Market Cap (Low ↑)" },
    { value: "price_desc", label: "Price (High ↓)" },
    { value: "price_asc", label: "Price (Low ↑)" },
    { value: "change_desc", label: "24h Change (High ↓)" },
    { value: "change_asc", label: "24h Change (Low ↑)" },
  ];

  return (
    <CustomSelect
      value={Change}
      onChange={onSetChange}
      options={options}
      icon={
        <svg className="control-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      }
    />
  );
};

export default SortBy;