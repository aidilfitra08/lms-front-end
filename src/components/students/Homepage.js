import React, { useEffect } from "react";
import Sidenav from "../navbar/Sidenav";
import Footer from "../footer/Footer";
import CourseCard from "./CourseCard";
import { connect, useDispatch } from "react-redux";
import {
  fetchAllCourses,
  fetchAllJoinedCourses,
} from "../../redux/Student/StudentAction";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ReactPlayer from "react-player";

function Homepage(props) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  // const testingMap = [1, 2, 3, 4, 5];
  const joinedCourses = props.course.allJoinedCourses;
  const allCourses = props.course.allCourses;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllJoinedCourses());
    dispatch(fetchAllCourses(0, 5));
  }, []);
  return (
    <>
      {/* <Sidenav/> */}
      <div
        className={classNames(
          props.sideBarTrigger ? "pl-64" : "pl-0",
          "pt-16 grid grid-cols-12 "
        )}
      >
        <div className="col-span-9 ml-6 mt-6 space-y-2">
          <p className="col-span-3 text-4xl">Your Joined Course(s)</p>
          <div className="grid grid-cols-3 py-6 ">
            {joinedCourses.map((course) => (
              <div className="col-span-1">
                <CourseCard courseDetail={course} />
              </div>
            ))}
          </div>
          <p className="col-span-3 text-4xl">All Available Courses</p>
          <div className="grid grid-cols-3 py-6 ">
            {allCourses.map((course) => (
              <div className="col-span-1">
                <CourseCard courseDetail={course} />
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-3 m-6">
          <Calendar value={Date.now()} />
        </div>
      </div>
      <Footer sideBarTrigger={props.sideBarTrigger} />
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    course: state.student,
  };
};

export default connect(mapStateToProps)(Homepage);
