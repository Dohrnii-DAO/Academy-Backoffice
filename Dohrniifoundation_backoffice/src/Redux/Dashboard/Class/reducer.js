import {
  REQUEST_CLASS_ADD,
  REQUEST_UPDATE_CLASS,
  REQUEST_CLASS_LIST,
} from "./type";
const INITIAL_STATE = {
  classes: [],
  isLoading: false,
  error: {},
  token: null,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUEST_CLASS_ADD: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case REQUEST_UPDATE_CLASS: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case REQUEST_CLASS_LIST: {
      return {
        ...state,
        classes: action.payload,
        isLoading: false,
      };
    }

    default:
      return {
        ...state,
      };
  }
}
