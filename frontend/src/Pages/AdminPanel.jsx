import React from "react";
import './CSS/AdminPanel.css'
import { useState } from "react";
import Admin from "../Components/Admin/Admin";

const AdminPanel = () => {
    const [loginCredentials, setLoginCredentials] = useState({          //To Login the user
        username: "",   
        password: ""
    })
    const [isLoggedIn, setIsLoggedIn] = useState(false)                 //Check if user is logged in or no

    const handleChange = (e) => {
        setLoginCredentials(prevData => ({...prevData, [e.target.name]: e.target.value}))
    }

    const checkLogIn = () => {
        if(loginCredentials.username === import.meta.env.VITE_USERNAME && loginCredentials.password === import.meta.env.VITE_PASSWORD)
            setIsLoggedIn(true);
        else {
            alert("Incorrect Username or password")
        }
    }

    return (
        <div className="adminPanel">
            {isLoggedIn ? <Admin/> :
            <div className="adminPage">  
                <div className="adminLogin">              {/*Log In Box */}
                    <div className="loginName">
                        <h3>Login: </h3>
                        <input type="text" name="username" value={loginCredentials.username} onChange={handleChange}/>
                    </div>
                    <p>Hint: Username is TakeUForward</p>
                    <div className="loginPassword">
                        <h3>Password: </h3>
                        <input type="password" name="password" value={loginCredentials.password} onChange={handleChange}/>
                    </div>
                    <p>Hint: Password is testing1234</p>
                    <button className="loginButton" onClick={()=> {checkLogIn()}}>Submit</button>
                </div>
            </div>}
        </div>
    )
}

export default AdminPanel