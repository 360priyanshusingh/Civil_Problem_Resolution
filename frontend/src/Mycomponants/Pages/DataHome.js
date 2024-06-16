import { Button, Image, MenuDivider } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function DataHome() {
    const [fname,setFname]=useState()
    const [lname,setLname]=useState()
    const [email,setEmail]=useState()
    const [contact,setContact]=useState()
    const [subject,setSubject]=useState()
    const [problem,setProblem]=useState([])
    const navigate=useNavigate()
    let index=1;
    const [user,setUser]=useState([])
    const [problem2,setProblem2]=useState([])
    const [inproblem,setInProblem]=useState([])
    const [soproblem,setSoProblem]=useState([])
   

    const getAllUser2 =()=>{
        axios.get('http://localhost:5000/user/getAllUser')
        .then((result)=>{
          const {data}=result;
          console.log(data.result);
          setUser(data.result)
        })
        .catch((error)=>{
            console.log(error);
        })

    }

    const getAllInProgress =()=>{
      axios.get('http://localhost:5000/user/getAllContact')
      .then((result)=>{
        const {data}=result;
        console.log(data.result);
        setInProblem(data.result)
      })
      .catch((error)=>{
          console.log(error);
      })

    }
    
    const getAllSolvedPro =()=>{
        axios.get('http://localhost:5000/admin/getSolvedProblem')
        .then((result)=>{
          const {data}=result;
          console.log(data.result);
          setSoProblem(data.result)
        })
        .catch((error)=>{
            console.log(error);
        })

    }
    const getAllNotStartedProblem =()=>{
        axios.get('http://localhost:5000/admin/getNotStartedProblem')
        .then((result)=>{
          const {data}=result;
          console.log(data.result);
          setProblem2(data.result)
        })
        .catch((error)=>{
            console.log(error);
        })

    }

    useEffect(()=>{
        getAllUser2()
        getAllInProgress()
        getAllSolvedPro()
        getAllNotStartedProblem()
    },[])



    const getAllUser =()=>{
        axios.get('http://localhost:5000/admin/getAllProblem')
        .then((result)=>{
          const {data}=result;
          console.log(data.result);
          setProblem(data.result)
        })
        .catch((error)=>{
            console.log(error);
        })

    }
    
    useEffect(()=>{
        getAllUser()
    },[])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!fname|| !lname || !email || !contact || !subject){
            alert("Please Fill all Filds");
            return 
        }

        axios.post("http://localhost:5000/user/createContact",{fname,lname,email,contact,subject})
        .then((result)=>{
            if(result.data.message==="Contact SuccessFully Created"){
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

      const handelClick=()=>{
        alert("If You Wants To Access Features You Should login ")
      }

  return (
    <div>
            <section id="home" className="welcome-hero"  >
            <div className="container">
                <div className="welcome-hero-txt">
                    <h2>Welcome to our Civil Problem Resolution System </h2>
                    <p>
                     your one-stop solution for swift conflict resolution. Harnessing advanced technology,we expedite the process, ensuring your concerns are addressed in record time. Plus, our efficient feedback management system ensures your voice is heard every step of the way, guaranteeing a responsive and user-centric experience.
                    </p>
                </div>
              
            </div>
        </section>

        <section id="list-topics" className="list-topics">
            <div className="container">
                <div className="list-topics-content">
                    <ul>
                        <li>
                            <div onClick={handelClick} className="single-list-topics-content">
                                <div className="single-list-topics-icon">
                                    <i className="flaticon-restaurant"></i>
                                </div>
                                <h2><a href="#">Add Problem</a></h2>
                             
                            </div>
                        </li>
                        <li>
                            <div onClick={handelClick}  className="single-list-topics-content">
                                <div className="single-list-topics-icon">
                                    <i className="flaticon-travel"></i>
                                </div>
                                <h2><a href="#">View Problem</a></h2>
                              
                            </div>
                        </li>
                        <li>
                            <div onClick={handelClick}  className="single-list-topics-content">
                                <div className="single-list-topics-icon">
                                    <i className="flaticon-building"></i>
                                </div>
                                <h2><a href="#">Problem Completed</a></h2>
                             
                            </div>
                        </li>
                        <li>
                            <div onClick={handelClick}  className="single-list-topics-content">
                                <div className="single-list-topics-icon">
                                    <i className="flaticon-pills"></i>
                                </div>
                                <h2><a href="#">Send FeedBack</a></h2>
                            
                            </div>
                        </li>
                        <li>
                            <div onClick={handelClick}  className="single-list-topics-content">
                                <div className="single-list-topics-icon">
                                    <i className="flaticon-transport"></i>
                                </div>
                                <h2><a href="#">Problem In Progress</a></h2>
                             
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </section>

        <section id="explore" className="explore">
            <div className="container">
                <div className="section-header">
                    <h2>Problems</h2>
                  
                </div>
                <div className="explore-content">
                    <div className="row">
                        {problem?(problem.map((p)=>(
                         <div key={p._id}   className="col-md-4 col-sm-6">
                             <div className="single-explore-item">
                                 <div className="single-explore-img">
                                 <Image style={{height:"250px",width:"100%"}} objectFit='cover' src={`http://localhost:5000/images/${p?.pic}`} alt={p?.title} />
                                  
                                     <div className="single-explore-img-info">
                                         <Button onClick={ handelClick } colorScheme="teal">best rated</Button>
                                         <div className="single-explore-image-icon-box">
                                             <ul>
                                                 <li>
                                                     <div className="single-explore-image-icon">
                                                         <i className="fa fa-arrows-alt"></i>
                                                     </div>
                                                 </li>
                                                 <li>
                                                     <div className="single-explore-image-icon">
                                                         <i className="fa fa-bookmark-o"></i>
                                                     </div>
                                                 </li>
                                             </ul>
                                         </div>
                                     </div>
                                 </div>
                                 <div className="single-explore-txt bg-theme-1">
                                     <h2><a href="#">{p.title}</a></h2>
                                     <p className="explore-rating-price" style={{height:"150px",width:"300px"}} >
                                         <span className="explore-rating">{p.votesByUser?.length}</span>
                                         <a href="#"> votes</a> 
                                         <span style={{margin:"10px"}} className="explore-price-box">
                                             Post Date : <span className="explore-price"> {p.postDate}</span>
                                         </span>
                                  
                                         <span style={{margin:"10px"}} className="explore-price-box">
                                             Post By : <span className="explore-price"> {p.postByAdmin?p.postByAdmin.name:p.postByUser?.name}</span>
                                         </span>
                                         <span style={{margin:"10px"}} className="explore-price-box">
                                             Status : <span className="explore-price"> {p.status}</span>
                                         </span>
                                         <span style={{margin:"10px"}} className="explore-price-box">
                                             Location : <span className="explore-price"> {p.location}</span>
                                         </span>
                                     </p>
                                    
                                 </div>
                             </div>
                         </div>
                        )
                        )): <>"No Problem"</>}
                    </div>
                </div>
            </div>
        </section>

         <section id="statistics" className="statistics">
      <div className="container">
        <div className="statistics-counter">
          <div className="col-md-3 col-sm-6">
            <div className="single-ststistics-box">
              <div className="statistics-content">
                <div className="counter">{soproblem.length}</div> <span>K+</span>
              </div>
              <h3>Solved Problem</h3>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="single-ststistics-box">
              <div className="statistics-content">
                <div className="counter">{problem.length}</div> <span>k+</span>
              </div>
              <h3>listing Problem</h3>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="single-ststistics-box">
              <div className="statistics-content">
                <div className="counter">{inproblem.length}</div> <span>k+</span>
              </div>
              <h3>visitors </h3>
            </div>
          </div>
          <div className="col-md-3 col-sm-6">
            <div className="single-ststistics-box">
              <div className="statistics-content">
                <div className="counter">{user.length}</div> <span>k+</span>
              </div>
              <h3>happy Users</h3>
            </div>
          </div>
        </div>
      </div>
         </section>

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

export default DataHome