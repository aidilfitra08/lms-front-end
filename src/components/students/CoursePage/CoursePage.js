import React, { useEffect, useState } from "react";
import TestCoursePhoto from "../../../assets/default-course.jpg";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  checkEnrollment,
  fetchCourse,
} from "../../../redux/Student/StudentAction";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { category } from "../category";
import Discussion from "../../discussion/discussion";
import Swal from "sweetalert2";

function CoursePage(props) {
  useEffect(() => {
    document.title = "Kursus";
  }, []);
  const [searchParams, setSearchParams] = useSearchParams();
  const courseID = searchParams.get("courseID");
  const dispatch = useDispatch();
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const navigate = useNavigate();
  if (searchParams.size === 0) {
    navigate("/student/all-course", { replace: true });
  } else if (props.enrollmentStatus === false) {
    navigate(`/student/course-page/enroll-page?courseID=${courseID}`, {
      replace: true,
    });
  }
  function countLessons() {
    var counter = 0;
    props.courseDetail.Sections.map((section) => {
      counter = counter + section.Lessons.length;
    });
    return counter;
  }
  useEffect(() => {
    dispatch(checkEnrollment(courseID));
    dispatch(fetchCourse(courseID));
  }, []);
  return (
    <div
      className={classNames(props.sideBarTrigger ? "pl-64" : "pl-0", "pt-16")}
    >
      <div className=" grid grid-cols-1 space-y-10">
        <div className=" bg-neutral-700 text-white col-span-1 grid grid-cols-2 min-h-80 space-x-4 max-h-fit">
          <div className="col-span-1 space-y-2 p-8 h">
            <p className=" text-4xl font-bold">{props.courseDetail.title}</p>
            <p className="">{props.courseDetail.shortDescription}</p>
            <a href="#" className="block text-md font-semibold">
              {category[props.courseDetail.categoryID - 1]}
            </a>
            <p>
              Kursus Oleh: <span>{props.courseDetail.User.name}</span>
            </p>
          </div>
          <div className="col-span-1 pt-4 xl:mt-8">
            <img
              src={props.courseDetail.thumbnail}
              className="h-72 w-fit border"
            />
          </div>
        </div>

        <div className="col-span-1 h-auto w-3/4 space-y-4 place-self-center">
          <p>{props.courseDetail.description}</p>
        </div>
        <div className="col-span-1 border border-gray-500 h-auto w-2/4 place-self-center shadow p-4 space-y-2">
          <div className=" pb-2 border-b border-gray-500">Daftar Bab</div>
          <div>
            <p>
              {props.courseDetail.Sections.length} Bab .{" "}
              <span>{countLessons()} Materi</span>
            </p>
          </div>
          <div className=" text-base ">
            <ul className="list-none">
              {props.courseDetail.Sections.map((section) => {
                return (
                  <>
                    <hr />
                    <li className="py-2">
                      <a
                        href={
                          "course-page/sections?sectionID=" + section.sectionID
                        }
                        className="mt-2 font-semibold"
                      >
                        {section.title}
                      </a>
                      <ul className="list-none space-y-2 pt-2">
                        {section.Lessons.map((lesson) => {
                          return (
                            <>
                              <hr />
                              <li className="pl-6">{lesson.title}</li>
                            </>
                          );
                        })}
                      </ul>
                    </li>
                  </>
                );
              })}
            </ul>
          </div>
        </div>
        <Discussion courseID={courseID} />
      </div>
    </div>
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
export default connect(mapStateToProps)(CoursePage);
