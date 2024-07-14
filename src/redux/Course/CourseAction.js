import axios from "axios";

import {
  ADD_NEW_TOPIC,
  ADD_REPLY,
  DELETE_REPLY,
  DELETE_TOPIC,
  FAIL_REQUEST,
  GET_DISCUSSION,
  MAKE_REQUEST,
  POST_SUCCESS,
  REQUEST_SUCCESS,
} from "./CourseActionTypes";

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

const postSuccess = () => {
  return {
    type: POST_SUCCESS,
  };
};

const getDiscussion = (data) => {
  return {
    type: GET_DISCUSSION,
    payload: data,
  };
};

const addTopic = (data) => {
  return {
    type: ADD_NEW_TOPIC,
    payload: data,
  };
};

// export const deleteTopic = (discussionID) => {
//   // console.log(sectionIndex);
//   // console.log(lessonIndex);
//   return {
//     type: DELETE_TOPIC,
//     payload: {
//       discussionID: discussionID
//     },
//   };
// };

const addReply = (data) => {
  return {
    type: ADD_REPLY,
    payload: data,
  };
};

// export const deleteReply = (replyID) => {
//   // console.log(sectionIndex);
//   // console.log(lessonIndex);
//   return {
//     type: DELETE_REPLY,
//     payload: {
//       replyID: replyID,
//     },
//   };
// };

const requestSuccess = (ID) => {
  return {
    type: REQUEST_SUCCESS,
    payload: ID,
  };
};

export const fetchDiscussion = (courseID) => {
  const user = localStorage.getItem("user");
  let userDetail = JSON.parse(user);
  return (dispatch) => {
    dispatch(makeRequest());
    axios
      .get(process.env.REACT_APP_BASE_URL + "/apiv1/course-discussion", {
        params: { courseID: courseID },
        headers: {
          Authorization: `Bearer ${userDetail.accessToken}`,
        },
      })
      .then((res) => {
        dispatch(getDiscussion(res.data.payload));
      })
      .catch((err) => {
        console.log(err);
        dispatch(failRequest(err.message));
      });
  };
};

export const postTopic = (data) => {
  const user = localStorage.getItem("user");
  let userDetail = JSON.parse(user);
  console.log(data);
  return (dispatch) => {
    dispatch(makeRequest());
    let payload = {
      subjectTitle: data.subjectTitle,
      message: data.message,
    };
    axios
      .post(
        process.env.REACT_APP_BASE_URL +
          `/apiv1/new-discussion-topic?courseID=${data.courseID}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${userDetail.accessToken}`,
          },
        }
      )
      .then((res) => {
        // if (res.status == 201) {
        // console.log("berhasil");
        dispatch(postSuccess());
      })
      .catch((err) => {
        console.log(err);
        dispatch(failRequest(err.message));
      });
    // console.log(userDetail.accessToken);
  };
};

export const deleteTopic = (discussionID) => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user.accessToken);
  console.log(discussionID);
  return (dispatch) => {
    dispatch(makeRequest());
    axios
      .delete(
        process.env.REACT_APP_BASE_URL +
          `/apiv1/lecture/delete-course?discussionID=${discussionID}`,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((res) => {
        if (res.status == 201) {
          dispatch(requestSuccess(discussionID));
        }
      })
      .catch((err) => {
        dispatch(failRequest(err.message));
      });
  };
};

export const postReply = (data) => {
  const user = localStorage.getItem("user");
  let userDetail = JSON.parse(user);
  // console.log(data);
  return (dispatch) => {
    dispatch(makeRequest());
    let payload = {
      message: data.message,
    };
    axios
      .post(
        process.env.REACT_APP_BASE_URL +
          `/apiv1/new-reply-discussion?discussionID=${data.discussionID}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${userDetail.accessToken}`,
          },
        }
      )
      .then((res) => {
        // if (res.status == 201) {
        // console.log("berhasil");
        dispatch(postSuccess());
      })
      .catch((err) => {
        console.log(err);
        dispatch(failRequest(err.message));
      });
    // console.log(userDetail.accessToken);
  };
};

export const deleteReply = (replyID, discussionID) => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user.accessToken);
  // console.log(discussionID);
  return (dispatch) => {
    dispatch(makeRequest());
    axios
      .delete(
        process.env.REACT_APP_BASE_URL +
          `/apiv1/lecture/delete-course?replyID=${replyID}&discussionID=${discussionID}`,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      )
      .then((res) => {
        if (res.status == 201) {
          dispatch(requestSuccess(replyID));
        }
      })
      .catch((err) => {
        dispatch(failRequest(err.message));
      });
  };
};
