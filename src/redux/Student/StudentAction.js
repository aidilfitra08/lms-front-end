import axios from "axios";
import {
  FAIL_REQUEST,
  GET_ALL_COURSES,
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

export const fetchAllCourses = () => {
  return (dispatch) => {
    dispatch(makeRequest());
    axios
      .get(process.env.REACT_APP_BASE_URL + "/apiv1/student")
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
      .get(process.env.REACT_APP_BASE_URL + "/apiv1/student/course-detail", {
        params: { courseID: courseID },
      })
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
      .get(process.env.REACT_APP_BASE_URL + "/apiv1/student/section-detail", {
        params: { sectionID: sectionID },
      })
      .then((res) => {
        dispatch(getSectionDetail(res.data.payload));
      })
      .catch((err) => {
        dispatch(failRequest(err.message));
      });
  };
};
