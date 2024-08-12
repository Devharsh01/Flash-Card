import React from "react";
import './FlashCard.css'
import { useState } from "react";
import { useContext } from "react";
import { FlashCardContext } from "../../Context/flashCardContext";
import arrow from '../../assets/arrow.png'
import { useEffect } from "react";

const FlashCard = () => {
    const {allData} = useContext(FlashCardContext);                 //Fetching data 
    const [showingQuestion, setShowingQuestion] = useState(true)    //Check if question is shown or answer
    const [index, setIndex] = useState(0);                          //Stores index of question answer pair shown

    const handlePrevious = () => {                                  //Show previous Question
        setShowingQuestion(true);                  //Reset to show question when moving to other card
        setIndex((index - 1 + allData.length) % allData.length);
    }

    const handleNext = () => {                                     //Show Next Question
        setShowingQuestion(true);                  //Reset to show question when moving to other card
        setIndex((index + 1) % allData.length);
    }

    const colors = ["#48BB78", "#4299E1", "#F56565", "#ECC94B", "#9F7AEA", "#ED8936", "#ED64A6", "#19beb3"]

    const cardStyle = {
        background: showingQuestion
            ? `linear-gradient(${colors[index%colors.length]} 5%, black 90%)`
            : `linear-gradient(rgb(220, 220, 220) 20%, ${colors[index%colors.length]} 70%)`,
        color: showingQuestion
            ? "#fff"
            : "#000"
    }

    return (
        <div className="card">
            <button className="cardButton">
                <img src={arrow} alt="" onClick={()=> {handlePrevious()}}/>
                <p>Previous</p>
            </button>
            {allData.length > 0 ? <div className={`flip-card`} onClick={()=>{setShowingQuestion(!showingQuestion)}}>
                <div class={`flip-card-inner ${showingQuestion?"":"flipped"}`}>
                    <div class="flip-card-front" style={cardStyle}>
                        <p class="title">Question</p>
                        <p>{allData[index].question}</p>
                    </div>
                    <div class="flip-card-back" style={cardStyle}>
                        <p class="title">Answer</p>
                        <p>{allData[index].answer}</p>
                    </div>
                </div>
            </div> : <></>}
            <button className="cardButton">
                <img src={arrow} alt=""  id="next" onClick={handleNext}/>
                <p>Next</p>
            </button>
        </div>
    )
}

export default FlashCard;