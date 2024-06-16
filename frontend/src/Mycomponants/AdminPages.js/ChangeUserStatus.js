import { Button, Select } from '@chakra-ui/react'
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

function ChangeUserStatus() {
    const location = useLocation();
    const { userId } =  location.state ? location.state : { userId: ""};
    const [status,setStatus]=useState();
    const navigate=useNavigate()

    const handleSubmit=(event)=>{
      event.preventDefault();
      if(!userId){
        alert("User Id Not Exit")
        return
      }

      axios.put(`http://localhost:5000/user/updateUserStatus/${userId}`,{status})
      .then((result)=>{
          if(result.data.message === "User Status Update"){
            navigate("/getAllUser")
            alert("User Status Succssfully Updated")
          }
          else{
            alert("User Status Succssfully Not Updated")
          }
      })
      .catch((error)=>{
        console.log(error)
        alert("User Status Succssfully Not Updated due to backend")
      })

    }

  return (
    <div className="loginbody loginmargin"style={{display:"flex" ,justifyContent:"center",backgroundColor:"lightcoral" ,minHeight:"90vh" }} >
     <div className="logincontainer"style={{margin:"30px"}} >
      <div className="title">Change User Status</div>
      <div className="content">
        <form >
          <div className="user-details"  >
            <div className="input-box"  style={{width:"100%"}} >
              <span className="details" ><h4>Status</h4></span>
                <Select style={{width:"100%",height:"5vh"}}   onChange={(e) => setStatus(e.target.value)}  > 
                     <option selected  >Open this select menu </option>
                      <option value="Accept">Accept</option>
                      <option value="Pending">Pending</option>
                      <option value="Reject">Reject</option>
                </Select>
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

export default ChangeUserStatus