import {
  REQUEST_STRATEGY_ADD,
  REQUEST_UPDATE_STRATEGY,
  REQUEST_STRATEGY_LIST,
  REQUEST_STRATEGY_SINGLE,
} from "./type";
const INITIAL_STATE = {
  strategies: [],
  isLoading: false,
  error: {},
  token: null,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUEST_STRATEGY_ADD: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case REQUEST_UPDATE_STRATEGY: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
    case REQUEST_STRATEGY_LIST: {
      return {
        ...state,
        strategies: action.payload,
        isLoading: false,
      };
    }
    case REQUEST_STRATEGY_SINGLE: {
      return {
        ...state,
        strategies: action.payload,
        isLoading: false,
      };
    }

    default:
      return {
        ...state,
      };
  }
}
