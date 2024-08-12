import React, { useContext, useState } from "react";
import './UpdateCard.css'
import { FlashCardContext } from "../../Context/flashCardContext";

const UpdateCard = () => {
    const {allData, updateCard} = useContext(FlashCardContext)
    const [updateType, setUpdateType] = useState(''); // State to track if the user wants to update question or answer
    const [selectedOption, setSelectedOption] = useState(''); // State to track the selected question or answer
    const [newValue, setNewValue] = useState(''); // State to track the new value input

    // Handler for the radio buttons
    const handleUpdateTypeChange = (event) => {
        setUpdateType(event.target.value);
        setSelectedOption(''); // Reset selected option when update type changes
        setNewValue(''); // Reset new value input
    };

    // Handler for the options dropdown
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    // Handler for the input box
    const handleInputChange = (event) => {
        setNewValue(event.target.value);
    };

    return (
        <div>
            <h3>What would you like to update?</h3>
            <div className="updateOption">               {/*Asking what to delete */}
                <label>
                    <input
                        type="radio"
                        value="question"
                        checked={updateType === 'question'}
                        onChange={handleUpdateTypeChange}
                    />
                    Question
                </label>
                <label>
                    <input
                        type="radio"
                        value="answer"
                        checked={updateType === 'answer'}
                        onChange={handleUpdateTypeChange}
                    />
                    Answer
                </label>
            </div>
            {/*Choose the Question/Answer to update*/}
            {updateType && (
                <div className="updateValue">
                    <h4>Select the {updateType} to update:</h4>
                    <select  value={selectedOption} onChange={handleOptionChange}>
                        <option value="" disabled>Select a {updateType}</option>
                        {allData.map((option) => (
                            <option key={option.id} value={option[updateType]}>
                                {option[updateType]}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            {/*Enter the New Value*/}
            {selectedOption && (
                <div className="updateValue">
                    <h4>Enter the new {updateType}:</h4>
                    <input
                        type="text"
                        value={newValue}
                        onChange={handleInputChange}
                        placeholder={`Enter new ${updateType}`}
                    />
                </div>
            )}
            {/*Update the content*/}
            {selectedOption && newValue && (
                <div>
                    <button className="updateButton" onClick={() => {updateCard(updateType, selectedOption, newValue)}}>
                        Update {updateType}
                    </button>
                </div>
            )}
        </div>
    )
}

export default UpdateCard