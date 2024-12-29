import React, { useState } from "react";
import { useRef } from "react";
import { Room, Cancel } from "@mui/icons-material";
import axios from "axios";
import "./login.css"
const Login = ({ setShowLogin, setCurrentUser, myStorage }) => {
  const usernameRef = useRef();
  // const emailRef = useRef();
  const passwordRef = useRef();
 // const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const newUser = {
      username: usernameRef.current.value,
      password: passwordRef.current.value
    }
    try {

    const res= await axios.post("user/login", newUser);
     myStorage.setItem('user', res.data.username)
       
        setCurrentUser(res.data.username);
  setShowLogin(false)
      
    } catch (err) {
      console.log(err);
      setError(true);
      
    }
  };
  return (
    <>
      <div className="loginContainer">
        <div className="logo">
          <Room />
          Login
        </div>
        <form onSubmit={handleLogin}>
          <input 
            type="text"
            placeholder="username"
            ref={usernameRef}
          ></input>

          <input
            type="password"
            placeholder="password"
            ref={passwordRef}
          ></input>
            <button className="loginBtn">Login</button>

          {error && (
            <span className="failureLogin">Error loggin in. Check credentials</span>
          )}
        </form>
        <Cancel className="loginCancel" onClick={() => setShowLogin(false)}></Cancel>
      </div>
    </>
  );
};

export default Login;
