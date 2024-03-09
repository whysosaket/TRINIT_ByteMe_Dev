import Flashcard from './Flashcard'
import { useContext, useEffect, useState } from 'react';
import ClassroomContext from '../../Context/ClassroomContext';

const Flashcards = () => {

    const [flashcards, setFlashcards] = useState([])

    const { getFlashcards } = useContext(ClassroomContext);

    useEffect(() => {

        const fetchFlashcards = async () => {
            const flashcards = await getFlashcards();
            setFlashcards(flashcards);
        }
        fetchFlashcards();
    }, []);
  return (
    <div>
        <h1 className='text-end font-semibold mb-2'>Flashcards</h1>
        {
            flashcards.map((flashcard: any, index: number) => {
                return <Flashcard flashcard={flashcard} key={index} />
            })
        }
    </div>
  )
}

export default Flashcards