import React, { useEffect, useState } from "react";
import TestCoursePhoto from "../../../assets/man-photo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-solid-svg-icons";
import { faCirclePlay } from "@fortawesome/free-regular-svg-icons";

function SectionPage(props) {
  const lectureName = "Mr. Doe";
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

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

  const sectionsOption = [
    <iframe
      // width={1280}
      // height={}
      src="https://www.youtube.com/embed/aqz-KE-bpKQ"
      title="Big Buck Bunny 60fps 4K - Official Blender Foundation Short Film"
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      className="w-full aspect-video rounded-xl my-auto bg-white"
    ></iframe>,
    <p>Show Below For More</p>,
    <p>Download Attachment here</p>,
  ];
  const [focusLessonType, setFocusLessonType] = useState({
    type: "video",
    sectionsOption: 0,
  });
  const sectionClicked = (lessonType) => {
    if (lessonType === "video") {
      setFocusLessonType({ type: lessonType, sectionsOption: 0 });
    } else if (lessonType === "text") {
      setFocusLessonType({ type: lessonType, sectionsOption: 1 });
    } else if (lessonType === "attachment") {
      setFocusLessonType({ type: lessonType, sectionsOption: 2 });
    }
  };
  useEffect(() => {
    console.log(focusLessonType.sectionsOption);
  }, [focusLessonType]);
  // const [video, setVideo] = useState([]);
  return (
    <div
      className={classNames(props.sideBarTrigger ? "pl-64" : "pl-0", "pt-16")}
    >
      <div className=" mb-6 grid grid-cols-1 space-y-10">
        <div className="grid grid-cols-4 bg-neutral-400 px-16">
          <div
            className={classNames(
              focusLessonType.sectionsOption != 0 ? " h-128 pt-52" : "",
              " col-span-3 max-md:col-span-4 text-center my-8 mr-6"
            )}
          >
            {sectionsOption[focusLessonType.sectionsOption]}
            {/* <iframe
              // width={1280}
              // height={}
              src="https://www.youtube.com/embed/aqz-KE-bpKQ"
              title="Big Buck Bunny 60fps 4K - Official Blender Foundation Short Film"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
              className="w-full aspect-video rounded-xl my-auto bg-white"
            ></iframe> */}
          </div>
          <div className="col-span-1 max-md:col-span-4  bg-white px-6 rounded-xl my-8">
            <p className="pt-6 pb-4">Lessons</p>
            <div className="relative h-full">
              <div className=" text-lg space-y-3 absolute h-[86%] w-full overflow-x-hidden overflow-y-auto">
                <ul className="list-none space-y-2">
                  {testData.lessons.map((lesson) => {
                    return (
                      <>
                        <li className="">
                          <button
                            onClick={() => sectionClicked(lesson.lessonType)}
                          >
                            <FontAwesomeIcon icon={faCirclePlay} />{" "}
                            {lesson.name}
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
          <p className=" text-3xl">Section Detail</p>
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

        <div className="col-span-1">
          <button className=" bg-gray-800 text-white p-4">Next Section</button>
        </div>
      </div>
    </div>
  );
}

export default SectionPage;
