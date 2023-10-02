import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addLessonData,
  uploadVideo,
} from "../../../../../redux/Lecture/LectureAction";
// import PropTypes from 'prop-types'

function LessonComponent(props) {
  const createLessonData = useSelector(
    (state) => state.lectureCreateCourse.sections[props.indexSection]
  );
  const [lessonTitle, setLessonTitle] = useState(
    createLessonData.lessons[props.lessonIndexNow]
      ? createLessonData.lessons[props.lessonIndexNow].title
      : ""
  );
  const [lessonDescription, setLessonDescription] = useState(
    createLessonData.lessons[props.lessonIndexNow]
      ? createLessonData.lessons[props.lessonIndexNow].detail
      : ""
  );
  const [lessonType, setLessonType] = useState(
    createLessonData.lessons[props.lessonIndexNow]
      ? createLessonData.lessons[props.lessonIndexNow].lessonType
      : ""
  );
  const [videoType, setVideoType] = useState(
    createLessonData.lessons[props.lessonIndexNow]
      ? createLessonData.lessons[props.lessonIndexNow].videoType
      : ""
  );
  const [videoFile, setVideoFile] = useState(null);
  const [videoLink, setVideoLink] = useState(
    createLessonData.lessons[props.lessonIndexNow]
      ? createLessonData.lessons[props.lessonIndexNow].videoUrl
      : ""
  );
  const [attachment, setAttachment] = useState(null);
  const [summary, setSummary] = useState(
    createLessonData.lessons[props.lessonIndexNow]
      ? createLessonData.lessons[props.lessonIndexNow].summary
      : ""
  );
  const [publicId, setpublicId] = useState(
    createLessonData.lessons[props.lessonIndexNow]
      ? createLessonData.lessons[props.lessonIndexNow].clodinaryPublicID
      : ""
  );
  // const [order, setOrder] = useState(1);
  const dispatch = useDispatch();

  console.log(createLessonData.lessons[props.lessonIndexNow]);
  if (props.lessonIndexNow != null) {
    // setLessonTitle();
    console.log(createLessonData.lessons[props.lessonIndexNow].lessonTitle);
    console.log("berhasil");
  }
  // console.log(lessonTitle);
  function onSaveLesson(index) {
    let videoUrl = videoLink;
    if (cloudinaryLink.url != "") {
      videoUrl = cloudinaryLink.url;
    }
    let tempLesson = {
      title: lessonTitle,
      detail: lessonDescription,
      lessonType: lessonType,
      videoType: videoType,
      videoUrl: videoUrl,
      videoFile: videoFile,
      attachment: attachment,
      summary: summary,
      isSkip: true,
      isShow: true,
    };
    if (videoFile != null) {
    }
    let dataForRedux = {
      sectionIndex: index,
      lessonData: tempLesson,
    };
    dispatch(addLessonData(dataForRedux));
    props.setShowAddLessonPopUp(false);
  }

  const cloudinaryLink = useSelector(
    (state) => state.lectureCreateCourse.tempCloudinaryData
  );
  const loadingPercentage = useSelector(
    (state) => state.lectureCreateCourse.loadingPercentage
  );
  const loading = useSelector((state) => state.lectureCreateCourse.loading);
  const errorMessage = useSelector(
    (state) => state.lectureCreateCourse.errorMessage
  );
  const [uploadClick, setUploadClick] = useState(false);
  function onUpload() {
    setUploadClick(true);
    // console.log(videoFile);
    // console.log(videoFile[0]);
    dispatch(uploadVideo(videoFile));
    setVideoLink(cloudinaryLink.url);
    setpublicId(cloudinaryLink.public_id);
  }
  function renderSwitch(lessonType) {
    switch (lessonType) {
      case "video":
        return (
          <div className="space-y-2">
            <label htmlFor="videoType">Video Type</label>
            <select
              id="videoType"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={videoType}
              onChange={(event) => setVideoType(event.target.value)}
            >
              <option selected>Select Video Type</option>
              <option value="html">HTML5(mp4)</option>
              <option value="externalURL">External URL</option>
              <option value="yt">Youtube</option>
              <option value="embedded">embedded</option>
            </select>
            {renderSwitchVideo(videoType)}
          </div>
        );
      case "text":
        return "";
      case "attachment":
        return (
          <div className="space-y-2">
            <label htmlFor="attachment">Attachment (PDF only)</label>
            <input
              id="attachment"
              name="attachment"
              type="file"
              required
              accept=".pdf"
              className="block"
              onChange={(event) => setAttachment(event.target.files[0])}
            />
          </div>
        );
      default:
        return "";
    }
  }

  function renderSwitchVideo(param) {
    switch (param) {
      case "html":
        return (
          <div className="grid grid-cols-2">
            <div className="space-y-2 col-span-1">
              <label htmlFor="videoURL">Upload File</label>
              <input
                id="videoURL"
                name="videoURL"
                type="file"
                required
                accept="video/mp4"
                className="block"
                // value={videoFile}
                onChange={(event) => setVideoFile(event.target.files[0])}
              />
            </div>
            <div className="col-span-1 ">
              {uploadClick && (
                <progress
                  value={loadingPercentage}
                  max={100}
                  className="my-2 w-full"
                >
                  32%
                </progress>
              )}
              {loadingPercentage == 100 && (
                <p className=" text-center">Upload Complete</p>
              )}
              {videoFile != null && loadingPercentage != 100 && (
                <button
                  className="block bg-yellow-400 py-2 px-5 mt-2 w-full"
                  onClick={onUpload}
                >
                  Upload
                </button>
              )}
            </div>
          </div>
        );
      case "yt":
      case "externalURL":
      case "embedded":
        return (
          <div className="space-y-2">
            <label htmlFor="videoURL">
              Video Link{" "}
              {param == "yt"
                ? "YouTube"
                : param == "externalURL"
                ? ""
                : param == "embedded"
                ? "Embedded"
                : ""}
            </label>
            <input
              id="videoURL"
              name="videoURL"
              type="text"
              required
              className="block w-full rounded-md"
              value={videoLink}
              onChange={(event) => setVideoLink(event.target.value)}
            />
          </div>
        );
      default:
        break;
    }
  }
  return (
    <div className="bg-white min-h-128 max-h-fit w-128 z-100 py-8 px-8 rounded-md space-y-4 overflow-auto">
      <div className="space-y-2">
        <label htmlFor="lessonTitle">Lesson Title</label>
        <input
          id="lessonTitle"
          name="lessonTitle"
          type="text"
          required
          className="block w-full rounded-md"
          value={lessonTitle}
          onChange={(event) => setLessonTitle(event.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="lessonDescription">Lesson Description</label>
        <textarea
          id="lessonDescription"
          name="lessonDescription"
          rows={4}
          autoComplete="lessonDescription"
          required
          className="block w-full rounded-md"
          value={lessonDescription}
          onChange={(event) => setLessonDescription(event.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="videoType">Lesson Type</label>
        <select
          id="lessonType"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={lessonType}
          onChange={(event) => setLessonType(event.target.value)}
        >
          <option selected>Select Video Type</option>
          <option value="video">Video</option>
          <option value="text">Text</option>
          <option value="attachment">Text & Attachment</option>
        </select>
      </div>

      {renderSwitch(lessonType)}

      <div className="space-y-2">
        <label htmlFor="summary">Summary</label>
        <input
          id="summary"
          name="summary"
          type="text"
          className="block w-full rounded-md"
          value={summary}
          onChange={(event) => setSummary(event.target.value)}
        />
      </div>

      {props.lessonIndexNow != null ? (
        <button
          className="block w-full bg-yellow-400 p-3 rounded-md hover:bg-yellow-200"
          // onClick={() => {
          //   onSaveLesson(props.indexSection);
          // }}
        >
          Update Lesson
        </button>
      ) : (
        <button
          className="block w-full bg-yellow-400 p-3 rounded-md hover:bg-yellow-200"
          onClick={() => {
            onSaveLesson(props.indexSection);
          }}
        >
          Save Lesson
        </button>
      )}
    </div>
  );
}

// lessonComponent.propTypes = {}

export default LessonComponent;
