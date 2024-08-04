import React, { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import {
  deleteCourse,
  fetchAllCourses,
  updateCourseStatus,
} from "../../../redux/Lecture/LectureAction";
import Swal from "sweetalert2";

function Homepage(props) {
  useEffect(() => {
    document.title = "Kursus Anda";
  }, []);
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const [clicked, setClicked] = useState(false);

  const dispatch = useDispatch();

  const updateStatus = (courseID, status) => {
    Swal.fire({
      title: "Apakah anda yakin?",
      // text: "Anda dapat mengubahnya lagi nanti!",
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
          title: "Status Kursus Berubah!",
          text: "Status kursus Anda berhasil diubah",
          icon: "success",
          confirmButtonColor: "#3085d6",
        });
      }
    });
  };

  const delCourse = (courseID) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Anda tidak akan dapat mengulangi aksi ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteCourse(courseID));
        setClicked(!clicked);
        Swal.fire({
          title: "Terhapus!",
          text: "Kursus yang anda pilih berhasil dihapus",
          icon: "success",
        });
      }
    });
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
          <p className=" text-2xl font-bold">Kursus</p>

          <a
            href="/lecture/courses/create-course"
            className=" bg-yellow-400 hover:bg-yellow-200 px-3 py-2 rounded-md"
          >
            Buat Kursus
          </a>
        </div>
        <p className="mx-10 max-md:mx-2 my-5">
          Silahkan klik nama kursus untuk masuk ke diskusi kelas.
        </p>
        <div className="mx-10 max-md:mx-2 my-5">
          <table className=" w-full text-center rounded-md border-separate">
            <tr className=" bg-indigo-200">
              <th className=" rounded-tl-md">No.</th>
              <th className="">Judul</th>
              <th className="">Tanggal Dibuat</th>
              <th className="">Status</th>
              <th className="rounded-tr-md">Aksi</th>
            </tr>
            {props.courses.map((val, key) => {
              let dateCourse = new Date(val.createdAt);
              dateCourse = dateCourse.toString();
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
                    >
                      Ubah
                    </a>
                    <button
                      className="bg-yellow-400 p-2 rounded-md"
                      onClick={() => delCourse(val.courseID)}
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
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
