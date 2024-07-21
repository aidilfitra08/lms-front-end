import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import LessonForm from "./form/SectionForm";
import QuizForm from "./form/QuizForm";
import BasicForm from "./form/BasicForm";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  addEnrollCode,
  postCourse,
} from "../../../redux/Lecture/LectureAction";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  faArrowLeft,
  faArrowRight,
  faComputer,
  faLaptop,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CreateCourse(props) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const basicInformation = useSelector(
    (state) => state.lecture.basicInformation
  );
  const [enrollCode, setEnrollCode] = useState(
    basicInformation ? basicInformation.enrollCode : ""
  );
  // const [quizFormData, setQuizFormData] = useState({});
  const components = [
    <BasicForm />,
    <LessonForm />,
    // <div className=" text-center text-2xl">Under maintenance please Next</div>,
    <div className="space-y-2">
      <label htmlFor="enrollCode">Kode Enroll</label>
      <div className="">
        <input
          id="enrollCode"
          name="enrollCode"
          type="text"
          autoComplete="enrollCode"
          required
          className="block w-full pr-12 rounded-md"
          placeholder="Kode Enroll Kelas"
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
    dispatch(postCourse(sectionsDataToUpload));
    // if (sectionsDataToUpload.postSuccess) {

    //   return <Navigate to="/" />;
    // }
  };

  useEffect(() => {
    // setSectionCompletion((sectionComplete/totalSection)*100);
    // console.log(sectionCompletion)
    if (pageCount === 0) {
      setSectionCompletion("0%");
    } else if (pageCount === 1) {
      setSectionCompletion("50%");
    } else if (pageCount === 2) {
      setSectionCompletion("100%");
    }
    // else if (pageCount === 3) {
    //   setSectionCompletion("100%");
    // }
    // updateCompletion();
    // console.log(basicFormData);
  }, [pageCount]);

  useEffect(() => {
    dispatch(addEnrollCode(enrollCode));
  }, [enrollCode]);

  useEffect(() => {
    dispatch(addEnrollCode(enrollCode));
  }, [enrollCode]);

  if (sectionsDataToUpload.postSuccess) {
    Swal.fire({
      title: "Kursus Berhasil ditambahkan",
      text: "Kursus Anda berhasil ditambahkan, silahkan ubah status kursus di halaman Courses!",
      icon: "success",
      confirmButtonColor: "#3085d6",
    });
    return <Navigate to="/lecture/courses" />;
  }
  return (
    <div
      className={classNames(
        props.sideBarTrigger ? "pl-64 max-lg:pl-0" : "pl-0",
        "pt-16"
      )}
    >
      <div className="hidden max-md:block text-center min-h-screen content-center -mt-16 w-screen">
        <FontAwesomeIcon icon={faComputer} className="h-16 text-slate-800 " />
        <p className="text-lg">
          Silahkan akses halaman ini pada browser dekstop anda.
        </p>
      </div>
      <div className="grid grid-cols-1 space-y-6 mt-6 mx-48 max-md:hidden">
        <div className=" col-span-1 space-y-6">
          <p className=" text-3xl font-bold">Buat Kursus</p>
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
              <FontAwesomeIcon icon={faArrowLeft} className="pl-2" /> Sebelumnya
            </button>
          )}

          {/* hide next button if we are at the last element */}
          {pageCount < components.length - 1 && (
            <button
              onClick={() => setPageCount(pageCount + 1)}
              className=" float-right my-6 bg-yellow-400 py-2 px-4 rounded-md hover:bg-yellow-200"
            >
              Selanjutnya{" "}
              <FontAwesomeIcon icon={faArrowRight} className="pl-2" />
            </button>
          )}
          {pageCount === 2 && (
            <button
              className=" float-right my-6 bg-yellow-400 py-2 px-4 rounded-md hover:bg-yellow-200"
              onClick={handleUpload}
            >
              Tambahkan Kursus
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateCourse;
