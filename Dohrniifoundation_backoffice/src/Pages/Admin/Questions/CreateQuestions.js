import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Image,
  Modal,
  Button,
  Card,
} from "react-bootstrap";

import Breadcrumbs from "../../../Component/Breadcrumbs";
import "../../../Assets/Css/createquestions.css";
import DeletePopup from "../../../Component/Modal/deletePopUp";
import { validationError, alert, name } from "../../../Utility/constant";
import { adminRoute as admin } from "../../../Route/Route";
import history from "../../../Utility/history";
import BlockUi from "react-block-ui";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import delet from "../../../Assets/images/login/delete.png";
import { AddQuiz } from "../../../Redux/Dashboard/Question/action";

const CreateQuestions = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titlevalid, setTitlevalid] = useState("");
  const [desvalid, setDesvalid] = useState("");
  const [showHide, setShowHide] = useState(false);
  const [deleteshowHide, setdeleteShowHide] = useState([]);
  const [answerData, setAnswerData] = useState([]);
  const [quizdata, setQuizData] = useState("");
  const [isloading, setIsloading] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [iindex, setIndex] = useState("");
  const dispatch = useDispatch();
  const answerModalShowHide = () => {
    setShowHide(!showHide);
  };
  //..................Add answer...........................//
  const addAnswer = async (e) => {
    if (description === "" || description.trim() === "")
      return setDesvalid(validationError.field.required);
    setDesvalid("");
    setAnswerData((pre) => [
      ...pre,
      {
        description,
        correctAnswer,
      },
    ]);
    setShowHide(!showHide);
    setDescription("");
  };
  //..................Handle checked...........................//
  let answerQuiz = [];
  const handleChecked = (e) => {
    answerQuiz = answerData.map(({ description }, id) => ({
      answer_name: description,
      correct_answer: id == e.target.value ? "1" : "0",
    }));
    setCorrectAnswer(1);
    setQuizData(answerQuiz);
  };

  //..................Submit data...........................//
  const Submit = async (event) => {
    event.preventDefault();
    if (title === "" || title.trim() === "")
      return setTitlevalid(validationError.field.required);
    setTitlevalid("");
    if (answerData.length < 2) {
      toast.error(`${alert.message.MinAnswer}`, {
        position: "top-right",
        autoClose: 1500,
        theme: "colored",
        toastId: "1",
      });
      return false;
    }

    let QuestionData = {
      ques_name: title,
      quiz_answers: quizdata,
    };
    setIsloading(true);
    let QuizdataAdd = await dispatch(AddQuiz(QuestionData));

    if (QuizdataAdd?.statuscode === 200) {
      history.push(admin.QUESTIONS);
      toast.success(`${alert.message.success}`, {
        position: "top-right",
        autoClose: 1500,
        theme: "colored",
        toastId: "1",
      });
      setIsloading(false);
    } else {
      toast.error(`${name.question.selectCorrect}`, {
        position: "top-right",
        autoClose: 1500,
        theme: "colored",
        toastId: "1",
      });
      setIsloading(false);
    }
  };

  //.................Delete answer............................//
  const ConfirmDelete = (i) => {
    setdeleteShowHide(!deleteshowHide);
    let deleteData = answerData.filter((data, i) => i !== iindex);
    setAnswerData(deleteData);
  };

  const deleteAns = (i) => {
    setIndex(i);
    setdeleteShowHide(!deleteshowHide);
  };
  const CancleDelete = () => {
    setdeleteShowHide(!deleteshowHide);
  };

  return (
    <>
      <Container fluid className="create-question-section">
        {/* Start Create question card */}
        {/* Start Create question card header */}
        <Row className="create-question">
          <Col className="create-question-title">
            <Row className="ps-lg-3 ps-md-3">
              <Col sm="6" md="12" lg="12">
                <h3>{name.question.question}</h3>
              </Col>
              <Col sm="6" md="12" lg="12">
                <h6>
                  <Breadcrumbs showCreateQuestion={true} showQuestion={true} />
                </h6>
              </Col>
            </Row>
          </Col>
        </Row>
        {/* End Create question card header */}
        {/* Start Create question */}
        <BlockUi tag="div" blocking={isloading}>
          <Row>
            {/* Start left Create question form */}
            <Col md="6" sm="12" lg="6">
              <Card className="left-question-card">
                <Card.Body>
                  <Form className="left-question-form">
                    <Form.Group className="mb-3" controlId="formTitle">
                      <Form.Label>
                        <p>{name.common.title}</p>
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        placeholder=""
                        value={title}
                        maxlength="200"
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      <b className="error-valid">{titlevalid}</b>
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
            {/* End left Create question form */}

            {/* Start Right Create question form */}
            <Col md="6" sm="12" lg="6">
              <Card className="right-question-card">
                <Card.Body>
                  <Form.Group className=" text-end">
                    <Button
                      onClick={() => answerModalShowHide()}
                      className="add-btn"
                    >
                      {name.common.add}&nbsp;+
                    </Button>
                  </Form.Group>

                  <Form className="right-question-form div-table">
                    <Form.Label>
                      <p>{name.common.answer}</p>
                    </Form.Label>

                    <div className="Mainlist">
                      <div className="header1">
                        <div className="itemlist1">
                          <strong>{name.common.answer}</strong>
                        </div>
                        <div className="itemlist2">
                          <strong>Correct Answer</strong>
                        </div>
                        <div className="itemlist3 actions">
                          <strong>{name.common.action}</strong>
                        </div>
                      </div>

                      {answerData.length
                        ? answerData.map(
                            ({ description, correct_answer }, index) => (
                              <div
                                className="body-custom1 noselect"
                                key={index}
                              >
                                <div className="itemlist1">{description}</div>

                                <Form.Check
                                  className="question-radio-check"
                                  type="radio"
                                  name={`quiz`}
                                  value={index}
                                  onChange={handleChecked}
                                />

                                <div className="actions2 question-delete m-0">
                                  <Image
                                    className="questionn-action custom-img-width"
                                    src={delet}
                                    onClick={() =>
                                      deleteAns(
                                        index,
                                        description,
                                        correct_answer
                                      )
                                    }
                                  />
                                </div>
                              </div>
                            )
                          )
                        : ""}
                    </div>

                    <Button
                      className="right-question-buttons px-4 float-end"
                      variant="primary"
                      type="submit"
                      onClick={Submit}
                    >
                      {name.common.save}
                    </Button>
                  </Form>
                </Card.Body>
              </Card>

              <Modal
                className="custom-modal custom-modal2"
                show={showHide}
                aria-labelledby="passwordMatch"
                centered
              >
                <Modal.Header
                  className="close-btn1 customheader modal-header"
                  closeButton
                  onClick={() => answerModalShowHide()}
                >
                  <Modal.Title>{name.common.answer}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form.Group className="mb-3" controlId="formTextarea">
                    <Form.Control
                      as="textarea"
                      className="text-area py-2"
                      rows={3}
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                    />
                    <b className="error-valid">{desvalid}</b>
                  </Form.Group>
                  <div className="text-right">
                    <Button className="add-btn" onClick={() => addAnswer()}>
                      {name.common.add}&nbsp;+
                    </Button>
                  </div>
                </Modal.Body>
              </Modal>
            </Col>
            {/* End Right Create question form */}
          </Row>
        </BlockUi>
        <DeletePopup
          showModal={!deleteshowHide}
          cancelDelete={CancleDelete}
          confirmDelete={ConfirmDelete}
        />
        {/* End Create question Table */}
      </Container>
    </>
  );
};

export default CreateQuestions;
