import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Transition } from "@headlessui/react";

function LessonForm(props) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const [showAddLessonPopUP, setShowAddLessonPopUp] = useState(false);
  const [showAddSection, setShowAddSection] = useState(false);
  const [showSectionForm, setShowSectionForm] = useState(false);
  const [showButtonAddLesson, setShowButtonAddLesson] = useState(false);

  const [sectionTitle, setSectionTitle] = useState("");
  const [sectionDescription, setSectionDescription] = useState("");
  const [LessonTitle, setLessonTitle] = useState("");
  const [lessonDescription, setLessonDescription] = useState("");
  const [lessonType, setLessonType] = useState("");
  const [videoType, setVideoType] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [attachment, setAttachment] = useState();
  const [summary, setSummary] = useState("");

  const [sectionData, setSectionData] = useState(null);
  const [sectionsData, setSectionsData] = useState([]);

  const testData = [
    {
      sectionTitle: "section title",
      sectionDescription: "deskripsi",
      lessons: [
        {
          LessonTitle: "lesson title",
          lessonDescription: "deskripsi lesson",
          lessonType: "video",
          videoType: "html",
          videoLink: "linkVideo",
          attachment: {},
          summary: "summary",
        },
      ],
    },
  ];

  const handleAddSection = () => {
    // setSectionsData((current) => [...current, sectionData]);
    // console.log(sectionsData);
    // console.log(lessonType);
    // console.log(attachment);
  };

  function onSaveLesson(sectionTitle) {
    var tempLesson = {
      LessonTitle: LessonTitle,
      lessonDescription: lessonDescription,
      lessonType: lessonType,
      videoType: videoType,
      videoLink: videoLink,
      attachment: attachment,
      summary: summary,
    };

    // sectionsData.forEach((element) => {
    //   if (element.sectionTitle === sectionData.sectionTitle) {
    //     element = sectionData;
    //     console.log
    //   } else {
    //     console.log("error");
    //   }
    // });
    var objIndex = sectionsData.findIndex(
      (obj) => obj.sectionTitle === sectionTitle
    );
    if (objIndex === -1) {
      console.log("error");
    }

    sectionsData[objIndex].lessons.push(tempLesson);
    setShowAddLessonPopUp(false);
  }
  function onSaveSection() {
    setSectionData({
      sectionTitle: sectionTitle,
      sectionDescription: sectionDescription,
      lessons: [],
    });
    setSectionsData((current) => [
      ...current,
      {
        sectionTitle: sectionTitle,
        sectionDescription: sectionDescription,
        lessons: [],
      },
    ]);
    // console.log(sectionData);
    setShowSectionForm(false);
    setShowButtonAddLesson(true);
  }

  function renderSwitch(param) {
    switch (param) {
      case "video":
        return (
          <>
            <label htmlFor="videoType">Video Type</label>
            <select
              id="videoType"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(event) => setVideoType(event.target.value)}
            >
              <option selected>Select Video Type</option>
              <option value="html">HTML5(mp4)</option>
              <option value="externalURL">External URL</option>
              <option value="yt">Youtube</option>
              <option value="embedded">embedded</option>
            </select>
            {renderSwitchVideo(videoType)}
          </>
        );
      default:
        return "";
    }
  }

  function renderSwitchVideo(param) {
    switch (param) {
      case "html":
        return (
          <>
            <label htmlFor="videoURL">Upload File</label>
            <input
              id="videoURL"
              name="videoURL"
              type="file"
              required
              accept="video/mp4"
              className="block"
              // onChange={(event) => setVideoType(event.target.files[0])}
            />
          </>
        );
      case "yt":
      case "externalURL":
      case "embedded":
        return (
          <>
            <label htmlFor="videoURL">Video Link</label>
            <input
              id="videoURL"
              name="videoURL"
              type="text"
              required
              className="block"
              onChange={(event) => setVideoLink(event.target.value)}
            />
          </>
        );
      default:
        break;
    }
  }

  useEffect(() => {
    props.setLessonFormData(sectionsData);
    console.log(sectionsData);
  }, [sectionsData]);
  return (
    <div className="form">
      <div>
        <div>
          <p>Section(s)</p>
          <button
            className=" bg-slate-300 p-3"
            onClick={() => {
              setShowAddSection(true);
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
            "absolute bg-black/40 w-screen h-screen top-0 z-50 right-0 grid content-center justify-center transition-transform"
          )}
        >
          <div
            className="fixed w-screen h-screen top-0 right-0 -z-10"
            onClick={() => setShowAddLessonPopUp(false)}
          ></div>
          <div className="bg-white h-128 w-128 z-100">
            <label htmlFor="sectionTitle">Section Title</label>
            <input
              id="sectionTitle"
              name="sectionTitle"
              type="text"
              autoComplete="sectionTitle"
              required
              className="block"
              onChange={(event) => setSectionTitle(event.target.value)}
            />
            <label htmlFor="sectionDescription">Section Description</label>
            <textarea
              id="sectionDescription"
              name="sectionDescription"
              rows={4}
              cols={30}
              required
              className="block"
              onChange={(event) => setSectionDescription(event.target.value)}
            />
            <div>
              <button className=" bg-slate-500 p-3" onClick={onSaveSection}>
                Save Section
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className=" bg-slate-900 text-white">
        <p>All Sections Preview</p>
        {sectionsData != [] ? (
          sectionsData.map((section) => {
            return (
              <div>
                <p>section: {section.sectionTitle}</p>
                lessons:{" "}
                {section.lessons.map((lesson) => {
                  return <div>{lesson.LessonTitle}</div>;
                })}
                <div
                  className={classNames(
                    showButtonAddLesson ? "block" : "hidden",
                    ""
                  )}
                >
                  <button
                    className="bg-yellow-300 p-2 hover:bg-yellow-500"
                    onClick={() => setShowAddLessonPopUp(true)}
                  >
                    Add Lesson
                  </button>
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
                    <div className="bg-white h-128 w-128 z-100">
                      <label htmlFor="lessonTitle">Lesson Title</label>
                      <input
                        id="lessonTitle"
                        name="lessonTitle"
                        type="text"
                        required
                        className="block"
                        onChange={(event) => setLessonTitle(event.target.value)}
                      />
                      <label htmlFor="lessonDescription">
                        Lesson Description
                      </label>
                      <textarea
                        id="lessonDescription"
                        name="lessonDescription"
                        rows={4}
                        cols={30}
                        autoComplete="lessonDescription"
                        required
                        className="block"
                        onChange={(event) =>
                          setLessonDescription(event.target.value)
                        }
                      />

                      <label htmlFor="videoType">Lesson Type</label>
                      <select
                        id="lessonType"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(event) => setLessonType(event.target.value)}
                      >
                        <option selected>Select Video Type</option>
                        <option value="video">Video</option>
                        <option value="text">Text</option>
                        <option value="attachment">Text & Attachment</option>
                      </select>

                      {renderSwitch(lessonType)}
                      <label htmlFor="attachment">Attachment</label>
                      <input
                        id="attachment"
                        name="attachment"
                        type="file"
                        required
                        className="block"
                        onChange={(event) =>
                          setAttachment(event.target.files[0])
                        }
                      />
                      <label htmlFor="summary">Summary</label>
                      <input
                        id="summary"
                        name="summary"
                        type="text"
                        className="block"
                        onChange={(event) => setSummary(event.target.value)}
                      />

                      <div>
                        <button
                          className=" bg-slate-500 p-3"
                          onClick={() => {
                            onSaveLesson(section.sectionTitle);
                          }}
                        >
                          Save Lesson
                        </button>
                      </div>
                    </div>
                  </div>
                </Transition>
              </div>
            );
          })
        ) : (
          <div>null </div>
        )}
      </div>
    </div>
  );
}

LessonForm.propTypes = {};

export default LessonForm;
