import "./App.css";
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import Homepage from "./components/students/Homepage";
import Login from "./components/login_register/Login";
// import SimpleVideoConference from "./components/video_conference/simpleVideoConference";
import Navbar2 from "./components/navbar/navbar2";
import Sidenav from "./components/navbar/Sidenav";
import Footer from "./components/footer/Footer";
import Register from "./components/login_register/Register";
import CoursePage from "./components/students/CoursePage/CoursePage";
import CoursesPage from "./components/students/CoursesPage/CoursesPage";
import SectionPage from "./components/students/CoursePage/SectionPage";
import {
  Protected,
  ProtectedFromLecture,
  ProtectedFromStudent,
  ProtectedNotFoundPage,
} from "./components/ProtectedRoute";
import CreateCourse from "./components/lecture/CreateCourse/CreateCourse";
import VideoConference2 from "./components/video_conference/VideoConference2";
import NotFoundPage from "./components/NotFoundPage";

function App() {
  // if (localStorage.getItem("token")) {
  //   console.log(localStorage.getItem("token"));
  // }

  const [sideBarTrigger, setSideBarTrigger] = useState(true);
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route
          path=""
          element={
            <>
              <Protected>
                <Navbar2
                  setSideBarTrigger={setSideBarTrigger}
                  sideBarTrigger={sideBarTrigger}
                />
                <Sidenav sideBarTrigger={sideBarTrigger} />{" "}
                <Homepage sideBarTrigger={sideBarTrigger} />{" "}
              </Protected>
              <Outlet />
            </>
          }
        ></Route>

        <Route path="conference/:meetingId" element={<VideoConference2 />} />
        {/* <Route path="simpleconference" element={<SimpleVideoConference />} /> */}
        <Route
          element={
            <>
              <ProtectedFromLecture>
                <Navbar2
                  setSideBarTrigger={setSideBarTrigger}
                  sideBarTrigger={sideBarTrigger}
                />
                <Sidenav sideBarTrigger={sideBarTrigger} />
                <Outlet />
              </ProtectedFromLecture>
            </>
          }
          path="student"
        >
          <Route
            path=""
            element={<Homepage sideBarTrigger={sideBarTrigger} />}
          />
          <Route path="courses">
            <Route
              index
              element={
                <>
                  <CoursesPage sideBarTrigger={sideBarTrigger} />{" "}
                  <Footer sideBarTrigger={sideBarTrigger} />{" "}
                </>
              }
            />
            <Route path="course-page">
              <Route
                index
                element={<CoursePage sideBarTrigger={sideBarTrigger} />}
              />
              <Route path="sections">
                <Route
                  index
                  element={<SectionPage sideBarTrigger={sideBarTrigger} />}
                />
              </Route>
            </Route>
          </Route>
        </Route>

        <Route
          element={
            <>
              <ProtectedFromStudent>
                <Navbar2
                  setSideBarTrigger={setSideBarTrigger}
                  sideBarTrigger={sideBarTrigger}
                />
                <Sidenav sideBarTrigger={sideBarTrigger} />
              </ProtectedFromStudent>
              <Outlet />
            </>
          }
          path="lecture"
        >
          <Route
            path=""
            element={<Homepage sideBarTrigger={sideBarTrigger} />}
          />
          <Route path="courses">
            <Route
              path="create-course"
              element={<CreateCourse sideBarTrigger={sideBarTrigger} />}
            />
          </Route>
        </Route>
        <Route
          path="*"
          element={
            <>
              <ProtectedNotFoundPage>
                <Navbar2
                  setSideBarTrigger={setSideBarTrigger}
                  sideBarTrigger={sideBarTrigger}
                />
                <Sidenav sideBarTrigger={sideBarTrigger} />
                <NotFoundPage
                  setSideBarTrigger={setSideBarTrigger}
                  sideBarTrigger={sideBarTrigger}
                />
                <Outlet />
              </ProtectedNotFoundPage>
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
