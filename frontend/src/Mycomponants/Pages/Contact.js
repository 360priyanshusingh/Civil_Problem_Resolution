import { Button } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Contact() {
    const [fname,setFname]=useState()
    const [lname,setLname]=useState()
    const [email,setEmail]=useState()
    const [contact,setContact]=useState()
    const [subject,setSubject]=useState()
    const [problem,setProblem]=useState([])
    const navigate=useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!fname|| !lname || !email || !contact || !subject){
            alert("Please Fill all Filds");
            return 
        }

        axios.post("http://localhost:5000/user/createContact",{fname,lname,email,contact,subject})
        .then((result)=>{
            if(result.data.message==="Contact SuccessFully Created"){
                navigate("/")
                alert("Your Message Submited");
            }
            else{
                alert("Your Message not Submited");
            }
        })
        .catch((error)=>{
        console.log(error);
        alert("Your Message not Submited due to backend Error");
        })
     

        // Handle form submission logic here
        // You can use state management libraries like Redux or React Context API for handling form data
      };


  return (
    <div>
        <section id="contact" className="subscription">
      <div className="container">
        <div className="subscribe-title text-center">
          <h2>
           Contact
          </h2>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="subscription-input-group">
              <div >
                <input style={{margin:"10px"}} type="text" className="subscription-input-form" placeholder="Enter your first name" onChange={(e)=>setFname(e.target.value)} />
                <input style={{margin:"10px"}} type="text" className="subscription-input-form" placeholder="Enter your Last name"  onChange={(e)=>setLname(e.target.value)} />
                <input style={{margin:"10px"}} type="text" className="subscription-input-form" placeholder="Enter your Email"  onChange={(e)=>setEmail(e.target.value)} />
                <input style={{margin:"10px"}} type="text" className="subscription-input-form" placeholder="Enter your Phone Number"  onChange={(e)=>setContact(e.target.value)} />
                <input style={{margin:"10px"}} type="text" className="subscription-input-form" placeholder="Enter your Subject"  onChange={(e)=>setSubject(e.target.value)} />
                <Button style={{margin:"10px"}} onClick={handleSubmit}  className="subscription-input-form" >
                  Submit
                </Button>
              </div>
            
            </div>
          </div>
        </div>
      </div>
        </section>

    </div>
  )
}

export default Contact