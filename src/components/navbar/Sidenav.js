import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faCalendarDays,
  faChartLine,
  faEnvelope,
  faHouseChimney,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";

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

  const location = useLocation();
  return (
    <aside
      className={classNames(
        props.sideBarTrigger ? " bg-neutral-300" : " hidden",
        "pt-16 w-64 h-screen fixed inset-y-0 flex flex-col overflow-scroll"
      )}
    >
      <a
        href="/student"
        className="w-full bg-yellow-300 block py-4 hover:bg-yellow-100"
      >
        <FontAwesomeIcon icon={faHouseChimney} size="lg" className="px-3" />{" "}
        Homepage
      </a>
      <a
        href="/student/courses"
        className="w-full bg-yellow-300 block py-4 hover:bg-yellow-100"
      >
        <FontAwesomeIcon icon={faBook} size="lg" className="px-3" /> Courses
      </a>
      {/* <div
        className={classNames(
          coursesDropDown ? " hidden" : "block",
          " bg-slate-800 text-white"
        )}
      >
        <a
          href="#"
          className="block w-full py-3 px-3 bg-slate-800 hover:bg-slate-600"
        >
          Profile
        </a>
        <a
          href="#"
          className="block w-full py-3 px-3 bg-slate-800 hover:bg-slate-600"
        >
          Sign Out
        </a>
      </div> */}
      <a
        href="/student/homepage"
        className="w-full bg-yellow-300 block py-4 hover:bg-yellow-100"
      >
        <FontAwesomeIcon icon={faCalendarDays} size="lg" className="px-3" />{" "}
        Calendar
      </a>
      <a
        href="/student/homepage"
        className="w-full bg-yellow-300 block py-4 hover:bg-yellow-100"
      >
        <FontAwesomeIcon icon={faChartLine} size="lg" className="px-3" />{" "}
        Activities
      </a>
      <a
        href="/student/homepage"
        className="w-full bg-yellow-300 block py-4 hover:bg-yellow-100"
      >
        <FontAwesomeIcon icon={faEnvelope} size="lg" className="px-3" />{" "}
        Messages
      </a>
      <a
        href="/lecture/courses/create-course"
        className="w-full bg-yellow-300 block py-4 hover:bg-yellow-100"
      >
        <FontAwesomeIcon icon={faEnvelope} size="lg" className="px-3" />
        Create Course
      </a>

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
