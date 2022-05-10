import { API } from "../api";
import Cookies from "universal-cookie";
import axios from "axios";
const cookies = new Cookies();
//............................... ..........LOGIN USER API....................................... //

export const loginIn = (payload) => {
  try {
    return axios.post(`${process.env.REACT_APP_API_URL}${API.login}`, payload, {
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  } catch (e) {}
};

export const Logout = () => {
  try {
    const token = cookies.get("accessToken");
    return axios.post(
      `${process.env.REACT_APP_API_URL}${API.logout}`,
      { token },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {}
};

export const AdminProfile = () => {
  try {
    const token = cookies.get("accessToken");
    return axios.get(`${process.env.REACT_APP_API_URL}${API.profile}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {}
};

export const PaswwordRestEmail = (payload) => {
  try {
    return axios.post(
      `${process.env.REACT_APP_API_URL}${API.forgot}`,
      payload,
      { headers: { "Access-Control-Allow-Origin": "*" } }
    );
  } catch (e) {}
};

export const ResetCurrentpassword = (payload) => {
  try {
    return axios.post(`${process.env.REACT_APP_API_URL}${API.reset}`, payload, {
      headers: { "Access-Control-Allow-Origin": "*" },
    });
  } catch (e) {}
};

// export const refreshToken = () => {
//   const token = cookies.get("accessToken");
//   return axios.post(
//     `${process.env.REACT_APP_API_URL}${API.refresh}`,
//     { token },
//     {
//       headers: {
//         "Access-Control-Allow-Origin": "*",
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );
// };
//............................... ..........QUESTIONNAIRE API....................................... //

export const Createquestion = (payload) => {
  try {
    const token = cookies.get("accessToken");
    return axios.post(
      `${process.env.REACT_APP_API_URL}${API.question}`,
      payload,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {}
};

export const createAns = (payload) => {
  try {
    const token = cookies.get("accessToken");
    return axios.post(
      `${process.env.REACT_APP_API_URL}${API.create_answer}`,
      payload,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {}
};

export const getAns = (payload) => {
  try {
    const token = cookies.get("accessToken");
    return axios.get(
      `${process.env.REACT_APP_API_URL}${API.get_answer}${payload}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {}
};

export const Listques = (payload) => {
  try {
    const token = cookies.get("accessToken");
    return axios.get(`${process.env.REACT_APP_API_URL}${API.question_list}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (e) {}
};

export const updateQues = (payload) => {
  try {
    const token = cookies.get("accessToken");
    return axios.put(
      `${process.env.REACT_APP_API_URL}${API.update_question}`,
      payload,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {}
};

export const updateAns = (payload) => {
  try {
    const token = cookies.get("accessToken");
    return axios.put(
      `${process.env.REACT_APP_API_URL}${API.update_answer}`,
      payload,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {}
};

export const deleteAns = (id) => {
  try {
    const token = cookies.get("accessToken");
    return axios.delete(
      `${process.env.REACT_APP_API_URL}${API.delete_answer}${id}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {}
};

export const deleteQues = (id) => {
  try {
    const token = cookies.get("accessToken");
    return axios.delete(
      `${process.env.REACT_APP_API_URL}${API.delete_question}${id}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {}
};

export const deciderQues = (payload) => {
  try {
    const token = cookies.get("accessToken");
    return axios.post(
      `${process.env.REACT_APP_API_URL}${API.decider_question}`,
      payload,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {}
};

//............................... ..........STRATEGY API....................................... //
export const addStrategy = (payload) => {
  try {
    const token = cookies.get("accessToken");
    return axios.post(
      `${process.env.REACT_APP_API_URL}${API.create_strategy}`,
      payload,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {}
};

export const modifyStrategy = (payload) => {
  try {
    const token = cookies.get("accessToken");
    return axios.post(
      `${process.env.REACT_APP_API_URL}${API.update_strategy_id}`,
      payload,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {}
};

export const Liststrategy = (payload) => {
  try {
    const token = cookies.get("accessToken");
    return axios.get(
      `${process.env.REACT_APP_API_URL}${API.get_strategy_list}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {}
};

export const strategyList2 = () => {
  try {
    const token = cookies.get("accessToken");
    return axios.get(
      `${process.env.REACT_APP_API_URL}${API.get_strategy_list}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {}
};

export const Strategydelete = (id) => {
  try {
    const token = cookies.get("accessToken");
    return axios.delete(
      `${process.env.REACT_APP_API_URL}${API.delete_strategy}${id}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {}
};

export const StrategyConceptdelete = (id, concepts_id) => {
  try {
    const token = cookies.get("accessToken");
    return axios.delete(
      `${process.env.REACT_APP_API_URL}${API.delete_strategy_concept}${id}/${concepts_id}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {}
};

export const strategySingle = (id) => {
  try {
    const token = cookies.get("accessToken");
    return axios.get(
      `${process.env.REACT_APP_API_URL}${API.single_strategy}/${id}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {}
};

export const StrategyConceptRelation = (payload) => {
  try {
    const token = cookies.get("accessToken");
    return axios.post(
      `${process.env.REACT_APP_API_URL}${API.relation_concept_strategy}`,
      payload,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {}
};

export const StrategyConceptGet = (payload) => {
  try {
    const token = cookies.get("accessToken");
    return axios.get(
      `${process.env.REACT_APP_API_URL}${API.get_strategy_concept}${payload}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {}
};
//............................... ..........CONCEPT API....................................... //

export const addConcept = (payload) => {
  try {
    const token = cookies.get("accessToken");
    return axios.post(
      `${process.env.REACT_APP_API_URL}${API.create_concept}`,
      payload,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {}
};

export const modifyConcept = (payload) => {
  try {
    const token = cookies.get("accessToken");
    return axios.post(
      `${process.env.REACT_APP_API_URL}${API.update_concept_id}`,
      payload,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {}
};

export const Listconcept = (payload) => {
  try {
    const token = cookies.get("accessToken");
    return axios.get(
      `${process.env.REACT_APP_API_URL}${API.get_concept_list}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {}
};

export const conceptList2 = async () => {
  try {
    const token = cookies.get("accessToken");
    return await axios.get(
      `${process.env.REACT_APP_API_URL}${API.get_concept_list}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {}
};

export const Conceptdelete = (id) => {
  try {
    const token = cookies.get("accessToken");
    return axios.delete(
      `${process.env.REACT_APP_API_URL}${API.delete_concept}${id}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {}
};

//............................... ..........CHAPTER API....................................... //
export const addChapter = (payload) => {
  try {
    const token = cookies.get("accessToken");
    return axios.post(
      `${process.env.REACT_APP_API_URL}${API.create_chapter}`,
      payload,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {}
};

export const modifyChapter = (payload) => {
  try {
    const token = cookies.get("accessToken");
    return axios.post(
      `${process.env.REACT_APP_API_URL}${API.update_chapter}`,
      payload,

      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {}
};

export const Listchapter = (payload) => {
  try {
    const token = cookies.get("accessToken");
    return axios.get(
      `${process.env.REACT_APP_API_URL}${API.get_chapter_list}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {}
};

export const Chapterdelete = (id) => {
  try {
    const token = cookies.get("accessToken");
    return axios.delete(
      `${process.env.REACT_APP_API_URL}${API.delete_chapter}${id}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {}
};
export const ChapterLessonGet = (payload) => {
  try {
    const token = cookies.get("accessToken");
    return axios.get(
      `${process.env.REACT_APP_API_URL}${API.get_chapter_lesson}${payload}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {}
};

export const ChapterCategoryGet = (payload) => {
  try {
    const token = cookies.get("accessToken");
    return axios.get(
      `${process.env.REACT_APP_API_URL}${API.get_chapter_category}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {}
};

export const ChapterLessondelete = (chapter_id, lesson_id) => {
  try {
    const token = cookies.get("accessToken");
    return axios.delete(
      `${process.env.REACT_APP_API_URL}${API.delete_chapter_lesson}${chapter_id}/${lesson_id}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {}
};

//............................... ..........LESSON API....................................... //

export const addLesson = (payload) => {
  try {
    const token = cookies.get("accessToken");
    return axios.post(
      `${process.env.REACT_APP_API_URL}${API.create_lesson}`,
      payload,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {}
};

export const modifyLesson = (payload) => {
  try {
    const token = cookies.get("accessToken");
    return axios.put(
      `${process.env.REACT_APP_API_URL}${API.update_lesson}${payload.id}`,
      payload,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {}
};

export const ListLesson = (payload) => {
  try {
    const token = cookies.get("accessToken");
    return axios.get(`${process.env.REACT_APP_API_URL}${API.get_lesson_list}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (e) {}
};

export const Lessondelete = (id) => {
  try {
    const token = cookies.get("accessToken");
    return axios.delete(
      `${process.env.REACT_APP_API_URL}${API.delete_lesson}${id}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {}
};
export const LessonClassGet = (payload) => {
  try {
    const token = cookies.get("accessToken");
    return axios.get(
      `${process.env.REACT_APP_API_URL}${API.get_lesson_class}${payload}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {}
};

export const ClassLessondelete = (lessons_id, class_id) => {
  try {
    const token = cookies.get("accessToken");
    return axios.delete(
      `${process.env.REACT_APP_API_URL}${API.delete_class_lesson}${lessons_id}/${class_id}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {}
};

//............................... ..........CLASS API....................................... //

export const addClass = (payload) => {
  try {
    const token = cookies.get("accessToken");
    return axios.post(
      `${process.env.REACT_APP_API_URL}${API.create_class}`,
      payload,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {}
};

export const modifyClass = (payload) => {
  try {
    const token = cookies.get("accessToken");
    return axios.post(
      `${process.env.REACT_APP_API_URL}${API.update_class}`,
      payload,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {}
};

export const ListClass = (payload) => {
  try {
    const token = cookies.get("accessToken");
    return axios.get(`${process.env.REACT_APP_API_URL}${API.get_class_list}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (e) {}
};

export const Classdelete = (id) => {
  try {
    const token = cookies.get("accessToken");
    return axios.delete(
      `${process.env.REACT_APP_API_URL}${API.delete_class}${id}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {}
};

export const ClassQuizGet = (payload) => {
  try {
    const token = cookies.get("accessToken");
    return axios.get(
      `${process.env.REACT_APP_API_URL}${API.class_quiz_reletion}${payload}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {}
};

export const ClassQuizdelete = (class_id, quiz_id) => {
  try {
    const token = cookies.get("accessToken");
    return axios.delete(
      `${process.env.REACT_APP_API_URL}${API.delete_class_quiz}${class_id}/${quiz_id}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {}
};
//............................... ..........QUESTION API....................................... //

export const addQuiz = (payload) => {
  try {
    const token = cookies.get("accessToken");
    return axios.post(
      `${process.env.REACT_APP_API_URL}${API.create_quiz}`,
      payload,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {}
};

export const modifyQuiz = (payload) => {
  try {
    const token = cookies.get("accessToken");
    return axios.put(
      `${process.env.REACT_APP_API_URL}${API.update_quiz}${payload.id}`,
      payload,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {}
};

export const ListQuiz = (payload) => {
  try {
    const token = cookies.get("accessToken");
    return axios.get(`${process.env.REACT_APP_API_URL}${API.get_quiz}`, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (e) {}
};
export const Quizdelete = (id) => {
  try {
    const token = cookies.get("accessToken");
    return axios.delete(
      `${process.env.REACT_APP_API_URL}${API.delete_quiz}${id}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {}
};

export const deleteAnsQuiz = (id) => {
  try {
    const token = cookies.get("accessToken");
    return axios.delete(
      `${process.env.REACT_APP_API_URL}${API.delete_answer_quiz}${id}`,
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (e) {}
};
