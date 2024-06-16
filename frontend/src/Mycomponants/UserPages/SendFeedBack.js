import { Button, Select, Textarea } from '@chakra-ui/react'
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

function SendFeedback() {
    const location = useLocation();
    const { problemId,userId } =  location.state ? location.state : { userId: "",problemId:""};
    const [msg,setMsg]=useState();
    const navigate=useNavigate()

    const handleSubmit=(event)=>{
      event.preventDefault();
      if(!userId || !problemId){
        alert("UserId  and ProblemId Not Exit")
        return
      }

      axios.post(`http://localhost:5000/user/createFeedback`,{problemId,userId,msg})
      .then((result)=>{
          if(result.data.message ==="FeedBack SuccessFully Created"){
            navigate("/viewUserSolvedProblem")
            alert("FeedBack SuccessFully Created")
          }
          else{
            alert("FeedBack SuccessFully Not Created")
          }
      })
      .catch((error)=>{
        console.log(error)
        alert("User FeedBack Succssfully Not Updated due to backend")
      })

    }

  return (
    <div className="loginbody loginmargin"style={{display:"flex" ,justifyContent:"center",backgroundColor:"lightcoral" ,minHeight:"90vh" }} >
     <div className="logincontainer"style={{margin:"30px"}} >
      <div className="title">Send FeedBack</div>
      <div className="content">
        <form >
          <div className="user-details"  >
            <div className="input-box"  style={{width:"100%"}} >
              <span className="details" ><h4> Message </h4></span>
              <Textarea style={{fontSize:"20px"}} onChange={(e)=>setMsg(e.target.value)} /> 
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
            </div>
             */}
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

export default SendFeedback