import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Transition } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  addLessonData,
  addSectionsData,
} from "../../../../redux/Lecture/LectureAction";
import LessonComponent from "./LessonPopup/ComponentLesson";

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

  const dispatch = useDispatch();
  const createSectionsData = useSelector(
    (state) => state.lectureCreateCourse.sections
  );

  function onSaveSection() {
    //----------------------------------------------------------
    dispatch(
      addSectionsData({
        sectionTitle: sectionTitle,
        sectionDescription: sectionDescription,
        lessons: [],
      })
    );
    setSectionTitle("");
    setSectionDescription("");
    setShowSectionForm(false);
  }

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
            "absolute bg-black/40 w-screen h-screen top-0 z-50 right-0 grid content-center justify-center"
          )}
        >
          <div
            className="fixed w-screen h-screen top-0 right-0 -z-30"
            onClick={() => setShowSectionForm(false)}
          ></div>
          <div className="bg-white min-h-128 max-h-fit w-128 z-100 py-8 px-8 rounded-md space-y-4">
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

            <div className="pt-8">
              <button
                className="w-full bg-yellow-400 hover:bg-yellow-200 p-3"
                onClick={onSaveSection}
              >
                Save Section
              </button>
            </div>
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
              return (
                <div className="space-y-3 mb-3">
                  <p className="">
                    section:{" "}
                    <span className="font-semibold">
                      {section.sectionTitle}
                    </span>
                  </p>
                  <div>
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
                  </div>
                  <div className="pb-3">
                    Lessons:{" "}
                    {section.lessons.map((lesson, lessonIndex) => {
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
                            <button className="block w-full bg-yellow-400 p-2 text-black hover:bg-yellow-200 rounded-md">
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
              "absolute bg-black/40 w-screen h-screen top-0 z-50 right-0 grid content-center justify-center transition-transform text-black"
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

LessonForm.propTypes = {};

export default LessonForm;
