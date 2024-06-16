// import logo from './logo.svg';
// import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Mycomponants/Pages/Home';
import DataHome from './Mycomponants/Pages/DataHome';
import Login from './Mycomponants/UserPages/Login';
import SignUp from './Mycomponants/UserPages/SignUp';
import AdminLogin from './Mycomponants/AdminPages.js/AdminLogin';
import AdminPanel from './Mycomponants/AdminPages.js/AdminPanel';
import DashBoard from './Mycomponants/AdminPages.js/DashBoard';
import UserPanel from './Mycomponants/UserPages/UserPanel';
import UserDashBoard from './Mycomponants/UserPages/UserDashBoard';
import ViewPendingUser from './Mycomponants/AdminPages.js/ViewPendingUser';
import ViewAllUser from './Mycomponants/AdminPages.js/ViewAllUser';
import ChangeUserStatus from './Mycomponants/AdminPages.js/ChangeUserStatus';
import ChangePassword from './Mycomponants/AdminPages.js/ChangePassword';
import UserPasswordChange from './Mycomponants/UserPages/UserPasswordChange';
import AddProblem from './Mycomponants/AdminPages.js/AddProblem';
import ViewAllProblem from './Mycomponants/AdminPages.js/ViewAllProblem';
import ViewNotStartedProblem from './Mycomponants/AdminPages.js/ViewNotStartedProblem';
import UpdateNotStartedStatus from './Mycomponants/AdminPages.js/UpdateNotStartedStatus';
import ViewInProgressProblem from './Mycomponants/AdminPages.js/ViewInProgessProblem';
import UpdateInProgessStatus from './Mycomponants/AdminPages.js/UpdateInProgessStatus';
import ViewSolvedProblem from './Mycomponants/AdminPages.js/ViewSolvedProblem';
import ViewUserNotStartedProblem from './Mycomponants/UserPages/ViewUserNotStartedProblem';
import ViewUserInProgressProblem from './Mycomponants/UserPages/ViewUserInProgessProblem';
import ViewUserSolvedProblem from './Mycomponants/UserPages/ViewUserSolvedProblem';
import ViewUserAllProblem from './Mycomponants/UserPages/ViewUserAllProblem';
import ViewUserDiscription from './Mycomponants/UserPages/ViewUserDiscription';
import SendFeedback from './Mycomponants/UserPages/SendFeedBack';
import ViewFeedback from './Mycomponants/AdminPages.js/ViewFeedback';
import AddUserProblem from './Mycomponants/UserPages/AddUserProblem';
import ViewContact from './Mycomponants/AdminPages.js/ViewContact';
import ViewProfile from './Mycomponants/UserPages/ViewProfile';
import EditeProfile from './Mycomponants/UserPages/EditeProfile';
import Contact from './Mycomponants/Pages/Contact';
import Problem from './Mycomponants/Pages/Problem';

function App() {
  return (
    <div className="App">
    <Routes>
      <Route path="/" element={<Home />} >
        <Route index element={<DataHome />}  />
        <Route path='login' element={<Login />}  />
        <Route path='signup' element={<SignUp />}  />   
        <Route path='adminlogin' element={<AdminLogin/>}/>   
        <Route path='addContact' element={<Contact/>}/>
        <Route path='problem' element={<Problem/>}/>
      </Route>
      <Route path="/" element={<AdminPanel />} > 
        <Route path='dashBoard' element={<DashBoard />}  />
        <Route path='gerPandingUser' element={<ViewPendingUser/>}  />
        <Route path='getAllUser' element={<ViewAllUser/>}  />
        <Route path='updateUserStatus' element={<ChangeUserStatus/>}  />
        <Route path='changePassword' element={<ChangePassword/>}  />
        <Route path='addProblem' element={<AddProblem/>}  />
        <Route path='viewAllProblem' element={<ViewAllProblem/>}  />
        <Route path='viewNotStartedProblem' element={<ViewNotStartedProblem/>}  />
        <Route path='updateNotStartedProblem' element={<UpdateNotStartedStatus/>}  />
        <Route path='updateInProgessProblem' element={<UpdateInProgessStatus/>}  />
        <Route path='viewInProgessProblem' element={<ViewInProgressProblem/>}/>
        <Route path='viewSolvedProblem' element={<ViewSolvedProblem/>}  />
        <Route path='viewAdminDiscription' element={<ViewUserDiscription/>}/>
        <Route path='viewFeedback' element={<ViewFeedback/>}/>
        <Route path='viewContact' element={<ViewContact/>}/>
      </Route>
      <Route path="/" element={<UserPanel />} > 
        <Route path='userdashBoard' element={<UserDashBoard />}  />
        <Route path='userPasswordChange' element={<UserPasswordChange/>}  />
        <Route path='viewUserNotStartedProblem' element={<ViewUserNotStartedProblem/>}/>
        <Route path='viewUserInProgessProblem' element={<ViewUserInProgressProblem/>}/>
        <Route path='viewUserSolvedProblem' element={<ViewUserSolvedProblem/>}/>
        <Route path='viewUserAllProblem' element={<ViewUserAllProblem/>}/>
        <Route path='viewUserDiscription' element={<ViewUserDiscription/>}/>
        <Route path='sendFeedback' element={<SendFeedback/>}/>
        <Route path='addUserProblem' element={<AddUserProblem/>}/>
        <Route path='viewProfile' element={<ViewProfile/>}/>
        <Route path='editeProfile' element={<EditeProfile/>}/>
      </Route>
      
    </Routes>
  </div>
  );
}

export default App;
