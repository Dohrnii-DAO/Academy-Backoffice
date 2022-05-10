import {
  REQUEST_QUESTIONS_ADD,
  REQUEST_QUESTIONS_LIST,
  REQUEST_UPDATE_QUESTIONS,
} from "./type";
import history from "../../../Utility/history";
import { adminRoute as admin } from "../../../Route/Route";
import {
  Createquestion,
  createAns,
  getAns,
  Listques,
  updateQues,
  updateAns,
  deleteAns,
  deleteQues,
  deciderQues,
} from "../../../Utility/Services/ServiceApi";

export const Addquestion = (payload) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_QUESTIONS_ADD, payload: true });
    const { data } = await Createquestion(payload);
    history.push(admin.QUESTIONNAIRE);
    return data;
  } catch (e) {}
  {
    dispatch({ type: REQUEST_QUESTIONS_ADD, payload: false });
  }
};

export const createAnswer = async (payload) => {
  try {
    const res = await createAns(payload);

    return res.data;
  } catch (e) {}
};

export const getAnswer = async (payload) => {
  try {
    const res = await getAns(payload);
    return res;
  } catch (e) {}
};

export const questionnaireList = (payload) => async (dispatch) => {
  try {
    const { data } = await Listques(payload);
    history.push(admin.QUESTIONNAIRE);
    dispatch({ type: REQUEST_QUESTIONS_LIST, payload: data });
  } catch (e) {
    window.alert("Something went wrong.");
    window.location.reload();
  }
};

export const updateQuestion = (payload) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_UPDATE_QUESTIONS, payload: true });
    const res = await updateQues(payload);

    return res.data;
  } catch (e) {}
};

export const updateAnswer = async (payload) => {
  try {
    const res = await updateAns(payload);
    return res.data;
  } catch (e) {}
};

export const deleteAnswer = async (id) => {
  try {
    const res = await deleteAns(id);
    return res;
  } catch (e) {}
};

export const deleteQuestion = async (id) => {
  try {
    const res = await deleteQues(id);
    return res;
  } catch (e) {}
};

export const deciderQuestion = async (payload) => {
  try {
    const res = await deciderQues(payload);
    return res;
  } catch (e) {}
};
