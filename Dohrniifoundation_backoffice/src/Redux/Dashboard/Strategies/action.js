import {
  REQUEST_STRATEGY_ADD,
  REQUEST_UPDATE_STRATEGY,
  REQUEST_STRATEGY_LIST,
  // REQUEST_STRATEGY_SINGLE,
} from "./type";

import {
  addStrategy,
  modifyStrategy,
  Liststrategy,
  strategyList2,
  Strategydelete,
  strategySingle,
  StrategyConceptdelete,
  StrategyConceptRelation,
  StrategyConceptGet,
} from "../../../Utility/Services/ServiceApi";

export const createStrategy = (payload) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_STRATEGY_ADD, payload: true });
    const data = await addStrategy(payload);

    return data;
  } catch (err) {}
  {
    dispatch({ type: REQUEST_STRATEGY_ADD, payload: false });
  }
};

export const updateStrategy = (payload) => async (dispatch) => {
  try {
    dispatch({ type: REQUEST_UPDATE_STRATEGY, payload: true });
    const res = await modifyStrategy(payload);

    return res.data;
  } catch (e) {}
  {
    dispatch({ type: REQUEST_UPDATE_STRATEGY, payload: false });
  }
};

export const strategyList = (payload) => async (dispatch) => {
  try {
    const { data } = await Liststrategy(payload);
    dispatch({ type: REQUEST_STRATEGY_LIST, payload: data });
  } catch (e) {
    window.alert("Something went wrong.");
    window.location.reload();
  }
};

export const strategyList1 = async () => {
  try {
    const data = await strategyList2();
    return data;
  } catch (e) {}
};

export const deleteStrategy = async (id) => {
  try {
    const res = await Strategydelete(id);

    return res;
  } catch (e) {}
};

export const deleteStrategyConcept = async (id, concepts_id) => {
  try {
    const res = await StrategyConceptdelete(id, concepts_id);
    return res;
  } catch (e) {}
};
export const Singlestrategy = async (id) => {
  try {
    const data = await strategySingle(id);
    return data.data.data[0]?.title;
  } catch (e) {}
};

export const RelationStrategyConcept = async (payload) => {
  try {
    const res = await StrategyConceptRelation(payload);
    return res;
  } catch (e) {
    window.alert("Something went wrong.");
    window.location.reload();
  }
};

export const GetStrategyConcept = async (payload) => {
  try {
    const res = await StrategyConceptGet(payload);
    return res;
  } catch (e) {
    window.alert("Something went wrong.");
    window.location.reload();
  }
};
