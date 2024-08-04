import React, { useEffect, useState } from "react";
import TestCoursePhoto from "../../assets/Landing Page/copywriting.jpg";
import { category } from "../students/category";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

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
    updateCompletion();
  }, []);
  return (
    <div className="flex flex-col m-2 bg-neutral-100 rounded-md space-y-2 h-[17rem]">
      <a
        href={
          "/lecture/courses/course-page?courseID=" + props.courseDetail.courseID
        }
        className="w-full h-40 rounded-md"
      >
        <img
          src={
            props.courseDetail.thumbnail
              ? props.courseDetail.thumbnail
              : TestCoursePhoto
          }
          className=" object-cover h-full w-auto rounded-t-md"
        />
      </a>
      <a
        href={
          "/lecture/courses/course-page?courseID=" + props.courseDetail.courseID
        }
        className="title text-xl max-md:text-lg font-semibold block px-3"
      >
        {props.courseDetail.title}
      </a>
      <p className=" text-sm max-md:text-sm font-normal px-3">
        {category[props.courseDetail.categoryID - 1]}
      </p>
    </div>
  );
}

export default CourseCard;
