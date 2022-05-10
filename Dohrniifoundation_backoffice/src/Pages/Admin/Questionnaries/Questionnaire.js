import React, { useState, useEffect, useMemo } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

import Breadcrumbs from "../../../Component/Breadcrumbs";
import style from "../../../Assets/Css/questionnaire.module.css";
import history from "../../../Utility/history";
import { adminRoute as admin } from "../../../Route/Route";

import { useDispatch, useSelector } from "react-redux";

import {
  questionnaireList,
  deleteQuestion,
  deciderQuestion,
} from "../../../Redux/Dashboard/Questionnaire/action";
import { alert, name } from "../../../Utility/constant";
import BlockUi from "react-block-ui";
import { toast } from "react-toastify";
import TableQuestionnaire from "../../../Component/DataTable/Questionnaire/DataTable";
import FilterComponent from "../../../Component/DataTable/FilterComponents";
import DeletePopup from "../../../Component/Modal/deletePopUp";
import DeciderPopup from "../../../Component/Modal/DeciderModal";

const Questionnaire = (props) => {
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [showHide, setShowHide] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [iloading, setIloading] = useState(false);
  const [questionid, setQuestionId] = useState("");
  const [decider, setDecider] = useState("");
  const isloading = useSelector((state) => state.user.isLoading);
  const Listdata = useSelector(
    (state) => state.questionnaire.questionnaire.data
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(questionnaireList());
  }, [dispatch]);

  // cancle delete
  const CancleDelete = () => {
    setDeleteShow(!deleteShow);
  };

  // confirm delete function
  const ConfirmDelete = () => {
    setIloading(true);
    deleteQuestion(questionid).then((res) => {
      // if (res.data?.status === true) {
      setTimeout(() => {
        toast.success(`${alert.message.delete}`, {
          position: "top-right",
          autoClose: 1500,
          theme: "colored",
          toastId: "1",
        });
        setIloading(false);
        dispatch(questionnaireList());
      }, 800);
      // }
    });
    setDeleteShow(!deleteShow);
  };

  const ConfirmDecider = () => {
    setIloading(true);
    let deciderQuestionData = {
      question_id: decider,
    };
    deciderQuestion(deciderQuestionData).then((res) => {
      dispatch(questionnaireList());
      setTimeout(() => {
        toast.success(`${name.common.selected}`, {
          position: "top-right",
          autoClose: 1500,
          theme: "colored",
          toastId: "1",
        });
        setIloading(false);
      }, 800);
    });

    setShowHide(!showHide);
  };

  // showing delete modal function
  const deletModalShowHide = (id) => {
    setDeleteShow(!deleteShow);
    setQuestionId(id);
  };

  const CancleDecider = () => {
    setShowHide(!showHide);
  };

  const deciderModalShowHide = (id) => {
    setShowHide(!showHide);
    setDecider(id);
  };

  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <>
      <Container fluid className={style["questionnaire-section"]}>
        {/* Start questionnaire card */}
        {/* Start questionnaire card header */}
        <Row>
          <Col className={style["questionnaire-title"]}>
            <Row className="ps-lg-3 ps-md-3">
              <Col sm="6" md="12" lg="12">
                <h3>{name.questionnaire.questionnair}</h3>
              </Col>
              <Col sm="6" md="12" lg="12">
                <h6>
                  <Breadcrumbs showQ={true} activeQ={true} />
                </h6>
              </Col>
            </Row>
          </Col>
          <Col className="questionnaire-form justify-content-end d-flex">
            <Form className="d-flex mb-0 mt-2">
              {subHeaderComponent}
              <Button
                onClick={() => history.push(admin.CREATEQUESTIONNAIRE)}
                className="add-btn"
              >
                {name.common.add}&nbsp;+
              </Button>
            </Form>
          </Col>
        </Row>

        {/* End questionnaire card header */}
        {/* Start questionnaire Table */}
        <BlockUi tag="div" blocking={iloading}>
          <Card className="p-0 border-0">
            <Card.Body className="p-0">
              <div className={style["table-responsive"]}>
                {Listdata?.length && (
                  <TableQuestionnaire
                    QuestionnaireDelete={deletModalShowHide}
                    QuestionnaireDecider={deciderModalShowHide}
                    data={Listdata}
                    filterText={filterText}
                  />
                )}
              </div>
            </Card.Body>
          </Card>
        </BlockUi>
        {/* End questionnaire Table */}
        {/* Start questionnaire Delete Modal */}

        <DeletePopup
          showModal={deleteShow}
          cancelDelete={CancleDelete}
          confirmDelete={ConfirmDelete}
        />

        <DeciderPopup
          showModal={showHide}
          cancelDecider={CancleDecider}
          confirmDecider={ConfirmDecider}
        />
        {/*decider///////////////////////modal */}

        {/* end questionnaire Delete Modal */}
        {/* End questionnaire card */}
      </Container>
    </>
  );
};

export default Questionnaire;
