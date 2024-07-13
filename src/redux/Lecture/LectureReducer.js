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
  POST_COURSE_SUCCESS,
  UPLOAD_VIDEO_CLOUDINARY_SUCCESS,
  REQUEST_SUCCESS,
  COURSE_DETAIL,
  DELETE_LESSON_STATE,
  DELETE_SECTION_STATE,
  UPDATE_LESSON_STATE,
  UPDATE_SECTIONS_STATE,
} from "./LectureActionTypes";

const initialState = {
  basicInformation: {
    title: "",
    shortDescription: "",
    description: "",
    categoryID: "",
    language: "",
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
  courses: [],
  sectionDeleted: [],
  lessonDeleted: [],
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
        postSuccess: true,
      };
    case FAIL_REQUEST:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };
    case ADD_BASIC_INFORM_STATE:
      state.basicInformation.title = action.payload.title;
      state.basicInformation.description = action.payload.description;
      state.basicInformation.shortDescription = action.payload.shortDescription;
      state.basicInformation.thumbnail = action.payload.thumbnail;
      state.basicInformation.language = action.payload.language;
      state.basicInformation.categoryID = action.payload.categoryID;

      return {
        ...state,
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

    case UPDATE_SECTIONS_STATE:
      state.sections[action.payload.sectionIndex].title = action.payload.title;
      state.sections[action.payload.sectionIndex].detail =
        action.payload.detail;
      return {
        ...state,
        // sections: [...state.sections],
      };
    case ADD_LESSON_STATE:
      state.sections[action.payload.sectionIndex].Lessons.push(
        action.payload.lessonData
      );
      return {
        ...state,
        sections: [...state.sections],
      };

    case UPDATE_LESSON_STATE:
      state.sections[action.payload.sectionIndex].Lessons[
        action.payload.lessonIndex
      ] = action.payload.lessonData;
      return {
        ...state,
        sections: [...state.sections],
      };
    case GET_ALL_COURSES:
      return {
        ...state,
        loading: false,
        errorMessage: "",
        courses: action.payload,
      };

    case COURSE_DETAIL:
      state.basicInformation = {
        title: action.payload.title,
        shortDescription: action.payload.shortDescription,
        description: action.payload.description,
        categoryID: action.payload.categoryID,
        language: action.payload.language,
        thumbnail: action.payload.thumbnail,
        enrollCode: action.payload.enrollCode,
        courseStatus: action.payload.courseStatus,
        lectureBy: action.payload.User.name,
      };
      state.sections = action.payload.Sections;
      return {
        ...state,
        loading: false,
        errorMessage: "",

        // courses: action.payload,
      };

    case REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMessage: "",
        requestSuccess: true,
      };

    case DELETE_LESSON_STATE:
      console.log(action.payload.lessonID);
      delete state.sections[action.payload.sectionIndex].Lessons[
        action.payload.lessonIndex
      ];
      if (action.payload.lessonID != null) {
        state.lessonDeleted.push(action.payload.lessonID);
      }
      return {
        ...state,
        loading: false,
        errorMessage: "",
      };
    case DELETE_SECTION_STATE:
      console.log(action.payload.sectionID);
      delete state.sections[action.payload.sectionIndex];
      if (action.payload.sectionID != null) {
        state.sectionDeleted.push(action.payload.sectionID);
      }
      return {
        ...state,
        loading: false,
        errorMessage: "",
      };
    default:
      return state;
  }
};
