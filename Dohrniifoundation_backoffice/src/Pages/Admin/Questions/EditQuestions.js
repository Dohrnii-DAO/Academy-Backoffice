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
import { useParams } from "react-router-dom";
import history from "../../../Utility/history";
import BlockUi from "react-block-ui";
import { toast } from "react-toastify";
import { deleteAnsQuiz } from "../../../Utility/Services/ServiceApi";
import delet from "../../../Assets/images/login/delete.png";
import { useDispatch, useSelector } from "react-redux";
import { updateQuiz } from "../../../Redux/Dashboard/Question/action";
import { quizList } from "../../../Redux/Dashboard/Question/action";
const UpdateQuestions = ({ location }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titlevalid, setTitlevalid] = useState("");
  const [desvalid, setDesvalid] = useState("");
  const [showHide, setShowHide] = useState(false);
  const [deleteshowHide, setdeleteShowHide] = useState([]);
  const [answerData, setAnswerData] = useState("");
  const [deletAnswer, setDeletAnswer] = useState([]);
  const [isloading, setIsloading] = useState("");
  const [loading, setLoading] = useState("");
  const [correct_answer, setCorrectAnswer] = useState("");
  const dispatch = useDispatch();
  const { id } = useParams();
  const Listdata = useSelector((state) => state.question.question.data);

  useEffect(() => {
    if (!location.state?.ques_name) {
      return history.push(admin.NETWORKERROR);
    }
  }, [dispatch]);
  useEffect(() => {
    dispatch(quizList());
  }, [dispatch]);

  useEffect(() => {
    (async function name() {
      try {
        setLoading(true);
        let getAnsdata = await location.state?.quiz_ans_data;
        setAnswerData(
          getAnsdata.map(
            ({
              answer_name: description,
              id,
              correct_answer: correct_answer,
            }) => {
              return {
                description,
                ans_id: id,
                correct_answer,
              };
            }
          )
        );

        setLoading(false);
      } catch (e) {}
    })();
    setTitle(location.state?.ques_name);
    setAnswerData(location.state?.quiz_ans_data);
  }, [dispatch]);

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
        id: null,
        description,
        correct_answer,
      },
    ]);

    let currentData = {
      id: null,
      description,
      correct_answer,
    };
    setShowHide(!showHide);

    let answerQuiz = [...answerData, currentData];
    let answerQuizData = answerQuiz.map(
      ({ description, ans_id, correct_answer }, i) => ({
        ans_id: ans_id ? ans_id : null,
        answer_name: description,
        correct_answer: correct_answer || "0",
      })
    );

    let UpdateQuestionData = {
      id: id,
      ques_name: title,
      quiz_answers: answerQuizData,
    };
    setIsloading(true);
    await dispatch(updateQuiz(UpdateQuestionData));
    const getquizdata = await dispatch(quizList());
    let findCurrentData =
      getquizdata.data && getquizdata.data.filter((data) => data.id == id);
    setAnswerData(
      findCurrentData[0]?.quiz_ans_data.map(
        ({ answer_name: description, id, correct_answer: correct_answer }) => {
          return {
            description,
            ans_id: id,
            correct_answer,
          };
        }
      )
    );
    setIsloading(false);
    setDescription("");
    setCorrectAnswer("");
  };
  //..................Handle checked...........................//
  const handleChecked = (e) => {
    let answerQuiz = [...answerData];
    let filter = answerQuiz.map(({ description, ans_id }, i) => ({
      ans_id: ans_id ? ans_id : null,
      description: description,
      correct_answer: i == e.target.value ? "1" : "0",
    }));

    setAnswerData(filter);
  };

  //..................Upadte data...........................//
  const Update = async (event) => {
    event.preventDefault();
    if (title === "" || title?.trim() === "")
      return setTitlevalid(validationError.field.required);
    setTitlevalid("");
    if (answerData?.length < 2) {
      toast.error(`${alert.message.MinAnswer}`, {
        position: "top-right",
        autoClose: 1500,
        theme: "colored",
        toastId: "1",
      });
      return false;
    }
    let answerQuiz = [...answerData];
    let answerQuizData = answerQuiz.map(
      ({ description, ans_id, correct_answer }, i) => ({
        ans_id: ans_id ? ans_id : null,
        answer_name: description,
        correct_answer: correct_answer || "0",
      })
    );

    let UpdateQuestionData = {
      id: id,
      ques_name: title,
      quiz_answers: answerQuizData,
    };

    setIsloading(true);
    let QuizdataUpdate = await dispatch(updateQuiz(UpdateQuestionData));

    if (QuizdataUpdate?.statuscode === 200) {
      history.push(admin.QUESTIONS);
      toast.success(`${alert.message.success}`, {
        position: "top-right",
        autoClose: 1500,
        theme: "colored",
        toastId: "1",
      });
      setIsloading(false);
    } else if (QuizdataUpdate?.statuscode === 202) {
      toast.error(`${name.question.selectCorrect}`, {
        position: "top-right",
        autoClose: 1500,
        theme: "colored",
        toastId: "1",
      });
      setIsloading(false);
    } else {
      toast.error(`${name.common.error}`, {
        position: "top-right",
        autoClose: 1500,
        theme: "colored",
        toastId: "1",
      });
      setIsloading(false);
    }
  };

  const CancleDelete = () => {
    setdeleteShowHide(!deleteshowHide);
  };

  //..................confirm delete...........................//
  const ConfirmDelete = async () => {
    setdeleteShowHide(!deleteshowHide);
    let answerQuiz = [...answerData];
    let answerQuizData = answerQuiz.map(
      ({ description, ans_id, correct_answer }, i) => ({
        ans_id: ans_id ? ans_id : null,
        answer_name: description,
        correct_answer: correct_answer || "0",
      })
    );

    let UpdateQuestionData = {
      id: id,
      ques_name: title,
      quiz_answers: answerQuizData,
    };

    try {
      setIsloading(true);

      setdeleteShowHide(!deleteshowHide);
      await deleteAnsQuiz(deletAnswer);

      let deleteData = answerData.filter((data) => data.ans_id != deletAnswer);
      await dispatch(updateQuiz(UpdateQuestionData));
      setAnswerData(deleteData);
      toast.success(`${alert.message.delete}`, {
        position: "top-right",
        autoClose: 1500,
        theme: "colored",
        toastId: "1",
      });

      setIsloading(false);
    } catch (e) {
      if (e.response?.data?.data === undefined) setAnswerData("");
      setIsloading(false);
    }
  };
  //..................Answer delete...........................//
  const deleteAns = (id, correct_answer) => {
    if (answerData.length === 2) {
      toast.info("Add and Select the correct answer before you delete.", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
        toastId: "1",
      });
    } else if (correct_answer === "1") {
      toast.info("Select other correct answer before you delete", {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
        toastId: "1",
      });
    } else {
      setDeletAnswer(id);
      setdeleteShowHide(!deleteshowHide);
    }
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
                  <Breadcrumbs showUpdateQuestion={true} showQuestion={true} />
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
                        placeholder="Loreum Ipsum text area"
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

                  <Form className="right-question-form  div-table">
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

                      {answerData?.length
                        ? answerData.map(
                            (
                              { description, correct_answer, ans_id },
                              index
                            ) => (
                              <div
                                className="body-custom1 noselect"
                                key={ans_id}
                                // key={id}
                              >
                                <div className="itemlist1">{description}</div>
                                <Form.Check
                                  className="question-radio-check"
                                  type="radio"
                                  name={correct_answer}
                                  value={index}
                                  onChange={handleChecked}
                                  checked={correct_answer == "1" ? true : false}
                                />
                                <div className="actions2 question-delete m-0">
                                  <Image
                                    className="questionn-action custom-img-width"
                                    src={delet}
                                    onClick={() =>
                                      deleteAns(
                                        ans_id,
                                        correct_answer,
                                        description
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
                      type="Update"
                      onClick={Update}
                    >
                      {/* {name.common.save} */}
                      {name.common.update}
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

export default UpdateQuestions;
