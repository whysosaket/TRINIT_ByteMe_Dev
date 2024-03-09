import { FaArrowDown } from "react-icons/fa";

const LearnMore = () => {
  return (
    <button className="border border-teal-600 hover:bg-teal-600 hover:scale-105 hover:border-teal-800 px-4 py-2 rounded-3xl w-44 flex justify-center align-middle">
        <span className="my-auto">Learn More</span>
        <FaArrowDown className="text-md ml-2 my-auto" />
    </button>
  )
}

export default LearnMore