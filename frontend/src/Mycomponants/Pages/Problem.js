import { Button, Image } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Problem() {
    const [fname,setFname]=useState()
    const [lname,setLname]=useState()
    const [email,setEmail]=useState()
    const [contact,setContact]=useState()
    const [subject,setSubject]=useState()
    const [problem,setProblem]=useState([])
    const navigate=useNavigate()
    let index=1;

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

    const handelClick=()=>{
        alert("If You Wants To Access Features You Should login ")
      }


  return (
    <div>
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
    </div>
  )
}

export default Problem