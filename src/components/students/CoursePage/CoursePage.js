import React, { useState } from "react";
import TestCoursePhoto from "../../../assets/man-photo.png";

function CoursePage(props) {
  const lectureName = "Mr. Doe";
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const testData = {
    sections: [
      {
        name: "section 1",
        lessons: [
          {
            name: "section 1 lesson 1",
          },
          {
            name: "section 1 lesson 2",
          },
          {
            name: "section 1 lesson 3",
          },
        ],
      },
      {
        name: "section 2",
        lessons: [
          {
            name: "section 2 lesson 1",
          },
          {
            name: "section 2 lesson 2",
          },
        ],
      },
    ],
  };

  function countLessons() {
    var counter = 0;
    testData.sections.map((section) => {
      counter = counter + section.lessons.length;
    });
    // console.log(counter);
    return counter;
  }
  return (
    <div
      className={classNames(props.sideBarTrigger ? "pl-64" : "pl-0", "pt-16")}
    >
      <div className=" grid grid-cols-1 space-y-10">
        <div className=" bg-neutral-700 text-white col-span-1 grid grid-cols-2 h-80 space-x-4">
          <div className="col-span-1 space-y-2 p-8 h">
            <p className=" text-4xl font-bold">Course Title</p>
            <p className="">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              tristique leo vel sapien sagittis, id convallis erat tristique.
              Morbi fringilla nulla at sapien congue, vitae viverra nisi{" "}
            </p>
            <p className=" text-lg">estimate time: hours</p>
            <a href="#" className="block text-md font-semibold">
              facebook ads or etc
            </a>
            {/* <p>total section: 30</p> */}
            <p>Course by: Mr Doe</p>
          </div>
          <div className="col-span-1 pt-4 xl:mt-8">
            <img src={TestCoursePhoto} className="h-72 w-fit border" />
          </div>
        </div>

        <div className="col-span-1 h-auto w-3/4 space-y-4 place-self-center">
          <p className=" text-3xl">course detail</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            tristique leo vel sapien sagittis, id convallis erat tristique.
            Morbi fringilla nulla at sapien congue, vitae viverra nisi
            fermentum. Nulla facilisi. Nunc accumsan mi eget magna lobortis, at
            luctus urna molestie. Integer ultricies est vitae nulla varius, in
            gravida justo feugiat. Ut placerat orci at leo consequat, id pretium
            erat scelerisque. Morbi cursus neque in dapibus scelerisque. Aenean
            nec lorem sed dolor sodales faucibus ut quis tellus.
          </p>
        </div>
        <div className="col-span-1 border border-gray-500 h-auto w-2/4 place-self-center shadow bg-gray-200 p-4">
          <div>Course Section</div>
          <div>
            <p>
              {testData.sections.length} Section .{" "}
              <span>{countLessons()} Lessons</span>
            </p>
          </div>
          <div className=" text-lg ">
            <ul className="list-none">
              {testData.sections.map((section) => {
                return (
                  <>
                    <hr />
                    <li className="">
                      {section.name}
                      <ul className="list-none">
                        {section.lessons.map((lesson) => {
                          return (
                            <>
                              <hr />
                              <li className="">{lesson.name}</li>
                            </>
                          );
                        })}
                      </ul>
                    </li>
                  </>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoursePage;
