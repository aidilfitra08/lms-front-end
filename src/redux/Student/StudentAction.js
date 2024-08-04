import axios from "axios";
import {
  ENROLLMENT_STATUS,
  ENROLLMENT_SUCCESS,
  FAIL_REQUEST,
  GET_ALL_COURSES,
  GET_ALL_JOINED_COURSES,
  GET_COURSE_DETAIL,
  GET_SECTION_DETAIL,
  MAKE_REQUEST,
} from "./StudentActionTypes";

const makeRequest = () => {
  return {
    type: MAKE_REQUEST,
  };
};

const failRequest = (err) => {
  return {
    type: FAIL_REQUEST,
    payload: err,
  };
};

const getAllJoinedCourses = (data) => {
  return {
    type: GET_ALL_JOINED_COURSES,
    payload: data,
  };
};

const getAllCourses = (data) => {
  return {
    type: GET_ALL_COURSES,
    payload: data,
  };
};

const getCourseDetail = (data) => {
  return {
    type: GET_COURSE_DETAIL,
    payload: data,
  };
};

const getSectionDetail = (data) => {
  return {
    type: GET_SECTION_DETAIL,
    payload: data,
  };
};

const enrollmentStatus = (status) => {
  return {
    type: ENROLLMENT_STATUS,
    payload: status,
  };
};

const enrollmentSuccess = (status) => {
  return {
    type: ENROLLMENT_SUCCESS,
    payload: status,
  };
};

export const fetchAllJoinedCourses = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (dispatch) => {
    dispatch(makeRequest());
    axios
      .get(
        process.env.REACT_APP_SERVER_BASE_URL + "/apiv1/student/joined-courses",
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((res) => {
        dispatch(getAllJoinedCourses(res.data.payload));
      })
      .catch((err) => {
        dispatch(failRequest(err.message));
      });
  };
};

export const fetchAllCourses = (
  offset = null,
  limit = null,
  courseType = null
) => {
  const user = JSON.parse(localStorage.getItem("user"));
  let params = null;
  if (offset != null && limit != null) {
    params = { offset: offset, limit: limit };
  }
  return (dispatch) => {
    dispatch(makeRequest());
    axios
      .get(
        process.env.REACT_APP_SERVER_BASE_URL + "/apiv1/student/all-courses",
        {
          params: params,
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((res) => {
        dispatch(getAllCourses(res.data.payload));
      })
      .catch((err) => {
        dispatch(failRequest(err.message));
      });
  };
};

export const fetchCourse = (courseID) => {
  return (dispatch) => {
    dispatch(makeRequest());
    axios
      .get(
        process.env.REACT_APP_SERVER_BASE_URL + "/apiv1/student/course-detail",
        {
          params: { courseID: courseID },
        }
      )
      .then((res) => {
        dispatch(getCourseDetail(res.data.payload));
      })
      .catch((err) => {
        dispatch(failRequest(err.response.data.message));
      });
  };
};

export const fetchSection = (sectionID) => {
  return (dispatch) => {
    dispatch(makeRequest());
    axios
      .get(
        process.env.REACT_APP_SERVER_BASE_URL + "/apiv1/student/section-detail",
        {
          params: { sectionID: sectionID },
        }
      )
      .then((res) => {
        dispatch(getSectionDetail(res.data.payload));
      })
      .catch((err) => {
        dispatch(failRequest(err.message));
      });
  };
};

export const checkEnrollment = (courseID) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (dispatch) => {
    dispatch(makeRequest());
    axios
      .get(
        process.env.REACT_APP_SERVER_BASE_URL +
          `/apiv1/student/check-enrollment?courseID=${courseID}`,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((res) => {
        dispatch(enrollmentStatus(res.data.enrollmentStatus));
      })
      .catch((err) => {
        dispatch(failRequest(err.message));
      });
  };
};

export const enrollMe = (courseID, enrollmentKey) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (dispatch) => {
    dispatch(makeRequest());
    axios
      .post(
        process.env.REACT_APP_SERVER_BASE_URL + `/apiv1/student/enroll`,
        { courseID: courseID, enrollCode: enrollmentKey },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((res) => {
        dispatch(enrollmentSuccess());
        alert("Anda telah Berhasil enroll ke kelas ini.");
      })
      .catch((err) => {
        dispatch(failRequest(err.message));
        alert("Enrollment Key salah, silahkan isi kembali.");
        window.location.reload(true);
      });
  };
};
