import {
  REQUEST_LESSON_ADD,
  REQUEST_UPDATE_LESSON,
  REQUEST_LESSON_LIST,
} from "./type";

import {
  addLesson,
  modifyLesson,
  ListLesson,
  Lessondelete,
  LessonClassGet,
} from "../../../Utility/Services/ServiceApi";

export const createLesson = (payload) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_LESSON_ADD, payload: true });
    const data = await addLesson(payload);

    return data;
  } catch (err) {}
  {
    dispatch({ type: REQUEST_LESSON_ADD, payload: false });
  }
};

export const updateLesson = (payload) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_UPDATE_LESSON, payload: true });
    const res = await modifyLesson(payload);

    return res.data;
  } catch (e) {}
  {
    dispatch({ type: REQUEST_UPDATE_LESSON, payload: false });
  }
};

export const LessonList = (payload) => async (dispatch) => {
  try {
    const { data } = await ListLesson(payload);
    dispatch({ type: REQUEST_LESSON_LIST, payload: data });
  } catch (e) {
    window.alert("Something went wrong.");
    window.location.reload();
  }
};

export const deleteLesson = async (id) => {
  try {
    const res = await Lessondelete(id);

    return res;
  } catch (e) {}
};

export const GetReletion = async (payload) => {
  try {
    const res = await LessonClassGet(payload);
    return res;
  } catch (e) {}
  window.alert("Something went wrong.");
  window.location.reload();
};
