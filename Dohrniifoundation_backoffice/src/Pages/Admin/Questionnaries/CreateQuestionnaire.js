import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Image,
  Button,
  Modal,
  Card,
} from "react-bootstrap";

import Breadcrumbs from "../../../Component/Breadcrumbs";
import "../../../Assets/Css/createquestionnaire.css";
import { useDispatch, useSelector } from "react-redux";
import { Addquestion } from "../../../Redux/Dashboard/Questionnaire/action";
import edit from "../../../Assets/images/login/edit.png";
import delet from "../../../Assets/images/login/delete.png";
import { validationError, alert, name } from "../../../Utility/constant";
import { createAnswer } from "../../../Redux/Dashboard/Questionnaire/action";
import { toast } from "react-toastify";
import BlockUi from "react-block-ui";
import ReactDragListView from "react-drag-listview";
import { strategyList } from "../../../Redux/Dashboard/Strategies/action";
import DeletePopup from "../../../Component/Modal/deletePopUp";

const CreateQuestionnaire = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [sequence, setsequence] = useState("");
  const [showHide, setShowHide] = useState(false);
  const [eshowHide, setEshowHide] = useState(false);
  const [editshowHide, setEditshowHide] = useState(false);
  const [data, savedata] = useState([]);
  const [deleteshowHide, setdeleteShowHide] = useState([]);
  const [isloading, setIsloading] = useState("");
  const [show, setshow] = useState("");
  const [titlevalid, setTitlevalid] = useState("");
  const [spacevalid, setSpacevalid] = useState("");
  const [spaceAnsvalid, setSpaceAnsvalid] = useState("");
  const [typevalid, setTypevalid] = useState("");
  const [desvalid, setDesvalid] = useState("");
  const [seqvalid, setSeqvalid] = useState("");
  const [setid, seteditid] = useState("");
  const [strategies_id, setsl] = useState("");
  const [strategyName, setstrategyName] = useState("");
  const [estrategyName, setestrategyName] = useState("");
  const dispatch = useDispatch();
  const getStrategyTitle = useSelector(
    (state) => state.strategy?.strategies.data
  );

  useEffect(() => {
    dispatch(strategyList());
  }, [dispatch]);

  //This fucntion for use adding the answer for questionnaire
  const addAnswer = async (e) => {
    if (description === "") return setDesvalid(validationError.field.required);
    setDesvalid("");
    setSpaceAnsvalid("");
    if (description.trim() === "")
      return setSpaceAnsvalid(validationError.emptySpace.blank);
    setSpaceAnsvalid("");
    setDesvalid("");
    if (sequence === "" || sequence === "Select Strategies")
      return setSeqvalid(validationError.select.required);
    setSeqvalid("");

    savedata((pre) => [
      ...pre,
      { description, sequence, strategies_id, strategyName },
    ]);
    setShowHide(!showHide);
    setDescription("");
    setsequence("");
  };

  //This fucntion for use edit the answer for questionnaire
  const editQanswer = async (e) => {
    if (description === "") return setDesvalid(validationError.field.required);
    setDesvalid("");
    if (
      estrategyName?.split(",")[0] === "" ||
      estrategyName?.split(",")[0] === "Choose Strategies"
    )
      return setSeqvalid(validationError.select.required);
    setSeqvalid("");

    let editData = [...data];
    editData[setid].description = description;
    editData[setid].sequence = sequence;
    editData[setid].strategies_id = estrategyName?.split(",")[1];
    editData[setid].strategyName = estrategyName?.split(",")[0];
    savedata(editData);
    setEshowHide(!eshowHide);
    setDescription("");
    setsequence("");
  };

  //This fucntion for submit question data for questionnaire
  const submitData = async (e) => {
    e.preventDefault();
    if (title === "") return setTitlevalid(validationError.field.required);
    setTitlevalid("");
    setSpacevalid("");
    if (title.trim() === "")
      return setSpacevalid(validationError.emptySpace.blank);
    setSpacevalid("");
    setTitlevalid("");
    if (type === "" || type === "Select Question Type")
      return setTypevalid(validationError.select.required);
    setTypevalid("");
    if (data.length < 2) {
      toast.error(`${alert.message.MinAnswer}`, {
        position: "top-right",
        autoClose: 1500,
        theme: "colored",
        toastId: "1",
      });
      return false;
    }
    setIsloading(true);
    let answerDetail = data.map(
      ({ description, sequence, strategies_id }, id) => ({
        description,
        sequence: id + 1,
        strategies_id,
      })
    );
    let AddQuestionn = await dispatch(Addquestion({ title, type }));
    let QuestionnaireData = {
      question_id: AddQuestionn?.data?.id,
      answers: answerDetail,
    };

    toast.success(`${alert.message.success}`, {
      position: "top-right",
      autoClose: 1500,
      theme: "colored",
      toastId: "1",
    });
    createAnswer(QuestionnaireData).then((res) => {});
    setIsloading(false);
  };

  //This is for opening add answer modal.
  const AnswerModalShowHide = () => {
    setShowHide(!showHide);
  };

  //This is for show and hide pop for answer modal.
  const popupAnswer = () => {
    setShowHide(!showHide);
    setshow("");
  };

  //This will open edit answer modal.

  const popupAnsweredit = (id, desc, strname) => {
    seteditid(id);
    setDescription(desc);
    setestrategyName(strname);
    setEshowHide(!eshowHide);
    setshow("");
  };

  //edit answer popup
  const EaddAnswer = () => {
    setEshowHide(!eshowHide);
    setEditshowHide(!editshowHide);
  };

  //cancle delete popup
  const CancleDelete = () => {
    setdeleteShowHide(!deleteshowHide);
  };

  //confirm delete popup
  const ConfirmDelete = () => {
    setdeleteShowHide(!deleteshowHide);
    let deleteData = data.filter((g, id) => id !== setid);
    savedata(deleteData);
  };

  // delete answer popup
  const deletteAns = (i) => {
    seteditid(i);
    setdeleteShowHide(!deleteshowHide);
  };

  // Dragable function for adding answer in create questionnaire
  const dragProps = {
    async onDragEnd(fromIndex, toIndex) {
      const dragData = [...data];
      let newData = dragData[toIndex];
      const item = dragData.splice(fromIndex, 1)[0];
      dragData.splice(toIndex, 0, item);
      if (dragData) {
        for (let i = 0; i < dragData.length; i++) {
          await createAnswer({
            description: dragData[i].description,
            sequence: i + 1,
          });
        }
      }
      savedata(dragData);
    },
    nodeSelector: ".body-custom1",
  };
  // onchange function for choose Strategies
  const selectStrategy = (e) => {
    const { value } = e.target;
    setsequence(value?.split(",")[2]);
    setsl(value?.split(",")[0]);
    setstrategyName(value?.split(",")[1]);

    if (value === "Select Strategies") {
      setsequence("");
    }
  };

  return (
    <>
      <Container fluid className="create-questionnaire-section">
        {/* Start Create questionnaire card */}

        {/* Start Create questionnaire card header */}
        <Row className="create-questionnaire">
          <Col className="create-questionnaire-title">
            <Row className="ps-lg-3 ps-md-3">
              <Col sm="6" md="12" lg="12">
                <h3>{name.questionnaire.questionnair}</h3>
              </Col>
              <Col sm="6" md="12" lg="12">
                <h6>
                  <Breadcrumbs activeCQ={true} showQ={true} showCQ={true} />
                </h6>
              </Col>
            </Row>
          </Col>
        </Row>
        {/* End Create questionnaire card header */}

        {/* Start Create questionnaire */}
        <BlockUi tag="div" blocking={isloading}>
          <Row>
            {/*-------------- Start left Create questionnaire form--------------------- */}
            <Col md="6" sm="12" lg="6">
              <Card className="left-questionnaire-card">
                <Card.Body>
                  <Form className="left-questionnaire-form">
                    <Form.Group className="mb-3" controlId="formTitle">
                      <Form.Label>
                        <p>{name.common.title}</p>
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      <b className="error-valid">
                        {titlevalid}
                        {spacevalid}
                      </b>
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="formSelect"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    >
                      <Form.Label>
                        <p>{name.common.type}</p>
                      </Form.Label>
                      <Form.Select className="right-questionnaire-select form-control selectbackground-color">
                        <option className="right-questionnaire-option">
                          {name.common.questionTpye}
                        </option>
                        <option className="right-questionnaire-option">
                          {name.common.mcq}
                        </option>
                        <option className="right-questionnaire-option">
                          {name.common.scale}
                        </option>
                      </Form.Select>
                      <b className="error-valid"> {typevalid} </b>
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            {/*------------ End left Create questionnaire form---------------- */}

            {/* -----------Start Right Create questionnaire form----------------- */}
            <Col md="6" sm="12" lg="6">
              <Card className="right-questionnaire-card">
                <Card.Body>
                  <Form.Group className=" text-end">
                    <Button className="add-btn" onClick={() => popupAnswer()}>
                      {name.common.add}&nbsp;+
                    </Button>
                  </Form.Group>

                  <Form className="right-questionnaire-form">
                    <Form.Label>
                      <p>{name.common.answer}</p>
                    </Form.Label>

                    <div className="Mainlist">
                      <div className="header1">
                        <div className="itemlist1">
                          <strong>{name.common.answer}</strong>
                        </div>
                        <div className="itemlist2">
                          <strong>{name.common.strategy}</strong>
                        </div>
                        <div className="itemlist3">
                          <strong>{name.common.action}</strong>
                        </div>
                        <div className="itemlist4"></div>
                      </div>
                      <ReactDragListView {...dragProps}>
                        {data.length
                          ? data.map(
                              (
                                {
                                  description,
                                  sequence,
                                  id,
                                  strategies_id,
                                  strategyName,
                                },
                                index
                              ) => (
                                <div className="body-custom1 noselect" key={id}>
                                  <div className="itemlist1">{description}</div>
                                  <div className="itemlist2">
                                    {strategyName}
                                  </div>
                                  <div className="itemlist3 actionbtns">
                                    <div className="actions1">
                                      <Image
                                        className="questionnaire-action"
                                        src={edit}
                                        onClick={() =>
                                          popupAnsweredit(
                                            index,
                                            description,

                                            strategyName
                                          )
                                        }
                                      />
                                    </div>
                                    <div className="actions2">
                                      <Image
                                        className="questionnaire-action"
                                        src={delet}
                                        onClick={() =>
                                          deletteAns(
                                            index,
                                            description,
                                            sequence
                                          )
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="itemlist4">
                                    <p className="drop">
                                      <div className="drop-handle text-right">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 30 30"
                                          width="25"
                                          height="30"
                                          focusable="true"
                                        >
                                          <path
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeMiterlimit="10"
                                            d="M4 7h22M4 15h22M4 23h22"
                                          ></path>
                                        </svg>
                                      </div>
                                    </p>
                                  </div>
                                </div>
                              )
                            )
                          : ""}
                      </ReactDragListView>
                    </div>

                    {/*------------edit add answer start----------------*/}
                    <Modal
                      show={eshowHide}
                      className="custom-modal custom-modal2"
                      aria-labelledby="passwordMatch"
                      centered
                    >
                      <Modal.Header
                        className="modal-head close-btn1 customheader"
                        closeButton
                        onClick={() => EaddAnswer()}
                      >
                        <Modal.Title>{name.common.answer}</Modal.Title>
                      </Modal.Header>

                      <Modal.Body>
                        <Form className="w-100 mt-1">
                          <Form.Group className="mb-3" controlId="formTextarea">
                            <Form.Label>
                              <p>{name.common.answer}</p>
                            </Form.Label>
                            <Form.Control
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                              as="textarea"
                              className="text-area py-2"
                              rows={3}
                            />
                            <b className="error-valid">{desvalid}</b>
                          </Form.Group>

                          <Form.Group
                            className="mb-3 select-dropdown"
                            controlId="formSelect"
                          >
                            <Form.Label>
                              <p>{name.common.strategy}</p>
                            </Form.Label>
                            <div className="bg-customize">
                              <Form.Select
                                onChange={(e) =>
                                  setestrategyName(e.target.value)
                                }
                                className="right-questionnaire-select select-option form-control"
                              >
                                <option className="right-questionnaire-option">
                                  Choose Strategies
                                </option>

                                {getStrategyTitle &&
                                  getStrategyTitle.map(({ id, title }, i) => (
                                    <option
                                      selected={strategyName === title}
                                      key={id}
                                      value={`${title},${id}`}
                                      className="right-questionnaire-option"
                                    >
                                      {title}
                                    </option>
                                  ))}
                              </Form.Select>
                            </div>
                            <b className="error-valid"> {seqvalid} </b>
                          </Form.Group>

                          <Form.Group className=" text-end">
                            <Button
                              onClick={() => editQanswer()}
                              className="add-btn"
                            >
                              {name.common.done}&nbsp;
                            </Button>
                          </Form.Group>
                        </Form>
                      </Modal.Body>
                    </Modal>

                    {/*------------edit add answer end-----------------*/}

                    <Button
                      onClick={submitData}
                      className="right-questionnaire-buttons px-4 float-end"
                      variant="primary"
                      type="submit"
                    >
                      {name.common.save}
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
            {/* ----------------------End Right Create questionnaire form-------------------- */}
          </Row>
          {/* End Create questionnaire Table */}

          {/* -----------start add answer detail popup---------------- */}
          <Modal
            show={showHide}
            className="custom-modal custom-modal2"
            aria-labelledby="passwordMatch"
            centered
          >
            <Modal.Header
              className="modal-head close-btn1 customheader"
              closeButton
              onClick={() => AnswerModalShowHide()}
            >
              <Modal.Title></Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <Form className="w-100 mt-1">
                <Form.Group className="mb-3" controlId="formTextarea">
                  <Form.Label>
                    <p>{name.common.answer}</p>
                  </Form.Label>
                  <Form.Control
                    onChange={(e) => setDescription(e.target.value)}
                    as="textarea"
                    className="text-area py-2"
                    rows={3}
                    placeholder=""
                  />

                  <b className="error-valid">
                    {desvalid} {spaceAnsvalid}
                  </b>
                </Form.Group>

                <Form.Group
                  className="mb-3 select-dropdown"
                  controlId="formSelect"
                >
                  <Form.Label>
                    <p>{name.common.strategy}</p>
                  </Form.Label>
                  <div className="bg-customize">
                    <Form.Select
                      onChange={selectStrategy}
                      className="right-questionnaire-select select-option form-control "
                    >
                      <option className="right-questionnaire-option">
                        {name.common.Choosestrategy}
                      </option>
                      {getStrategyTitle &&
                        getStrategyTitle.map(({ id, title }, i) => (
                          <option
                            key={id}
                            value={`${id},${title},${i + 1}`}
                            className="right-questionnaire-option"
                          >
                            {title}
                          </option>
                        ))}
                    </Form.Select>
                  </div>
                  <b className="error-valid"> {seqvalid} </b>
                </Form.Group>

                <Form.Group className=" text-end">
                  <Button onClick={() => addAnswer()} className="add-btn">
                    {name.common.add}&nbsp;+
                  </Button>
                </Form.Group>
              </Form>
            </Modal.Body>
          </Modal>
          {/* -----------end add answer detail popup---------------- */}

          {/* -----------start delete answer  popup---------------- */}
          <DeletePopup
            showModal={!deleteshowHide}
            cancelDelete={CancleDelete}
            confirmDelete={ConfirmDelete}
          />

          {/* -----------end delete answer  popup---------------- */}
        </BlockUi>
      </Container>
    </>
  );
};

export default CreateQuestionnaire;
