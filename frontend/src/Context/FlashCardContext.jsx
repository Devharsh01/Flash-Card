import React, { createContext, useEffect, useState } from "react";
export const FlashCardContext = createContext();

const FlashCardContextProvider = (props) => {
    const [allData, setAllData] = useState([]);
    //http://localhost:3000
    let url = `https://flash-card-backend-o1qz.onrender.com`

    useEffect(()=>{
        fetch(`${url}/alldata`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            setAllData(data); // Update the state with the fetched data
        })
        .catch((error) => {
            alert('Error fetching data:', error);
        });
    })

    const addCard = (question, answer) => {
        fetch(`${url}/addCard`,{
            method:"POST",
            headers:{
                Accept:"application/json",
                'Content-Type':'application/json',
            },
            body:JSON.stringify({"question":question, "answer":answer})
        })
        .then((response)=>{
            if(!response.ok) {
                throw new Error("Server is not working currently");
            }
            alert("Card Added Successfully");
        })
        .catch((error) => {
            alert("Card NOT ADDED");
        })
    }

    const removeCard = (question) => {
        fetch(`${url}/removeCard`,{
            method:"DELETE",
            headers:{
                Accept:"application/json",
                'Content-Type':'application/json',
            },
            body:JSON.stringify({"question":question})
        })
        .then((response)=>{
            if(!response.ok) {
                throw new Error("Server is not working currently");
            }
            alert("Card Removed Successfully");
        })
        .catch((error) => {
            alert("Card NOT REMOVED");
        })
    }

    const updateCard = (updateType, currentValue, newValue) => {
        fetch(`${url}/updateCard`,{
            method:"PUT",
            headers:{
                Accept:"application/json",
                'Content-Type':'application/json',
            },
            body:JSON.stringify({"updateType":updateType, "currentValue": currentValue, "newValue": newValue})
        })
        .then((response)=>{
            if(!response.ok) {
                throw new Error("Server is not working currently");
            }
            alert("Card Value Updated Successfully");
        })
        .catch((error) => {
            alert("Card NOT Updated");
        })
    }

    const contextValue = {allData, addCard, removeCard, updateCard}
    return (
        <FlashCardContext.Provider value={contextValue}>
            {props.children}
        </FlashCardContext.Provider>
    )
}

export default FlashCardContextProvider