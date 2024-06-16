import React, { useEffect, useState } from 'react'
import {Table,Thead,Tbody,Tfoot,Tr,Th,Td,TableCaption,TableContainer, Image, Button,} from '@chakra-ui/react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEye } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';




function ViewContact() {
    const [user,setUser]=useState([])
    const navigate=useNavigate()
    let index=1;

    const getAllUser =()=>{
        axios.get('http://localhost:5000/user/getAllContact')
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
          "Are you sure you want to delete this Contact ?"
         );
       
         if(confirmed){
          axios.delete(`http://localhost:5000/user/deleteContact/${id}`)
          .then((result)=>{
              console.log(result.data.message)
              if(result.data.message === "Contact SuccessFully Delete"){
                setUser(user.filter((p)=> p._id!==id )); 
              }
              else{
                alert("Contact not delete");
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



  return (
    <div style={{margin:"10px"}} >
        <div className="section-header" style={{backgroundColor:"steelblue" ,height:"20vh"}} >
        <h2 style={{ fontFamily:"cursive",color:"white",padding:"10px"  }} >View All Contact</h2>   
     </div>
    <TableContainer>
      <Table variant='striped' colorScheme='teal'>
       {/* <TableCaption> All User </TableCaption> */}
    <Thead>
      <Tr>
        <Th style={{ fontSize:"15px" }} >S.No</Th>
        <Th style={{ fontSize:"15px" }}  >First Name</Th>
        <Th style={{ fontSize:"15px" }} >Last Name</Th>
        {/* <Th style={{ fontSize:"15px" }} >Adhar Id Number</Th> */}
        <Th style={{ fontSize:"15px" }} >Contact</Th>
        <Th style={{ fontSize:"15px" }} >email</Th>
        <Th style={{ fontSize:"15px" }} >Subject</Th>
        <Th style={{ fontSize:"15px" }} >Action</Th>
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
             alt={u.name}
             />
            </Td> */}
         <Td>{u.fname}</Td>
         <Td>{u.lname}</Td>
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
         <Td>{u.subject}</Td>
         <Td> <span onClick={()=>DeleteItem(u._id)} ><FontAwesomeIcon icon={faTrash} /></span> </Td>
       </Tr>

     )) ) :<span> NO Contact  </span>}
      
    </Tbody>
    <Tfoot>
      <Tr>
        <Th>Total Contact</Th>
        <Th>{index-1}</Th>
      </Tr>
    </Tfoot>
       </Table>
    </TableContainer>
    </div>
  )
}

export default ViewContact