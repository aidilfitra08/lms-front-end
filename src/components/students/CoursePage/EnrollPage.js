import React, { useEffect, useState } from "react";
import TestCoursePhoto from "../../../assets/man-photo.png";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  checkEnrollment,
  enrollMe,
  fetchCourse,
} from "../../../redux/Student/StudentAction";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { category } from "../category";

function EnrollPage(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const courseID = searchParams.get("courseID");
  const dispatch = useDispatch();
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const navigate = useNavigate();
  const [enrollKey, setEnrollKey] = useState("");
  if (searchParams.size === 0) {
    navigate("/student/all-courses", { replace: true });
    // window.location.reload(true);
  } else if (props.enrollmentStatus === true) {
    navigate(`/student/course-page?courseID=${courseID}`, { replace: true });
    // window.location.reload(true);
  }

  const handleEnroll = () => {
    dispatch(enrollMe(courseID, enrollKey));
  };
  console.log(props.courseDetail);
  useEffect(() => {
    dispatch(fetchCourse(courseID));
    dispatch(checkEnrollment(courseID));
  }, []);

  useEffect(() => {
    if (props.enrollmentStatus === true) {
    }
  }, [props.enrollmentStatus]);

  return (
    <div
      className={classNames(props.sideBarTrigger ? "pl-64" : "pl-0", "pt-16")}
    >
      <div className="bg-neutral-700 text-white space-y-4 p-8 grid grid-cols-2">
        <div className="col-span-1 space-y-2">
          {/* <p>Enroll to this class:</p> */}
          <p className=" text-4xl font-bold">{props.courseDetail.title}</p>
          <p>{props.courseDetail.shortDescription}</p>

          <p className="block text-md font-semibold">
            {category[props.courseDetail.categoryID - 1]}
          </p>

          <p>language: {props.courseDetail.language}</p>
          <p className="">Course by: {props.courseDetail.User.name}</p>
        </div>

        <div className="col-span-1">
          <img src={TestCoursePhoto} className="h-fit w-fit border" />
        </div>
        <div className="space-y-2 col-span-2">
          <label htmlFor="enrollKey">Enrollment Key</label>
          <div className="relative">
            <input
              id="enrollKey"
              name="enrollKey"
              type="text"
              autoComplete="enrollKey"
              required
              className={"block w-full rounded-md text-black"}
              placeholder="Enrollment Key"
              onChange={(event) => setEnrollKey(event.target.value)}
            />
          </div>
        </div>
        <div
          className="col-span-2 mt-10 mb-5"
          // hidden={clickedButton === true ? false : true}
        >
          <button
            className=" w-full p-3 rounded-xl text-black bg-yellow-400 hover:bg-yellow-200"
            onClick={() => handleEnroll()}
          >
            Enroll
          </button>
        </div>
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
export default connect(mapStateToProps)(EnrollPage);
