import React, { useState, useEffect } from "react";
import SectionForm from "./form/SectionForm";
import BasicForm from "./form/BasicForm";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  addEnrollCode,
  getCourseDetail,
  updateCourse,
} from "../../../redux/Lecture/LectureAction";
import { Navigate, useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faComputer,
} from "@fortawesome/free-solid-svg-icons";

function CreateCourse(props) {
  useEffect(() => {
    document.title = "Ubah Kursus";
  }, []);
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const [searchParams, setSearchParams] = useSearchParams();
  const courseID = searchParams.get("courseID");
  const basicInformation = useSelector(
    (state) => state.lecture.basicInformation
  );
  const [enrollCode, setEnrollCode] = useState(
    basicInformation ? basicInformation.enrollCode : ""
  );
  useEffect(() => {
    setEnrollCode(basicInformation.enrollCode);
  }, [basicInformation]);
  const components = [
    <BasicForm />,
    <SectionForm />,
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
  const dispatch = useDispatch();
  const handleUpload = () => {
    Swal.fire({
      title: "Apakah anda yakin?",
      text: "Pilih cancel untuk melihat/mengubah data kursus anda.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, I'm sure!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(updateCourse(sectionsDataToUpload, courseID));
        Swal.fire({
          title: "Berhasil!",
          text: "Kursus anda berhasil dibuat.",
          icon: "success",
        });
      }
    });
  };

  useEffect(() => {
    if (pageCount === 0) {
      setSectionCompletion("0%");
    } else if (pageCount === 1) {
      setSectionCompletion("50%");
    } else if (pageCount === 2) {
      setSectionCompletion("100%");
    }
  }, [pageCount]);

  useEffect(() => {
    dispatch(addEnrollCode(enrollCode));
  }, [enrollCode]);

  useEffect(() => {
    dispatch(getCourseDetail(courseID));
  }, []);

  if (sectionsDataToUpload.requestSuccess) {
    return <Navigate to="/lecture/courses" />;
  }
  return (
    <div
      className={classNames(props.sideBarTrigger ? "pl-64" : "pl-0", "pt-16")}
    >
      <div className="hidden max-md:block text-center min-h-screen content-center -mt-16 w-screen">
        <FontAwesomeIcon icon={faComputer} className="h-16 text-slate-800 " />
        <p className="text-lg">
          Silahkan akses halaman ini pada browser dekstop anda.
        </p>
      </div>
      <div className="grid grid-cols-1 space-y-6 mt-6 mx-48 max-lg:mx-20 max-md:hidden">
        <div className=" col-span-1 space-y-6">
          <p className=" text-3xl font-bold">Ubah Kursus</p>
          <div className=" bg-slate-300 rounded-lg w-full">
            <div
              className={` bg-yellow-400 py-1 rounded-lg`}
              style={{ width: sectionCompletion }}
            ></div>
          </div>
        </div>
        <div>
          {components[pageCount]}
          {pageCount > 0 && (
            <button
              onClick={() => setPageCount(pageCount - 1)}
              className=" float-left my-6 bg-yellow-400 py-2 px-4 rounded-md hover:bg-yellow-200"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="pl-2" /> Sebelumnya
            </button>
          )}
          {pageCount < components.length - 1 && (
            <button
              onClick={() => setPageCount(pageCount + 1)}
              className=" float-right my-6 bg-yellow-400 py-2 px-4 rounded-md hover:bg-yellow-200"
            >
              Selanjutnya
              <FontAwesomeIcon icon={faArrowRight} className="pl-2" />
            </button>
          )}
          {pageCount === 2 && (
            <button
              className=" float-right my-6 bg-yellow-400 py-2 px-4 rounded-md hover:bg-yellow-200"
              onClick={handleUpload}
            >
              Simpan
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CreateCourse;
