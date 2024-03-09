import { CiGift } from "react-icons/ci";
import { Link } from "react-router-dom";

const Claim = () => {
  return (
    <button className="border border-teal-600 bg-teal-600 hover:bg-teal-800 hover:bg-transparent hover:scale-105 px-4 py-2 rounded-3xl w-48 flex justify-center align-middle mx-3">
        <Link to="/signup" className="my-auto">Claim Discount</Link>
        <CiGift className="text-lg ml-2 my-auto" />
    </button>
  )
}

export default Claim