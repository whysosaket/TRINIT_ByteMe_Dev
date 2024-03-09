
import React, { useState, useContext } from 'react'
import { IoChevronDownSharp } from 'react-icons/io5';
import SearchContext from '../../Context/SearchContext';

const DurationDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const [selectedDuration, setSelectedDuration] = useState("Duration");

    const {setDuration} = useContext(SearchContext);
  
    const handleDuration = (duration: string) => {
      setSelectedDuration(duration);
      setIsOpen(false);
      if(duration === "45 Minutes"){
        setDuration(45);
      }else if(duration === "60 Minutes"){
        setDuration(60);
      }else if(duration === "90 Minutes"){
        setDuration(90);
      }else{
        setDuration(0);
      }
    }
  return (
    <>
           <button
          id="dropdownHoverButton"
          data-dropdown-toggle="dropdownHover"
          data-dropdown-trigger="hover"
          className="text-white mt-2 mx-4 bg-teal-300/60 hover:bg-teal-500/20 focus:ring-4 focus:outline-none focus:ring-transparent font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center "
          type="button"
          onClick={toggle}
        >
          {selectedDuration} <IoChevronDownSharp className="ml-1" />
        </button>
        {/* Dropdown menu */}
        <div
          id="dropdownHover"
          className={`z-50 mt-4 ${
            !isOpen && "hidden"
          } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700/70 absolute right-24 top-40  `}
        >
          <ul
            className="py-2 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownHoverButton"
          >
            <li>
              <p
              onClick={() => handleDuration("45 Minutes")}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer">
                45 Minutes
              </p>
            </li>
            <li>
              <p
              onClick={() => handleDuration("60 Minutes")}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer">
                60 Minutes
              </p>
            </li>
            <li>
              <p
              onClick={() => handleDuration("90 Minutes")}
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer">
                90 Minutes
              </p>
            </li>
          </ul>
        </div>
    </>
  )
}

export default DurationDropdown