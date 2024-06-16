import React, { useEffect, useState } from 'react'
import {Table,Thead,Tbody,Tfoot,Tr,Th,Td,TableCaption,TableContainer, Image, Button,} from '@chakra-ui/react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEye } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';




function ViewPendingUser() {
    const [user,setUser]=useState([])
    const [search,setSearch]=useState("")
    const navigate=useNavigate()
    let index=1;

    const getAllUser =()=>{
        axios.get(`http://localhost:5000/user/getPendingUser?search=${search}`)
        .then((result)=>{
          const {data}=result;
          console.log(data.result);
          setUser(data.result)
        })
        .catch((error)=>{
            console.log(error);
        })

    }

   
    const handleClick = (userId) => {
        navigate('/updateUserStatus', { state: { userId: userId} });
    };

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

    const [adharNumber, setAdharShowNumber] = useState({});

    const toggleAdharNumberVisibility = (id) => {
      setAdharShowNumber((prevState) => ({
        ...prevState,
        [id]: !prevState[id],
      }));
    };
   



  return (
    <div style={{margin:"10px"}} >
       <div className="section-header" style={{backgroundColor:"steelblue" ,height:"20vh"}} >
        <h2 style={{ fontFamily:"cursive",color:"white",padding:"10px"  }} >VIEW REQUESTED USER</h2>   
        <div className="user-details" style={{marginRight:"-110vh"}} >
            <div className="input-box">
            <input
            type="text"
            placeholder={"Search"}
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
        <Th style={{ fontSize:"15px" }}  >Image</Th>
        <Th style={{ fontSize:"15px" }} >Full Name</Th>
        <Th style={{ fontSize:"15px" }} >Adhar Id Number</Th>
        <Th style={{ fontSize:"15px" }} >Contact</Th>
        <Th style={{ fontSize:"15px" }} >email</Th>
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
             alt={u.name}
             />
            </Td>
         <Td>{u.name}</Td>
         <Td> {adharNumber[u._id] ? u.idcard : "****"}
                    <FontAwesomeIcon
                      icon={adharNumber[u._id] ? faEyeSlash : faEye}
                      className="field-icon toggle-password-2 btn btn-primary"
                      onClick={() => toggleAdharNumberVisibility(u._id)}
                      style={{margin:'10px'}}
                    />
            </Td>
         <Td> {showNumber[u._id] ? u.contact : "****"}
                    <FontAwesomeIcon
                      icon={showNumber[u._id] ? faEyeSlash : faEye}
                      className="field-icon toggle-password-2 btn btn-primary"
                      onClick={() => toggleNumberVisibility(u._id)}
                      style={{margin:'10px'}}
                    />
            </Td>
         <Td> {showUsername[u._id] ? u.email : "****"}
                    <FontAwesomeIcon
                      icon={showUsername[u._id] ? faEyeSlash : faEye}
                      className="field-icon toggle-password-2 btn btn-primary"
                      onClick={() => toggleUsernameVisibility(u._id)}
                      style={{margin:'10px'}}
                    />
            </Td>
         <Td>{u.status}</Td>
         <Td> <Button onClick={() => handleClick(u._id)}> Change Status</Button> </Td>
       </Tr>

     )) ) :<span> NO USERS   </span>}
      
    </Tbody>
    <Tfoot>
      <Tr>
        <Th>Total User</Th>
        <Th>{index-1}</Th>
      </Tr>
    </Tfoot>
       </Table>
    </TableContainer>
    </div>
  )
}

export default ViewPendingUser