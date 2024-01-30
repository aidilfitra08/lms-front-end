import React, { useEffect } from "react";
import CourseCard from "../CourseCard";
import Footer from "../../footer/Footer";
import { connect, useDispatch } from "react-redux";
import {
  fetchAllCourses,
  fetchAllJoinedCourses,
} from "../../../redux/Student/StudentAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function CoursesPage(props) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const courses = props.course.allJoinedCourses;
  const dispatch = useDispatch();
  // const courses = useSelector((state)=>state.studentCourse.allCourses)
  const testingCoursesMap = [1, 2, 3, 4, 5];
  useEffect(() => {
    dispatch(fetchAllJoinedCourses());
  }, []);
  return (
    <div
      className={classNames(props.sideBarTrigger ? "pl-64" : "pl-0", " pt-16")}
    >
      <div className="grid grid-cols-2 mt-6 space-y-2">
        <p className="text-4xl col-span-2">Your Joined Courses</p>
        {/* <div className=" col-span-1 h-36 p-5">
          <div className="border-2 border-neutral-300 p-4">
            <p className="  text-lg font-normal">Course Complete</p>
            <hr />
            <p className=" text-4xl font-medium">2 / 5</p>
          </div>
        </div>
        <div className=" col-span-1 h-36 p-5">
          <div className="border-2 border-neutral-300 p-4">
            <p className="  text-lg font-normal"> Course Not Complete</p>
            <hr />
            <p className=" text-4xl font-medium">3 / 5</p>
          </div>
        </div> */}
        <div className="col-span-2">
          {/* Class Type */}
          <div className="grid grid-cols-4 ">
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

      {/* <Footer sideBarTrigger={props.sideBarTrigger} /> */}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    course: state.student,
  };
};
// const mapDispatchToProps = (dispatch) => {
//   return {
//       loaduser: () => dispatch(FetchUserList()),
//       removeuser:(code)=>dispatch(Removeuser(code))
//   }
// }

export default connect(mapStateToProps)(CoursesPage);
