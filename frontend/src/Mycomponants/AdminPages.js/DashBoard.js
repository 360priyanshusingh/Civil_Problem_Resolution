import { AbsoluteCenter, Box, Center } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function DashBoard() {
    const [user,setUser]=useState([])
    const [problem,setProblem]=useState([])
    const [inproblem,setInProblem]=useState([])
    const [soproblem,setSoProblem]=useState([])
    const navigate=useNavigate()
    let index=1;

    const getAllUser =()=>{
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

    // const getAllProblem=()=>{
    //     axios.get('http://localhost:5000/admin/getAllProblem')
    //     .then((result)=>{
    //       const {data}=result;
    //       console.log(data.result);
    //       setProblem(data.result)
    //     })
    //     .catch((error)=>{
    //         console.log(error);
    //     })

    // }

    const getAllInProgress =()=>{
        axios.get('http://localhost:5000/admin/getInProgressProblem')
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
          setProblem(data.result)
        })
        .catch((error)=>{
            console.log(error);
        })

    }

    useEffect(()=>{
        getAllUser()
        getAllInProgress()
        getAllSolvedPro()
        getAllNotStartedProblem()
    },[])

  return (
   <div style={{ backgroundColor:"black" }} >
      
     <div style={{ backgroundColor:"black" }} >
      <AbsoluteCenter   style={{width:"100%" ,backgroundColor:"black"}}>
      <div style={{display:"flex",flexDirection:"row",justifyContent:"space-evenly"}} >
      <div class="col-xl-3 col-sm-6 py-2" style={{ width: "25%", height: "30vh", backgroundColor: "#57b960" ,transition: "background-color 0.3s", margin:"30px" }}>
    <Link to={'/getAllUser'}>
        <div class="card bg-success text-white h-100" style={{ backgroundColor: "#57b960", transition: "background-color 0.3s" }}>
            <div class="card-body bg-success" style={{ backgroundColor: "#57b960",transition: "background-color 0.3s"  }}>
                <div class="rotate">
                    <i class="fa fa-user fa-4x"></i>
                </div>
                <Center>  <h6 class="text-uppercase">USERS</h6> </Center>
                <Center>  <h1 class="display-4">{user.length} </h1>  </Center>
            </div>
        </div>
    </Link>
</div>

            <div class="col-xl-3 col-sm-6 py-2" style={{width:"25%",height:"30vh",backgroundColor :"#6493e3" , margin:"30px" }}  >
               <Link to={'/viewNotStartedProblem'}  >
               <div class="card text-white bg-danger h-100">
                    <div class="card-body bg-danger" style={{backgroundColor:"#6493e3"}}>
                        <div class="rotate">
                            <i class="fa fa-list fa-4x"></i>
                        </div>
                        <h6 class="text-uppercase">PROBLEM NOT STARTED</h6>
                        <h1 class="display-4">{problem.length}</h1>
                    </div>
                </div>
               </Link>
            </div>
            <div class="col-xl-3 col-sm-6 py-2" style={{width:"25%",height:"30vh",backgroundColor :"#d9e1ed" , margin:"30px"  }}  >
               <Link to={'/viewInProgessProblem'} >
               <div class="card text-white bg-info h-100" >
                    <div class="card-body bg-info"  style={{backgroundColor :"#d9e1ed" }} >
                        <div class="rotate">
                          <i class="fa fa-list fa-4x"></i>
                        </div>
                        <h6 class="text-uppercase">PROBLEM IN PROGRESS</h6>
                        <h1 class="display-4">{inproblem.length}</h1>
                    </div>
                </div>
               </Link>
            </div>
            <div class="col-xl-3 col-sm-6 py-2" style={{width:"25%",height:"30vh",backgroundColor :"#545f71" , margin:"30px"   }}  >
               <Link to={'/viewSolvedProblem'} >  <div class="card text-white bg-warning h-100">
                    <div class="card-body"  style={{backgroundColor :"#545f71"}} >
                        <div class="rotate">
                            <i class="fa fa-list fa-4x"></i>
                        </div>
                        <h6 class="text-uppercase">PROBLEM SOLVED</h6>
                        <h1 class="display-4">{soproblem.length}</h1>
                    </div>
                </div> </Link>
            </div>
        </div>
   </AbsoluteCenter>

        

    </div>
    
   </div>
  )
}

export default DashBoard