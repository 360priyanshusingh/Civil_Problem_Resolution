import React, { useEffect, useState } from 'react'
import {Table,Thead,Tbody,Tfoot,Tr,Th,Td,TableCaption,TableContainer, Image, Button,} from '@chakra-ui/react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEye } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';




function ViewUserSolvedProblem() {
    const [user,setUser]=useState([])
    const [userId,setUserId]=useState()
    const navigate=useNavigate()
    let index=1;
    
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

        const [search,setSearch]=useState("")
      
      
    
        const getAllUser =()=>{
            axios.get(`http://localhost:5000/admin/getSolvedProblem?search=${search}`)
            .then((result)=>{
              const {data}=result;
              console.log(data.result);
              setUser(data.result)
            })
            .catch((error)=>{
                console.log(error);
            })
    
        }
    

   
//     const DeleteItem =(id)=>{
//       const confirmed=window.confirm(
//           "Are you sure you want to delete this User ?"
//          );
       
//          if(confirmed){
//           axios.delete(`http://localhost:5000/user/deleteUser/${id}`)
//           .then((result)=>{
//               console.log(result.data.message)
//               if(result.data.message === "User SuccessFully Delete"){
//                 setUser(user.filter((p)=> p._id!==id )); 
//               }
//               else{
//                 alert("User not delete");
//               }
//           })
//           .catch((error)=>{
//             console.log(error)
//           })
//          }
         
//   }

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
    const handleClick = (problemId) => {
        navigate('/sendFeedback', { state: { userId: userId ,problemId:problemId} });
    };
    const handleClick2 = (dis,title) => {
        navigate('/viewUserDiscription', { state: { dis: dis ,title:title} });
    };


  return (
    <div style={{margin:"10px"}} >
        <div className="section-header" style={{backgroundColor:"steelblue" ,height:"20vh"}} >
        <h2 style={{ fontFamily:"cursive",color:"white",padding:"10px"  }} > View Solved Problem </h2>   
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
        <Th style={{ fontSize:"15px" }} >Title</Th>
        <Th style={{ fontSize:"15px" }} >Discription</Th>
        <Th style={{ fontSize:"15px" }} >Post By</Th>
        <Th style={{ fontSize:"15px" }} >Post Date</Th>
        <Th style={{ fontSize:"15px" }} >Location</Th>
        <Th style={{ fontSize:"15px" }} >Votes</Th>
        <Th style={{ fontSize:"15px" }} >Status</Th>
        <Th style={{ fontSize:"15px" }} >Start Date</Th>
        <Th style={{ fontSize:"15px" }} >Completion Date</Th>
        <Th style={{ fontSize:"15px" }} >Send FeedBack </Th>
      </Tr>
    </Thead>
    <Tbody>
     { user? (user.map((u)=>(
          <Tr key={u._id}>
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
         <Td>{u.estimateDate}</Td>
         <Td>{u.actualDate}</Td>
       
         <Td> <Button onClick={() => handleClick(u._id)}> Send FeedBack </Button> </Td>
       
       </Tr>

     )) ) :<span> NO Problm  </span>}
      
    </Tbody>
    {/* <Tfoot>
      <Tr>
        <Th>Total Problem</Th>
        <Th>{index-1}</Th>
      </Tr>
    </Tfoot> */}
       </Table>
    </TableContainer>
    </div>
  )
}

export default ViewUserSolvedProblem