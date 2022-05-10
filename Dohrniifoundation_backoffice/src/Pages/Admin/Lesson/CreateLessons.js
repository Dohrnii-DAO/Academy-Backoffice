import React, { useEffect, useState, useReducer, useCallback } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Modal,
  Image,
} from "react-bootstrap";

import Breadcrumbs from "../../../Component/Breadcrumbs";
import "../../../Assets/Css/createlessons.css";
import history from "../../../Utility/history";
import { adminRoute as admin } from "../../../Route/Route";
import delet from "../../../Assets/images/login/delete.png";
import { validationError, alert, name } from "../../../Utility/constant";
import { createLesson } from "../../../Redux/Dashboard/Lesson/action";
import { ClassList } from "../../../Redux/Dashboard/Class/action";
import { toast } from "react-toastify";
import BlockUi from "react-block-ui";
import { useDispatch, useSelector } from "react-redux";
import DeletePopup from "../../../Component/Modal/deletePopUp";
import ReactDragListView from "react-drag-listview";

const CreateLessons = () => {
  const [titlevalid, setTitlevalid] = useState("");
  const [titlespacevalid, setTitleSpacevalid] = useState("");
  const [despacevalid, setDespacevalid] = useState("");
  const [title, setTitle] = useState("");
  const [desvalid, setDesvalid] = useState("");
  const [description, setDescription] = useState("");
  const [classnumber, setClassNumber] = useState("");
  const [isloading, setIsloading] = useState("");
  const [classvalid, setClassvalid] = useState("");
  const [showHide, setShowHide] = useState(false);
  const [className, setClassName] = useState("");
  const [classdata, setClassdata] = useState([]);
  const [classId, setClassId] = useState("");
  const [deleteClassId, setDeleteClassId] = useState("");
  const [deleteshowHide, setdeleteShowHide] = useState([]);
  const [sequence, setsequence] = useState("");
  const dispatch = useDispatch();
  const getClassList = useSelector((state) => state?.class?.classes?.data);

  useEffect(() => {
    dispatch(ClassList());
  }, [dispatch]);
  //.....................Show add class modal.........................//
  const classModalShowHide = () => {
    setShowHide(!showHide);
    setClassvalid("");
  };
  //.....................Add class.........................//
  const addClass = async (e) => {
    if (className === "" || className === "Select Class")
      return setClassvalid(validationError.select.required);
    setClassvalid("");
    setClassName("");

    if (
      getClassList.map((element) => element.className).indexOf(className) !=
      classdata.map((element) => element.className).indexOf(className)
    ) {
      return toast.error(`${name.common.AlleadyExist}`, {
        position: "top-right",
        autoClose: 1500,
        theme: "colored",
        toastId: "1",
      });
    } else {
      setClassdata((preState) => [...preState, { classId, className }]);
    }
    setShowHide(!showHide);
    setClassNumber("");
  };
  const CancleDelete = () => {
    setdeleteShowHide(!deleteshowHide);
  };

  //.....................Submit data.........................//
  const submitData = async (event) => {
    event.preventDefault();
    if (title === "") return setTitlevalid(validationError.field.required);
    setTitlevalid("");
    setTitleSpacevalid("");
    if (title.trim() === "")
      return setTitleSpacevalid(validationError.emptySpace.blank);
    setTitleSpacevalid("");
    setTitlevalid("");
    if (description === "") return setDesvalid(validationError.field.required);
    setDesvalid("");
    setDespacevalid("");
    if (description.trim() === "")
      return setDespacevalid(validationError.emptySpace.blank);
    setDespacevalid("");
    setDesvalid("");

    const LessonData = {
      title: title,
      description: description,
      classes: classdata.map(({ classId, sequence }, id) => ({
        class_id: classId,
        sequence: id + 1,
      })),
    };
    setIsloading(true);
    if (classdata?.length < 2 || classdata == undefined) {
      toast.error(`${name.common.AtleastTwo}`, {
        position: "top-right",
        autoClose: 1500,
        theme: "colored",
        toastId: "1",
      });
      setIsloading(false);
      return false;
    }

    // return false;
    setIsloading(true);
    let LessonAdd = await dispatch(createLesson(LessonData));
    if (LessonAdd?.data?.statuscode === 200) {
      history.push(admin.LESSONS);
      toast.success(`${alert.message.success}`, {
        position: "top-right",
        autoClose: 1500,
        theme: "colored",
        toastId: "1",
      });
      setIsloading(false);
    } else if (LessonAdd?.data?.statuscode === 202) {
      toast.error(`${name.common.AtleastTwo}`, {
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

  //.............confirm delete popup concept...............//
  const ConfirmDelete = () => {
    setdeleteShowHide(!deleteshowHide);
    let deleteData = classdata.filter((g, i) => i !== deleteClassId);
    setClassdata(deleteData);
  };

  //.......................delete concept data.................//
  const deleteClass = (id) => {
    setDeleteClassId(id);
    setdeleteShowHide(!deleteshowHide);
  };
  //.....................Drag&drop.........................//
  const dragProps = {
    async onDragEnd(fromIndex, toIndex) {
      const dragData = [...classdata];

      let newData = dragData[toIndex];
      const item = dragData.splice(fromIndex, 1)[0];
      dragData.splice(toIndex, 0, item);
      if (dragData) {
        for (let i = 0; i < dragData.length; i++) {
          await {
            className: dragData[i].className,
            sequence: i + 1,
          };
        }
      }
      setClassdata(dragData);
    },
    nodeSelector: ".body-custom1",
  };

  const selectClass = (e) => {
    const { value } = e.target;
    setsequence(value?.split(",")[2]);
    setClassName(value?.split(",")[1]);
    setClassId(value?.split(",")[0]);
    if (value === "Select Class") {
      setClassName("");
    }
  };

  return (
    <>
      <Container fluid className="create-lessons-section">
        {/* Start Create Lessons card */}
        {/* Start Create Lessons card header */}
        <Row className="create-lessons">
          <Col className="create-lessons-title">
            <Row className="ps-lg-3 ps-md-3">
              <Col sm="6" md="12" lg="12">
                <h3>{name.common.lesson}</h3>
              </Col>
              <Col sm="6" md="12" lg="12">
                <h6>
                  <Breadcrumbs showCL={true} showL={true} />
                </h6>
              </Col>
            </Row>
          </Col>
        </Row>
        <BlockUi tag="div" blocking={isloading}>
          {/* End Create Lessons card header */}
          {/* Start Create Lessons */}
          <Row>
            {/* Start left Create Lessons form */}
            <Col md="6" sm="12" lg="6">
              <Card className="left-lessons-card">
                <Card.Body>
                  <Form className="left-lessons-form">
                    <Form.Group className="mb-3" controlId="formTitle">
                      <Form.Label>
                        <p>{name.common.title}</p>
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        value={title}
                        maxlength="200"
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      <b className="error-valid">
                        {titlevalid} {titlespacevalid}
                      </b>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formTextarea">
                      <Form.Label>
                        <p>{name.common.description}</p>
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        className="text-area py-2"
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                      <b className="error-valid">
                        {desvalid} {despacevalid}
                      </b>
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
            {/* End left Create Lessons form */}
            {/* Start Right Create Lessons form */}
            <Col md="6" sm="12" lg="6">
              <Card className="right-lessons-card">
                <Card.Body>
                  <Form.Group className=" text-end">
                    <Button
                      onClick={() => classModalShowHide()}
                      className="add-btn"
                    >
                      {name.common.add}&nbsp;+
                    </Button>
                  </Form.Group>

                  <Form className="right-chapter-form lesson-classes">
                    <Form.Label>
                      <p>{name.common.classes}</p>
                    </Form.Label>

                    <div className="Mainlist">
                      <div className="header1">
                        <div className="itemlist1">
                          <strong>{name.common.title}</strong>
                        </div>

                        <div className="itemlist3 action">
                          <strong>{name.common.action}</strong>
                        </div>
                      </div>
                      <ReactDragListView {...dragProps}>
                        {classdata?.length
                          ? classdata.map(
                              ({ className, sequence, id }, index) => (
                                <div className="body-custom1 noselect" key={id}>
                                  <div className="itemlist1">{className}</div>

                                  <div className="itemlist3 actionbtns lessonaction">
                                    <div className="actions2">
                                      <Image
                                        className="questionnaire-action"
                                        src={delet}
                                        onClick={() =>
                                          deleteClass(
                                            index,
                                            className,
                                            sequence
                                          )
                                        }
                                      />
                                    </div>

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
                      className="right-lessons-buttons px-4 float-end mt-4"
                      variant="primary"
                      type="submit"
                      onClick={submitData}
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
                  onClick={() => classModalShowHide()}
                >
                  {/* <Modal.Title> </Modal.Title> */}
                </Modal.Header>
                <Modal.Body className="bodypadding0">
                  <Form.Select
                    onChange={selectClass}
                    className="right-chapter-select form-control selectbackground-color"
                  >
                    <option className="right-chapter-option">
                      {name.common.selectClass}
                    </option>

                    {getClassList !== "Null" &&
                      getClassList?.map(({ id, title }, i) => (
                        <option
                          key={id}
                          value={`${id},${title},${i + 1}`}
                          className="right-chapter-option"
                        >
                          {title}
                        </option>
                      ))}
                  </Form.Select>
                  <b className="error-valid"> {classvalid} </b>
                  <div className="text-right mt-2">
                    <Button onClick={() => addClass()} className="add-btn">
                      {name.common.add}&nbsp;+
                    </Button>
                  </div>
                </Modal.Body>
              </Modal>

              {/* End image pop up */}
            </Col>
            {/* End Right Create lessons form */}
          </Row>
        </BlockUi>
        <DeletePopup
          showModal={!deleteshowHide}
          cancelDelete={CancleDelete}
          confirmDelete={ConfirmDelete}
        />
        {/* End Create lessons Table */}
      </Container>
    </>
  );
};

export default CreateLessons;
