import React from "react";
import CourseCard from "../CourseCard";
import Footer from "../../footer/Footer";

function CoursesPage(props) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const testingCoursesMap = [1, 2, 3, 4, 5];
  return (
    <div
      className={classNames(props.sideBarTrigger ? "pl-64" : "pl-0", " pt-16")}
    >
      <div className="grid grid-cols-2">
        <div className=" col-span-1 h-36 p-5">
          <div className="border-2 border-neutral-300 p-4">
            <p className="  text-lg font-normal">Course Complete</p>
            <hr />
            <p className=" text-4xl font-medium">2 / 5</p>
          </div>
        </div>
        <div className=" col-span-1 h-36 p-5">
          <div className="border-2 border-neutral-300 p-4">
            <p className="  text-lg font-normal"> Course Not Complete</p>
            <hr />
            <p className=" text-4xl font-medium">3 / 5</p>
          </div>
        </div>
      </div>
      <div className="bg-slate-400">
        {/* Class Type */}
        <div className=""></div>
        <div className="grid grid-cols-4 ">
          {testingCoursesMap.map((number) => (
            <div className="col-span-1">
              <CourseCard />
            </div>
          ))}
        </div>
      </div>

      {/* <Footer sideBarTrigger={props.sideBarTrigger} /> */}
    </div>
  );
}

export default CoursesPage;
