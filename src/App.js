import logo from './logo.svg';
import './App.css';
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";

import Homepage from './components/students/Homepage';
import Login from './components/login_register/Login';
import SimpleVideoConference from './components/video_conference/simpleVideoConference';
import VideoConference from './components/video_conference/VideoConference';
import Navbar from './components/navbar/navbar';
import Navbar2 from './components/navbar/navbar2';
import Sidenav from './components/navbar/Sidenav';
import Footer from './components/footer/Footer';
import Register from './components/login_register/Register';

function App() {
//   const LoginContainer = () => (
//     <div className="container">
//       {/* <Route exact path="/" render={() => <Redirect to="/login" />} /> */}
//       <Route path="/login" element={<Login />}/>
//     </div>
//   )
  
//   const DefaultContainer = () => (
//     <div>
//     {/* <Header toggleAlert={this.toggleAlert} /> */}
//       <div className="container">
//         <Navbar />
//         <Route path='/login' element={<Login />}/>
//         <Route path="/conference" element={<SimpleVideoConference/>} />
//       </div>
//     </div>
//  )

  const [sideBarTrigger, setSideBarTrigger] = useState(true);
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path='login' element={<Login />}/>
        <Route path='register' element={<Register />}/>
        <Route path="" element={<Homepage sideBarTrigger={sideBarTrigger} />} />
        <Route path="conference" element={<VideoConference/>} />
        {/* <Route path="simpleconference" element={<SimpleVideoConference/>} /> */}
        <Route
          element={
            <>
              {/* <Navbar /> */}
              <Navbar2 setSideBarTrigger={setSideBarTrigger} sideBarTrigger={sideBarTrigger}/>
              <Sidenav sideBarTrigger={sideBarTrigger} />
              <Outlet/>
            </>
          }
          path='student'
        >
          
          <Route path="" element={<Homepage sideBarTrigger={sideBarTrigger} />} />
          {/* <Route path="conference" element={<SimpleVideoConference/>} /> */}
        </Route>
        
        <Route
          element={
            <>
              {/* <Navbar /> */}
              <Sidenav />
              <Outlet/>
            </>
          }
          path='lecture'
        >
          
          <Route path="" element={<Homepage />} />
          {/* <Route path="conference" element={<SimpleVideoConference/>} /> */}
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
