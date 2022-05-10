import {
  REQUEST_QUESTIONS_ADD,
  REQUEST_QUESTIONS_LIST,
  REQUEST_UPDATE_QUESTIONS,
} from "./type";

import {
  Quizdelete,
  ListQuiz,
  modifyQuiz,
  addQuiz,
  deleteAnsQuiz,
} from "../../../Utility/Services/ServiceApi";

export const AddQuiz = (payload) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_QUESTIONS_ADD, payload: true });
    const { data } = await addQuiz(payload);

    return data;
  } catch (e) {}
  {
    dispatch({ type: REQUEST_QUESTIONS_ADD, payload: false });
  }
};

export const quizList = (payload) => async (dispatch) => {
  try {
    const { data } = await ListQuiz(payload);

    dispatch({ type: REQUEST_QUESTIONS_LIST, payload: data });
    return data;
  } catch (e) {
    window.alert("Something went wrong.");
    window.location.reload();
  }
};

export const updateQuiz = (payload) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_UPDATE_QUESTIONS, payload: true });
    const res = await modifyQuiz(payload);

    return res.data;
  } catch (e) {}
};

export const deleteAnswer = async (id) => {
  try {
    const res = await deleteAnsQuiz(id);
    return res;
  } catch (e) {}
};

export const deleteQuiz = async (id) => {
  try {
    const res = await Quizdelete(id);
    return res;
  } catch (e) {}
};
