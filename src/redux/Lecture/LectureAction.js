import axios from "axios";
import {
  ADD_BASIC_INFORM_STATE,
  ADD_ENROLL_CODE,
  ADD_LESSON_STATE,
  ADD_SECTIONS_STATE,
  FAIL_REQUEST,
  FINISH_LOADING,
  GET_ALL_COURSES,
  LOADING_PERCENTAGE,
  MAKE_REQUEST,
  REQUEST_SUCCESS,
  UPLOAD_VIDEO_CLOUDINARY_SUCCESS,
  UPDATE_STATUS_COURSE,
  POST_COURSE_SUCCESS,
  COURSE_DETAIL,
  DELETE_LESSON_STATE,
  DELETE_SECTION_STATE,
  UPDATE_LESSON_STATE,
  UPDATE_SECTIONS_STATE,
  LOADING_PERCENTAGE_THUMBNAIL,
  RESET_LOADING_PERCENTAGE,
} from "./LectureActionTypes";

export const addBasicInformData = (basicInformData) => {
  return {
    type: ADD_BASIC_INFORM_STATE,
    payload: basicInformData,
  };
};

export const addEnrollCode = (enrollCode) => {
  return {
    type: ADD_ENROLL_CODE,
    payload: enrollCode,
  };
};

export const addSectionsData = (sectionsData) => {
  return {
    type: ADD_SECTIONS_STATE,
    payload: sectionsData,
  };
};

export const updateSectionsData = (sectionsData) => {
  return {
    type: UPDATE_SECTIONS_STATE,
    payload: sectionsData,
  };
};
export const deleteSection = (sectionIndex, sectionID = null) => {
  return {
    type: DELETE_SECTION_STATE,
    payload: { sectionIndex: sectionIndex, sectionID: sectionID },
  };
};

export const addLessonData = (lessonData) => {
  return {
    type: ADD_LESSON_STATE,
    payload: lessonData,
  };
};

export const updateLessonData = (lessonData) => {
  return {
    type: UPDATE_LESSON_STATE,
    payload: lessonData,
  };
};

export const deleteLesson = (sectionIndex, lessonIndex, lessonID = null) => {
  return {
    type: DELETE_LESSON_STATE,
    payload: {
      sectionIndex: sectionIndex,
      lessonIndex: lessonIndex,
      lessonID: lessonID,
    },
  };
};

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

const loadingUpdate = (percentage) => {
  return {
    type: LOADING_PERCENTAGE,
    payload: percentage,
  };
};
const loadingUpdateThumbnail = (percentage) => {
  return {
    type: LOADING_PERCENTAGE_THUMBNAIL,
    payload: percentage,
  };
};
const postCourseSuccess = () => {
  return {
    type: POST_COURSE_SUCCESS,
  };
};

const uploadCloudinarySuccess = (data) => {
  return {
    type: UPLOAD_VIDEO_CLOUDINARY_SUCCESS,
    payload: data,
  };
};

const getAllCourses = (data) => {
  return {
    type: GET_ALL_COURSES,
    payload: data,
  };
};

const requestSuccess = (courseID) => {
  return {
    type: REQUEST_SUCCESS,
    payload: courseID,
  };
};

const courseDetail = (data) => {
  return {
    type: COURSE_DETAIL,
    payload: data,
  };
};

export const resetLoadingPercentage = () => {
  return {
    type: RESET_LOADING_PERCENTAGE,
  };
};

export const uploadVideo = (data) => {
  var sha1 = require("sha1");
  let public_id = "test_video3";
  let api_key = process.env.REACT_APP_CLOUDINARY_API_KEY;
  let api_secret = process.env.REACT_APP_CLOUDINARY_SECRET_KEY;
  let timestamp = Date.now();
  let folder = "skripsi/test1";
  let signature = sha1(
    `folder=${folder}&public_id=${public_id}&timestamp=${timestamp}${api_secret}`
  );
  const formData = new FormData();
  formData.append("file", data);
  formData.append("api_key", api_key);
  formData.append("timestamp", timestamp);
  formData.append("signature", signature);
  formData.append("folder", folder);
  formData.append("public_id", public_id);
  return (dispatch) => {
    dispatch(makeRequest());
    const axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_CLOUDINARY_URL,
    });

    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        console.log(`${loaded}kb of ${total}kb | ${percent}%`);

        if (percent < 100) {
          dispatch(loadingUpdate(percent));
        }
      },
    };
    axiosInstance
      .post("/video/upload", formData, options)
      .then((res) => {
        let data = {
          url: res.data.secure_url,
          public_id: res.data.public_id,
        };
        dispatch(uploadCloudinarySuccess(data));
      })
      .catch((err) => {
        dispatch(failRequest(err.message));
      });
  };
};
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};
export const uploadPhoto = (data, name) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const decodedJwt = parseJwt(user.accessToken);
  const userId = decodedJwt.userID;
  var sha1 = require("sha1");
  let public_id = `photo_${name}`;
  let api_key = process.env.REACT_APP_CLOUDINARY_API_KEY;
  let api_secret = process.env.REACT_APP_CLOUDINARY_SECRET_KEY;
  let timestamp = Date.now();
  let folder = `skripsi/photo/course_user${userId}`;
  let signature = sha1(
    `folder=${folder}&public_id=${public_id}&timestamp=${timestamp}${api_secret}`
  );
  const formData = new FormData();
  formData.append("file", data);
  formData.append("api_key", api_key);
  formData.append("timestamp", timestamp);
  formData.append("signature", signature);
  formData.append("folder", folder);
  formData.append("public_id", public_id);
  return (dispatch) => {
    dispatch(makeRequest());
    const axiosInstance = axios.create({
      baseURL: process.env.REACT_APP_CLOUDINARY_URL,
    });

    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        console.log(`${loaded}kb of ${total}kb | ${percent}%`);

        if (percent < 100) {
          dispatch(loadingUpdateThumbnail(percent));
        }
      },
    };
    axiosInstance
      .post("/image/upload", formData, options)
      .then((res) => {
        let data = {
          url: res.data.secure_url,
          public_id: res.data.public_id,
        };
        dispatch(uploadCloudinarySuccess(data));
      })
      .catch((err) => {
        dispatch(failRequest(err.message));
      });
  };
};

export const postCourse = (data) => {
  const user = localStorage.getItem("user");
  let userDetail = JSON.parse(user);
  return (dispatch) => {
    dispatch(makeRequest());
    let payload = {
      basicInformation: data.basicInformation,
      sections: data.sections,
    };
    axios
      .post(
        process.env.REACT_APP_SERVER_BASE_URL + "/apiv1/lecture/create-course",
        payload,
        {
          headers: {
            Authorization: `Bearer ${userDetail.accessToken}`,
          },
        }
      )
      .then((res) => {
        dispatch(postCourseSuccess());
      })
      .catch((err) => {
        dispatch(failRequest(err.message));
      });
  };
};

export const fetchAllCourses = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (dispatch) => {
    dispatch(makeRequest());
    axios
      .get(process.env.REACT_APP_SERVER_BASE_URL + "/apiv1/lecture", {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        dispatch(getAllCourses(res.data.payload));
      })
      .catch((err) => {
        dispatch(failRequest(err.message));
      });
  };
};

export const updateCourseStatus = (courseID, courseStatus) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (dispatch) => {
    dispatch(makeRequest());
    axios
      .put(
        process.env.REACT_APP_SERVER_BASE_URL +
          `/apiv1/lecture/update-status?courseID=${courseID}`,
        { courseStatus: courseStatus },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((res) => {
        if (res.status == 201) {
          dispatch(requestSuccess(courseID));
        }
      })
      .catch((err) => {
        dispatch(failRequest(err.message));
      });
  };
};

export const deleteCourse = (courseID) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (dispatch) => {
    dispatch(makeRequest());
    axios
      .delete(
        process.env.REACT_APP_SERVER_BASE_URL +
          `/apiv1/lecture/delete-course?courseID=${courseID}`,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((res) => {
        if (res.status == 201) {
          dispatch(requestSuccess(courseID));
        }
      })
      .catch((err) => {
        dispatch(failRequest(err.message));
      });
  };
};

export const getCourseDetail = (courseID) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (dispatch) => {
    dispatch(makeRequest());
    axios
      .get(
        process.env.REACT_APP_SERVER_BASE_URL +
          `/apiv1/lecture/course-detail?courseID=${courseID}`,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((res) => {
        if (res.status == 201) {
          dispatch(courseDetail(res.data.payload));
        }
      })
      .catch((err) => {
        dispatch(failRequest(err.message));
      });
  };
};

export const updateCourse = (data, courseID) => {
  const user = JSON.parse(localStorage.getItem("user"));
  data.courseID = courseID;
  data.sections = data.sections.filter(Boolean);
  return (dispatch) => {
    dispatch(makeRequest());
    axios
      .put(
        process.env.REACT_APP_SERVER_BASE_URL + `/apiv1/lecture/update-course`,
        data,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((res) => {
        if (res.status == 201) {
          dispatch(requestSuccess(courseID));
        }
      })
      .catch((err) => {
        dispatch(failRequest(err.message));
      });
  };
};
