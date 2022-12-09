import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from "axios";
import './Home.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';

const Home = (props) => {
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userNumber, setUserNumber] = useState("");
  const [userGender, setGender] = useState("");


  const handleFirstNameChange = e => {
    setUserFirstName(e.target.value)
  }
  const handleLastNameChange = e => {
    setUserLastName(e.target.value)
  }
  const handleEmailChange = e => {
    setUserEmail(e.target.value)
  }
  const handlePasswordChange = e => {
    setUserPassword(e.target.value)
  }
  const handleConfirmPasswordChange = e => {
    setConfirmPassword(e.target.value)
  }
  
  const handleGender = e => {
    setGender(e.target.value)
  }

 const clientId= "589725334974-l09ikq8bjcja3cvh52ieihh1b9ofr5ho.apps.googleusercontent.com";
  useEffect(() => {
    const initClient = () => {
          gapi.client.init({
          clientId: clientId,
          scope: ''
        });
     };
     gapi.load('client:auth2', initClient);
 });

  const register = () => {
    const user = {
      firstName: userFirstName,
      lastName: userLastName,
      email: userEmail,
      password: userPassword,
      confirmPassword: confirmPassword,
      number: userNumber,
      dob: startDate,
      gender: userGender
    }
    if (user) {
      if (userPassword === confirmPassword) {
        axios.post("http://localhost:5000/home", user)
        .then(res => alert(res.data.message))
      } else {
        alert("Password didn't matched ")
      }
    } else {
      alert("Invalid")
    }
  }


  const [startDate, setStartDate] = useState();
  const onSuccess = (res) => {
    console.log('success:', res);
};
const onFailure = (err) => {
    console.log('failed:', err);
};
  return (
    <div>
     
   
       <GoogleLogin
          clientId={clientId}
          buttonText="Sign in with Google"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={true}
      />
      <div class="divider d-flex align-items-center my-4">
        <p class="text-center fw-bold mx-3 mb-0 text-muted">Or</p>
      </div>
      <hr></hr>
      <form>
        <h2>Create an Account</h2>
        <div className='control-group'>
          <div className='group-control'>
            <div className='form-control'>
              <label htmlFor='name'>First Name</label><br></br>
              <input type='text' id='name' value={userFirstName} onChange={handleFirstNameChange} />
            </div>
            <div className='form-control'>
              <label htmlFor='name'>Last Name</label><br></br>
              <input type='text' id='name' value={userLastName} onChange={handleLastNameChange} />
            </div>
            <div className='form-control'>
              <label htmlFor='name'>E-Mail</label><br></br>
              <input type='text' id='name' value={userEmail} onChange={handleEmailChange} />
            </div>
            <div className='form-control'>
              <label htmlFor='name'>Password</label><br></br>
              <input type='text' id='name' value={userPassword} onChange={handlePasswordChange} />
            </div>
            <div className='form-control'>
              <label htmlFor='name'>Confirm Password</label><br></br>
              <input type='text' id='name' value={confirmPassword} onChange={handleConfirmPasswordChange} />
            </div>
            <div className='form-control'>
              <label htmlFor='name'>Mobile No.</label><br></br>
              <PhoneInput
                className='number'
                placeholder="Enter phone number"
                
               value={userNumber}
                onChange={setUserNumber} />
              </div>
            <div>
              <div className='form-control'>
                <label htmlFor='name'>D.O.B</label><br></br>
                <DatePicker name="startDate"
                  dateFormat="MM/dd/yyyy"
                  selected={startDate}
                  value={startDate}
                  onChange={(date) => setStartDate(date)} />
              </div>

              <div className='form-control'>
              <label htmlFor='name'>Gender</label><br></br>
              
                  <select onChange={handleGender}>
                    <option  value ='' >--Select Gender--</option>
                    <option  value ='Male'>Male</option>
                    <option  value ='Female'>Female</option>
                    <option  value ='Other'>Other</option>
                  </select>
               
              </div>
            </div>
            <div>
              <button onClick={register}>Create Account</button>
            </div>
          </div>
          <div className='route-link'>
            <p>Already have an account?</p>
            <Link class="nav-link" to="/login">Login</Link>
          </div>
        </div>
      </form>
    </div>
  );

};


export default Home;