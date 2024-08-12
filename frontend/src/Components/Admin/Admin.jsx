import React from "react";
import './Admin.css'
import { useState } from "react";
import AddCard from "../AddCard/AddCard";
import RemoveCard from "../RemoveCard/RemoveCard";
import UpdateCard from "../UpdateCard/UpdateCard";

const Admin = () => {
    const [selected, setSelected] = useState("add")                 //Store the selected operation

    return (
        <div className="admin">
            <div className="sideBar">
                <h1>Operations</h1>
                <div className={`adminAdd ${selected === "add" ? "selected" : ""}`} onClick={()=>{setSelected("add")}}>Add New Card</div>
                <div className={`adminRemove ${selected === "remove" ? "selected" : ""}`} onClick={()=>{setSelected("remove")}}>Remove Card</div>
                <div className={`adminUpdate ${selected === "update" ? "selected" : ""}`} onClick={()=>{setSelected("update")}}>Update Card</div>
            </div>
            <div className="mainPage">
                {selected === "add" ? <AddCard/> : selected === "remove" ? <RemoveCard/> : <UpdateCard/>}
            </div>
        </div>
    )
}

export default Admin;