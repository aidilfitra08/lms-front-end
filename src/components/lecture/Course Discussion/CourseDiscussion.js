import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  checkEnrollment,
  fetchCourse,
} from "../../../redux/Student/StudentAction";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { category } from "../../students/category";
import Discussion from "../../discussion/discussion";
import { getCourseDetail } from "../../../redux/Lecture/LectureAction";

function CourseDiscussion(props) {
  useEffect(() => {
    document.title = "Diskusi Kursus";
  }, []);
  const [searchParams, setSearchParams] = useSearchParams();
  const courseID = searchParams.get("courseID");
  const dispatch = useDispatch();
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const navigate = useNavigate();

  useEffect(() => {
    if (searchParams.size === 0) {
      navigate("/", { replace: true });
    }
    dispatch(getCourseDetail(courseID));
  }, [props.enrollmentStatus]);

  return (
    <div
      className={classNames(
        props.sideBarTrigger ? "pl-64" : "pl-0",
        "pt-16 max-md:pl-0"
      )}
    >
      <div className=" grid grid-cols-1 space-y-10">
        <div className=" bg-neutral-700 text-white col-span-1 grid grid-cols-2 max-md:grid-cols-1 min-h-80 max-h-fit">
          <div className="col-span-1 space-y-2 p-8 content-center">
            <p className=" text-5xl font-bold">
              {props.courseDetail.basicInformation.title}
            </p>
            <p className="">
              {props.courseDetail.basicInformation.shortDescription}
            </p>
            <a href="#" className="block text-md font-semibold">
              {category[props.courseDetail.basicInformation.categoryID - 1]}
            </a>
            <p>
              Status Kursus:{" "}
              <span>{props.courseDetail.basicInformation.courseStatus}</span>
            </p>
          </div>
          <div className="col-span-1 pt-4 bg-white max-md:order-first max-md:-ml-4">
            <img
              src={props.courseDetail.basicInformation.thumbnail}
              className="h-72 w-full object-contain"
            />
          </div>
        </div>

        <Discussion courseID={courseID} />
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    courseDetail: state.lecture,
    user: state.user.user,
    loading: state.lecture.loading,
    errorMessage: state.student.errorMessage,
    enrollmentStatus: state.student.enrollmentStatus,
  };
};
export default connect(mapStateToProps)(CourseDiscussion);
