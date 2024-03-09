import { useState, useRef, useContext } from "react";
import {motion} from "framer-motion";
import ClassroomContext from "../../Context/ClassroomContext";

const AddFlashcard = () => {

    const [isFormOpen, setIsFormOpen] = useState(false);
    const toggleHandler = () => {
        setIsFormOpen(!isFormOpen);
    }

    const {addFlashcard} = useContext(ClassroomContext);

    const questionRef = useRef<HTMLInputElement>(null);
    const answerRef = useRef<HTMLInputElement>(null);

    const handleAddFlashcard = async () => {
        const question = questionRef.current?.value;
        const answer = answerRef.current?.value;
        if(question && answer) {
            await addFlashcard(question, answer);
            setIsFormOpen(false);
        }
    }


  return (
    <>
    <div
    onClick={toggleHandler}
      style={{ zIndex: 1000 }}
      className="absolute bottom-10 right-12 select-none px-4 bg-gray-500/30 hover:bg-slate-700/50 text-white p-2 rounded-md cursor-pointer hover:bg-blue-600 transition-all duration-300 ease-in-out w-32 text-center mt-4 mx-auto"
    >
      Add Flashcard
    </div>
    {
        isFormOpen && <>
            <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-black/80 h-[12rem] w-[20rem] absolute bottom-32 right-12 p-4 rounded-2xl">
                <input ref={questionRef} type="text" placeholder="Enter Question" className="w-full bg-black/20 p-2 rounded-lg text-white focus:outline-none" />
                <input ref={answerRef} type="text" placeholder="Enter Answer" className="w-full bg-black/20 p-2 rounded-lg text-white mt-4 focus:outline-none" />
                <div className="flex justify-end">
                <button onClick={handleAddFlashcard} className="bg-teal-500 text-white px-4 py-1 rounded-lg hover:bg-teal-600 mt-4">
                    Add Flashcard
                </button>
            </div>
            </motion.div>
         </>
    }
    </>
  );
};

export default AddFlashcard;
