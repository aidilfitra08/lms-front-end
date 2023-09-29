import React, { useEffect, useState } from "react";
import TestCoursePhoto from "../../assets/man-photo.png";
import { category } from "./category";

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

  useEffect(() => {
    // setSectionCompletion((sectionComplete/totalSection)*100);
    // console.log(sectionCompletion)
    updateCompletion();
    // console.log(sectionCompletion)
  }, []);
  return (
    <div className="flex flex-col m-2 bg-neutral-100 rounded-md p-2 space-y-2">
      <a
        href="/student/courses/course-page"
        className="thumbnail0 w-full  rounded-t-md"
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
        href={
          "/student/courses/course-page?courseID=" + props.courseDetail.courseID
        }
        className="title text-xl font-semibold block"
      >
        {props.courseDetail.title}
      </a>
      <p className=" text-md font-normal">
        {category[props.courseDetail.categoryID - 1]}
      </p>
      <div className=" text-md font-medium">{props.courseDetail.User.name}</div>
      {/* <div className=" bg-slate-300 rounded-lg">
        <div
          className={` bg-yellow-600 py-1 rounded-lg`}
          style={{ width: sectionCompletion }}
        ></div>
      </div> */}
      <div className="thumbnail">
        Total:{" "}
        <span className=" font-semibold">
          {props.courseDetail.Sections.length} Sections
        </span>
      </div>
    </div>
  );
}

export default CourseCard;
