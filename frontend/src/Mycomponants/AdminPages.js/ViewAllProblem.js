import React, { useEffect, useState } from 'react'
import {Table,Thead,Tbody,Tfoot,Tr,Th,Td,TableCaption,TableContainer, Image, Button,} from '@chakra-ui/react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEye } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { faSearch } from '@fortawesome/free-solid-svg-icons';




function ViewAllProblem() {
    const [user,setUser]=useState([])
    const [search,setSearch]=useState("")
    const navigate=useNavigate()
    let index=1;

    const getAllUser =()=>{
        axios.get('http://localhost:5000/admin/getAllProblem')
        .then((result)=>{
          const {data}=result;
          console.log(data.result);
          setUser(data.result)
        })
        .catch((error)=>{
            console.log(error);
        })

    }

    const getAllUserBySearch =()=>{
      axios.get(`http://localhost:5000/user/searchProblem?search=${search}`)
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
          axios.delete(`http://localhost:5000/user/deleteUser/${id}`)
          .then((result)=>{
              console.log(result.data.message)
              if(result.data.message === "User SuccessFully Delete"){
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
    <div style={{margin:"10px"  }} >
      <div className="section-header" style={{backgroundColor:"steelblue" ,height:"20vh"}} >
        <h2 style={{ fontFamily:"cursive",color:"white",padding:"10px"  }} >View All Problem</h2>   
        <div className="user-details" style={{marginRight:"-110vh"}} >
            <div className="input-box">
            <input
            type="text"
            placeholder={"Search Problem By Title And Location"}
            onChange={(e) => {
            setSearch(e.target.value);
            getAllUserBySearch();
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
        <Th style={{ fontSize:"15px" }} >Image</Th>
        <Th style={{ fontSize:"15px" }} >Title</Th>
        <Th style={{ fontSize:"15px" }} >Discription</Th>
        <Th style={{ fontSize:"15px" }} >Post By</Th>
        <Th style={{ fontSize:"15px" }} >Post Date</Th>
        <Th style={{ fontSize:"15px" }} >Location</Th>
        <Th style={{ fontSize:"15px" }} >Votes</Th>
        <Th style={{ fontSize:"15px" }} >Status</Th>
        <Th style={{ fontSize:"15px" }} >Action</Th>
      </Tr>
    </Thead>
    <Tbody>
     { user? (user.map((u)=>(
          <Tr key={u._id}>
         <Td>{index++}</Td>
         <Td><Image
             borderRadius='full'
             boxSize='100px'
             src={`http://localhost:5000/images/${u.pic}`}
            
             />
            </Td>
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
         <Td> <span onClick={()=>DeleteItem(u._id)} ><FontAwesomeIcon icon={faTrash} /></span> </Td>
       
       </Tr>

     )) ) :<span> NO USERS   </span>}
      
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

export default ViewAllProblem