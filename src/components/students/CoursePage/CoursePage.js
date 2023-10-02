import React, { useEffect, useState } from "react";
import TestCoursePhoto from "../../../assets/man-photo.png";
import { connect, useDispatch, useSelector } from "react-redux";
import { fetchCourse } from "../../../redux/Student/StudentAction";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { category } from "../category";

function CoursePage(props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const courseID = searchParams.get("courseID");
  const dispatch = useDispatch();
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const navigate = useNavigate();

  if (searchParams.size === 0) {
    navigate("/student/courses", { replace: true });
    // window.location.reload(true);
  }
  // const courseState = useSelector((state) => state.studentCourse);
  // const courseDetail = courseState.courseDetail;

  console.log(props.courseDetail);
  useEffect(() => {
    dispatch(fetchCourse(courseID));
  }, []);
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
    props.courseDetail.Sections.map((section) => {
      counter = counter + section.Lessons.length;
    });
    // console.log(counter);
    return counter;
  }
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
              "berhasil"
            )}
            <p className=" text-4xl font-bold">{props.courseDetail.title}</p>
            <p className="">{props.courseDetail.shortDescription}</p>
            <p className=" text-lg">estimate time: hours</p>
            <a href="#" className="block text-md font-semibold">
              {category[props.courseDetail.categoryID - 1]}
            </a>
            {/* <p>total section: 30</p> */}
            <p>
              Course by: <span>{props.courseDetail.User.name}</span>
            </p>
          </div>
          <div className="col-span-1 pt-4 xl:mt-8">
            <img src={TestCoursePhoto} className="h-72 w-fit border" />
          </div>
        </div>

        <div className="col-span-1 h-auto w-3/4 space-y-4 place-self-center">
          <p className=" text-3xl">Course Detail</p>
          <p>{props.courseDetail.description}</p>
        </div>
        <div className="col-span-1 border border-gray-500 h-auto w-2/4 place-self-center shadow p-4 space-y-2">
          <div className=" pb-2 border-b border-gray-500">Course Section</div>
          <div>
            <p>
              {props.courseDetail.Sections.length} Section .{" "}
              <span>{countLessons()} Lessons</span>
            </p>
          </div>
          <div className=" text-base ">
            <ul className="list-none">
              {props.courseDetail.Sections.map((section) => {
                return (
                  <>
                    <hr />
                    <li className="py-2">
                      {/* <button className="mr-2">
                        <FontAwesomeIcon icon={faAngleDown} />
                      </button> */}
                      <a
                        href={
                          "course-page/sections?sectionID=" + section.sectionID
                        }
                        className="mt-2"
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
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    courseDetail: state.studentCourse.courseDetail,
    loading: state.studentCourse.loading,
    errorMessage: state.studentCourse.errorMessage,
  };
};
export default connect(mapStateToProps)(CoursePage);
