import {
  REQUEST_CHAPTER_ADD,
  REQUEST_UPDATE_CHAPTER,
  REQUEST_CHAPTER_LIST,
  REQUEST_CATEGORY_LIST,
} from "./type";
const INITIAL_STATE = {
  chapters: [],
  isLoading: false,
  error: {},
  token: null,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUEST_CHAPTER_ADD: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case REQUEST_UPDATE_CHAPTER: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case REQUEST_CHAPTER_LIST: {
      return {
        ...state,
        chapters: action.payload,
        isLoading: false,
      };
    }

    case REQUEST_CATEGORY_LIST: {
      return {
        ...state,
        chapters: action.payload,
        isLoading: false,
      };
    }

    default:
      return {
        ...state,
      };
  }
}
