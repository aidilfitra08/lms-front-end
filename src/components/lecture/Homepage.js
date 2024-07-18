import React, { useEffect, useState } from "react";
import Sidenav from "../navbar/Sidenav";
import Footer from "../footer/Footer";
import CourseCard from "./CourseCard";
import { connect, useDispatch } from "react-redux";
import { fetchAllJoinedCourses } from "../../redux/Student/StudentAction";
import {
  deleteCourse,
  fetchAllCourses,
  updateCourseStatus,
} from "../../redux/Lecture/LectureAction";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ReactPlayer from "react-player";

function Homepage(props) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  // const testingMap = [1, 2, 3, 4, 5];
  const lecturedCourses = props.course;
  // const allCourses = props.course.allCourses;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllJoinedCourses());
    dispatch(fetchAllCourses(0, 5));
  }, []);

  const [numberToMap, setNumberToMap] = useState(
    window.innerWidth <= 1024 ? 2 : 3
  );

  // const mapAllCourses = (number) => (
  //   <>
  //     {allCourses.slice(0, number).map((course) => (
  //       <div className="col-span-1">
  //         <CourseCard courseDetail={course} />
  //       </div>
  //     ))}
  //   </>
  // );

  const mapYourCourses = (number) => (
    <>
      {lecturedCourses.slice(0, number).map((course) => (
        <div className="col-span-1">
          <CourseCard courseDetail={course} />
        </div>
      ))}
    </>
  );

  const minHandler = () => setNumberToMap(2);
  const maxHandler = () => setNumberToMap(3);
  useEffect(() => {
    const minMedia = window.matchMedia("(min-width: 1025px)");
    minMedia.addEventListener("change", minHandler);

    const maxMedia = window.matchMedia("(max-width: 1026px)");
    maxMedia.addEventListener("change", maxHandler);
    return () => {
      minMedia.removeEventListener("change", minHandler);
      maxMedia.removeEventListener("change", maxHandler);
    };
  }, [window.innerWidth]);
  return (
    <>
      {/* <Sidenav/> */}
      <div
        className={classNames(
          props.sideBarTrigger ? "pl-64 max-md:pl-0" : "pl-0",
          "pt-16 grid grid-cols-12 "
        )}
      >
        <div className=" col-span-9 min-lg:ml-6 max-lg:pr-2 mt-6 space-y-2 max-lg:col-span-12 max-md:pl-2">
          <div className="flex flex-row justify-between">
            <p className="text-4xl max-md:text-2xl">Kursus anda ajarkan</p>
            <a
              href="/lecture/courses"
              className=" bg-yellow-400 hover:bg-yellow-200 px-3 py-2 rounded-md"
            >
              Show More
            </a>
          </div>

          {/* <div className="flex flex-row mx-10 my-5 justify-between">
            <p className=" text-2xl font-bold">Courses</p>

            <a
              href="/lecture/courses/create-course"
              className=" bg-yellow-400 hover:bg-yellow-200 px-3 py-2 rounded-md"
            >
              Create Course
            </a>
          </div> */}

          <div className="grid grid-cols-3 py-6 max-xl:grid-cols-2">
            {mapYourCourses(numberToMap)}
          </div>
        </div>
        <div className="col-span-3 m-6 max-lg:hidden">
          <Calendar value={Date.now()} />
        </div>
      </div>
      <Footer sideBarTrigger={props.sideBarTrigger} />
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    course: state.lecture.courses,
  };
};

export default connect(mapStateToProps)(Homepage);
