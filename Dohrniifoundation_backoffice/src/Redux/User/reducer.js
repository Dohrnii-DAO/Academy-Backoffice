import {
  REQUEST_USER_LOGIN,
  REQUEST_LOGIN_SUCCESS,
  REQUEST_LOGIN_FAILURE,
  RECEIVE_ADMIN_DETAILS,
  REQUEST_RESET_PASSWORD,
  REFRESH_TOKEN,
} from "./type";

const INITIAL_STATE = {
  user: {},
  isLoading: false,
  error: {},
  token: null,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUEST_USER_LOGIN: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }

    case REQUEST_RESET_PASSWORD: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }

    case REQUEST_LOGIN_SUCCESS: {
      return {
        ...state,
        token: action.payload,
        isLoading: false,
      };
    }

    case REQUEST_LOGIN_FAILURE: {
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    }

    case RECEIVE_ADMIN_DETAILS: {
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      };
    }
    case REFRESH_TOKEN: {
      return {
        ...state,
        token: action.payload,
        isLoading: false,
      };
    }

    default:
      return {
        ...state,
      };
  }
}
