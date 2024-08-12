import React from "react";
import './CSS/Home.css'
import FlashCard from "../Components/FlashCard/FlashCard";

const Home = () => {
    return (
        <div className="home">
            <div className="homeContainer">
                <div className="homeFlashCard">
                    <FlashCard/>
                </div>
                <p>Click to reveal</p>
            </div>
        </div>
    )
}

export default Home