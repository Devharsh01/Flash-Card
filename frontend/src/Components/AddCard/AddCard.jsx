import React, { useContext } from "react";
import './AddCard.css'
import { useState } from "react";
import { FlashCardContext } from "../../Context/flashCardContext";

const AddCard = () => {
    const {addCard} = useContext(FlashCardContext)
    const [newData, setNewData] = useState({
        question:"",
        answer: ""
    })

    const handleSubmitButton = () => {
        if(newData.question != "" && newData.answer != "") {
            addCard(newData.question, newData.answer);
        }
        else {
            alert("All values must be filled");
        }
    }

    const handleInputChange = (e) => {
        setNewData(prevData => ({...prevData, [e.target.name]: e.target.value}));
    }

    return (
        <div className="addCard">
            <h2>New Question</h2>
            <input type="text" name="question" value={newData.question} onChange={handleInputChange} placeholder="Enter New Question"/>
            <h2>Answer</h2>
            <input type="text" name="answer" value={newData.answer} onChange={handleInputChange} placeholder="Enter Answer for Question" />
            <button className="addCardButton" onClick={handleSubmitButton}>Add</button>
        </div>
    )
}

export default AddCard