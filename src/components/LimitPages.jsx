import React from 'react';
import CustomSelect from './CustomSelect';

const LimitPages = ({ pages, setPages }) => {
  const options = [
    { value: 10, label: '10 Rows' },
    { value: 15, label: '15 Rows' },
    { value: 20, label: '20 Rows' },
    { value: 50, label: '50 Rows' },
  ];

  return (
    <CustomSelect
      value={pages}
      onChange={(val) => setPages(Number(val))}
      options={options}
      icon={
        <svg className="control-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="8" y1="6" x2="21" y2="6"></line>
          <line x1="8" y1="12" x2="21" y2="12"></line>
          <line x1="8" y1="18" x2="21" y2="18"></line>
          <line x1="3" y1="6" x2="3.01" y2="6"></line>
          <line x1="3" y1="12" x2="3.01" y2="12"></line>
          <line x1="3" y1="18" x2="3.01" y2="18"></line>
        </svg>
      }
    />
  );
};

export default LimitPages;