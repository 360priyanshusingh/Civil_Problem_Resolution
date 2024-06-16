import React, { useEffect, useState } from 'react'
import {Table,Thead,Tbody,Tfoot,Tr,Th,Td,TableCaption,TableContainer, Image, Button,} from '@chakra-ui/react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEye } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import {getCheckVotes }from "../Logic"




function ViewUserNotStartedProblem() {
    const [user,setUser]=useState([])
    const [userId,setUserId]=useState([])
    const [search,setSearch]=useState("")
    const navigate=useNavigate()
    let index=1;

    const getAllUser =()=>{
        axios.get(`http://localhost:5000/admin/getNotStartedProblem?search=${search}`)
        .then((result)=>{
          const {data}=result;
          console.log(data.result);
          setUser(data.result)
        })
        .catch((error)=>{
            console.log(error);
        })

    }
    useEffect(() => {
        axios
          .get("http://localhost:5000/user/home")
          .then((result) => {
            console.log(result.data);
            if (result.data && result.data.Status === "Success") {
                setUserId(result.data.user._id)
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

   
    const SubmitVote =(id)=>{
        
      if(!id || !userId){
        alert("User id and Problem Id Not Exit !");
        return 
      }

      const confirmed=window.confirm(
          "Are you sure you want to Vote this Problem ?"
         );
       
         if(confirmed){
          axios.put(`http://localhost:5000/user/voteByUser/${id}`,{userId})
          .then((result)=>{
              console.log(result.data.message)
              if(result.data.message==="Vote SuccessFuly Created"){
                getAllUser()
              }
              else{
                alert("Vote SuccessFuly not Created");
              }
          })
          .catch((error)=>{
            console.log(error)
          })
         }
         
  }

    useEffect(()=>{
        getAllUser()
    },[])

    const [showUsername, setShowUsername] = useState({});

    const toggleUsernameVisibility = (id) => {
        setShowUsername((prevState) => ({
        ...prevState,
        [id]: !prevState[id],
      }));
    };
    const [showNumber, setShowNumber] = useState({});

    const toggleNumberVisibility = (id) => {
        setShowNumber((prevState) => ({
        ...prevState,
        [id]: !prevState[id],
      }));
    };
    const handleClick = (userId,title) => {
        navigate('/updateNotStartedProblem', { state: { userId: userId ,title:title} });
    };
    const handleClick2 = (dis,title) => {
        navigate('/viewUserDiscription', { state: { dis: dis ,title:title} });
    };


  return (
    <div style={{margin:"10px"}} >
      <div className="section-header" style={{backgroundColor:"steelblue" ,height:"20vh"}} >
        <h2 style={{ fontFamily:"cursive",color:"white",padding:"10px"  }} >Problem Not Started</h2>   
        <div className="user-details" style={{marginRight:"-110vh"}} >
            <div className="input-box">
            <input
            type="text"
            placeholder={"Search Problem By Title And Location"}
            onChange={(e) => {
            setSearch(e.target.value);
            getAllUser();
            }}
             style={{ width: "20%", marginRight: "-30px" }}
/>          

            </div>
           
           </div>  
     </div>
    <TableContainer>
      <Table variant='striped' colorScheme='teal'>
       {/* <TableCaption> All User </TableCaption> */}
    <Thead>
      <Tr>
        <Th style={{ fontSize:"15px" }} >S.No</Th>
 
        <Th style={{ fontSize:"15px" }} >Title</Th>
        <Th style={{ fontSize:"15px" }} >Discription</Th>
        <Th style={{ fontSize:"15px" }} >Post By</Th>
        <Th style={{ fontSize:"15px" }} >Post Date</Th>
        <Th style={{ fontSize:"15px" }} >Location</Th>
        <Th style={{ fontSize:"15px" }} >Votes</Th>
        <Th style={{ fontSize:"15px" }} >Status</Th>
        <Th style={{ fontSize:"15px" }} >Vote Now</Th>
      </Tr>
    </Thead>
    <Tbody>
     { user? (user.map((u)=>(
          <Tr key={u._id}>
         <Td>{index++}</Td>
         {/* <Td><Image
             borderRadius='full'
             boxSize='100px'
             src={`http://localhost:5000/images/${u.pic}`}
            
             />
            </Td> */}
         <Td>{u.title}</Td>
         <Td><Button onClick={() => handleClick2(u.dis,u.title)}> VIEW DISCRIPTION</Button></Td>
        <Td> {u.postByAdmin?.name ? u.postByAdmin?.name :u.postByUser?.name}
            </Td>
     <Td>{u.postDate}
            </Td>
         <Td>{u.location}
            </Td>
            <Td> {u.votesByUser?.length} </Td>    
         <Td>{u.status}</Td>
         <Td> {getCheckVotes(u.votesByUser,userId)?"You Alerdy Voted":<Button onClick={()=>SubmitVote(u._id)} > Vote Now</Button> }   </Td>
       { console.log(getCheckVotes(u.votesByUser,userId))}
       { console.log(getCheckVotes(u.votesByAdmin,userId))}
       { console.log(u.votesByUser.length)}
       </Tr>

     )) ) :<span> NO Problm  </span>}
      
    </Tbody>
    <Tfoot>
      <Tr>
        <Th>Total Problem</Th>
        <Th>{index-1}</Th>
      </Tr>
    </Tfoot>
       </Table>
    </TableContainer>
    </div>
  )
}

export default ViewUserNotStartedProblem