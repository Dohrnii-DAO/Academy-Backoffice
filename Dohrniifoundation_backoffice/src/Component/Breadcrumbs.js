import React from "react";
import "../Assets/Css/breadcrumbs.css";
import { Breadcrumb } from "react-bootstrap";
import history from "../Utility/history";
import { adminRoute as admin } from "../Route/Route";
import { name } from "../Utility/constant";

const Breadcrumbs = ({
  showCL = false,
  showL = false,
  showQuery = false,
  showClass = false,
  showChapter = false,
  showQuestion = false,
  showQ = false,
  showF = false,
  showCon = false,
  showCQ = false,
  showCF = false,
  showSt = false,
  showCst = false,
  showCcon = false,
  showUL = false,
  showViewQuery = false,
  showUF = false,
  showUQ = false,
  showUst = false,
  showCreateChapter = false,
  showCreateClas = false,
  showCreateQuestion = false,
  showUpdateClas = false,
  showUpdateQuestion = false,
  showUpdateChapter = false,
  showUcon = false,
  activeL = false,
  activeF = false,
  activeQuery = false,
  activeClass = false,
  activeChapter = false,
  activeQuestion = false,
  activeQ = false,
  activeS = false,
  activeCon = false,
}) => {
  return (
    <>
      <Breadcrumb bspostfix="/">
        <Breadcrumb.Item onClick={() => history.push(admin.DASHBOARD)}>
          Dashboard
        </Breadcrumb.Item>
        {showL && (
          <Breadcrumb.Item
            active={activeL}
            onClick={() => history.push(admin.LESSONS)}
          >
            Lessons{" "}
          </Breadcrumb.Item>
        )}
        {showCL && <Breadcrumb.Item active>Add </Breadcrumb.Item>}
        {showUL && <Breadcrumb.Item active>Update</Breadcrumb.Item>}

        {showClass && (
          <Breadcrumb.Item
            active={activeClass}
            onClick={() => history.push(admin.CLASS)}
          >
            Classes{" "}
          </Breadcrumb.Item>
        )}
        {showCreateClas && <Breadcrumb.Item active>Add </Breadcrumb.Item>}
        {showUpdateClas && <Breadcrumb.Item active>Update</Breadcrumb.Item>}

        {showChapter && (
          <Breadcrumb.Item
            active={activeChapter}
            onClick={() => history.push(admin.CHAPTERS)}
          >
            Chapters{" "}
          </Breadcrumb.Item>
        )}
        {showCreateChapter && <Breadcrumb.Item active>Add </Breadcrumb.Item>}
        {showUpdateChapter && <Breadcrumb.Item active>Update</Breadcrumb.Item>}

        {showQuestion && (
          <Breadcrumb.Item
            active={activeQuestion}
            onClick={() => history.push(admin.QUESTIONS)}
          >
            Questions{" "}
          </Breadcrumb.Item>
        )}
        {showCreateQuestion && <Breadcrumb.Item active>Add </Breadcrumb.Item>}
        {showUpdateQuestion && <Breadcrumb.Item active>Update</Breadcrumb.Item>}

        {showQ && (
          <Breadcrumb.Item
            active={activeQ}
            onClick={() => history.push(admin.QUESTIONNAIRE)}
          >
            {name.questionnaire.questionnair}
          </Breadcrumb.Item>
        )}
        {showCQ && <Breadcrumb.Item active>Add</Breadcrumb.Item>}
        {showUQ && <Breadcrumb.Item active>Update</Breadcrumb.Item>}
        {showSt && (
          <Breadcrumb.Item
            active={activeS}
            onClick={() => history.push(admin.STRATEGIES)}
          >
            {name.common.strategy}
          </Breadcrumb.Item>
        )}
        {showCst && <Breadcrumb.Item active>Add</Breadcrumb.Item>}
        {showUst && <Breadcrumb.Item active>Update</Breadcrumb.Item>}
        {showCon && (
          <Breadcrumb.Item
            active={activeCon}
            onClick={() => history.push(admin.CONCEPTS)}
          >
            {name.common.concept}
          </Breadcrumb.Item>
        )}
        {showCcon && <Breadcrumb.Item active>Add</Breadcrumb.Item>}
        {showUcon && <Breadcrumb.Item active>Update</Breadcrumb.Item>}

        {showF && (
          <Breadcrumb.Item
            active={activeF}
            onClick={() => history.push(admin.FAQ)}
          >
            FAQ's{" "}
          </Breadcrumb.Item>
        )}
        {showCF && <Breadcrumb.Item active>Add </Breadcrumb.Item>}
        {showUF && <Breadcrumb.Item active>Update</Breadcrumb.Item>}

        {showQuery && (
          <Breadcrumb.Item
            active={activeQuery}
            onClick={() => history.push(admin.QUERY)}
          >
            Customer Support
          </Breadcrumb.Item>
        )}

        {showViewQuery && <Breadcrumb.Item active>View</Breadcrumb.Item>}
      </Breadcrumb>
    </>
  );
};

export default Breadcrumbs;
