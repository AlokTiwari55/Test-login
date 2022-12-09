import React, { useState } from 'react';
import axios from "axios";
import './Login.css';
import { Link } from "react-router-dom";

const Login = () =>{

    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [emailIsValid, setEmailIsValid]= useState(false);
    const [passwordIsValid, setPasswordIsValid]= useState(false);
    const [touched, setTouched]= useState(false);


    const handleEmailChange = e => {
        setUserEmail(e.target.value)
        }
    const handlePasswordChange = e => {
        setUserPassword(e.target.value)
        }

    const login = (e)=>{
        e.preventDefault();
        setTouched(true);
        if(userEmail.trim()===''){
            setEmailIsValid(false);
            return;
        }
        setEmailIsValid(true);
        if(userPassword.trim()===''){
            setPasswordIsValid(false);
            return;
        }
        setPasswordIsValid(true);
        
        const user = {
            email: userEmail,
            password: userPassword
        }
        axios.post("http://localhost:5000/login", user)
        .then(res => alert(res.data.message))
        
    }
    const inputEmailIsInvalid = !emailIsValid && touched;
    const inputPasswordIsInvalid = !passwordIsValid && touched;


    return(
        <div className='login'>
        <form>
        <div className='control-group'>
          <div className='form-control'>
          <label htmlFor='name'>E-Mail</label>
          <input type='text' id='name' value={userEmail} onChange={handleEmailChange} />
         { inputEmailIsInvalid && <p className='error-text'>Email must not be empty</p>}
          </div><br></br>
          <div className='form-control'>
          <label htmlFor='name'>Password</label>
          <input type='text' id='name' value={userPassword} onChange={handlePasswordChange} />
          { inputPasswordIsInvalid && <p className='error-text'>Password must not be empty</p>}
         
          </div>
          
        </div>
        <div>
            <button onClick={login}>Login</button>
          </div>
          <div className='route-link'>
            <p>New User?</p>
            <Link class="nav-link" to="/">Register</Link>
          </div>
        </form>
        </div>
        
    );

}

export default Login;