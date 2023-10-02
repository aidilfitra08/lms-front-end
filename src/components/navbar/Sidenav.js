import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faCalendarDays,
  faChartLine,
  faEnvelope,
  faHouseChimney,
} from "@fortawesome/free-solid-svg-icons";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

function Sidenav(props) {
  function close_button() {}
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const [coursesDropDown, setCoursesDropDown] = useState(false);
  const navigation = [
    { name: "Dashboard", href: "/student", current: true },
    { name: "Login", href: "/login", current: false },
    { name: "Conference", href: "/student/conference", current: false },
    { name: "Calendar", href: "#", current: false },
  ];
  let navigate = useNavigate();
  const loading = useSelector((state) => state.user.loading);
  const handleConference = () => {
    axios
      .post(process.env.REACT_APP_BASE_URL + "/apiv1/conference/create-room")
      .then((res) => {
        let roomId = res.data.payload.roomId;
        console.log(roomId);
        navigate("/conference/" + roomId, { replace: true });
        window.location.reload(true);
      })
      .catch((err) => {
        alert(err);
      });
  };
  const location = useLocation();
  let sections = useSelector((state) => state.studenCourse);
  console.log(sections);
  return (
    <aside
      className={classNames(
        props.sideBarTrigger ? " bg-neutral-300" : " hidden",
        "pt-16 w-64 max-md:w-16 h-screen fixed inset-y-0 flex flex-col overflow-auto"
      )}
    >
      <a
        href="/student"
        className="w-full bg-yellow-300 block py-4 hover:bg-yellow-100 content-center"
      >
        <FontAwesomeIcon
          icon={faHouseChimney}
          size="lg"
          className="px-5 pr-[16px]"
        />
        <span className="hidden md:inline">Homepage</span>
      </a>
      <a
        href="/student/courses"
        className="w-full bg-yellow-300 block py-4 hover:bg-yellow-100"
      >
        <FontAwesomeIcon icon={faBook} size="lg" className="px-5" />
        <span className="hidden md:inline">Courses</span>
      </a>
      <a
        href="/student/homepage"
        className="w-full bg-yellow-300 block py-4 hover:bg-yellow-100"
      >
        <FontAwesomeIcon icon={faCalendarDays} size="lg" className="px-5" />
        <span className="hidden md:inline">Calendar</span>
      </a>
      <a
        href="/student/homepage"
        className="w-full bg-yellow-300 block py-4 hover:bg-yellow-100"
      >
        <FontAwesomeIcon icon={faChartLine} size="lg" className="px-5" />
        <span className="hidden md:inline">Activities</span>
      </a>
      <a
        href="/student/homepage"
        className="w-full bg-yellow-300 block py-4 hover:bg-yellow-100"
      >
        <FontAwesomeIcon icon={faEnvelope} size="lg" className="px-5" />
        <span className="hidden md:inline">Messages (Lecture & Student)</span>
      </a>
      <a
        href="/lecture/courses/create-course"
        className="w-full bg-yellow-300 block py-4 hover:bg-yellow-100"
      >
        <FontAwesomeIcon icon={faEnvelope} size="lg" className="px-5" />
        <span className="hidden md:inline">Create Course (Lecture)</span>
      </a>
      <button
        onClick={handleConference}
        className="w-full bg-yellow-300 block py-4 hover:bg-yellow-100"
      >
        <FontAwesomeIcon
          icon={faEnvelope}
          size="lg"
          className="px-5 md:-ml-12"
        />
        <span className="hidden md:inline">Conference (Lecture)</span>
      </button>

      {location.pathname == "/student/courses" ? (
        <div>
          <hr className="py-[1px] mx-3 my-4 bg-black" />
          <p className="w-full bg-yellow-300 block py-4"> Your Class</p>
          <a
            href="/student/courses/course-page"
            className="w-full bg-yellow-300 block py-4 hover:bg-yellow-100"
          >
            {" "}
            Class Page 1
          </a>
        </div>
      ) : null}

      {location.pathname == "/student/courses/course-page" ? (
        <div>
          <hr className="py-[1px] mx-3 my-4 bg-black" />
          <p className="w-full bg-yellow-300 block py-4"> Section</p>
          <a
            href="/student/courses/course-page/sections"
            className="w-full bg-yellow-300 block py-4 hover:bg-yellow-100"
          >
            {" "}
            Section 1
          </a>
          <a
            href="/student/courses/course-page/sections"
            className="w-full bg-yellow-300 block py-4 hover:bg-yellow-100"
          >
            {" "}
            Section 1
          </a>
          <a
            href="/student/courses/course-page/sections"
            className="w-full bg-yellow-300 block py-4 hover:bg-yellow-100"
          >
            {" "}
            Section 1
          </a>
          <a
            href="/student/courses/course-page/sections"
            className="w-full bg-yellow-300 block py-4 hover:bg-yellow-100"
          >
            {" "}
            Section 1
          </a>
          <a
            href="/student/courses/course-page/sections"
            className="w-full bg-yellow-300 block py-4 hover:bg-yellow-100"
          >
            {" "}
            Section 1
          </a>
          <a
            href="/student/courses/course-page/sections"
            className="w-full bg-yellow-300 block py-4 hover:bg-yellow-100"
          >
            {" "}
            Section 1
          </a>
          <a
            href="/student/courses/course-page/sections"
            className="w-full bg-yellow-300 block py-4 hover:bg-yellow-100"
          >
            {" "}
            Section 1
          </a>
          <a
            href="/student/courses/course-page/sections"
            className="w-full bg-yellow-300 block py-4 hover:bg-yellow-100"
          >
            {" "}
            Section 1
          </a>
          <a
            href="/student/courses/course-page/sections"
            className="w-full bg-yellow-300 block py-4 hover:bg-yellow-100"
          >
            {" "}
            Section 1
          </a>
          <a
            href="/student/courses/course-page/sections"
            className="w-full bg-yellow-300 block py-4 hover:bg-yellow-100"
          >
            {" "}
            Section 1
          </a>
          <a
            href="/student/courses/course-page/sections"
            className="w-full bg-yellow-300 block py-4 hover:bg-yellow-100"
          >
            {" "}
            Section 1
          </a>
          <a
            href="/student/courses/course-page/sections"
            className="w-full bg-yellow-300 block py-4 hover:bg-yellow-100"
          >
            {" "}
            Section 1
          </a>
          <a
            href="/student/courses/course-page/sections"
            className="w-full bg-yellow-300 block py-4 hover:bg-yellow-100"
          >
            {" "}
            Section 1
          </a>
          <a
            href="/student/courses/course-page/sections"
            className="w-full bg-yellow-300 block py-4 hover:bg-yellow-100"
          >
            {" "}
            Section 1
          </a>
          <a
            href="/student/courses/course-page/sections"
            className="w-full bg-yellow-300 block py-4 hover:bg-yellow-100"
          >
            {" "}
            Section 1
          </a>
          <a
            href="/student/courses/course-page/sections"
            className="w-full bg-yellow-300 block py-4 hover:bg-yellow-100"
          >
            {" "}
            Section 1
          </a>
        </div>
      ) : null}
      <p>Current Pathname: {location.pathname}</p>
    </aside>
  );
}

export default Sidenav;
