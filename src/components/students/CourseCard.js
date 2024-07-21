import React, { useEffect } from "react";
import TestCoursePhoto from "../../assets/Landing Page/copywriting.jpg";
import { category } from "./category";
import { connect, useDispatch } from "react-redux";
import { checkEnrollment } from "../../redux/Student/StudentAction";
import { useNavigate } from "react-router-dom";

function CourseCard(props) {
  // const totalSection = 14;
  // const sectionComplete = 10;
  // const [sectionCompletion, setSectionCompletion] = useState("");

  // const updateCompletion = () => {
  //   var numb = (sectionComplete / totalSection) * 100;
  //   numb = numb.toFixed(2);
  //   setSectionCompletion(numb + "%");
  //   console.log(numb + "%");
  // };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    // setSectionCompletion((sectionComplete/totalSection)*100);
    // console.log(sectionCompletion)
    // updateCompletion();
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
    <div className="flex flex-col m-2 bg-neutral-200 rounded-md pb-2 space-y-2 h-[17rem]">
      <a
        onClick={() => clickGoTo(props.courseDetail.courseID)}
        className=" w-full h-40 rounded-md"
      >
        <img
          src={
            props.courseDetail.thumbnail
              ? props.courseDetail.thumbnail
              : TestCoursePhoto
          }
          className="rounded-t-md object-cover h-full w-auto"
        />
      </a>
      <a
        href="#"
        className="block title text-xl max-md:text-lg font-semibold w-full cursor-pointer px-3"
        onClick={() => clickGoTo(props.courseDetail.courseID)}
      >
        {props.courseDetail.title}
      </a>
      <p className=" text-sm font-normal px-3">
        {category[props.courseDetail.categoryID - 1]}
      </p>
      <div className=" text-sm font-medium px-3">
        {props.courseDetail.User.name}
      </div>
      {/* <div className="px-3">
        Total:{" "}
        <span className="max-md:text-sm font-semibold">
          {props.courseDetail.Sections.length} Materi
        </span>
      </div> */}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    enrollmentStatus: state.student.enrollmentStatus,
  };
};
export default connect(mapStateToProps)(CourseCard);
