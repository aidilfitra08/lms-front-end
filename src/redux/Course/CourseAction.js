import axios from "axios";

import {
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
      .get(process.env.REACT_APP_SERVER_BASE_URL + "/apiv1/course-discussion", {
        params: { courseID: courseID },
        headers: {
          Authorization: `Bearer ${userDetail.accessToken}`,
        },
      })
      .then((res) => {
        dispatch(getDiscussion(res.data.payload));
      })
      .catch((err) => {
        dispatch(failRequest(err.message));
      });
  };
};

export const postTopic = (data) => {
  const user = localStorage.getItem("user");
  let userDetail = JSON.parse(user);
  return (dispatch) => {
    dispatch(makeRequest());
    let payload = {
      subjectTitle: data.subjectTitle,
      message: data.message,
    };
    axios
      .post(
        process.env.REACT_APP_SERVER_BASE_URL +
          `/apiv1/new-discussion-topic?courseID=${data.courseID}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${userDetail.accessToken}`,
          },
        }
      )
      .then((res) => {
        dispatch(postSuccess());
      })
      .catch((err) => {
        console.log(err);
        dispatch(failRequest(err.message));
      });
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
        process.env.REACT_APP_SERVER_BASE_URL +
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
  return (dispatch) => {
    dispatch(makeRequest());
    let payload = {
      message: data.message,
    };
    axios
      .post(
        process.env.REACT_APP_SERVER_BASE_URL +
          `/apiv1/new-reply-discussion?discussionID=${data.discussionID}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${userDetail.accessToken}`,
          },
        }
      )
      .then((res) => {
        dispatch(postSuccess());
      })
      .catch((err) => {
        console.log(err);
        dispatch(failRequest(err.message));
      });
  };
};

export const deleteReply = (replyID, discussionID) => {
  const user = JSON.parse(localStorage.getItem("user"));
  return (dispatch) => {
    dispatch(makeRequest());
    axios
      .delete(
        process.env.REACT_APP_SERVER_BASE_URL +
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
