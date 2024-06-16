import { Button } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function UpdateNotStartedStatus() {
    axios.defaults.withCredentials = true;
    const location = useLocation();
    const { userId ,title } =  location.state ? location.state : { userId: "" , title:""};
	const [status,setStatus]=useState()
	const [estimateDate,setEstimateDate]=useState()
	const  navigate =useNavigate();


    const handleSubmit = async(event) => {

		event.preventDefault();
		if(!userId){
			alert("Problem Id Not Exit");
			return 
		}

		axios.put(`http://localhost:5000/admin/updateProblem/${userId}`,{status:"In Progress",estimateDate}).
		then((result)=>{
			console.log(result)
          if(result.data.message==="Problem Status Update"){
			navigate('/viewAllProblem');
			alert("Status Succesfully Changed");
		  }
		  else{
			alert("Status Succesfully not Changed");
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
      <div className="title">Change Problem Status</div>
      <div className="content">
        <form >
          <div className="user-details">
            <div className="input-box"  style={{width:"100%"}} >
              <span className="details" ><h4>Problem Title</h4></span>
                <input  style={{width:"100%",height:"5vh"}} value={title} />
            </div>
            <div className="input-box"  style={{width:"100%"}} >
              <span className="details" ><h4>Problem Estimate Date</h4></span>
                <input type='date' style={{width:"100%",height:"5vh"}} onChange={(e) => setEstimateDate(e.target.value)} />
            </div>
        
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

export default UpdateNotStartedStatus