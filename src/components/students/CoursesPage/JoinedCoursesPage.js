import React, { useEffect } from "react";
import CourseCard from "../CourseCard";
import { connect, useDispatch } from "react-redux";
import {
  fetchAllCourses,
  fetchAllJoinedCourses,
} from "../../../redux/Student/StudentAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function JoinedCoursesPage(props) {
  useEffect(() => {
    document.title = "Kursus yang Diikuti";
  }, []);
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const courses = props.course.allJoinedCourses;
  const dispatch = useDispatch();
  const testingCoursesMap = [1, 2, 3, 4, 5];
  useEffect(() => {
    dispatch(fetchAllJoinedCourses());
  }, []);
  return (
    <div
      className={classNames(
        props.sideBarTrigger ? "pl-64 max-md:pl-0" : "pl-0",
        " pt-16"
      )}
    >
      <div className="grid grid-cols-1 mt-6 space-y-2">
        <p className="text-4xl col-span-1 pl-2">Kursus Yang Diikuti</p>
        <div className="col-span-1">
          <div className="grid grid-cols-4 max-lg:grid-cols-2">
            {courses.map((course) => (
              <div className="col-span-1">
                <CourseCard courseDetail={course} />
              </div>
            ))}
          </div>
        </div>
      </div>
      {props.course.loading ? (
        <div>
          <FontAwesomeIcon icon={faSpinner} size="lg" />
        </div>
      ) : props.course.errorMessage ? (
        <div>
          <h2>{props.course.errorMessage}</h2>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    course: state.student,
  };
};

export default connect(mapStateToProps)(JoinedCoursesPage);
