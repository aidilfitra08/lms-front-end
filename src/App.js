import "./App.css";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import Homepage from "./components/students/Homepage";
import HomepageLecture from "./components/lecture/Homepage";
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
import CoursesView from "./components/lecture/CoursesReview/CoursesView";
import JoinMeetingPage from "./components/video_conference/JoinMeetingPage";
import CourseEdit from "./components/lecture/EditCourse/EditCourse";
import Profile from "./components/profile/profile";
import { useDispatch } from "react-redux";
import { userLogout } from "./redux/Credential/UserAction";
import EnrollPage from "./components/students/CoursePage/EnrollPage";
import Calendar from "./components/calendar/calendar";
import CourseDiscussion from "./components/lecture/Course Discussion/CourseDiscussion";
import VerifyPage from "./components/VerifyPage";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

function App() {
  // if (localStorage.getItem("token")) {
  //   console.log(localStorage.getItem("token"));
  // }
  // const user = JSON.parse(localStorage.getItem("user"));
  // console.log(user.accessToken);
  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      const decodedJwt = parseJwt(user.accessToken);

      if (decodedJwt.exp * 1000 < Date.now()) {
        dispatch(userLogout());
        alert("Sesi anda telah habis silahkan login kembali!");
        window.location.reload(true);
      }
    }
  }, []);
  const [sideBarTrigger, setSideBarTrigger] = useState(
    window.innerWidth <= 768 ? false : true
  );
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="verify-email" element={<VerifyPage />} />
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
          <Route
            path="join-conference"
            element={
              <>
                <JoinMeetingPage sideBarTrigger={sideBarTrigger} />
                <Footer sideBarTrigger={sideBarTrigger} />
              </>
            }
          />
          <Route
            path="profile"
            element={
              <>
                <Profile sideBarTrigger={sideBarTrigger} />
                <Footer sideBarTrigger={sideBarTrigger} />
              </>
            }
          />
          <Route
            path="calendar"
            element={
              <>
                <Calendar sideBarTrigger={sideBarTrigger} />
                <Footer sideBarTrigger={sideBarTrigger} />
              </>
            }
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
                element={
                  <>
                    <CoursePage sideBarTrigger={sideBarTrigger} />
                    <Footer sideBarTrigger={sideBarTrigger} />
                  </>
                }
              />
              <Route path="sections">
                <Route
                  index
                  element={
                    <>
                      <SectionPage sideBarTrigger={sideBarTrigger} />
                      <Footer sideBarTrigger={sideBarTrigger} />
                    </>
                  }
                />
              </Route>
            </Route>
            <Route
              path="enroll-page"
              element={
                <>
                  <EnrollPage sideBarTrigger={sideBarTrigger} />
                  <Footer sideBarTrigger={sideBarTrigger} />
                </>
              }
            />
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
            element={<HomepageLecture sideBarTrigger={sideBarTrigger} />}
          />
          <Route path="courses">
            <Route
              path="create-course"
              element={<CreateCourse sideBarTrigger={sideBarTrigger} />}
            />
            <Route
              path="course-page"
              element={<CourseDiscussion sideBarTrigger={sideBarTrigger} />}
            />
            <Route
              path="edit-course"
              element={<CourseEdit sideBarTrigger={sideBarTrigger} />}
            />
            <Route
              path=""
              element={<CoursesView sideBarTrigger={sideBarTrigger} />}
            />
          </Route>
          <Route
            path="profile"
            element={<Profile sideBarTrigger={sideBarTrigger} />}
          />
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
