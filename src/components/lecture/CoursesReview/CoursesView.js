import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import Footer from "../../footer/Footer";
import {
  deleteCourse,
  fetchAllCourses,
  updateCourseStatus,
} from "../../../redux/Lecture/LectureAction";
import Swal from "sweetalert2";

function Homepage(props) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const [clicked, setClicked] = useState(false);
  // const testingMap = [1, 2, 3, 4, 5];
  // const courses = props.course.allCourses;
  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(fetchAllCourses());
  // }, []);
  const dateObject = new Date("2023-09-27 23:40:30.405+07");
  console.log(dateObject);
  const humanDateFormat = dateObject.toString();
  let timezone = "+01";
  if (dateObject.getTimezoneOffset() == "-420") {
    timezone = "+07";
  }
  console.log(timezone);
  const dateStr =
    dateObject.getFullYear() +
    "-" +
    (dateObject.getMonth() + 1) +
    "-" +
    dateObject.getDate() +
    " " +
    dateObject.getHours() +
    ":" +
    dateObject.getMinutes() +
    ":" +
    dateObject.getSeconds() +
    timezone;
  const data = [
    { title: "course 1", publishDate: dateStr, status: "published" },
    { title: "course 2", publishDate: dateStr, status: "notreviewed" },
    { title: "course 3", publishDate: dateStr, status: "reviewed" },
    { title: "course 4", publishDate: dateStr, status: "hidden" },
  ];

  const updateStatus = (courseID, status) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be able to change later!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${
        status === "published" ? "Publish" : "hide"
      } it!`,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(updateCourseStatus(courseID, status));
        setClicked(!clicked);
        Swal.fire({
          title: "Status Changed!",
          text: "Your course status has been changed.",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
      }
    });
  };

  const delCourse = (courseID) => {
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
        dispatch(deleteCourse(courseID));
        setClicked(!clicked);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });

    // alert("Kursus berhasil di hapus!");
  };

  useEffect(() => {
    dispatch(fetchAllCourses());
  }, [clicked]);
  return (
    <>
      <div
        className={classNames(
          props.sideBarTrigger ? "pl-64 max-md:pl-0" : "pl-0",
          "pt-16"
        )}
      >
        <div className="flex flex-row mx-10 max-md:mx-2 mt-5 justify-between">
          <p className=" text-2xl font-bold">Courses</p>

          <a
            href="/lecture/courses/create-course"
            className=" bg-yellow-400 hover:bg-yellow-200 px-3 py-2 rounded-md"
          >
            Create Course
          </a>
        </div>
        <p className="mx-10 max-md:mx-2 my-5">
          Silahkan klik nama kursus untuk masuk ke diskusi kelas.
        </p>
        <div className="mx-10 max-md:mx-2 my-5">
          <table className=" w-full text-center rounded-md border-separate">
            <tr className=" bg-indigo-200">
              <th className=" rounded-tl-md">No.</th>
              <th className="">Title</th>
              <th className="">Publish Date</th>
              <th className="">Status</th>
              <th className="rounded-tr-md">Action</th>
            </tr>
            {props.courses.map((val, key) => {
              let dateCourse = new Date(val.createdAt);
              dateCourse = dateCourse.toString();
              // console.log(date);
              return (
                <tr key={key} className="bg-slate-100">
                  <td>{key + 1}</td>
                  <td>
                    <a
                      href={`/lecture/courses/course-page?courseID=${val.courseID}`}
                      className="font-semibold hover:text-blue-800"
                    >
                      {val.title}
                    </a>
                  </td>
                  <td>{dateCourse}</td>
                  <td>{val.courseStatus}</td>
                  <td className="space-x-2 space-y-2 max-lg:grid p-3">
                    {/* <button className="bg-yellow-400 p-2 w-20 rounded-md">
                      Students
                    </button> */}
                    <button
                      className="bg-yellow-400 p-2 w-20 rounded-md"
                      onClick={() =>
                        val.courseStatus === "hidden"
                          ? updateStatus(val.courseID, "published")
                          : updateStatus(val.courseID, "hidden")
                      }
                    >
                      {val.courseStatus === "hidden" ? "Publish" : "Hide"}
                    </button>
                    <a
                      className="bg-yellow-400 p-2 rounded-md"
                      href={`/lecture/courses/edit-course?courseID=${val.courseID}`}
                      // onClick={() => setEditData(val.courseID)}
                    >
                      Edit
                    </a>
                    <button
                      className="bg-yellow-400 p-2 rounded-md"
                      onClick={() => delCourse(val.courseID)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
      <Footer sideBarTrigger={props.sideBarTrigger} />
    </>
  );
}
const mapStateToProps = (state) => {
  return {
    courses: state.lecture.courses,
    loading: state.lecture.loading,
  };
};

export default connect(mapStateToProps)(Homepage);
