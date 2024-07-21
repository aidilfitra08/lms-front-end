import React, { useEffect, useState } from "react";
// import TestCoursePhoto from "../../../assets/man-photo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-solid-svg-icons";
import { faCirclePlay } from "@fortawesome/free-regular-svg-icons";
import { connect, useDispatch } from "react-redux";
import { fetchSection } from "../../../redux/Student/StudentAction";
import { useNavigate, useSearchParams } from "react-router-dom";
import ReactPlayer from "react-player/lazy";

function SectionPage(props) {
  useEffect(() => {
    document.title = "Materi Kursus";
  }, []);
  const [searchParams, setSearchParams] = useSearchParams();
  const sectionID = searchParams.get("sectionID");
  const [videoDetail, setVideoDetail] = useState({});
  const [attachmentDetail, setAttachmentDetail] = useState({});
  const navigate = useNavigate();
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  console.log(searchParams.size);
  if (searchParams.size === 0) {
    navigate(-1, { replace: true });
    // window.location.reload(true);
  }
  const dispatch = useDispatch();
  const testData = {
    name: "section 1",
    lessons: [
      {
        name: "section 1 lesson 1",
        lessonType: "video",
      },
      {
        name: "section 1 lesson 2",
        lessonType: "text",
      },
      {
        name: "section 1 lesson 3",
        lessonType: "attachment",
      },
      {
        name: "section 1 lesson 3",
        lessonType: "video",
      },
      {
        name: "section 1 lesson 3",
        lessonType: "video",
      },
      {
        name: "section 1 lesson 3",
        lessonType: "video",
      },
      {
        name: "section 1 lesson 3",
        lessonType: "video",
      },
      {
        name: "section 1 lesson 3",
        lessonType: "video",
      },
    ],
  };
  console.log(videoDetail.url);
  const sectionsOption = [
    <ReactPlayer
      url={videoDetail.url}
      controls={true}
      pip={true}
      width="100%"
      height="100%"
      className="absolute top-0 right-0 overflow-hidden rounded-lg bg-white"
    />,
    // <iframe
    //   // width={1280}
    //   // height={}
    //   src={videoDetail.url ? videoDetail.url : ""}
    //   title="Big Buck Bunny 60fps 4K - Official Blender Foundation Short Film"
    //   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    //   allowfullscreen="true"
    //   className="w-full aspect-video rounded-xl my-auto bg-white"
    // ></iframe>
    <p>Show Below For More</p>,
    <p>Download Attachment here</p>,
  ];

  // const videoRender = (videoType) => {
  //   switch (videoType) {
  //     case "html":
  //       return (

  //       )

  //     default:
  //       break;
  //   }
  // }
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
  // useEffect(() => {
  //   console.log(focusLessonType.sectionsOption);
  // }, [focusLessonType]);
  useEffect(() => {
    dispatch(fetchSection(sectionID));
  }, []);
  // const [video, setVideo] = useState([]);
  return (
    <div
      className={classNames(props.sideBarTrigger ? "pl-64" : "pl-0", "pt-16")}
    >
      <div className=" mb-6 grid grid-cols-1 space-y-10">
        <div className="grid grid-cols-4 bg-neutral-400 px-16">
          <div
            className={classNames(
              focusLessonType.sectionsOption != 0
                ? " h-128 pt-52"
                : " min-h-128 pt-[55%]",
              " col-span-3 max-md:col-span-4 text-center my-8 mr-6 relative "
            )}
          >
            {sectionsOption[focusLessonType.sectionsOption]}
          </div>
          <div className="col-span-1 max-md:col-span-4  bg-white px-6 rounded-xl my-8">
            <p className="pt-6 pb-4">Materi</p>
            <div className="relative h-full">
              <div className=" text-lg space-y-3 absolute h-[86%] w-full overflow-x-hidden overflow-y-auto">
                <ul className="list-none space-y-2">
                  {props.sectionDetail.Lessons.map((lesson) => {
                    return (
                      <>
                        <li className="">
                          <button
                            onClick={() =>
                              sectionClicked(
                                lesson.lessonType,
                                lesson.videoType,
                                lesson.videoUrl,
                                lesson.attachment,
                                lesson.attachmentType
                              )
                            }
                          >
                            <FontAwesomeIcon icon={faCirclePlay} />{" "}
                            {lesson.title}
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
        <div className="p-6 col-span-1 h-auto max-w-7xl space-y-4 place-self-center">
          <p className=" text-3xl">{props.sectionDetail.title}</p>
          <p>
            Pada sesi ini. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Quisque tristique leo vel sapien sagittis, id convallis erat
            tristique. Morbi fringilla nulla at sapien congue, vitae viverra
            nisi fermentum. Nulla facilisi. Nunc accumsan mi eget magna
            lobortis, at luctus urna molestie. Integer ultricies est vitae nulla
            varius, in gravida justo feugiat. Ut placerat orci at leo consequat,
            id pretium erat scelerisque. Morbi cursus neque in dapibus
            scelerisque. Aenean nec lorem sed dolor sodales faucibus ut quis
            tellus.
          </p>
        </div>

        <div className="p-6 col-span-1 h-auto max-w-7xl space-y-4 place-self-center">
          <p className=" text-3xl">Lesson Summary</p>
          <p>
            Pada sesi ini. Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Quisque tristique leo vel sapien sagittis, id convallis erat
            tristique. Morbi fringilla nulla at sapien congue, vitae viverra
            nisi fermentum. Nulla facilisi. Nunc accumsan mi eget magna
            lobortis, at luctus urna molestie. Integer ultricies est vitae nulla
            varius, in gravida justo feugiat. Ut placerat orci at leo consequat,
            id pretium erat scelerisque. Morbi cursus neque in dapibus
            scelerisque. Aenean nec lorem sed dolor sodales faucibus ut quis
            tellus.
          </p>
        </div>

        {/* <div className="col-span-1">
          <button className=" bg-gray-800 text-white p-4">Next Section</button>
        </div> */}
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
