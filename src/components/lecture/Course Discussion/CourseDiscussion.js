import React, { useEffect, useState } from "react";
import TestCoursePhoto from "../../../assets/man-photo.png";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const courseID = searchParams.get("courseID");
  const dispatch = useDispatch();
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const navigate = useNavigate();

  // const courseState = useSelector((state) => state.studentCourse);
  // const courseDetail = courseState.courseDetail;

  console.log(props.courseDetail);
  // useEffect(() => {

  // }, []);
  const testData = {
    sections: [
      {
        name: "section 1",
        lessons: [
          {
            name: "section 1 lesson 1",
          },
          {
            name: "section 1 lesson 2",
          },
          {
            name: "section 1 lesson 3",
          },
        ],
      },
      {
        name: "section 2",
        lessons: [
          {
            name: "section 2 lesson 1",
          },
          {
            name: "section 2 lesson 2",
          },
        ],
      },
    ],
  };

  function countLessons() {
    var counter = 0;
    props.courseDetail.sections.map((section) => {
      counter = counter + section.Lessons.length;
    });
    // console.log(counter);
    return counter;
  }
  useEffect(() => {
    if (searchParams.size === 0) {
      navigate("/", { replace: true });
      // window.location.reload(true);
    }
    // dispatch(checkEnrollment(courseID));
    // if (props.enrollmentStatus === false) {
    //   navigate(`/student/courses/enroll-page?courseID=${courseID}`, {
    //     replace: true,
    //   });

    dispatch(getCourseDetail(courseID));
  }, [props.enrollmentStatus]);
  useEffect(() => {
    // if (searchParams.size === 0) {
    //   navigate("/student/courses", { replace: true });
    //   // window.location.reload(true);
    // }
    // dispatch(checkEnrollment(courseID));
    // if (props.enrollmentStatus === false) {
    //   navigate(`/student/courses/enroll-page?courseID=${courseID}`, {
    //     replace: true,
    //   });
    // }
    // dispatch(fetchCourse(courseID));
  }, [props.enrollmentStatus]);
  console.log(props.courseDetail);
  return (
    <div
      className={classNames(props.sideBarTrigger ? "pl-64" : "pl-0", "pt-16")}
    >
      <div className=" grid grid-cols-1 space-y-10">
        <div className=" bg-neutral-700 text-white col-span-1 grid grid-cols-2 min-h-80 space-x-4 max-h-fit">
          <div className="col-span-1 space-y-2 p-8 h">
            {props.loading ? (
              <div>
                <FontAwesomeIcon icon={faSpinner} size="lg" />
              </div>
            ) : props.errorMessage ? (
              <div>
                <h2>{props.errorMessage}</h2>
              </div>
            ) : (
              ""
            )}
            <p className=" text-4xl font-bold">
              {console.log(props.courseDetail.basicInformation.title)}
              {props.courseDetail.basicInformation.title}
            </p>
            <p className="">
              {props.courseDetail.basicInformation.shortDescription}
            </p>
            {/* <p className=" text-lg">estimate time: hours</p> */}
            <a href="#" className="block text-md font-semibold">
              {category[props.courseDetail.basicInformation.categoryID - 1]}
            </a>
            {/* <p>total section: 30</p> */}
            <p>
              Course by: <span>{props.user.name}</span>
            </p>
            <p>
              Course Status:{" "}
              <span>{props.courseDetail.basicInformation.courseStatus}</span>
            </p>
          </div>
          <div className="col-span-1 pt-4 xl:mt-8">
            <img src={TestCoursePhoto} className="h-72 w-fit border" />
          </div>
        </div>

        <Discussion courseID={courseID} />
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    // courseDetail: state.student.courseDetail,
    courseDetail: state.lecture,
    user: state.user.user,
    loading: state.lecture.loading,
    errorMessage: state.student.errorMessage,
    enrollmentStatus: state.student.enrollmentStatus,
  };
};
export default connect(mapStateToProps)(CourseDiscussion);
