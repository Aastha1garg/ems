import React from 'react';

const EmployeeSearchBar = ({ searchTerm, onSearchChange }) => (
  <input
    type="text"
    placeholder="Search By Employee ID"
    value={searchTerm}
    onChange={onSearchChange}
    className="border rounded px-4 py-2 w-72"
  />
);

export default EmployeeSearchBar;
