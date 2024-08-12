import React, { createContext, useEffect, useState } from "react";
export const FlashCardContext = createContext();

const FlashCardContextProvider = (props) => {
    const [allData, setAllData] = useState([]);
    //http://localhost:3000
    let url = `https://flash-card-backend-o1qz.onrender.com`

    useEffect(()=>{
        console.log("AllData", allData)
        if(allData.length == 0) {               //If Backend is not working
            setAllData([{ question: "What is HTML?", answer: "HTML stands for HyperText Markup Language and is used to create the structure of web pages." },
                { question: "What does CSS stand for?", answer: "CSS stands for Cascading Style Sheets and is used to style HTML elements on a web page." },
                { question: "What is JavaScript?", answer: "JavaScript is a programming language used to add interactivity and dynamic content to web pages." },
                { question: "What is React?", answer: "React is a JavaScript library for building user interfaces, particularly for single-page applications." },
                { question: "What is a component in React?", answer: "A component in React is a reusable piece of UI that can be rendered and managed independently." },
                { question: "What is the purpose of a state in React?", answer: "State in React is used to manage and track data that can change over time within a component." },
                { question: "What is the difference between class and functional components in React?", answer: "Class components are ES6 classes and can hold state, while functional components are simpler functions and can use hooks to manage state." },
                { question: "What is a RESTful API?", answer: "A RESTful API is an API that adheres to the principles of Representational State Transfer (REST) and is used for communication between client and server over HTTP." },
                { question: "What is the box model in CSS?", answer: "The box model in CSS consists of margins, borders, padding, and the content area, and it describes how elements are sized and spaced on a web page." },
                { question: "What is responsive web design?", answer: "Responsive web design is an approach that makes web pages render well on various devices and window sizes by using fluid grids, flexible images, and media queries." }
            ])
        }
    })
  
    useEffect(()=>{
        fetch(`${url}/alldata`)
        .then((response) => {
            if (!response.ok) {
                setAllData([]);
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            setAllData(data); // Update the state with the fetched data
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
    })

    const addCard = (question, answer) => {
        const isQuestionPresent = allData.some(card => card.question === question);
        if(isQuestionPresent) {
            alert("Question Already Present")
        }
        else {
            setAllData([...allData, { question: question, answer: answer }]);
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
            })
            .catch((error) => {
                console.error("Card NOT ADDED");
            })
            alert("Card Added Successfully");
        }
    }

    const removeCard = (question) => {
        const updatedFlashCards = allData.filter((option, i) => option.question !== question);
        setAllData(updatedFlashCards);
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
        })
        .catch((error) => {
            console.error("Card NOT REMOVED");
        })
        alert("Card Removed Successfully");

    }

    const updateCard = (updateType, currentValue, newValue) => {
        const updatedFlashCards = allData.map((card, index) => {
            if (card[updateType] === currentValue) {
                return {
                    ...card,
                    [updateType]: newValue,
                };
            }
            return card;
        });
        setAllData(updatedFlashCards);
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
        })
        .catch((error) => {
            console.error("Card NOT Updated");
        })
        alert("Card Value Updated Successfully");
    }

    const contextValue = {allData, addCard, removeCard, updateCard}
    return (
        <FlashCardContext.Provider value={contextValue}>
            {props.children}
        </FlashCardContext.Provider>
    )
}

export default FlashCardContextProvider
