import {
  REQUEST_CONCEPT_ADD,
  REQUEST_UPDATE_CONCEPT,
  REQUEST_CONCEPT_LIST,
  //   REQUEST_CONCEPT_SINGLE,
} from "./type";
const INITIAL_STATE = {
  concepts: [],
  isLoading: false,
  error: {},
  token: null,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUEST_CONCEPT_ADD: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case REQUEST_UPDATE_CONCEPT: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case REQUEST_CONCEPT_LIST: {
      return {
        ...state,
        concepts: action.payload,
        isLoading: false,
      };
    }
    // case REQUEST_CONCEPT_SINGLE: {
    //   return {
    //     ...state,
    //     strategies: action.payload,
    //     isLoading: false,
    //   };
    // }

    default:
      return {
        ...state,
      };
  }
}
