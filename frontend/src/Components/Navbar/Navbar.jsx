import React from "react";
import './Navbar.css'
import { useState } from "react";
import {Link} from "react-router-dom";

//Navigation Bar
const Navbar = () => {
    const [selected, setSelected] = useState("user");           //Display underline

    return (
        <div className="navbar">
            <div className="navHeading">
                <div><Link className="navUser" onClick={() => {setSelected("user")}} to='/' style={{textDecoration: 'none', color: "#fff"}}>
                    <p>User</p>
                    {selected === "user" ? <hr/> : <></>}
                    </Link></div>
                <div><Link className="navAdmin" onClick={() => {setSelected("admin")}} to='/admin' style={{textDecoration: 'none', color: "#fff"}}>
                    <p>Admin</p>
                    {selected === "admin" ? <hr/> : <></>}
                </Link></div>
            </div>
        </div>
    )
}

export default Navbar;