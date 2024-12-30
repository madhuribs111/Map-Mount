import React, { useRef, useState } from "react";
import { Room , Cancel} from "@mui/icons-material";
import "./register.css";
import axios from "axios";

const Register = ({setShowRegister}) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      username: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    try {
      await axios.post("https://map-mount.vercel.app/api/user/create", newUser);
      setSuccess(true);
      setError(false)
    } catch (err) {
      console.log(err, "err registering");
      setError(true);
    }
  };

  return (<>

    <div className="registerContainer">
      <div className="logo">
        <Room /> TripPin
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="username" ref={nameRef}></input>
        <input type="email" placeholder="email" ref={emailRef}></input>
        <input type="password" placeholder="password" ref={passwordRef}></input>
        <button className="registerBtn">Register</button>
        {success && (
          <span className="successLogin">Successfull. You can login now.</span>
        )}
        {error && <span className="failureLogin">Something went wrong.</span>}
        <Cancel className="registerCancel" onClick={()=>setShowRegister(false)}></Cancel>

      </form>
    </div> </>
  );
};

export default Register;
