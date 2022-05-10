import {
  REQUEST_QUESTIONS_ADD,
  REQUEST_ANSWERS_ADD,
  REQUEST_QUESTIONS_LIST,
  REQUEST_ANSWER_LIST,
  REQUEST_UPDATE_QUESTIONS,
  REQUEST_UPDATE_ANSWER,
  REQUEST_DELETE_QUESTIONS,
  REQUEST_QUESTION_SUCCESS,
  REQUEST_ANSWERS_SUCCESS,
} from "./type";

const INITIAL_STATE = {
  questionnaire: [],
  isLoading: false,
  error: {},
  token: null,
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUEST_QUESTIONS_ADD: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }

    case REQUEST_ANSWERS_ADD: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }

    case REQUEST_QUESTIONS_LIST: {
      return {
        ...state,
        questionnaire: action.payload,
        isLoading: false,
      };
    }

    case REQUEST_ANSWER_LIST: {
      return {
        ...state,
        questionnaire: action.payload,
        isLoading: true,
      };
    }

    case REQUEST_UPDATE_QUESTIONS: {
      return {
        ...state,
        questionnaire: action.payload,
        isLoading: true,
      };
    }
    case REQUEST_UPDATE_ANSWER: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }

    case REQUEST_DELETE_QUESTIONS: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }

    case REQUEST_QUESTION_SUCCESS: {
      return {
        ...state,
        questionnaire: action.payload,
        isLoading: false,
      };
    }

    case REQUEST_ANSWERS_SUCCESS: {
      return {
        ...state,
        questionnaire: action.payload,
        isLoading: false,
      };
    }

    case REQUEST_DELETE_QUESTIONS: {
      return {
        ...state,
        isLoading: action.payload,
      };
    }

    default:
      return {
        ...state,
      };
  }
}
