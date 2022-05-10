import {
  REQUEST_CONCEPT_ADD,
  REQUEST_UPDATE_CONCEPT,
  REQUEST_CONCEPT_LIST,
} from "./type";
import history from "../../../Utility/history";
import { adminRoute as admin } from "../../../Route/Route";
import {
  addConcept,
  modifyConcept,
  Listconcept,
  Conceptdelete,
  conceptList2,
} from "../../../Utility/Services/ServiceApi";

export const createConcept = (payload) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_CONCEPT_ADD, payload: true });
    const { data } = await addConcept(payload);

    return data;
  } catch (err) {
    dispatch({ type: REQUEST_CONCEPT_ADD, payload: false });
  }
};

export const updateConcept = (payload) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_UPDATE_CONCEPT, payload: true });
    const res = await modifyConcept(payload);

    return res.data;
  } catch (e) {}
};

export const conceptList = (payload) => async (dispatch) => {
  try {
    const { data } = await Listconcept(payload);
    dispatch({ type: REQUEST_CONCEPT_LIST, payload: data });
  } catch (e) {}
};

export const conceptList1 = async () => {
  try {
    const data = conceptList2();
    return data;
  } catch (e) {}
};

export const deleteConcept = async (id) => {
  try {
    const res = await Conceptdelete(id);
    return res;
  } catch (e) {}
};
