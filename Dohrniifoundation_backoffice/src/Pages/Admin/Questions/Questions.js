import React, { useState, useEffect, useMemo } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

import Breadcrumbs from "../../../Component/Breadcrumbs";

import "../../../Assets/Css/questions.css";
import TableQuestion from "../../../Component/DataTable/Question/DataTable";
import FilterComponent from "../../../Component/DataTable/FilterComponents";
import DeletePopup from "../../../Component/Modal/deletePopUp";
import history from "../../../Utility/history";
import { adminRoute as admin } from "../../../Route/Route";
import { useDispatch, useSelector } from "react-redux";
import { validationError, alert, name } from "../../../Utility/constant";
import BlockUi from "react-block-ui";
import { toast } from "react-toastify";
import { quizList, deleteQuiz } from "../../../Redux/Dashboard/Question/action";

const Questions = () => {
  const [question, setQuestion] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [showHide, setShowHide] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [iloading, setIloading] = useState(false);
  const [questionid, setQuestionId] = useState("");

  const isloading = useSelector((state) => state.user.isLoading);
  const Listdata = useSelector((state) => state.question.question.data);
  const Emptydata = ["There are no records to display"];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(quizList());
  }, [dispatch]);
  // cancle delete
  const CancleDelete = () => {
    setDeleteShow(!deleteShow);
  };

  // confirm delete function
  const ConfirmDelete = () => {
    setIloading(true);
    deleteQuiz(questionid).then((res) => {
      // if (res.data?.status === true) {
      setTimeout(() => {
        toast.success(`${alert.message.delete}`, {
          position: "top-right",
          autoClose: 1500,
          theme: "colored",
          toastId: "1",
        });
        setIloading(false);
        dispatch(quizList());
      }, 800);
      // }
    });
    setDeleteShow(!deleteShow);
  };

  // showing delete modal function
  const deletModalShowHide = (id) => {
    setDeleteShow(!deleteShow);
    setQuestionId(id);
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
      <Container fluid className="question-section">
        {/* Start question card */}
        {/* Start question card header */}
        <Row>
          <Col className="question-title">
            <Row className="ps-lg-3 ps-md-3">
              <Col sm="6" md="12" lg="12">
                <h3>{name.question.question}</h3>
              </Col>
              <Col sm="6" md="12" lg="12">
                <h6>
                  <Breadcrumbs showQuestion={true} activeQuestion={true} />
                </h6>
              </Col>
            </Row>
          </Col>
          <Col className="question-form justify-content-end d-flex">
            <Form className="d-flex mb-0 mt-2">
              {subHeaderComponent}
              <Button
                onClick={() => history.push(admin.CREATEQUESTIONS)}
                className="add-btn"
              >
                {name.common.add}&nbsp;+
              </Button>
            </Form>
          </Col>
        </Row>
        {/* End question card header */}
        {/* Start question Table */}
        <BlockUi tag="div" blocking={iloading}>
          <Card className="p-0 border-0">
            <Card.Body className="p-0">
              <div className="table-responsive">
                {Listdata?.length && (
                  <TableQuestion
                    QuestionDelete={deletModalShowHide}
                    data={Listdata !== "Null" ? Listdata : Emptydata}
                    filterText={filterText}
                  />
                )}
              </div>
            </Card.Body>
          </Card>
        </BlockUi>
        {/* End question Table */}
        {/* Start question Delete Modal */}
        <DeletePopup
          showModal={deleteShow}
          cancelDelete={CancleDelete}
          confirmDelete={ConfirmDelete}
        />
        {/* Start question Delete Modal */}
        {/* End question card */}
      </Container>
    </>
  );
};

export default Questions;
