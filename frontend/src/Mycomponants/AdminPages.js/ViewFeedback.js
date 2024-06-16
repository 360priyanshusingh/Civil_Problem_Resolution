import React, { useEffect, useState } from 'react'
import {Table,Thead,Tbody,Tfoot,Tr,Th,Td,TableCaption,TableContainer, Image, Button,} from '@chakra-ui/react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEye } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';




function ViewFeedback() {
    const [user,setUser]=useState([])
    const navigate=useNavigate()
    let index=1;
    const location = useLocation();
    const { userId } =  location.state ? location.state : { userId: ""};

    const getAllUser =()=>{
        if(!userId){
            alert("UserId Does No Exit")
            return
        }
        axios.get(`http://localhost:5000/user/getfeedback/${userId}`)
        .then((result)=>{
          const {data}=result;
          console.log(data.result);
          setUser(data.result)
        })
        .catch((error)=>{
            console.log(error);
        })

    }

   
    const DeleteItem =(id)=>{
      const confirmed=window.confirm(
          "Are you sure you want to delete this User ?"
         );
       
         if(confirmed){
          axios.delete(`http://localhost:5000/user/deleteFeedBack/${id}`)
          .then((result)=>{
              console.log(result.data.message)
              if(result.data.message === "Feedback SuccessFully Delete"){
                setUser(user.filter((p)=> p._id!==id )); 
              }
              else{
                alert("User not delete");
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

    const handleClick2 = (dis,title) => {
      navigate('/viewAdminDiscription', { state: { dis: dis ,title:title} });
  };


  return (
    <div style={{margin:"10px"}} >
      <div className="section-header">
        <h2 style={{ fontFamily:"cursive"  }} >View FeedBacks</h2>     
     </div>
    <TableContainer>
      <Table variant='striped' colorScheme='teal'>
       {/* <TableCaption> All User </TableCaption> */}
    <Thead>
      <Tr>
        <Th style={{ fontSize:"15px" }} >S.No</Th>
        <Th style={{ fontSize:"15px" }} >Adhar ID</Th>
        <Th style={{ fontSize:"15px" }} >Post By</Th>
        <Th style={{ fontSize:"15px" }} >Mesage</Th>
        <Th style={{ fontSize:"15px" }} >Post Date</Th>
        <Th style={{ fontSize:"15px" }} >Action</Th>
      </Tr>
    </Thead>
    <Tbody>
     { user? (user.map((u)=>(
          <Tr key={u._id}>
         <Td>{index++}</Td>
         <Td>{u.userId?.idcard}</Td>
         <Td>{u.userId?.name}</Td>
         <Td>{u.msg}</Td>
         <Td>{u.date}</Td>
         <Td> <span onClick={()=>DeleteItem(u._id)} ><FontAwesomeIcon icon={faTrash} /></span> </Td>
       
       </Tr>

     )) ) :<span> No FeedBack  </span>}
      
    </Tbody>
    <Tfoot>
      <Tr>
        <Th>Total FeedBack</Th>
        <Th>{index-1}</Th>
      </Tr>
    </Tfoot>
       </Table>
    </TableContainer>
    </div>
  )
}

export default ViewFeedback