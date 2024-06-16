
import React from 'react'
import { useState } from 'react'; // Import useState hook for managing state
import '../../login.css';
import axios from 'axios';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function Login() {
  // State variables for form fields
  axios.defaults.withCredentials = true;
	const [idcard,setIdcard]=useState()
	const [password,setPassword]=useState()
	const  navigate =useNavigate();

	const handleSubmit = async(event) => {

		event.preventDefault();
		console.log(idcard)
		console.log(password)

  if (idcard.length !== 12 && idcard.length !== 16) {
    alert("Adhar Card Number Should be 12 or 16 Digits");
    return;
    }

		if(!idcard || !password){
			alert("Please fill all filds");
			return 
		}
		axios.post(`${window.location.origin}/user/login`,{idcard,password}).
		then((result)=>{
			console.log(result)
          if(result.data.Succes ==="User login Succesfully !"){
            navigate('/userdashBoard');
			alert("You login Succesfully");
		  }
		  else if(result.data.message==="User login Unsuccesfully deo to status!"){
			alert("Sorry your status not accepted pls wait !");
		  }
		  else{
			alert("Sorry your Username and Password wrong");
		  }
		})
		.catch((error)=>{
			console.log(error);
            alert("Sorry you not able to login due to backend error");
		})
	  };


  return (
   <div className="loginbody loginmargin"style={{display:"flex" ,justifyContent:"center",backgroundColor:"lightcoral" }} >
     <div className="logincontainer"style={{margin:"30px"}} >
      <div className="title">User Login</div>
      <div className="content">
        <form onSubmit={handleSubmit}>
          <div className="user-details">
            <div className="input-box">
              <span className="details">Adhar IdCard Number</span>
              <input
                type="text"
                placeholder="Enter your Idcard number"
                value={idcard}
                onChange={(e) => setIdcard(e.target.value)}
                required
              />
            </div>
           
            <div className="input-box">
              <span className="details">Password</span>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="button" style={{height:"100%" ,backgroundColor:"blue" }} >
            <Button type="submit" style={{width:"100%"}} onClick={handleSubmit} >  Login </Button>
          </div>
        </form>
      </div>
    </div>
   </div>
  );
}

export default Login;
