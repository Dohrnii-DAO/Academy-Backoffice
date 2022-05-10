import React from "react";
import { Route, Switch } from "react-router-dom";

import { adminRoute } from "./Route";
import AdminDashboard from "../Pages/Admin/index";
import Lessons from "../Pages/Admin/Lesson/Lessons";
import CreateLessons from "../Pages/Admin/Lesson/CreateLessons";
import UpdateLessons from "../Pages/Admin/Lesson/EditLessons";
import Class from "../Pages/Admin/Class/Class";
import CreateClass from "../Pages/Admin/Class/CreateClass";
import Chapters from "../Pages/Admin/Chapter/Chapters";
import Questions from "../Pages/Admin/Questions/Questions";
import CreateQuestions from "../Pages/Admin/Questions/CreateQuestions";
import UpdateQuestions from "../Pages/Admin/Questions/EditQuestions";
import Concepts from "../Pages/Admin/Concepts/Concepts";
import Strategies from "../Pages/Admin/Strategies/Strategies";
import CreateChapters from "../Pages/Admin/Chapter/CreateChapters";
import CreateConcepts from "../Pages/Admin/Concepts/CreateConcepts";
import CreateStrategies from "../Pages/Admin/Strategies/CreateStrategies";
import Questionnaire from "../Pages/Admin/Questionnaries/Questionnaire";
import CreateQuestionnaire from "../Pages/Admin/Questionnaries/CreateQuestionnaire";
import EditQuestionnaire from "../Pages/Admin/Questionnaries/EditQuestionnaire";
import UpdateStrategies from "../Pages/Admin/Strategies/EditStrategy";
import UpdateChapter from "../Pages/Admin/Chapter/EditChapter";
import UpdateConcept from "../Pages/Admin/Concepts/EditConcept";
import UpdateClass from "../Pages/Admin/Class/EditClass";
import Page404 from "../Pages/Public/Page404";

const AdminRoute = (props) => {
  return (
    <>
      <Switch>
        <Route exact component={AdminDashboard} path={adminRoute.DASHBOARD} />
        <Route exact component={Lessons} path={adminRoute.LESSONS} />
        <Route
          exact
          component={CreateLessons}
          path={adminRoute.CREATELESSONS}
        />
        <Route
          exact
          component={UpdateLessons}
          path={`${adminRoute.EDITLESSONS}:id`}
        />
        <Route exact component={Class} path={adminRoute.CLASS} />
        <Route exact component={CreateClass} path={adminRoute.CREATECLASS} />
        <Route
          exact
          component={UpdateClass}
          path={`${adminRoute.EDITCLASS}:id`}
        />
        <Route
          exact
          component={Questionnaire}
          path={adminRoute.QUESTIONNAIRE}
        />
        <Route
          exact
          component={CreateQuestionnaire}
          path={adminRoute.CREATEQUESTIONNAIRE}
        />
        <Route
          exact
          component={EditQuestionnaire}
          path={`${adminRoute.EDITQUESTIONNAIRE}:id`}
        />
        <Route exact component={Chapters} path={adminRoute.CHAPTERS} />
        <Route
          exact
          component={CreateChapters}
          path={adminRoute.CREATECHAPTERS}
        />
        <Route
          exact
          component={UpdateChapter}
          path={`${adminRoute.EDITCHAPTERS}:id`}
        />
        <Route exact component={Concepts} path={adminRoute.CONCEPTS} />
        <Route
          exact
          component={CreateConcepts}
          path={adminRoute.CREATECONCEPTS}
        />
        <Route
          exact
          component={UpdateConcept}
          path={`${adminRoute.EDITCONCEPTS}:id`}
        />
        <Route exact component={Questions} path={adminRoute.QUESTIONS} />
        <Route
          exact
          component={CreateQuestions}
          path={adminRoute.CREATEQUESTIONS}
        />
        <Route
          exact
          component={UpdateQuestions}
          path={`${adminRoute.EDITQUESTIONS}:id`}
        />
        <Route exact component={Strategies} path={adminRoute.STRATEGIES} />
        <Route
          exact
          component={CreateStrategies}
          path={adminRoute.CREATESTRATEGIES}
        />
        <Route
          exact
          component={UpdateStrategies}
          path={`${adminRoute.EDITSTRATEGIES}:id`}
        />

        <Route path="/" component={Page404} />
      </Switch>
    </>
  );
};

export default AdminRoute;
