import {
  REQUEST_CHAPTER_ADD,
  REQUEST_UPDATE_CHAPTER,
  REQUEST_CHAPTER_LIST,
  REQUEST_CATEGORY_LIST,
} from "./type";

import {
  addChapter,
  modifyChapter,
  Listchapter,
  Chapterdelete,
  ChapterLessonGet,
  ChapterLessondelete,
  ChapterCategoryGet,
} from "../../../Utility/Services/ServiceApi";

export const createChapter = (payload) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_CHAPTER_ADD, payload: true });
    const data = await addChapter(payload);

    return data;
  } catch (err) {}
  {
    dispatch({ type: REQUEST_CHAPTER_ADD, payload: false });
  }
};

export const updateChapter = (payload) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_UPDATE_CHAPTER, payload: true });
    const res = await modifyChapter(payload);
    return res.data;
  } catch (e) {}
  {
    dispatch({ type: REQUEST_UPDATE_CHAPTER, payload: false });
  }
};

export const ChapterList = (payload) => async (dispatch) => {
  try {
    const { data } = await Listchapter(payload);

    dispatch({ type: REQUEST_CHAPTER_LIST, payload: data });
  } catch (e) {
    window.alert("Something went wrong.");
    window.location.reload();
  }
};
export const CategoryList = (payload) => async (dispatch) => {
  try {
    const { data } = await ChapterCategoryGet(payload);

    dispatch({ type: REQUEST_CATEGORY_LIST, payload: data });
  } catch (e) {
    window.alert("Something went wrong.");
    window.location.reload();
  }
};

export const deleteChapter = async (id) => {
  try {
    const res = await Chapterdelete(id);

    return res;
  } catch (e) {}
};
export const RelationChapterLesson = async (payload) => {
  return await ChapterLessonGet(payload);
};

export const deleteChapterLesson = async (chapter_id, lesson_id) => {
  try {
    const res = await ChapterLessondelete(chapter_id, lesson_id);
    return res;
  } catch (e) {}
};
