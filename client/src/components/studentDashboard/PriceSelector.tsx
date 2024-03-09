import React, { useState, useContext } from 'react';
import SearchContext from '../../Context/SearchContext';


const PriceSelector = ({ }) => {
    const {price, setPrice} = useContext(SearchContext);

    const handleChange = (e: any) => {
        setPrice(e.target.value);
    }
  return (

   <>
   <div className="relative w-44 flex align-middle flex-col my-auto">
    <h2
    className='text-sm text-gray-500 dark:text-gray-400 text-center -bottom-6'
    >MAX: ${price}</h2>
  <label htmlFor="labels-range-input" className="sr-only">
    Labels range
  </label>
  <input
    id="labels-range-input"
    type="range"
    defaultValue={1000}
    min={0}
    max={1500}
    value={price}
    onChange={handleChange}
    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 my-auto"
  />
</div>

   </>
  );
};

export default PriceSelector;
