
import React, { useEffect } from 'react'
import { useState } from 'react'; // Import useState hook for managing state
import '../../login.css';
import { Button, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEye } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function ViewProfile() {
  // State variables for form fields
  axios.defaults.withCredentials = true;
  const navigate=useNavigate()
  const [user,setUser]=useState(null)

  
 const getuser= async(id)=>{
  axios.get(`http://localhost:5000/user/getuser/${id}`)
  .then((result)=>{
      console.log(result.data)
      setUser(result.data.result)
  })
  .catch((error)=>{
  console.log(error)
  })
}  

useEffect(() => {
axios
.get("http://localhost:5000/user/home")
.then((result) => {
  console.log(result.data);
  if (result.data && result.data.Status === "Success") {
    getuser(result.data.user._id)
   
  } else {
    navigate("/");
  }
})
.catch((err) => console.log(err));
}, []);
	// const handleImageChange = (event) => {
	// 	const file = event.target.files[0];
	// 	setPic(file);
	// };

 const handleClick=(userId)=>{
    navigate("/editeProfile",{state :{userId:userId}})
 }  
	
 const [showUsername, setShowUsername] = useState(false);

 const toggleUsernameVisibility = () => {
  setShowUsername(!showUsername)
 };
 const [showNumber, setShowNumber] = useState(false);

 const toggleNumberVisibility = () => {
     setShowNumber(!showNumber);
 };
 const [adharNumber, setAdharShowNumber] = useState(false);

 const toggleAdharNumberVisibility = () => {
  setAdharShowNumber(!adharNumber);
 };


  return (
   <div className="loginbody loginmargin"style={{display:"flex" ,justifyContent:"center",backgroundColor:"lightcoral" }} >
     <div className="logincontainer"style={{margin:"30px"}} >
      <div className="title">My Profile</div>
      <div className="content">
        <form >
          <div className="user-details">
            <div className="input-box">
              <span className="details">Image</span>
            </div>
            <div className="input-box">
              <span className="details"><Image
             boxSize='80px'
            objectFit='cover'
             src={`http://localhost:5000/images/${user?.pic}`}
             alt={user?.name}
              /> </span>

            </div>
          
            <div className="input-box">
              <span className="details">Full Name</span>
            </div>
            <div className="input-box">
              <span className="details">{user?.name}</span>
            </div>
          
          
            <div className="input-box">
              <span className="details">Adhar Card Number</span>
            </div>
            <div className="input-box">
            <span className="details"> {adharNumber ? user?.idcard : "*******"}
                    <FontAwesomeIcon
                      icon={adharNumber? faEyeSlash : faEye}
                      className="field-icon toggle-password-2 btn btn-primary"
                      onClick={() => toggleAdharNumberVisibility()}
                      style={{margin:'2px'}}
                    />
            </span>
            </div>
            
            <div className="input-box">
              <span className="details">Email</span>
            </div>
            <div className="input-box">
              <span className="details"> {showNumber ? user?.email : "*******"}
                    <FontAwesomeIcon
                      icon={showNumber? faEyeSlash : faEye}
                      className="field-icon toggle-password-2 btn btn-primary"
                      onClick={() => toggleNumberVisibility()}
                      style={{margin:'2px'}}
                    />
            </span>
            </div>
            
            <div className="input-box">
              <span className="details">Phone Number</span>
            </div>
            <div className="input-box">
            <span className="details"> {showUsername ? user?.contact : "*******"}
                    <FontAwesomeIcon
                      icon={showUsername? faEyeSlash : faEye}
                      className="field-icon toggle-password-2 btn btn-primary"
                      onClick={() => toggleUsernameVisibility()}
                      style={{margin:'2px'}}
                    />
            </span>
            </div>
            
            <div className="input-box">
              <span className="details">City</span>
            </div>
            <div className="input-box">
              <span className="details">{user?.city}</span>
            </div>
            <div className="input-box">
              <span className="details">Address</span>
            </div>
            <div className="input-box">
              <span className="details">{user?.address}</span>
            </div>
            
       
       
          </div> 
          
           <div className="button" style={{height:"100%" ,backgroundColor:"blue" }} >
            <Button  style={{width:"100%"}} onClick={()=>handleClick(user?._id)} > Edit User</Button>
          </div>
        </form>
      </div>
    </div>
   </div>
  );
}

export default ViewProfile;
