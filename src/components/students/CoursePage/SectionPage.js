import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileLines } from "@fortawesome/free-solid-svg-icons";
import { faCirclePlay } from "@fortawesome/free-regular-svg-icons";
import { connect, useDispatch } from "react-redux";
import { fetchSection } from "../../../redux/Student/StudentAction";
import { useNavigate, useSearchParams } from "react-router-dom";
import ReactPlayer from "react-player/lazy";
import { pdfjs, Document, Page } from "react-pdf";
// import defaultPdf from "../../../assets/default-pdf.pdf";
import pdfFile from "../../../assets/default-pdf.pdf";

function SectionPage(props) {
  useEffect(() => {
    document.title = "Materi Kursus";
  }, []);
  const [searchParams, setSearchParams] = useSearchParams();
  const sectionID = searchParams.get("sectionID");
  const [videoDetail, setVideoDetail] = useState({});
  const [attachmentDetail, setAttachmentDetail] = useState({});
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  if (searchParams.size === 0) {
    navigate(-1, { replace: true });
  }
  const dispatch = useDispatch();
  const pdfURL = "";
  const sectionsOption = [
    <ReactPlayer
      url={videoDetail.url}
      controls={true}
      pip={true}
      width="100%"
      height="100%"
      className="absolute top-0 right-0 overflow-hidden rounded-lg bg-white"
    />,

    <p>Show Below For More</p>,
    <embed src={pdfFile} height={1000} width={800} />,
  ];

  const [focusLessonType, setFocusLessonType] = useState({
    type: "video",
    sectionsOption: 0,
  });
  const sectionClicked = (
    lessonType,
    videoType,
    videoUrl,
    attachment,
    attachmentType
  ) => {
    setVideoDetail({ type: videoType, url: videoUrl });
    setAttachmentDetail({ type: attachmentType, attachment: attachment });
    if (lessonType === "video") {
      setFocusLessonType({ type: lessonType, sectionsOption: 0 });
    } else if (lessonType === "text") {
      setFocusLessonType({ type: lessonType, sectionsOption: 1 });
    } else if (lessonType === "attachment") {
      setFocusLessonType({ type: lessonType, sectionsOption: 2 });
    }
  };
  useEffect(() => {
    dispatch(fetchSection(sectionID));
  }, []);
  console.log(props.sectionDetail.Lessons[0]);
  // console.log(props.sectionDetail.Lessons[0].lessonType);
  useEffect(() => {
    if (props.sectionDetail.Lessons[0] != null) {
      sectionClicked(
        props.sectionDetail.Lessons[0].lessonType,
        props.sectionDetail.Lessons[0].videoType,
        props.sectionDetail.Lessons[0].videoUrl,
        props.sectionDetail.Lessons[0].attachment,
        props.sectionDetail.Lessons[0].attachmentType
      );
    }
  }, [props.sectionDetail]);
  return (
    <div
      className={classNames(
        props.sideBarTrigger ? "pl-64 max-lg:pl-0" : "pl-0",
        "pt-16"
      )}
    >
      <div className=" mb-6 grid grid-cols-1 space-y-10">
        <div className="grid grid-cols-4 bg-neutral-400 px-16">
          <div
            className={classNames(
              focusLessonType.sectionsOption != 0
                ? " h-128 pt-52 max-lg:h-56"
                : " min-h-128 pt-[55%]",
              " col-span-3 max-lg:col-span-4 text-center my-8 mr-6 relative max-lg:mr-0 max-lg:mb-0 "
            )}
          >
            {sectionsOption[focusLessonType.sectionsOption]}
          </div>
          <div className="col-span-1 max-lg:col-span-4  bg-white px-6 rounded-xl my-8 max-lg:h-56">
            <p className="pt-6 pb-4">Materi</p>
            <div className="relative h-full">
              <div className=" text-lg space-y-3 absolute h-[50%] w-full overflow-x-hidden overflow-y-auto">
                <ul className="list-none space-y-2">
                  {props.sectionDetail.Lessons.map((lesson, index) => {
                    return (
                      <>
                        <li className=" ">
                          <button
                            className="grid grid-cols-12 text-left"
                            onClick={() => {
                              sectionClicked(
                                lesson.lessonType,
                                lesson.videoType,
                                lesson.videoUrl,
                                lesson.attachment,
                                lesson.attachmentType
                              );
                              setIndex(index);
                            }}
                          >
                            <span className="col-span-1">
                              {lesson.lessonType == "video" ? (
                                <FontAwesomeIcon icon={faCirclePlay} />
                              ) : (
                                <FontAwesomeIcon icon={faFileLines} />
                              )}
                            </span>
                            <span className="col-span-11 ml-2">
                              {lesson.title}
                            </span>
                          </button>
                        </li>
                        <hr />
                      </>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 col-span-1 h-auto w-full space-y-4 ">
          <p className=" text-3xl">{props.sectionDetail.title}</p>
          <p>{props.sectionDetail.detail} </p>
        </div>

        <div className="p-6 col-span-1 h-auto w-full space-y-4 text-center">
          <p className=" text-3xl">Kesimpulan Materi</p>
          <p>
            {props.sectionDetail.Lessons[0] != null
              ? props.sectionDetail.Lessons[index].summary
              : ""}
          </p>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    sectionDetail: state.student.sectionDetail,
    loading: state.student.loading,
    errorMessage: state.student.errorMessage,
  };
};
export default connect(mapStateToProps)(SectionPage);
