import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import LessonForm from "./form/LessonForm";
import QuizForm from "./form/QuizForm";
import BasicForm from "./form/BasicForm";

function CreateCourse(props) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const [basicFormData, setBasicFormData] = useState({
    title: "",
    shortDescription: "",
    description: "",
    courseLanguage: "",
    category: null,
  });
  const [lessonFormData, setLessonFormData] = useState([]);
  const [quizFormData, setQuizFormData] = useState({});
  const components = [
    <BasicForm
      setBasicFormData={setBasicFormData}
      basicFormData={basicFormData}
    />,
    <LessonForm setLessonFormData={setLessonFormData} />,
    <QuizForm />,
    <div>is reviewed by admin or not</div>,
  ];

  const [pageCount, setPageCount] = useState(0);
  const [sectionCompletion, setSectionCompletion] = useState("0%");
  useEffect(() => {
    // setSectionCompletion((sectionComplete/totalSection)*100);
    // console.log(sectionCompletion)
    if (pageCount === 0) {
      setSectionCompletion("0%");
    } else if (pageCount === 1) {
      setSectionCompletion("33%");
    } else if (pageCount === 2) {
      setSectionCompletion("67%");
    } else if (pageCount === 3) {
      setSectionCompletion("100%");
    }
    // updateCompletion();
    // console.log(basicFormData);
  }, [pageCount]);

  // useEffect(() => {
  //   console.log(basicFormData);
  // }, [basicFormData]);
  return (
    <div
      className={classNames(props.sideBarTrigger ? "pl-64" : "pl-0", "pt-16")}
    >
      <div className="grid grid-cols-1 space-y-6 mt-6 mx-48">
        <div className=" col-span-1 space-y-6">
          <p className=" text-3xl font-bold">Create New Course</p>
          <div className=" bg-slate-300 rounded-lg w-full">
            <div
              className={` bg-yellow-600 py-1 rounded-lg`}
              style={{ width: sectionCompletion }}
            ></div>
          </div>
        </div>
        <form>
          {/*  */}
          {/*  */}
        </form>
        <div>
          {
            // render component from our components array
            components[pageCount]
          }
          {console.log(basicFormData)}
          {console.log(lessonFormData)}
          {/* show previous button if we are not on first element */}
          {pageCount > 0 && (
            <button
              onClick={() => setPageCount(pageCount - 1)}
              className=" float-left"
            >
              prev
            </button>
          )}

          {/* hide next button if we are at the last element */}
          {pageCount < components.length - 1 && (
            <button
              onClick={() => setPageCount(pageCount + 1)}
              className=" float-right"
            >
              next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

CreateCourse.propTypes = {};

export default CreateCourse;
