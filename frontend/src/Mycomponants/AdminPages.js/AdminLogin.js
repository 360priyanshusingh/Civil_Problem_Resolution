
import React from 'react'
import { useState } from 'react'; // Import useState hook for managing state
import '../../login.css';
import { Button } from '@chakra-ui/react';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
axios.defaults.withCredentials = true;

function AdminLogin() {
  // State variables for form fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate()


  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!password || !username){
        alert("Please Fill all filds!")
        return
    }
    
    axios.post(`${window.location.origin}/admin/login`,{username,password})
    .then((result)=>{
        if(result.data.Succes=== "Admin login Succesfully !"){
            alert( "Admin login Succesfully !")
            navigate("/dashBoard")
        }
        else{
            alert("Sorry Your Password And Username is Wrong!")
        }

    })
    .catch((error)=>{
        console.log(error)
        alert( "Admin Not Login Succesfully deo to backend Error !")
    })
   
  };

  return (
   <div className="loginbody loginmargin"style={{display:"flex" ,justifyContent:"center",backgroundColor:"lightcoral" }} >
     <div className="logincontainer"style={{margin:"30px"}} >
      <div className="title">Admin Login</div>
      <div className="content">
        <form onSubmit={handleSubmit}>
          <div className="user-details">
           
            <div className="input-box">
              <span className="details">Username</span>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
          {/* <div className="gender-details">
            <span className="gender-title">Gender</span>
            <div className="category">
              <label htmlFor="male">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  checked={gender === 'male'}
                  onChange={() => setGender('male')}
                />
                <span className="gender">Male</span>
              </label>
              <label htmlFor="female">
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  checked={gender === 'female'}
                  onChange={() => setGender('female')}
                />
                <span className="gender">Female</span>
              </label>
              <label htmlFor="prefer-not-to-say">
                <input
                  type="radio"
                  id="prefer-not-to-say"
                  name="gender"
                  value="prefer-not-to-say"
                  checked={gender === 'prefer-not-to-say'}
                  onChange={() => setGender('prefer-not-to-say')}
                />
                <span className="gender">Prefer not to say</span>
              </label>
            </div>
          </div> */}
          <div className="button" style={{height:"100%" ,backgroundColor:"blue" }} >
            <Button type="submit" style={{width:"100%"}} onClick={handleSubmit} >  Login </Button>
          </div>
        </form>
      </div>
    </div>
   </div>
  );
}

export default AdminLogin;
