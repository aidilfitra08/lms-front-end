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
    // setSectionCompletion((sectionComplete/totalSection)*100);
    // console.log(sectionCompletion)
    updateCompletion();
    // console.log(sectionCompletion)
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
      {/* <div className=" max-md:text-sm font-medium text-end bg-red-400 px-3">
        Ke Diskusi <FontAwesomeIcon icon={faArrowRight} />
      </div> */}
      {/* <div className=" bg-slate-300 rounded-lg">
        <div
          className={` bg-yellow-600 py-1 rounded-lg`}
          style={{ width: sectionCompletion }}
        ></div>
      </div> */}
      {/* <div className="">
        Total:{" "}
        <span className="max-md:text-sm font-semibold">
          {props.courseDetail.Sections.length} Sections
        </span>
      </div> */}
    </div>
  );
}

export default CourseCard;
