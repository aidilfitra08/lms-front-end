import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SectionForm from "./form/SectionForm";
import QuizForm from "./form/QuizForm";
import BasicForm from "./form/BasicForm";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  addEnrollCode,
  getCourseDetail,
  postCourse,
  updateCourse,
} from "../../../redux/Lecture/LectureAction";
import { Navigate, useSearchParams } from "react-router-dom";

function CreateCourse(props) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const [searchParams, setSearchParams] = useSearchParams();
  const courseID = searchParams.get("courseID");
  // console.log(courseID);
  const basicInformation = useSelector(
    (state) => state.lecture.basicInformation
  );
  const [enrollCode, setEnrollCode] = useState(
    basicInformation ? basicInformation.enrollCode : ""
  );
  // const [quizFormData, setQuizFormData] = useState({});
  const components = [
    <BasicForm />,
    <SectionForm />,
    <div className=" text-center text-2xl">Under maintenance please Next</div>,
    <div className="space-y-2">
      <label htmlFor="enrollCode">EnrollCode</label>
      <div className="relative">
        <input
          id="enrollCode"
          name="enrollCode"
          type="text"
          autoComplete="enrollCode"
          required
          className="block w-full pr-12 rounded-md"
          placeholder="Enroll Code"
          maxLength={25}
          value={enrollCode}
          onChange={(event) => setEnrollCode(event.target.value)}
        />
      </div>
    </div>,
  ];

  const [pageCount, setPageCount] = useState(0);
  const [sectionCompletion, setSectionCompletion] = useState("0%");

  const sectionsDataToUpload = useSelector((state) => state.lecture);
  // const postSuccess = useSelector((state) => state.lecture);
  const dispatch = useDispatch();
  const handleUpload = () => {
    dispatch(updateCourse(sectionsDataToUpload, courseID));
    if (sectionsDataToUpload.postSuccess) {
      alert("update sukses");
      return <Navigate to="/" />;
    }
  };

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

  useEffect(() => {
    // dispatch(addEnrollCode(enrollCode));
  }, [enrollCode]);

  useEffect(() => {
    dispatch(getCourseDetail(courseID));
  }, []);

  if (sectionsDataToUpload.postSuccess) {
    alert(
      "Kursus Anda berhasil ditambahkan, silahkan ubah status kursus di halaman Courses!"
    );
    return <Navigate to="/lecture/courses" />;
  }
  return (
    <div
      className={classNames(props.sideBarTrigger ? "pl-64" : "pl-0", "pt-16")}
    >
      <div className="grid grid-cols-1 space-y-6 mt-6 mx-48">
        <div className=" col-span-1 space-y-6">
          <p className=" text-3xl font-bold">Edit Course</p>
          <div className=" bg-slate-300 rounded-lg w-full">
            <div
              className={` bg-yellow-400 py-1 rounded-lg`}
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
          {/* show previous button if we are not on first element */}
          {pageCount > 0 && (
            <button
              onClick={() => setPageCount(pageCount - 1)}
              className=" float-left my-6 bg-yellow-400 py-2 px-4 rounded-md hover:bg-yellow-200"
            >
              prev
            </button>
          )}

          {/* hide next button if we are at the last element */}
          {pageCount < components.length - 1 && (
            <button
              onClick={() => setPageCount(pageCount + 1)}
              className=" float-right my-6 bg-yellow-400 py-2 px-4 rounded-md hover:bg-yellow-200"
            >
              next
            </button>
          )}
          {pageCount === 3 && (
            <button
              className=" float-right my-6 bg-yellow-400 py-2 px-4 rounded-md hover:bg-yellow-200"
              onClick={handleUpload}
            >
              Upload Course
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateCourse;
