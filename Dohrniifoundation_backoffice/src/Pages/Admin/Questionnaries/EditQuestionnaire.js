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
import { useParams } from "react-router-dom";
import {
  getAnswer,
  updateQuestion,
  deleteAnswer,
  updateAnswer,
} from "../../../Redux/Dashboard/Questionnaire/action";
import history from "../../../Utility/history";
import { adminRoute as admin } from "../../../Route/Route";
import edit from "../../../Assets/images/login/edit.png";
import delet from "../../../Assets/images/login/delete.png";
import { validationError, alert, name } from "../../../Utility/constant";
import { createAnswer } from "../../../Redux/Dashboard/Questionnaire/action";
import BlockUi from "react-block-ui";
import { toast } from "react-toastify";
import { strategyList1 } from "../../../Redux/Dashboard/Strategies/action";
import ReactDragListView from "react-drag-listview";
import DeletePopup from "../../../Component/Modal/deletePopUp";

const EditQuestionnaire = ({ location }) => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [titlevalid, setTitlevalid] = useState("");
  const [typevalid, setTypevalid] = useState("");
  const [spacevalid, setSpacevalid] = useState("");
  const [description, setDescription] = useState("");
  const [sequence, setsequence] = useState("");
  const [spaceAnsvalid, setSpaceAnsvalid] = useState("");

  const [edesvalid, setEDesvalid] = useState("");
  const [eseqvalid, setESeqvalid] = useState("");
  const [espaceAnsvalid, setESpaceAnsvalid] = useState("");

  const [showHide, setShowHide] = useState(false); //hide on cancle or cross button
  const [onsaveshowHide, setonsaveShowHide] = useState(false); //on save answer model
  const [deleteshowHide, setdeleteShowHide] = useState(false); //delete modal show hide
  const [upshowHide, setupShowHide] = useState(false); //answer modal show hide
  const [loading, setLoading] = useState(false);
  const [addshowHide, setaddShowHide] = useState(false);
  const isloading = useSelector((state) => state.user.isLoading);
  const [data, savedata] = useState([]); //answer data from action
  const { id } = useParams();
  const [show, setshow] = useState(""); //title validation
  const [desvalid, setDesvalid] = useState("");
  const [seqvalid, setSeqvalid] = useState("");
  const [deletans, setdeletans] = useState(""); //delete answer
  const [showid, setid] = useState("");
  const [strategies_id1, setsl] = useState("");
  const [strategyName, setstrategyName] = useState("");
  const [displayt, setdisplayt] = useState([]);
  const [getStrategyTitle, setgetStrategyTitle] = useState([]);
  const [strid, setstrid] = useState("");
  const [getAnswer1, setanswer] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!location.state?.title) {
      return history.push(admin.NETWORKERROR);
    }
  }, [dispatch]);

  useEffect(() => {
    (async function name() {
      try {
        setLoading(true);
        let strategyDatalist = await strategyList1();

        let data = await getAnswer(id);
        setgetStrategyTitle(strategyDatalist.data.data);
        setanswer(strategyDatalist.data.data);

        savedata(
          data?.data.data.map(
            ({ description, sequence, id, strategies_id }) => {
              return { description, sequence, id, strategies_id };
            }
          )
        );
        setLoading(false);
        strategyDatalist?.data?.data.filter(({ id, title }) =>
          data.data.data.find(({ strategies_id }) => {
            if (strategies_id === id) {
              setdisplayt((p) => ({ ...p, [id]: { title: title, id: id } }));
            }
          })
        );
      } catch (e) {}
    })();
    setTitle(location.state?.title);
    setType(location.state?.type);
  }, [dispatch]);

  //  function for adding answer in edit questionnare
  const addAnswer = async (e) => {
    if (description === "") return setDesvalid(validationError.field.required);
    setDesvalid("");
    setSpaceAnsvalid("");
    if (description.trim() === "")
      return setSpaceAnsvalid(validationError.emptySpace.blank);
    setSpaceAnsvalid("");
    setDesvalid("");
    if (sequence === "") return setSeqvalid(validationError.select.required);
    setSeqvalid("");

    let displayData = data?.length + 1 || 1;
    let addanswerdata = {
      question_id: id,
      answers: [
        {
          description: description,
          sequence: displayData,
          strategies_id: strategies_id1,
          strategyName: strategyName,
        },
      ],
    };

    setonsaveShowHide(!onsaveshowHide);
    setDescription("");
    setsequence("");
    setLoading(true);
    await createAnswer(addanswerdata);
    let data1 = await getAnswer(id);
    savedata(data1?.data.data);
    setLoading(false);
    data1 &&
      getAnswer1.filter(({ id, title }) =>
        data1.data.data.find(({ strategies_id }) => {
          if (strategies_id === id) {
            setdisplayt((pre) => ({ ...pre, [id]: { title: title, id: id } }));
          }
        })
      );
  };

  //  function for updating answer in edit questionnare
  const updateQanswer = async (uid) => {
    setupShowHide(!upshowHide);
    setLoading(true);

    await updateAnswer({
      id: showid,
      description: description,
      sequence: sequence,
      strategies_id: strid,
    });

    let data = await getAnswer(id);
    savedata(data?.data.data);
    setLoading(false);
    getAnswer1.filter(({ id, title }) =>
      data?.data.data.find(({ strategies_id }) => {
        if (strategies_id === id) {
          setdisplayt((p) => ({ ...p, [id]: { title: title, id: id } }));
        }
      })
    );
  };

  //  function for updating data questionnaire
  const updateData = async (e) => {
    e.preventDefault();
    if (title === "") return setTitlevalid(validationError.field.required);
    setTitlevalid("");
    setSpacevalid("");
    if (title.trim() === "")
      return setSpacevalid(validationError.emptySpace.blank);
    setSpacevalid("");
    setTitlevalid("");
    if (type === "" || type === "Questions Type")
      return setTypevalid(validationError.select.required);

    let Edata = {
      id: id,
      title: title,
      type: type,
    };

    if (data?.length < 2 || data == undefined) {
      toast.error(`${alert.message.MinAnswer}`, {
        position: "top-right",
        autoClose: 1500,
        theme: "colored",
        toastId: "1",
      });
      return false;
    }
    setLoading(true);
    let updateQuestionnair = await dispatch(updateQuestion(Edata));

    if (updateQuestionnair?.statusCode === 200) {
      history.push(admin.QUESTIONNAIRE);
      toast.success(`${alert.message.update}`, {
        position: "top-right",
        autoClose: 1500,
        theme: "colored",
        toastId: "1",
      });
      setLoading(false);
    } else if (updateQuestionnair?.statuscode === 202) {
      toast.error(`${alert.message.failure}`, {
        position: "top-right",
        autoClose: 1500,
        theme: "colored",
        toastId: "1",
      });
      setLoading(false);
      return false;
    }
  };

  //  function for popUp answer modal show and hide
  const popupAnswer = () => {
    setonsaveShowHide(!onsaveshowHide);
    setshow("");
  };

  //  function for pop edit answer up modal
  const popupAnsweredit = (id, desc, seq, straId, name) => {
    setDescription(desc);
    setsequence(seq);
    setid(id);
    setsl(straId);
    setstrategyName(name);
    setstrid(straId);
    setupShowHide(!upshowHide);
    setshow("");
  };

  //  function  for delete answer modal show and hide
  const deleteModalShowHide = async () => {
    setdeleteShowHide(!deleteshowHide);
    setLoading(true);
    await deleteAnswer(deletans);
    setTimeout(async () => {
      let data = await getAnswer(id);
      savedata(data?.data.data);

      for (let i = 0; i < data?.data.data.length; i++) {
        await updateAnswer({
          id: data?.data.data[i].id,
          description: data?.data.data[i].description,
          sequence: i + 1,
          strategies_id: data?.data.data[i].strategies_id,
        });
      }

      getAnswer1.filter(({ id, title }) =>
        data?.data.data.find(({ strategies_id }) => {
          if (strategies_id === id) {
            setdisplayt((pre) => ({ ...pre, [id]: { title: title, id: id } }));
          }
        })
      );
      toast.success(`${alert.message.delete}`, {
        position: "top-right",
        autoClose: 1500,
        theme: "colored",
        toastId: "1",
      });
      setLoading(false);
    }, 800);
  };

  //  function for popUp for delete modal show and hide
  const deleteModalans = (id) => {
    if (data.length === 2) {
      toast.error(`${name.common.addOtherToDelete}`, {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
        toastId: "1",
      });
    } else {
      setdeleteShowHide(!deleteshowHide);
      setdeletans(id);
    }
  };

  const CancleDelete = () => {
    setShowHide(!showHide);
    setdeleteShowHide(!deleteshowHide);
  };

  const handleAnswerShowHide = () => {
    setShowHide(!showHide);
    setupShowHide(!upshowHide);
  };

  //  function for popUp Add answer modal show and hide
  const addAnswerShowHide = () => {
    setonsaveShowHide(!onsaveshowHide);
    setaddShowHide(!addshowHide);
  };

  //  Dragable function for edit questionnaire
  const dragProps = {
    async onDragEnd(fromIndex, toIndex) {
      const dragData = [...data];
      let newData = dragData[toIndex];
      const item = dragData.splice(fromIndex, 1)[0];
      dragData.splice(toIndex, 0, item);
      setLoading(true);
      if (dragData) {
        for (let i = 0; i < dragData.length; i++) {
          await updateAnswer({
            id: dragData[i].id,
            description: dragData[i].description,
            sequence: i + 1,
            strategies_id: dragData[i].strategies_id,
          });
        }
      }
      savedata(dragData);
      setLoading(false);
      getAnswer1.filter(({ id, title }) =>
        data.find(({ strategies_id }) => {
          if (strategies_id === id) {
            setdisplayt((p) => ({ ...p, [id]: { title: title, id: id } }));
          }
        })
      );
    },
    nodeSelector: ".body-custom1",
    handleSelector: ".body-custom1 ",
  };

  const selectStrategy = (e) => {
    const { value, name, id } = e.target;
    setstrategyName(value);
    setsequence(value?.split(",")[2]);
    setsl(value?.split(",")[0]);
    setstrid(value?.split(",")[0]);
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
                <h3>{name.common.questionnair}</h3>
              </Col>
              <Col sm="6" md="12" lg="12">
                <h6>
                  <Breadcrumbs activeUQ={true} showQ={true} showUQ={true} />
                </h6>
              </Col>
            </Row>
          </Col>
        </Row>
        {/* End Create questionnaire card header */}

        {/* Start Create questionnaire */}
        <BlockUi tag="div" blocking={loading}>
          <Row>
            {/* Start left Create questionnaire form */}
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
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
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
                      <Form.Select className="right-questionnaire-select form-control select_option_color">
                        <option className="right-questionnaire-option">
                          {name.common.questionType}
                        </option>
                        <option
                          selected={location.state?.type === "MCQ"}
                          className="right-questionnaire-option"
                        >
                          {name.common.mcq}
                        </option>
                        <option
                          selected={location.state?.type === "Scale"}
                          className="right-questionnaire-option"
                        >
                          {name.common.scale}
                        </option>
                      </Form.Select>
                      <b className="error-valid"> {typevalid} </b>
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
            {/* End left Create questionnaire form */}

            {/* Start Right Create questionnaire form */}
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
                        {data
                          ? data.map(
                              (
                                { description, sequence, strategies_id, id },
                                index
                              ) => (
                                <div className="body-custom1 noselect" key={id}>
                                  <div className="itemlist1">{description}</div>
                                  <div className="itemlist2">
                                    {displayt[strategies_id]?.title}
                                  </div>
                                  <div className="itemlist3 actionbtns">
                                    <div className="actions1">
                                      <Image
                                        className="questionnaire-action"
                                        src={edit}
                                        onClick={() =>
                                          popupAnsweredit(
                                            id,
                                            description,
                                            sequence,
                                            displayt[strategies_id]?.id,
                                            displayt[strategies_id]?.title
                                          )
                                        }
                                      />
                                    </div>
                                    <div className="actions2">
                                      <Image
                                        className="questionnaire-action"
                                        src={delet}
                                        onClick={() => deleteModalans(id)}
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
                    <Button
                      onClick={updateData}
                      className="right-questionnaire-buttons px-4 float-end"
                      variant="primary"
                      type="submit"
                    >
                      {name.common.update}
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
            {/* End Right Create questionnaire form */}
          </Row>
        </BlockUi>
        {/* End Create questionnaire Table */}
        <Modal
          show={upshowHide}
          className="custom-modal custom-modal2"
          aria-labelledby="passwordMatch"
          centered
        >
          <Modal.Header
            className="modal-head close-btn1 customheader"
            closeButton
            onClick={() => handleAnswerShowHide()}
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
                <b className="error-valid">{edesvalid}</b>
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
                    onChange={(e) => setstrid(e.target.value)}
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
                          value={`${id}`}
                          className="right-questionnaire-option"
                        >
                          {title}
                        </option>
                      ))}
                  </Form.Select>
                </div>
                <b className="error-valid"> {eseqvalid} </b>
              </Form.Group>

              <Form.Group className=" text-end">
                <Button onClick={() => updateQanswer()} className="add-btn">
                  {name.common.update}&nbsp;
                </Button>
              </Form.Group>
            </Form>
          </Modal.Body>
        </Modal>

        <Modal
          show={onsaveshowHide}
          className="custom-modal custom-modal2"
          aria-labelledby="passwordMatch"
          centered
        >
          <Modal.Header
            className="modal-head close-btn1 customheader"
            closeButton
            onClick={() => addAnswerShowHide()}
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
                  {name.common.save}&nbsp;
                </Button>
              </Form.Group>
            </Form>
          </Modal.Body>
        </Modal>
        <DeletePopup
          showModal={deleteshowHide}
          cancelDelete={CancleDelete}
          confirmDelete={deleteModalShowHide}
        />
      </Container>
    </>
  );
};

export default EditQuestionnaire;
