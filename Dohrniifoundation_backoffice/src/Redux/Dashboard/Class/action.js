import {
  REQUEST_CLASS_ADD,
  REQUEST_UPDATE_CLASS,
  REQUEST_CLASS_LIST,
} from "./type";

import history from "../../../Utility/history";
import { adminRoute as admin } from "../../../Route/Route";
import {
  addClass,
  modifyClass,
  ListClass,
  Classdelete,
  ClassQuizdelete,
} from "../../../Utility/Services/ServiceApi";

export const createClass = (payload) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_CLASS_ADD, payload: true });
    const data = await addClass(payload);

    return data;
  } catch (err) {}
  {
    dispatch({ type: REQUEST_CLASS_ADD, payload: false });
  }
};

export const updateClass = (payload) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_UPDATE_CLASS, payload: true });
    const res = await modifyClass(payload);

    return res.data;
  } catch (e) {}
  {
    dispatch({ type: REQUEST_UPDATE_CLASS, payload: false });
  }
};

export const ClassList = (payload) => async (dispatch) => {
  try {
    const { data } = await ListClass(payload);
    dispatch({ type: REQUEST_CLASS_LIST, payload: data });
  } catch (e) {
    window.alert("Something went wrong.");
    window.location.reload();
  }
};

export const deleteClass = async (id) => {
  try {
    const res = await Classdelete(id);

    return res;
  } catch (e) {}
};
