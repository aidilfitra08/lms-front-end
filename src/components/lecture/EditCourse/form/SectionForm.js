import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  addLessonData,
  addSectionsData,
  deleteLesson,
  deleteSection,
  updateSectionsData,
} from "../../../../redux/Lecture/LectureAction";
import LessonComponent from "./LessonPopup/ComponentLesson";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function SectionForm(props) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const [showAddLessonPopUP, setShowAddLessonPopUp] = useState(false);
  const [showSectionForm, setShowSectionForm] = useState(false);

  const [sectionTitle, setSectionTitle] = useState("");
  const [sectionDescription, setSectionDescription] = useState("");
  const [indexNow, setIndexNow] = useState(null);
  const [lessonIndexNow, setLessonIndexNow] = useState(null);

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
    console.log(indexNow);
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

  const delLesson = (sectionIndex, lessonIndex, lessonID) => {
    dispatch(deleteLesson(sectionIndex, lessonIndex, lessonID));
  };

  const delSection = (index, sectionID) => {
    console.log(index);
    dispatch(deleteSection(index, sectionID));
  };
  useEffect(() => {}, [createSectionsData]);
  return (
    <div className="space-y-4">
      <div>
        <div className="space-y-4">
          <p className=" text-2xl font-bold">Section(s)</p>
          <button
            className=" bg-yellow-400 px-4 py-3 rounded-md hover:bg-yellow-200"
            onClick={() => {
              setShowSectionForm(true);
            }}
          >
            New Section
          </button>
          {/* <div>section created</div> */}
        </div>
      </div>
      <div className="">
        <div
          className={classNames(
            showSectionForm ? "block" : "hidden",
            "fixed bg-black/40 w-screen h-screen top-0 z-50 right-0 grid content-center justify-center"
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
            <div className="flex justify-end">
              <FontAwesomeIcon
                icon={faXmark}
                size="xl"
                onClick={() => {
                  setShowSectionForm(false);
                  setIndexNow(null);
                  setSectionTitle("");
                  setSectionDescription("");
                }}
              />
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
                  className="w-full bg-yellow-400 hover:bg-yellow-200 p-3"
                  onClick={() => updateSection()}
                >
                  Update
                </button>
              </div>
            ) : (
              <div className="pt-8">
                <button
                  className="w-full bg-yellow-400 hover:bg-yellow-200 p-3"
                  onClick={() => onSaveSection()}
                >
                  Save
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className=" bg-slate-200 rounded-md p-3">
        <p className="text-xl border-b border-indigo-700 pb-3">
          All Sections Preview
        </p>
        <div className="pt-3">
          {createSectionsData != [] ? (
            createSectionsData.map((section, index) => {
              return section === undefined ? null : (
                <div className="space-y-3 mb-3">
                  <p className="">
                    section:{" "}
                    <span className="font-semibold">{section.title}</span>
                  </p>
                  <div className="space-x-2">
                    <button
                      className="bg-yellow-400 p-2 text-black hover:bg-yellow-200 rounded-md"
                      onClick={() => {
                        setShowAddLessonPopUp(true);
                        setIndexNow(index);
                        setLessonIndexNow(null);
                      }}
                    >
                      Add Lesson
                    </button>
                    <button
                      className="bg-yellow-400 p-2 text-black hover:bg-yellow-200 rounded-md"
                      onClick={() => {
                        onClickUpdateSection(section.title, section.detail);
                        setIndexNow(index);
                      }}
                    >
                      Update Section
                    </button>
                    <button
                      className="bg-yellow-400 p-2 text-black hover:bg-yellow-200 rounded-md"
                      onClick={() => {
                        delSection(index, section.sectionID);
                      }}
                    >
                      Delete Section
                    </button>
                  </div>
                  <div className="pb-3">
                    Lessons:{" "}
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
                                  }}
                                >
                                  Update
                                </button>
                                <button
                                  className="block w-full bg-yellow-400 p-2 text-black hover:bg-yellow-200 rounded-md"
                                  onClick={() => {
                                    delLesson(
                                      index,
                                      lessonIndex,
                                      lesson.lessonID
                                    );
                                  }}
                                >
                                  Delete
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
              "fixed bg-black/40 w-screen h-screen top-0 z-50 right-0 grid content-center justify-center transition-transform text-black"
            )}
          >
            <div
              className="fixed w-screen h-screen top-0 right-0 -z-10"
              onClick={() => setShowAddLessonPopUp(false)}
            ></div>
            <LessonComponent
              setShowAddLessonPopUp={setShowAddLessonPopUp}
              indexSection={indexNow}
              lessonIndexNow={lessonIndexNow}
            />
          </div>
        </Transition>
      </div>
    </div>
  );
}

SectionForm.propTypes = {};

export default SectionForm;
