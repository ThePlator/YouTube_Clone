import React, { useState } from 'react';

const FilterBtn = () => {
  const [selectedFilter, setSelectedFilter] = useState(null);

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    // Here you can perform actions based on the selected filter
  };

  const filterOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5', , 'Option 6',]; // Your array of filter options

  return (
    <div className='m-3 '>
     <div className="overflow-x-auto">
        <div className="flex justify-evenly space-x-2">
          {filterOptions.map((option, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-md ${selectedFilter === option ? 'bg-white-500 text-black' : 'bg-gray-800 text-white hover:bg-slate-500'}`}
              onClick={() => handleFilterSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterBtn;
