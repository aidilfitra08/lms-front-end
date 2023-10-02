import {
  FAIL_REQUEST,
  GET_ALL_COURSES,
  GET_COURSE_DETAIL,
  GET_SECTION_DETAIL,
  MAKE_REQUEST,
} from "./StudentActionTypes";
const courseDetailInitialState = {
  User: {},
  Sections: [],
};

const sectionDetailInitialState = {
  Lessons: [],
};
const initialState = {
  loading: false,
  errorMessage: "",
  allCourses: [],
  courseDetail: courseDetailInitialState,
  sectionDetail: sectionDetailInitialState,
};
export const courseReducer = (state = initialState, action) => {
  switch (action.type) {
    case MAKE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FAIL_REQUEST:
      return {
        ...state,
        loading: false,
        errorMessage: action.payload,
      };
    case GET_ALL_COURSES:
      return {
        ...state,
        loading: false,
        errorMessage: "",
        allCourses: action.payload,
      };

    case GET_COURSE_DETAIL:
      return {
        ...state,
        loading: false,
        errorMessage: "",
        courseDetail: action.payload,
      };

    case GET_SECTION_DETAIL:
      return {
        ...state,
        loading: false,
        errorMessage: "",
        sectionDetail: action.payload,
      };

    default:
      return state;
  }
};
