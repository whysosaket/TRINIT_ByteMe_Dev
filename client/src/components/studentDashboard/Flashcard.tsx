import React from "react";
import "../../styles/flashcard.scss";

interface FlashcardProps { 
    flashcard: any;
    }

const Flashcard: React.FC<FlashcardProps> = ({flashcard}) => {
  return (
    <div>
      <div className="flip">
        <div
          className="front"
          style={{
            backgroundImage:
              "url(https://images.pexels.com/photos/540518/pexels-photo-540518.jpeg?w=1260&h=750&dpr=2&auto=compress&cs=tinysrgb)",
          }}
        >
          <h1 className="text-shadow">{flashcard.question}</h1>
        </div>
        <div className="back">
          {/* <h2>{flashcard.question}</h2> */}
          <p>
            {flashcard.answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
