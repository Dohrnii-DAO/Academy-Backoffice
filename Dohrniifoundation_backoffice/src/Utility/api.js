export const API = {
  // USER API
  login: "api/user/login",
  logout: "api/auth/logout",
  forgot: "api/user/forgot_password ",
  profile: "api/user/profile",
  reset: "api/user/reset_password",
  refresh: "api/auth/refresh",

  //QUESTIONNAIRE API
  question: "api/questionnaire/question",
  create_answer: "api/questionnaire/answer",
  get_answer: "api/questionnaire/answer/",
  all_answer_list: "api/questionnaire/all_answer",
  question_list: "api/questionnaire/get_question",
  update_question: "api/questionnaire/update_question",
  update_answer: "api/questionnaire/answer/update",
  delete_answer: "api/questionnaire/answer/delete/",
  delete_question: "api/questionnaire/delete_question/",
  decider_question: "api/questionnaire/decider",

  //STRATEGIES API
  create_strategy: "api/strategy/create",
  update_strategy_id: "api/strategy/update",
  get_strategy_list: "api/strategy/all",
  delete_strategy: "api/strategy/delete/",
  single_strategy: "api/strategy/single",
  delete_strategy_concept: "api/strategy/concept/",
  get_strategy_concept: "api/strategy/concept/",

  //CONCEPTS API
  create_concept: "api/concepts/create",
  update_concept_id: "api/concepts/update",
  get_concept_list: "api/concepts/all",
  delete_concept: "api/concepts/delete/",

  //CHAPTERS API
  create_chapter: "api/chapter/create",
  update_chapter: "api/chapter/update",
  get_chapter_list: "api/chapter/all",
  delete_chapter: "api/chapter/delete/",
  delete_chapter_lesson: "api/chapter/lesson/",
  get_chapter_lesson: "api/chapter/lesson/relation/",
  get_chapter_category: "api/chapter/category/all",

  //LESSON API
  create_lesson: "api/lessons/create",
  update_lesson: "api/lessons/update/",
  get_lesson_list: "api/lessons/all",
  delete_lesson: "api/lessons/delete/",
  get_lesson_class: "api/lessons/class/",
  delete_class_lesson: "api/lessons/class/",

  //CLASS API
  create_class: "api/class/create",
  update_class: "api/class/update",
  get_class_list: "api/class/all",
  delete_class: "api/class/delete/",
  class_quiz_reletion: "api/question/class/",
  delete_class_quiz: "api/class/question/",

  //QUESTION API
  create_quiz: "api/question/create",
  update_quiz: "api/question/update/",
  get_quiz: "api/question/all",
  delete_quiz: "api/question/delete/",
  delete_answer_quiz: "api/question/answer/delete/",
};
