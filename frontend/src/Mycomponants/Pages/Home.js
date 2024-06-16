import React from 'react'
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react'


function Home() {
    const handelClick=()=>{
        alert("If You Wants To Access Features You Should login ")
      }

  return (
    <div>

         <header id="header-top" className="header-top">
            <ul>
                <li>
                    <div className="header-top-left">
                        <ul>
                            <li className="select-opt">
                                <select name="language" id="language">
                                    <option value="default">EN</option>
                                    <option value="Bangla">BN</option>
                                    <option value="Arabic">AB</option>
                                </select>
                            </li>
                            <li className="select-opt">
                                <select name="currency" id="currency">
                                    <option value="usd">USD</option>
                                    <option value="euro">Euro</option>
                                    <option value="bdt">BDT</option>
                                </select>
                            </li>
                            <li className="select-opt">
                                <a href="#"><span className="lnr lnr-magnifier"></span></a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li className="head-responsive-right pull-right">
                    <div className="header-top-right">
                        <ul>
                            <li className="header-top-contact">
                                +1 222 *** 6565
                            </li>
                            <li className="header-top-contact">
                                <Link to={"login"}> sign in </Link>
                            </li>
                            <li className="header-top-contact">
                            <Link to={"signup"}> register </Link>
                                
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
          </header>
          <section className="top-area">
            <div className="header-area">
                {/* Start Navigation */}
          
                              
                <nav className="navbar navbar-default bootsnav navbar-sticky navbar-scrollspy" data-minus-value-desktop="70" data-minus-value-mobile="55" data-speed="1000">

                    <div className="container">

                        {/* Start Header Navigation */}
                        <div style={{marginLeft:"-80px"}} className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#navbar-menu">
                                <i className="fa fa-bars"></i>
                            </button>
                            <Link className="navbar-brand" to={'/'}> CIVIL PROBLEM RESOLUTION <span>SYSTEM</span></Link>

                        </div>{/*/.navbar-header*/}
                        {/* End Header Navigation */}

                        {/* Collect the nav links, forms, and other content for toggling */}
                        <div  style={{marginRight:"-90px"}} className="collapse navbar-collapse menu-ui-design" id="navbar-menu">
                            <ul className="nav navbar-nav navbar-right" >
                               <li className="scroll active "> 
                                <Link  onClick={handelClick} >Vote For developement</Link>
                                </li>
                                <li className=" scroll "><Link to="/">Home</Link></li>
                                <li className=" scroll "><Link to="problem">Problem</Link></li>
                             
                                <li className="scroll"> 
                                <Link  to="addContact">Contact</Link>
                                </li>
                                <li className="scroll"> 
                                <Link  to="login">user login</Link>
                                </li>
                                <li className="scroll"> 
                                <Link  to="signup">user SignUp</Link>
                                </li>
                                <li className="scroll"> 
                                <Link  to="adminlogin">admin login</Link>
                                </li>

                            </ul>{/*/.nav */}
                        </div>{/* /.navbar-collapse */}
                    </div>{/*/.container*/}
                </nav>{/*/nav*/}
                {/* End Navigation */}
            </div>{/*/.header-area*/}
            <div className="clearfix"></div>
        </section>

         <Outlet/>

      
        <footer id="footer" className="footer">
            <div className="container">
                {/* <div className="footer-menu">
                    <div className="row">
                        <div className="col-sm-3">
                            <div className="navbar-header">
                                <a className="navbar-brand" href="index.html">list<span>race</span></a>
                            </div>
                        </div>
                        <div className="col-sm-9">
                            <ul className="footer-menu-item">
                                <li className="scroll"><a href="#works">how it works</a></li>
                                <li className="scroll"><a href="#explore">explore</a></li>
                                <li className="scroll"><a href="#reviews">review</a></li>
                                <li className="scroll"><a href="#blog">blog</a></li>
                                <li className="scroll"><a href="#contact">contact</a></li>
                                <li className="scroll"><a href="#contact">my account</a></li>
                            </ul>
                        </div>
                    </div>
                </div> */}
                <div className="hm-footer-copyright">
                    <div className="row">
                        <div className="col-sm-5">
                            <p>
                                &copy;copyright. designed and developed by <a href="https://www.themesine.com/">Civil Problem Resolution System</a>
                            </p>
                        </div>
                        <div className="col-sm-7">
                            <div className="footer-social">
                                <span><i className="fa fa-phone"> +1  (222) *** 8888</i></span>
                                <a href="#"><i className="fa fa-facebook"></i></a>
                                <a href="#"><i className="fa fa-twitter"></i></a>
                                <a href="#"><i className="fa fa-linkedin"></i></a>
                                <a href="#"><i className="fa fa-google-plus"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="scroll-Top">
                <div className="return-to-top">
                    <i className="fa fa-angle-up " id="scroll-top" data-toggle="tooltip" data-placement="top" title="" data-original-title="Back to Top" aria-hidden="true"></i>
                </div>
            </div>
        </footer>
	
    </div>
  )
}

export default Home