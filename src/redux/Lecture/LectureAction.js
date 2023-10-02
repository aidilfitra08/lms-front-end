import axios from "axios";
import {
  ADD_BASIC_INFORM_STATE,
  ADD_ENROLL_CODE,
  ADD_LESSON_STATE,
  ADD_SECTIONS_STATE,
  FAIL_REQUEST,
  FINISH_LOADING,
  LOADING_PERCENTAGE,
  MAKE_REQUEST,
  POST_COURSE_SUCCESS,
  UPLOAD_VIDEO_CLOUDINARY_SUCCESS,
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

export const addLessonData = (lessonData) => {
  return {
    type: ADD_LESSON_STATE,
    payload: lessonData,
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

export const uploadVideo = (data) => {
  var sha1 = require("sha1");
  let public_id = "test_video3";
  let api_key = "891875937589394";
  let api_secret = "IflTR_gKs4YmER030iYSK_q2Yzk";
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
        // console.log(res);
      })
      .catch((err) => {
        dispatch(failRequest(err.message));
      });
    // if(data)
    // axios
    //   .post(process.env.REACT_APP_BASE_URL + "/apiv1/lecture/create-course", {
    //     data,
    //   })
    //   .then((res) => {
    //     dispatch();
    //   })
    //   .catch((err) => {
    //     dispatch(failRequest(err.message));
    //   });
  };
};

export const postCourse = (data) => {
  localStorage.getItem("user");
  return (dispatch) => {
    dispatch(makeRequest());
    let payload = {
      basicInformation: data.basicInformation,
      sections: data.sections,
    };
    axios
      .post(
        process.env.REACT_APP_BASE_URL + "/apiv1/lecture/create-course",
        payload
        // {
        //   headers: {
        //     Authorization: `Bearer ${myToken}`,
        //   },
        // }
      )
      .then((res) => {
        if (res.status == 201) {
          dispatch(postCourseSuccess());
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch(failRequest(err.message));
      });
  };
};
