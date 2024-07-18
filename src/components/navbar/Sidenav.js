import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faBookmark,
  faCalendarDays,
  faChartLine,
  faEnvelope,
  faHouseChimney,
  faPen,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";
import {
  Navigate,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { fetchCourse } from "../../redux/Student/StudentAction";
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};
function Sidenav(props) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const courseID = searchParams.get("courseID");

  const [coursesDropDown, setCoursesDropDown] = useState(false);
  const navigation = [
    { name: "Dashboard", href: "/student", current: true },
    { name: "Login", href: "/login", current: false },
    { name: "Conference", href: "/student/conference", current: false },
    { name: "Calendar", href: "#", current: false },
  ];
  let navigate = useNavigate();

  const loading = useSelector((state) => state.user.loading);
  const token = useSelector((state) => state.user.user.accessToken);
  // const user = JSON.parse(localStorage.getItem("user"));
  const decodedJwt = parseJwt(token);
  const role = decodedJwt.role;

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

  // useEffect(() => {
  //   dispatch(fetchCourse(courseID));
  // }, []);
  console.log(props.courseDetail);
  return (
    <aside
      className={classNames(
        props.sideBarTrigger ? " " : " hidden",
        "pt-16 w-64  h-screen fixed inset-y-0 flex flex-col overflow-auto shadow-2xl bg-white"
      )}
    >
      <a
        href="/"
        className="w-full bg-yellow-400 block py-4 hover:bg-yellow-200 content-center"
      >
        <FontAwesomeIcon
          icon={faHouseChimney}
          size="lg"
          className="px-5 pr-5"
        />
        <span className=" md:inline">Halaman Utama</span>
      </a>
      <a
        href={
          role === "student"
            ? "/student/joined-courses"
            : role === "lecture"
            ? "/lecture/courses"
            : "/"
        }
        className="w-full bg-yellow-400 block py-4 hover:bg-yellow-200"
      >
        <FontAwesomeIcon icon={faBookmark} size="lg" className="px-6" />
        <span className=" md:inline">Kursus Anda</span>
      </a>
      {role === "student" && (
        <a
          href="/student/all-courses"
          className="w-full bg-yellow-400 block py-4 hover:bg-yellow-200"
        >
          <FontAwesomeIcon icon={faBook} size="lg" className="px-6" />
          <span className=" md:inline">Semua Kursus</span>
        </a>
      )}

      {/* <a
        href="/student/calendar"
        className="w-full bg-yellow-400 block py-4 hover:bg-yellow-200"
      >
        <FontAwesomeIcon icon={faCalendarDays} size="lg" className="px-5" />
        <span className="hidden md:inline">Calendar</span>
      </a> */}
      {/* <a
        href="/student/homepage"
        className="w-full bg-yellow-400 block py-4 hover:bg-yellow-200"
      >
        <FontAwesomeIcon icon={faChartLine} size="lg" className="px-5" />
        <span className="hidden md:inline">Activities</span>
      </a> */}
      {/* <a
        href="/student/homepage"
        className="w-full bg-yellow-400 block py-4 hover:bg-yellow-200"
      >
        <FontAwesomeIcon icon={faEnvelope} size="lg" className="px-5" />
        <span className="hidden md:inline">Messages (Lecture & Student)</span>
      </a> */}
      {role === "lecture" && (
        <a
          href="/lecture/courses/create-course"
          className="w-full bg-yellow-400 block py-4 hover:bg-yellow-200"
        >
          <FontAwesomeIcon icon={faPen} size="lg" className="px-5" />
          <span className=" md:inline">Buat Kursus</span>
        </a>
      )}
      {role === "lecture" && (
        <button
          onClick={handleConference}
          className="w-full bg-yellow-400 block py-4 hover:bg-yellow-200"
        >
          <FontAwesomeIcon icon={faVideo} size="lg" className="pr-4  -ml-16" />
          <span className=" md:inline ">Buat Pertemuan</span>
        </button>
      )}
      {role === "student" && (
        <a
          href="/student/join-conference"
          className="w-full bg-yellow-400 block py-4 hover:bg-yellow-200"
        >
          <FontAwesomeIcon icon={faVideo} size="lg" className="pl-6 pr-5" />
          <span className=" md:inline">Gabung Pertemuan</span>
        </a>
      )}

      {/* {location.pathname == "/student/courses" ? (
        <div>
          <hr className="py-[1px] mx-3 my-4 bg-black" />
          <p className="w-full bg-yellow-400 block py-4"> Your Class</p>
          <a
            href="/student/courses/course-page"
            className="w-full bg-yellow-400 block py-4 hover:bg-yellow-400"
          >
            {" "}
            Class Page 1
          </a>
        </div>
      ) : null} */}

      {location.pathname == "/student/courses/course-page" &&
      props.enrollmentStatus ? (
        <div>
          <hr className="py-[1px] mx-3 my-4 bg-black" />
          <p className="w-full  block py-4 px-3"> Section</p>
          {props.courseDetail.Sections.map((section) => {
            return (
              <a
                href={
                  "/student/courses/course-page/sections?sectionID=" +
                  section.sectionID
                }
                className="w-full hover:bg-yellow-300 block py-4 pl-4 font-semibold"
              >
                {section.title}
              </a>
            );
          })}
        </div>
      ) : null}
      {/* <p>Current Pathname: {location.pathname}</p> */}
    </aside>
  );
}

const mapStateToProps = (state) => {
  return {
    courseDetail: state.student.courseDetail,
    loading: state.student.loading,
    errorMessage: state.student.errorMessage,
    enrollmentStatus: state.student.enrollmentStatus,
  };
};

export default connect(mapStateToProps)(Sidenav);
