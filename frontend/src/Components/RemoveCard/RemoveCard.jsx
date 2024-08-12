import React, { useContext } from "react";
import './RemoveCard.css'
import { useState } from "react";
import { FlashCardContext } from "../../Context/flashCardContext";

const RemoveCard = () => {
    const {allData, removeCard} = useContext(FlashCardContext)
    const [selectedOption, setSelectedOption] = useState('');

    const handleChange = (e) => {
        setSelectedOption(e.target.value)
    }

    const handleDelete = () => {
        removeCard(selectedOption);
    }

    return (
        <div className="removeCard">
            <h1>Choose The Question To Delete</h1>
            <div className="selectRemove">
                <select id="options" value={selectedOption} onChange={handleChange}>
                    <option value="" disabled>Select the Question</option>
                    {allData.map((option, index) => (
                        <option key={index} value={option.question}>
                            {option.question}
                        </option>
                    ))}
                </select>
            </div>
            <button onClick={handleDelete} className="removeButton">Delete</button>
        </div>
    )
}

export default RemoveCard