
import React, { useEffect } from 'react'
import { useState } from 'react'; // Import useState hook for managing state
import '../../login.css';
import { Button } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditeProfile() {
  // State variables for form fields

  axios.defaults.withCredentials = true;
  const location=useLocation();
  const {userId}=location.state?location.state : {userId:""}
  const [user,setUser]=useState(null)
  const [name, setName] = useState();
const [city, setCity] = useState();
const [email, setEmail] = useState();
const [contact, setContact] = useState();
const [password, setPassword] = useState('');
const [address, setAddress] = useState();
const [idcard, setIdcard] = useState();
const [pic, setPic] = useState([]);
const navigate=useNavigate()

 
 const getuser= async(id)=>{
  axios.get(`http://localhost:5000/user/getuser/${id}`)
  .then((result)=>{
      console.log(result.data)
      setUser(result.data.result)
      setName(result.data.result.name)
      setIdcard(result.data.result.idcard)
      setAddress(result.data.result.address)
      setContact(result.data.result.contact)
      setEmail(result.data.result.email)
      setCity(result.data.result.city)
      setPic(result.data.result.pic)
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



	const handleSubmit = async (event) => {
		event.preventDefault();

    if (idcard.length !== 12 && idcard.length !== 16) {
      alert("Adhar Card Number Should be 12 or 16 Digits");
      return;
      }
        
    
    

		if(!userId || !pic || !name|| !contact ||  !idcard  || !email || !address || !city){
		  alert("Please fill all filds");
		  return
		}
	  
		const formData = new FormData();
		formData.append('name', name);
		formData.append('email', email);
		formData.append('pic', pic); // Pass the file object directly
		formData.append('contact', contact);
		formData.append('idcard', idcard);
		formData.append('address', address);
		formData.append('city', city);

	  
		console.log(formData);
	  
		axios.put(`http://localhost:5000/user/updateProfile/${userId}`,formData , {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
		.then((result) => {
			console.log(result.data.message);
			if (result.data.message==="User Profile Update") {
				navigate("/viewProfile");
				alert("Profile Updated Successfully");
			} else {
				alert("Something error");
			}
		})
		.catch((err) => {
			console.error(err);
			alert("Something went wrong");
		});
	  }


	const handleImageChange = (event) => {
		const file = event.target.files[0];
		setPic(file);
	};
	

  return (
   <div className="loginbody loginmargin"style={{display:"flex" ,justifyContent:"center",backgroundColor:"lightcoral" }} >
     <div className="logincontainer"style={{margin:"30px"}} >
      <div className="title"> Update Profile</div>
      <div className="content">
        <form onSubmit={handleSubmit}>
          <div className="user-details">
            <div className="input-box">
              <span className="details">Full Name</span>
              <input
                value={name}
                onChange={(e)=>(setName(e.target.value))}
              />
            </div>
            <div className="input-box">
              <span className="details">Email</span>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-box">
              <span className="details">Adhar Card Id Number</span>
              <input
                type="text"
                placeholder="Enter your Adhar Card number "
                value={idcard}
                onChange={(e) => setIdcard(e.target.value)}
              
              />
            </div>
            <div className="input-box">
              <span className="details">City Name</span>
              <input
                type="text"
                placeholder="Enter your City "
                value={city}
                onChange={(e) => setCity(e.target.value)}

              />
            </div>
            <div className="input-box">
              <span className="details">Phone Number</span>
              <input
                type="text"
                placeholder="Enter your number"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
             
              />
            </div>
            {/* <div className="input-box">
              <span className="details">Password</span>
              <input
                type="password"
                placeholder="Enter your password"
          
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div> */}
            <div className="input-box">
              <span className="details">Address</span>
              <input
                type="text"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
         
              />
            </div>
            <div className="input-box">
              <span className="details">Image</span>
              <input
    type="file"
    onChange={handleImageChange} // Corrected line

/>
            </div>
            {/* <div className="input-box">
              <span className="details">Confirm Password</span>
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div> */}
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
            <Button type="submit" style={{width:"100%"}} onClick={()=>handleSubmit} >  Submit </Button>
          </div>
        </form>
      </div>
    </div>
   </div>
  );
}

export default EditeProfile;
