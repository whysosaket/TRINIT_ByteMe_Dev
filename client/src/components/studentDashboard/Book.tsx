import { useState, useContext, useEffect } from "react";
import SearchContext from "../../Context/SearchContext";

const Book = () => {
  const [selected, setSelected] = useState(-1);
  const {
    selectedDate,
    setSelectedDate,
    selectedClass,
    createSchedule,
    toastMessage,
  } = useContext(SearchContext);
  const [displayDate, setDisplayDate] = useState("");

  const handleSelect = (index: number) => {
    setSelected(index);
  };

  useEffect(() => {
    // if no date is selected, select the current date
    if (selectedDate === undefined) {
      setSelectedDate(new Date());
      setDisplayDate(new Date().toDateString());
    } else {
      setDisplayDate(selectedDate.toDateString());
    }

    console.log(selectedClass);
  }, [selectedDate]);

  const handleCreateSchedule = async () => {
    if (selected !== -1) {
      await createSchedule(
        selectedClass._id,
        selectedDate,
        selectedClass.duration[selected],
        selectedClass.price[selected]
      );
    } else {
      toastMessage("Please select a price and duration", "warning");
    }
  };

  return (
    <div className="w-full px-8 py-20 flex justify-center">
      <div className="border border-teal-500 w-5/6 px-8 py-4 rounded-2xl">
        <div>
          <h1 className="text-2xl font-semibold">
            Book a<span className="text-teal-500"> Class</span>
          </h1>
          <h1>{selectedClass.title}</h1>
          <h2>{selectedClass.description}</h2>
          <h1>{selectedClass.language}</h1>
          <h1 className="text-sm font-semibold mt-4">
            Selected Date:
            <span className="font-light ml-2 italic">{displayDate}</span>
          </h1>
          <h1 className="text-sm font-semibold mt-0">Choose Price and Model</h1>
          <div className="flex text-xs font-semibold">
            {selectedClass.price.map((price: number, index: number) => {
              return (
                <div
                  key={index}
                  onClick={() => handleSelect(index)}
                  className={`w-1/3 border border-teal-700 px-2 py-4 mx-4 my-4 rounded-lg ${
                    selected == index && "bg-teal-200/30"
                  } hover:bg-teal-200/10 cursor-pointer`}
                >
                  <h1 className="">DURATION:</h1>
                  <h1>{selectedClass.duration[index]}</h1>
                  <h1 className="mt-5">PRICE:</h1>
                  <h1>${price}</h1>
                </div>
              );
            })}
          </div>
          {selected !== -1 && (
            <h1 className="flex text-xs font-semibold">
              SELECTED:
              <span className="font-light ml-2 italic">
                ${selectedClass.price[selected]}/
                {selectedClass.duration[selected] + " "}Minutes
              </span>
            </h1>
          )}
          <button onClick={handleCreateSchedule} className="w-full bg-teal-500 text-white rounded-lg py-2 mt-4 hover:bg-teal-600 focus:outline-none focus:ring-4 focus:ring-teal-300 focus:ring-opacity-50">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Book;
