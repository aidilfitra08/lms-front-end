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

const initialState = {
  basicInformation: {
    title: "",
    shortDescription: "",
    description: "",
    categoryID: "",
    languange: "",
    thumbnail: "",
    enrollCode: "",
  },
  sections: [],
  loading: false,
  errorMessage: "",
  tempCloudinaryData: {
    url: "",
    public_id: "",
  },
  loadingPercentage: 0,
};

export const createCourseReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAKE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case LOADING_PERCENTAGE:
      return {
        ...state,
        loadingPercentage: action.payload,
      };
    case UPLOAD_VIDEO_CLOUDINARY_SUCCESS:
      // state.loadingBar++;
      return {
        ...state,
        loading: false,
        loadingPercentage: 100,
        tempCloudinaryData: {
          url: action.payload.url,
          public_id: action.payload.public_id,
        },
      };
    case POST_COURSE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case FAIL_REQUEST:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };
    case ADD_BASIC_INFORM_STATE:
      return {
        ...state,
        basicInformation: action.payload,
      };
    case ADD_ENROLL_CODE:
      state.basicInformation.enrollCode = action.payload;
      return {
        ...state,
        // basicInformation.enrollCode : action.payload,
      };
    case ADD_SECTIONS_STATE:
      return {
        ...state,
        sections: [...state.sections, action.payload],
      };

    case ADD_LESSON_STATE:
      state.sections[action.payload.sectionIndex].lessons.push(
        action.payload.lessonData
      );
      return {
        ...state,
        sections: [...state.sections],
      };
    default:
      return state;
  }
};
