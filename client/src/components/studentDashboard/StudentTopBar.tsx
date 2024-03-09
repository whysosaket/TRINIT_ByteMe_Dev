import { useState } from "react";
import { IoChevronDownSharp } from "react-icons/io5";
import DurationDropdown from "./DurationDropdown";
import PriceSelector from "./PriceSelector";

const StudentTopBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
        <div className="flex ">
            <PriceSelector />
            <DurationDropdown />
        </div>
    </>
  );
};

export default StudentTopBar;
