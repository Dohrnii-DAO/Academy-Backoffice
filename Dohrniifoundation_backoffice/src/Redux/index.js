import { combineReducers } from "redux";
import userReducer from "./User/reducer";
import questionnaireReducer from "./Dashboard/Questionnaire/reducer";
import strategyReducer from "./Dashboard/Strategies/reducer";
import conceptReducer from "./Dashboard/Concept/reducer";
import chapterReducer from "./Dashboard/Chapter/reducer";
import lessonReducer from "./Dashboard/Lesson/reducer";
import classReducer from "./Dashboard/Class/reducer";
import questionReducer from "./Dashboard/Question/reducer";

const RootReducer = combineReducers({
  user: userReducer,
  questionnaire: questionnaireReducer,
  strategy: strategyReducer,
  concept: conceptReducer,
  chapter: chapterReducer,
  lesson: lessonReducer,
  class: classReducer,
  question: questionReducer,
});

export default RootReducer;
