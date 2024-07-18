import React, { useEffect, useState } from "react";
import TestCoursePhoto from "../../assets/man-photo.png";
import { category } from "./category";
import { connect, useDispatch } from "react-redux";
import { checkEnrollment } from "../../redux/Student/StudentAction";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

function CourseCard(props) {
  const totalSection = 14;
  const sectionComplete = 10;
  const [sectionCompletion, setSectionCompletion] = useState("");

  const updateCompletion = () => {
    var numb = (sectionComplete / totalSection) * 100;
    numb = numb.toFixed(2);
    setSectionCompletion(numb + "%");
    console.log(numb + "%");
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    // setSectionCompletion((sectionComplete/totalSection)*100);
    // console.log(sectionCompletion)
    updateCompletion();
    dispatch(checkEnrollment(props.courseDetail.courseID));
    // console.log(sectionCompletion)
  }, []);
  const clickGoTo = (courseID) => {
    if (props.enrollmentStatus != null && props.enrollmentStatus === true) {
      navigate(`/student/course-page?courseID=${courseID}`, {
        replace: true,
      });
    } else if (
      props.enrollmentStatus != null &&
      props.enrollmentStatus === false
    ) {
      navigate(`/student/course-page/enroll-page?courseID=${courseID}`, {
        replace: true,
      });
    } else {
    }
  };
  // useEffect(() => {
  //   if (props.enrollmentStatus != null && props.enrollmentStatus === true) {
  //     navigate(`/student/course-page?courseID=${props.courseDetail.courseID}`, {
  //       replace: true,
  //     });
  //   } else if (
  //     props.enrollmentStatus != null &&
  //     props.enrollmentStatus === false
  //   ) {
  //     navigate(
  //       `/student/course-page/enroll-page?courseID=${props.courseDetail.courseID}`,
  //       {
  //         replace: true,
  //       }
  //     );
  //   } else {
  //   }
  // }, [props.enrollmentStatus]);
  return (
    <div className="flex flex-col m-2 bg-neutral-200 rounded-md p-2 space-y-2">
      <a
        onClick={() => clickGoTo(props.courseDetail.courseID)}
        className="thumbnail0 w-full rounded-t-md"
      >
        <img
          src={
            props.courseDetail.thumbnail
              ? props.courseDetail.thumbnail
              : TestCoursePhoto
          }
          className="rounded-t-md"
        />
      </a>
      <a
        // href="#"
        className="block title text-xl max-md:text-lg font-semibold w-full cursor-pointer"
        onClick={() => clickGoTo(props.courseDetail.courseID)}
      >
        {props.courseDetail.title}
      </a>
      <p className=" max-md:text-sm font-normal">
        {category[props.courseDetail.categoryID - 1]}
      </p>
      <div className=" max-md:text-sm font-medium">
        {props.courseDetail.User.name}
      </div>
      {/* <div className=" bg-slate-300 rounded-lg">
        <div
          className={` bg-yellow-600 py-1 rounded-lg`}
          style={{ width: sectionCompletion }}
        ></div>
      </div> */}
      <div className="thumbnail">
        Total:{" "}
        <span className="max-md:text-sm font-semibold">
          {props.courseDetail.Sections.length} Sections
        </span>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    enrollmentStatus: state.student.enrollmentStatus,
  };
};
export default connect(mapStateToProps)(CourseCard);
