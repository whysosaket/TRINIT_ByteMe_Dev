import DurationDropdown from "./DurationDropdown";
import PriceSelector from "./PriceSelector";

const StudentTopBar = () => {
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
