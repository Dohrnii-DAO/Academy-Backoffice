import {
  REQUEST_LESSON_ADD,
  REQUEST_UPDATE_LESSON,
  REQUEST_LESSON_LIST,
} from "./type";
const INITIAL_STATE = {
  lessons: [],
  isLoading: false,
  error: {},
  token: null,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUEST_LESSON_ADD: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case REQUEST_UPDATE_LESSON: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case REQUEST_LESSON_LIST: {
      return {
        ...state,
        lessons: action.payload,
        isLoading: false,
      };
    }

    default:
      return {
        ...state,
      };
  }
}
