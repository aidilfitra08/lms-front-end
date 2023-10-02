import React, { useEffect } from "react";
import Sidenav from "../navbar/Sidenav";
import Footer from "../footer/Footer";
import CourseCard from "./CourseCard";
import { connect, useDispatch } from "react-redux";
import { fetchAllCourses } from "../../redux/Student/StudentAction";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function Homepage(props) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  // const testingMap = [1, 2, 3, 4, 5];
  const courses = props.course.allCourses;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllCourses());
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
        <div className="col-span-9 grid grid-cols-3 py-6">
          {courses.map((course) => (
            <div className="col-span-1">
              <CourseCard courseDetail={course} />
            </div>
          ))}
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
    course: state.studentCourse,
  };
};

export default connect(mapStateToProps)(Homepage);
