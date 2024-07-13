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

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  discussions: [
    {
      subjectTitle: "",
      discussionID: "",
      message: "",
      Replies: [{ replyID: "", message: "", User: { name: "" }, userID: "" }],
      User: { name: "" },
    },
  ],
  loading: false,
  errorMessage: "",
  loadingPercentage: 0,
};

export const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAKE_REQUEST:
      return {
        ...state,
        loading: true,
        errorMessage: "",
      };

    case FAIL_REQUEST:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };

    case POST_SUCCESS:
      return {
        ...state,
        loading: false,
        postSuccess: true,
      };

    case REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMessage: "",
      };

    case GET_DISCUSSION:
      console.log(action.payload);
      return {
        ...state,
        loading: false,
        errorMessage: "",
        discussions: action.payload,
      };

    // case ADD_NEW_TOPIC:
    //   return {
    //     ...state,
    //     discussion: [action.payload],
    //   }

    // case DELETE_TOPIC:
    //   return {

    //   }

    // case ADD_REPLY:
    //   return {

    //   }

    // case DELETE_REPLY:
    //   return {

    //   }

    default:
      return state;
  }
};
