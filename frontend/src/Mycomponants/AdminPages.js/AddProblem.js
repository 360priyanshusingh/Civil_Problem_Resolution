import { Button } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function AddProblem() {
    axios.defaults.withCredentials = true;
	const [title,setTitle]=useState()
	const [location,setLocation]=useState()
	const [pic,setPic]=useState([])
	const [dis,setDis]=useState()
    const [postByAdmin,setPostByAdmin]=useState()
	const  navigate =useNavigate();


    const handleSubmit = async (event) => {
		event.preventDefault();
  
		if(!title || !location|| !dis || !pic || !postByAdmin){
		  alert("Please fill all filds");
		  return
		}
	  
		const formData = new FormData();
		formData.append('title', title);
		formData.append('dis', dis);
		formData.append('pic', pic); // Pass the file object directly
		formData.append('location', location);
		formData.append('postByAdmin', postByAdmin);
	  
		console.log(formData);
	  
		axios.post(`http://localhost:5000/admin/craeteProblem`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data'
			}
		})
		.then((result) => {
			console.log(result.data.message);
			if (result.data.message==="Problem SuccessFully Created") {
				navigate("/dashBoard");
				alert("Problem SuccessFully Created")
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

    useEffect(() => {
        axios
          .get("http://localhost:5000/user/home")
          .then((result) => {
            console.log(result.data);
            if (result.data && result.data.Status === "Success") {
                setPostByAdmin(result.data.user._id)
              // if (result.data.role === "admin") {
              //   // navigate("/dashboard");
              // } else {
              //   navigate("/login");
              // }
            } else {
              navigate("/");
            }
          })
          .catch((err) => console.log(err));
        }, []);
	
  return (
    <div className="loginbody loginmargin"style={{display:"flex" ,justifyContent:"center",backgroundColor:"lightcoral" ,minHeight:"90vh" }} >
     <div className="logincontainer"style={{margin:"30px"}} >
      <div className="title">Add Problem</div>
      <div className="content">
        <form >
          <div className="user-details">
            <div className="input-box"  style={{width:"100%"}} >
              <span className="details" ><h4>Problem Title</h4></span>
                <input  style={{width:"100%",height:"5vh"}} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="input-box"  style={{width:"100%"}} >
              <span className="details" ><h4>Problem Discription</h4></span>
                <input  style={{width:"100%",height:"5vh"}} onChange={(e) => setDis(e.target.value)} />
            </div>
            <div className="input-box"  style={{width:"100%"}} >
              <span className="details" ><h4>Problem Location</h4></span>
                <input  style={{width:"100%",height:"5vh"}} onChange={(e) => setLocation(e.target.value)} />
            </div>
            <div className="input-box"  style={{width:"100%"}} >
              <span className="details" ><h4>Problem Image</h4></span>
                <input type='file' style={{width:"100%",height:"5vh"}}     onChange={handleImageChange}  />
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

export default AddProblem