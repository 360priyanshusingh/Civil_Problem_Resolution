import React, { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import {Menu,MenuButton,MenuList,MenuItem,MenuItemOption,MenuGroup,MenuOptionGroup,MenuDivider,Avatar,} from '@chakra-ui/react'
import axios from 'axios';

function UserPanel() {
    axios.defaults.withCredentials = true;
    const navigate=useNavigate()
    const [user,setUser]=useState(null)

    
   const getuser= async(id)=>{
    axios.get(`http://localhost:5000/user/getuser/${id}`)
    .then((result)=>{
        console.log(result.data)
        setUser(result.data.result)
    })
    .catch((error)=>{
    console.log(error)
    })
}  

useEffect(() => {
axios
  .get("http://localhost:5000/user/home")
  .then((result) => {
    console.log(result.data);
    if (result.data && result.data.Status === "Success") {
      getuser(result.data.user._id)
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

  const handleLogout=()=>{
    axios.get('http://localhost:5000/user/logout').
    then((result)=>{
        if(result.data.Status==='Logout successful'){
            alert("Your Logout SuccessFully!")
            navigate('/')
        }else{
            alert("Your not Logout SuccessFully!")
        }
    }).catch(()=>{
        alert("Your not Logout SuccessFully deo to backend error!")
    })

  }
    

  return (
    <div>
       <section className="top-area">
            <div className="header-area">
                {/* Start Navigation */}
          
                              
                <nav className="navbar navbar-default bootsnav navbar-sticky navbar-scrollspy" data-minus-value-desktop="70" data-minus-value-mobile="55" data-speed="1000">

                    <div className="container">

                        {/* Start Header Navigation */}
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu">
                                <i className="fa fa-bars"></i>
                            </button>
                            <Link className="navbar-brand" to={'/userdashBoard'}>User<span>Panel</span></Link>

                        </div>{/*/.navbar-header*/}
                        {/* End Header Navigation */}

                        {/* Collect the nav links, forms, and other content for toggling */}
                        <div className="collapse navbar-collapse menu-ui-design" id="navbar-menu" >
                           
                            <div  className="nav navbar-nav navbar-right"  style={{ display:"flex" ,justifyContent:"space-between"}}  >
                            <ul className="nav navbar-nav navbar-right" style={{marginRight:"10px"}} >
                                <li className=" scroll active"><Link to="userdashBoard">DashBoard</Link></li>
                                <li className=" scroll "><Link to="addUserProblem">Add Problem</Link></li>
                            
                               
                              
                                {/* <li className="scroll">
                                <Menu className="scroll"  >
                                <MenuButton >
                                <Avatar size={'md'} cursor={'pointer'} name={"admin"}  />
                                </MenuButton>
                                <MenuList >
                                <MenuItem onClick={handleLogout} > Logout  </MenuItem>
                                   <Link to={'changePassword'} > <MenuItem > Chanage Password </MenuItem> </Link>
                                 </MenuList>
                                   </Menu>
                                </li> */}
                          
                            </ul>{/*/.nav */}
                            <ul className="nav navbar-nav navbar-right" style={{marginRight:"40px"}} >
                             
                               
                             <li className="scroll active " style={{marginTop:"32px"}}>
                             <Menu className="scroll active" >
                             <MenuButton >
                             <li className="scroll active"><Link  style={{ color:"gray" }} >VIEW PROBLEM</Link></li>
                             </MenuButton>
                             <MenuList >
                             <MenuItem  > <Link to={'viewUserAllProblem'} >  View All Problem  </Link> </MenuItem>
                             <MenuDivider />
                             <MenuItem > <Link to={'viewUserNotStartedProblem'} > View Not Started Problem </Link> </MenuItem>
                             <MenuDivider />
                             <MenuItem > <Link to={'viewUserInProgessProblem'} > View In Progess Problem </Link> </MenuItem>
                             <MenuDivider />
                             <MenuItem > <Link to={'viewUserSolvedProblem'} > View Solved Problem </Link> </MenuItem>
                              </MenuList>
                                </Menu>
                             </li>
                       
                         </ul>{/*/.nav */}
                            <Menu className="nav navbar-nav navbar-right scroll" >
                                <MenuButton className="scroll">
                                <Avatar size={'md'} cursor={'pointer'} name={user?.name} src={`http://localhost:5000/images/${user?.pic}`}  />
                                </MenuButton>
                                <MenuList >
                                <MenuItem onClick={handleLogout} > Logout  </MenuItem>
                                <MenuDivider />
                                <MenuItem >    <Link to={'userPasswordChange'} >  Change Password  </Link> </MenuItem>
                                <MenuDivider />
                                <MenuItem > <Link to={'viewProfile'} >  My Profile  </Link> </MenuItem>

                                 </MenuList>
                            </Menu>
                           </div>
                        </div>{/* /.navbar-collapse */}
                       
                    </div>{/*/.container*/}
                </nav>{/*/nav*/}
                {/* End Navigation */}
            </div>{/*/.header-area*/}
            <div className="clearfix"></div>
      </section>
      <Outlet/>

    </div>
  )
}

export default UserPanel