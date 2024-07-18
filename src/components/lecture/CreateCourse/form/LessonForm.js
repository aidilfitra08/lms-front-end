import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  addLessonData,
  addSectionsData,
  deleteLesson,
  deleteSection,
  resetLoadingPercentage,
  updateSectionsData,
} from "../../../../redux/Lecture/LectureAction";
import LessonComponent from "./LessonPopup/ComponentLesson";
import Swal from "sweetalert2";
import {
  faCirclePlus,
  faInfo,
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function LessonForm(props) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const [showAddLessonPopUP, setShowAddLessonPopUp] = useState(false);
  const [showSectionForm, setShowSectionForm] = useState(false);

  const [sectionTitle, setSectionTitle] = useState("");
  const [sectionDescription, setSectionDescription] = useState("");
  const [indexNow, setIndexNow] = useState(null);
  const [lessonIndexNow, setLessonIndexNow] = useState(null);
  const [disableText, setDisableText] = useState(null);

  const dispatch = useDispatch();
  const createSectionsData = useSelector((state) => state.lecture.sections);

  function onSaveSection() {
    //----------------------------------------------------------
    dispatch(
      addSectionsData({
        title: sectionTitle,
        detail: sectionDescription,
        Lessons: [],
      })
    );
    setSectionTitle("");
    setSectionDescription("");
    setShowSectionForm(false);
  }

  function onClickUpdateSection(title, detail) {
    console.log(indexNow);
    //----------------------------------------------------------
    setShowSectionForm(true);

    setSectionTitle(title);
    setSectionDescription(detail);
    // setShowSectionForm(false);
  }

  function updateSection() {
    //----------------------------------------------------------
    dispatch(
      updateSectionsData({
        title: sectionTitle,
        detail: sectionDescription,
        sectionIndex: indexNow,
      })
    );
    setSectionTitle("");
    setSectionDescription("");
    setIndexNow(null);
    setShowSectionForm(false);
  }

  const delLesson = (sectionIndex, lessonIndex) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteLesson(sectionIndex, lessonIndex));
        // setClicked(!clicked);
        Swal.fire({
          title: "Deleted!",
          text: "Your Lesson has been deleted.",
          icon: "success",
        });
      }
    });
  };
  const delSection = (index) => {
    // console.log(index);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteSection(index));
        // setClicked(!clicked);
        Swal.fire({
          title: "Deleted!",
          text: "Your section has been deleted.",
          icon: "success",
        });
      }
    });
  };
  return (
    <div className="space-y-4">
      <div>
        <div className="space-y-4">
          <p className=" text-2xl font-bold">Section(s)</p>
          <p className=" text-sm">
            Silahkan klik update section jika anda ingin melihat atau/dan
            mengubah detail section.
          </p>
          <button
            className=" bg-yellow-400 px-4 py-3 rounded-md hover:bg-yellow-200"
            onClick={() => {
              setShowSectionForm(true);
            }}
          >
            <FontAwesomeIcon icon={faCirclePlus} className="pr-2" />
            New Section
          </button>
          {/* <div>section created</div> */}
        </div>
      </div>
      <div className="">
        <div
          className={classNames(
            showSectionForm ? "block" : "hidden",
            "absolute bg-black/40 w-screen h-screen top-0 z-50 right-0 grid content-center justify-center"
          )}
        >
          <div
            className="fixed w-screen h-screen top-0 right-0 -z-30"
            onClick={() => {
              setShowSectionForm(false);
              setIndexNow(null);
              setSectionTitle("");
              setSectionDescription("");
            }}
          ></div>
          <div className="bg-white min-h-128 max-h-fit w-128 z-100 py-8 px-8 rounded-md space-y-4">
            <div className="space-y-2 text-center p-2 border-b-2">
              <p className="text-xl font-semibold">Section</p>
            </div>
            <div className="space-y-2">
              <label htmlFor="sectionTitle">Section Title</label>
              <input
                id="sectionTitle"
                name="sectionTitle"
                type="text"
                autoComplete="sectionTitle"
                required
                className="block w-full rounded-md"
                value={sectionTitle}
                onChange={(event) => setSectionTitle(event.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="sectionDescription">Section Description</label>
              <textarea
                id="sectionDescription"
                name="sectionDescription"
                rows={4}
                required
                className="block w-full rounded-md"
                value={sectionDescription}
                onChange={(event) => setSectionDescription(event.target.value)}
              />
            </div>

            {indexNow != null ? (
              <div className="pt-8">
                <button
                  className="w-full bg-yellow-400 hover:bg-yellow-200 p-3 rounded-md"
                  onClick={updateSection}
                >
                  Update Section
                </button>
              </div>
            ) : (
              <div className="pt-8">
                <button
                  className="w-full bg-yellow-400 hover:bg-yellow-200 p-3 rounded-md"
                  onClick={onSaveSection}
                >
                  Save Section
                </button>
              </div>
            )}
            <div className="">
              <button
                className="w-full bg-yellow-400 hover:bg-yellow-200 p-3 rounded-md"
                onClick={() => {
                  setShowSectionForm(false);
                  setIndexNow(null);
                  setSectionTitle("");
                  setSectionDescription("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className=" bg-slate-200 rounded-md p-3">
        <p className="text-xl border-b border-slate-800 pb-3">
          Sections Preview
        </p>
        <div className="pt-3">
          {createSectionsData != [] ? (
            createSectionsData.map((section, index) => {
              return section === undefined ? null : (
                <div className="space-y-3 mb-3">
                  <p className="">
                    Section Name:{" "}
                    <span className="font-semibold">{section.title}</span>
                  </p>
                  <div className="space-x-2 space-y-2">
                    <button
                      className="bg-yellow-400 p-2 text-black hover:bg-yellow-200 rounded-md"
                      onClick={() => {
                        setShowAddLessonPopUp(true);
                        setIndexNow(index);
                        setLessonIndexNow(null);
                        dispatch(resetLoadingPercentage());
                      }}
                    >
                      <FontAwesomeIcon icon={faCirclePlus} className="pr-1" />{" "}
                      Add Lesson
                    </button>
                    <button
                      className="bg-yellow-400 p-2 text-black hover:bg-yellow-200 rounded-md"
                      onClick={() => {
                        onClickUpdateSection(section.title, section.detail);
                        setIndexNow(index);
                      }}
                    >
                      <FontAwesomeIcon icon={faPen} className="pr-1" /> Update
                      Section
                    </button>
                    <button
                      className="bg-yellow-400 p-2 text-black hover:bg-yellow-200 rounded-md"
                      onClick={() => {
                        delSection(index);
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} className="pr-1" />
                      Delete Section
                    </button>
                  </div>
                  <div className="pb-3 space-y-2">
                    <p>Lesson(s):</p>
                    {section === undefined
                      ? null
                      : section.Lessons.map((lesson, lessonIndex) => {
                          return (
                            <div className="border border-indigo-700 p-3 mt-1 rounded-md grid grid-cols-12">
                              <div className="col-span-10">
                                <p>Title: {lesson.title}</p>
                                <p>Description: {lesson.detail}</p>
                              </div>

                              <div className="col-span-2 space-y-2 border-l border-indigo-700 pl-3">
                                <button
                                  className="block w-full bg-yellow-400 p-2 text-black hover:bg-yellow-200 rounded-md"
                                  onClick={() => {
                                    setShowAddLessonPopUp(true);
                                    setIndexNow(index);
                                    setLessonIndexNow(lessonIndex);
                                    setDisableText(true);
                                  }}
                                >
                                  <FontAwesomeIcon icon={faInfo} />
                                </button>
                                <button
                                  className="block w-full bg-yellow-400 p-2 text-black hover:bg-yellow-200 rounded-md"
                                  onClick={() => {
                                    setShowAddLessonPopUp(true);
                                    setIndexNow(index);
                                    setLessonIndexNow(lessonIndex);
                                  }}
                                >
                                  <FontAwesomeIcon icon={faPen} />
                                </button>
                                <button
                                  className="block w-full bg-yellow-400 p-2 text-black hover:bg-yellow-200 rounded-md"
                                  onClick={() => {
                                    delLesson(index, lessonIndex);
                                  }}
                                >
                                  <FontAwesomeIcon icon={faTrash} />
                                </button>
                              </div>
                            </div>
                          );
                        })}
                  </div>
                </div>
              );
            })
          ) : (
            <div>null </div>
          )}
        </div>

        <Transition
          show={showAddLessonPopUP}
          enter="transition-all ease-in-out duration-500 delay-[200ms]"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-all ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className={classNames(
              showAddLessonPopUP ? "block" : "hidden",
              "absolute bg-black/40 w-screen h-screen top-0 z-50 right-0 grid content-center justify-center transition-transform text-black"
            )}
          >
            <div
              className="fixed w-screen h-screen top-0 right-0 -z-10"
              onClick={() => {
                setShowAddLessonPopUp(false);
                setDisableText(false);
              }}
            ></div>
            <LessonComponent
              setShowAddLessonPopUp={setShowAddLessonPopUp}
              indexSection={indexNow}
              lessonIndexNow={lessonIndexNow}
              disableText={disableText}
              setDisableText={setDisableText}
            />
          </div>
        </Transition>
      </div>
    </div>
  );
}

LessonForm.propTypes = {};

export default LessonForm;
