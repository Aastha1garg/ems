import React from 'react';

const DepartmentSearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <div className="w-1/3">
      <input
        type="text"
        value={searchQuery}
        onChange={onSearchChange}  // Trigger parent's search change handler
        placeholder="Search Departments..."
        className="w-full px-4 py-2 border rounded"
      />
    </div>
  );
};

export default DepartmentSearchBar;
