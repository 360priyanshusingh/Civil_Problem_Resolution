import { Button } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function ChangePassword() {
    axios.defaults.withCredentials = true;
	const [username,setUsername]=useState()
	const [currentPassword,setPassword]=useState()
	const [confirmPassword,setConfirmPassword]=useState()
	const [newPassword,setNewPassword]=useState()
	const  navigate =useNavigate();


    const handleSubmit = async(event) => {

		event.preventDefault();
		if(confirmPassword!=newPassword){
			alert("ConfirmPassword does not match");
			return 
		}
		axios.put(`${window.location.origin}/admin/changePassword`,{currentPassword,newPassword}).
		then((result)=>{
			console.log(result)
          if(result.data.message==='Password changed successfully'){
			navigate('/');
			alert("Password Succesfully Changed");
		  }
		  else{
			alert("Password Succesfully not Changed");
		  }
		})
		.catch((error)=>{
			console.log(error);
            alert("Sorry you not able to not Changed due to backend error");
		})
	  };

  return (
    <div className="loginbody loginmargin"style={{display:"flex" ,justifyContent:"center",backgroundColor:"lightcoral" ,minHeight:"90vh" }} >
     <div className="logincontainer"style={{margin:"30px"}} >
      <div className="title">Change Admin Password</div>
      <div className="content">
        <form >
          <div className="user-details">
            <div className="input-box"  style={{width:"100%"}} >
              <span className="details" ><h4>Current Password</h4></span>
                <input  style={{width:"100%",height:"5vh"}} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="input-box"  style={{width:"100%"}} >
              <span className="details" ><h4>New Password</h4></span>
                <input  style={{width:"100%",height:"5vh"}} onChange={(e) => setNewPassword(e.target.value)} />
            </div>
            <div className="input-box"  style={{width:"100%"}} >
              <span className="details" ><h4>Confirm Password</h4></span>
                <input type='password' style={{width:"100%",height:"5vh"}} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
           
           
            {/* <div className="input-box">
              <span className="details">Password</span>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div> */}
          </div>
          <div className="button" style={{height:"6vh" ,backgroundColor:"blue" }} >
            <Button type="submit" style={{ height:"6vh" , width:"100%"}} onClick={handleSubmit} > Submit </Button>
          </div>
        </form>
      </div>
    </div>
   </div>
  )
}

export default ChangePassword