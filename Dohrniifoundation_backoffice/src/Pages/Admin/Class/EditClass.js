import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Modal,
  Card,
  InputGroup,
  Table,
  Image,
} from "react-bootstrap";
import delet from "../../../Assets/images/login/delete.png";

import Breadcrumbs from "../../../Component/Breadcrumbs";
import "../../../Assets/Css/editconcepts.css";
import { updateClass } from "../../../Redux/Dashboard/Class/action";
import { useDispatch, useSelector } from "react-redux";
import getCroppedImg from "../../../Utility/ResuableCode/croping";
import { adminRoute as admin } from "../../../Route/Route";
import { validationError, name, alert } from "../../../Utility/constant";
import Cropper from "react-easy-crop";
import { toast } from "react-toastify";
import BlockUi from "react-block-ui";
import history from "../../../Utility/history";
import LazyLoad from "react-lazyload";
import DeletePopup from "../../../Component/Modal/deletePopUp";
import { quizList } from "../../../Redux/Dashboard/Question/action";
import { useParams } from "react-router-dom";

import {
  ClassQuizdelete,
  ClassQuizGet,
} from "../../../Utility/Services/ServiceApi";
import ClassQuestion from "../../../Component/DataTable/Question/QuestionForClass";
import FilterComponent from "../../../Component/DataTable/FilterComponents";
import Page404 from "../../../Pages/Public/Page404";

let selectedQuestionforsend = []; //......storing selected question data.......//
const UpdateClass = ({ location, match }) => {
  const dispatch = useDispatch();
  const [isloading, setIsloading] = useState("");
  const { id } = useParams();
  const [imageL, setImgL] = useState("");
  const [questionvalid, setquestionvalid] = useState("");
  const [questionName, setQuestionName] = useState("");
  const [questiondata, setquestiondata] = useState([]);
  const [questionNumber, setquestionNumber] = useState("");
  const [deleteQuestionId, setDeleteQuestionId] = useState("");
  const [deletReletion, setDeletReletion] = useState([]);
  const [deleteshowHide, setdeleteShowHide] = useState("");
  const [crop, setCrop] = useState({ x: 16, y: 9 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [indx, setindx] = useState("");
  const [titlevalid, setTitlevalid] = useState("");
  const [desvalid, setDesvalid] = useState("");
  const [imgvalid, setImgvalid] = useState("");
  const [showHide, setShowHide] = useState(false);
  const [imgtypev, setImgtypev] = useState("");
  const [imgsizev, setImgsizev] = useState("");
  const [quesLimit, setQuesLimit] = useState("");
  const [quesLimitValid, setQuesLimitValid] = useState("");
  const [imgHide, setImgHide] = useState(false);
  const [tokenValid, setTokenValid] = useState("");
  const [token, setToken] = useState("");
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDespcription] = useState("");
  const [illustration_image, setillustration_image] = useState("");
  const [srcImg, setSrcImg] = useState(null);
  const getQuestionList = useSelector(
    (state) => state?.question?.question?.data
  );

  useEffect(() => {
    if (!location.state?.title) {
      return history.push(admin.NETWORKERROR);
    }
  }, [dispatch]);

  useEffect(async () => {
    dispatch(quizList());
    (async function name() {
      setIsloading(true);
      try {
        let data = await ClassQuizGet(id);
        setquestiondata(data.data.data);
        setIsloading(false);
      } catch (e) {
        window.alert("Something went wrong.");
        window.location.reload();
        setIsloading(false);
      }
    })();

    setTitle(location.state?.title);
    setDespcription(location.state?.description);
    setQuestionName(location.state?.ques_name);
    setQuesLimit(location.state?.question_limit);
    setToken(location.state?.xp_token);
    await setillustration_image(location.state?.illustration_image);
  }, [dispatch]);

  //...........................Handle image........................//
  const handleImage = async (event) => {
    setCroppedImage("");
    setImgvalid("");
    setImgHide(!imgHide);
    setImgL(event.target.files[0]?.name);
    if (event.target.files[0]?.name) {
      if (
        !event.target.files[0].name.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG|)$/)
      ) {
        setSrcImg("");
        setImgvalid("");
        setImgHide(imgHide);
        return setImgtypev(validationError.imagetype.required);
      } else if (event.target.files[0].size > 1440000) {
        setSrcImg("");
        setImgvalid("");
        setImgHide(imgHide);
        return setImgtypev(validationError.imagesize.required);
      } else {
        setImgtypev();
        setImgvalid("");
        return setSrcImg(URL.createObjectURL(event.target.files[0]));
      }
    }
  };

  //...........................Video convert........................//
  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        srcImg,
        croppedAreaPixels,
        rotation
      );
      let imageUrl = URL.createObjectURL(croppedImage);
      setCroppedImage(imageUrl);
      setillustration_image(croppedImage);
      setImgHide(!imgHide);
    } catch (e) {}
  }, [croppedAreaPixels, rotation]);

  const onClose = useCallback(() => {
    setCroppedImage(null);
  }, []);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  //...........................Open question modal........................//
  const questionModalShowHide = () => {
    setShowHide(!showHide);
    setquestionvalid("");
  };
  //....................Add question.....................//
  const addQuestion = async (e) => {
    setShowHide(!showHide);

    if (selectedQuestionforsend?.length === 0) {
      return false;
    } else {
      setquestiondata(selectedQuestionforsend);
    }

    let question_id = "";
    if (selectedQuestionforsend?.length) {
      selectedQuestionforsend.forEach((item, index) => {
        question_id += selectedQuestionforsend[index].id + ",";
      });
      question_id = question_id.replace(/,\s*$/, "");
    }
    setIsloading(true);
    let file = new File([illustration_image], imageL);
    const ClassForm = new FormData();
    ClassForm.append("id", match.params.id);
    ClassForm.append("title", title);
    ClassForm.append("description", description);
    ClassForm.append("question_limit", quesLimit);
    ClassForm.append("xp_token", token);
    ClassForm.append("illustration_image", file);
    ClassForm.append("quizes", question_id);
    await dispatch(updateClass(ClassForm));
    setIsloading(false);
    await ClassQuizGet(id);
    setquestionNumber("");
  };

  //...........................Update data........................//
  const updateData = async (event) => {
    event.preventDefault();

    if (title === "" || title?.trim() === "")
      return setTitlevalid(validationError.field.required);
    setTitlevalid("");
    if (description === "" || description?.trim() === "")
      return setDesvalid(validationError.field.required);
    setDesvalid("");
    if (quesLimit <= 0)
      return setQuesLimitValid(validationError.invaliLimit.required);
    setQuesLimitValid("");
    if (token <= 4) return setTokenValid(validationError.invaliToken.required);
    setTokenValid([]);
    if (imgtypev === validationError.imagetype.required) {
      return false;
    }
    let question_id = "";
    if (questiondata?.length) {
      questiondata.forEach((item, index) => {
        question_id += questiondata[index].id + ",";
      });
      question_id = question_id.replace(/,\s*$/, "");
    }

    if (questiondata?.length < quesLimit) {
      toast.error(`${name.class.QuestionLimit}`, {
        position: "top-right",
        autoClose: 1500,
        theme: "colored",
        toastId: "1",
      });
      setIsloading(false);
      return false;
    }
    setIsloading(true);
    let file = new File([illustration_image], imageL);
    const ClassForm = new FormData();
    ClassForm.append("id", match.params.id);
    ClassForm.append("title", title);
    ClassForm.append("description", description);
    ClassForm.append("question_limit", quesLimit);
    ClassForm.append("xp_token", token);
    ClassForm.append("illustration_image", file);
    ClassForm.append("quizes", question_id);
    let UpdatedData = await dispatch(updateClass(ClassForm));
    if (UpdatedData?.statuscode === 200) {
      history.push(admin.CLASS);
      toast.success(`${alert.message.success}`, {
        position: "top-right",
        autoClose: 1500,
        theme: "colored",
        toastId: "1",
      });
      setIsloading(false);
    } else {
      toast.error(`${alert.message.failure}`, {
        position: "top-right",
        autoClose: 1500,
        theme: "colored",
        toastId: "1",
      });
      setIsloading(false);
    }
  };

  const CancleCropbtn = () => {
    setImgHide(!imgHide);
  };
  //...........................Delete question........................//
  const deleteQuestion = (questionId, i) => {
    if (questiondata.length === 1) {
      toast.error(`${name.common.addOtherToDelete}`, {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
        toastId: "1",
      });
    } else {
      setDeleteQuestionId(questionId);
      setdeleteShowHide(!deleteshowHide);
      setDeletReletion(id);
      setindx(i);
    }
  };

  const CancleDelete = () => {
    setdeleteShowHide(!deleteshowHide);
  };

  //....................Confirm delete.....................//
  const ConfirmDelete = async () => {
    setdeleteShowHide(!deleteshowHide);
    try {
      setIsloading(true);
      await ClassQuizdelete(deletReletion, deleteQuestionId);
      let data = await ClassQuizGet(id);
      setquestiondata(data.data?.data);
      toast.success(`${alert.message.delete}`, {
        position: "top-right",
        autoClose: 1500,
        theme: "colored",
        toastId: "1",
      });
      setIsloading(false);
    } catch (e) {
      setquestiondata(e.response.data?.data);
      setIsloading(false);
    }
  };

  //....................Search and filter.....................//
  const subHeaderComponentMemo = React.useMemo(() => {
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

  //....................Selection rows.....................//
  const selectedHandle = (e) => {
    const filtData =
      questiondata.length && questiondata.filter(({ id }) => id === e.id);
    selectedQuestionforsend = [...filtData];

    return filtData[0];
  };

  const handleChange = (e) => {
    let data = e.selectedRows.map(({ id, ques_name }) => ({
      id: id,
      question_title: ques_name,
    }));
    selectedQuestionforsend = [...data];
  };

  //....................Disable Point.....................//
  const DisablePoint = (e) => {
    if (e.keyCode === 190 || e.keyCode === 110) {
      e.preventDefault();
      return false;
    }
    return true;
  };
  return (
    <>
      <Container fluid className="create-concept-section">
        {/* Start Create concept card */}
        {/* Start Create concept card header */}
        <Row className="create-concept">
          <Col className="create-concept-title">
            <Row className="ps-lg-3 ps-md-3">
              <Col sm="6" md="12" lg="12">
                <h3>{name.class.class}</h3>
              </Col>
              <Breadcrumbs showClass={true} showUpdateClas={true} />
            </Row>
          </Col>
        </Row>
        {/* End Create concept card header */}
        {/* Start Create concept */}
        <BlockUi tag="div" blocking={isloading}>
          <Row>
            {/* Start left Create concept form */}
            <Col md="6" sm="12" lg="6">
              <Card className="left-concept-card">
                <Card.Body>
                  <Form className="left-concept-form">
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
                      <b className="error-valid">{titlevalid}</b>
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
                        onChange={(e) => setDespcription(e.target.value)}
                      />
                      <b className="error-valid">{desvalid}</b>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Row className="my-3">
                        <Form.Group as={Col}>
                          <Form.Label>
                            <p>{name.class.QuestionLimit}</p>
                          </Form.Label>
                          <Form.Control
                            type="number"
                            min="1"
                            step="1"
                            value={quesLimit}
                            onKeyDown={DisablePoint}
                            onChange={(e) => setQuesLimit(e.target.value)}
                          />
                          <b className="error-valid"> {quesLimitValid} </b>
                        </Form.Group>
                        <Form.Group as={Col}>
                          <Form.Label>
                            <p>{name.class.xp}</p>
                          </Form.Label>
                          <Form.Control
                            type="number"
                            min="1"
                            step="1"
                            value={token}
                            onKeyDown={DisablePoint}
                            onChange={(e) => setToken(e.target.value)}
                          />
                          <b className="error-valid"> {tokenValid} </b>
                        </Form.Group>
                      </Row>
                    </Form.Group>

                    <Form.Group className="">
                      <Form.Label>
                        <p>{name.common.illustrationimage}</p>
                      </Form.Label>
                      <InputGroup>
                        <Form.Control
                          className="left-concept-custom-file"
                          id="illustrationImg"
                          type="file"
                          accept="image/*"
                          onChange={handleImage}
                        />
                        <label
                          className="input-group-text"
                          htmlFor="illustrationImg"
                        >
                          {name.common.browse}
                        </label>
                      </InputGroup>
                      <b className="error-valid">
                        {imgvalid} {imgtypev} {imgsizev}
                      </b>

                      <div className="row">
                        {croppedImage && (
                          <div className="col-md-4 mt-3">
                            <LazyLoad>
                              <img
                                className="cropdone"
                                src={croppedImage}
                                alt="cropped image"
                                onClose={onClose}
                                onLoad={croppedImage}
                              />
                            </LazyLoad>
                          </div>
                        )}
                        {!croppedImage && (
                          <div className="col-md-4 mt-3">
                            <LazyLoad>
                              <img
                                className="cropdone"
                                src={illustration_image}
                                alt="cropped image"
                                onClose={onClose}
                                onLoad={croppedImage}
                              />
                            </LazyLoad>
                          </div>
                        )}
                      </div>
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
            {/* End left Create class form */}

            {/* Start Right Create concept form */}
            <Col md="6" sm="12" lg="6">
              <Card className="right-questionnaire-card">
                <Card.Body>
                  <Form.Group className=" text-end">
                    <Button
                      onClick={() => questionModalShowHide()}
                      className="add-btn"
                    >
                      {name.common.add}&nbsp;+
                    </Button>
                  </Form.Group>

                  <Form className="right-class-form">
                    <Form.Label>
                      <p>{name.question.quiz}</p>
                    </Form.Label>

                    <div className="question-body sticky-header">
                      <Table className="border">
                        <thead className="table-thead">
                          <tr>
                            <th>{name.common.title}</th>
                            <th className="text-right">{name.common.action}</th>
                          </tr>
                        </thead>

                        <tbody className="class-table-body">
                          {questiondata?.length
                            ? questiondata.map(({ id, question_title }, i) => (
                                <tr key={id}>
                                  <td>{question_title}</td>
                                  <td>
                                    <div className="actionbtns question-delete ">
                                      <div className="actions2">
                                        <Image
                                          className="class-action question-delete"
                                          src={delet}
                                          onClick={() => deleteQuestion(id, i)}
                                        />
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            : ""}
                        </tbody>
                      </Table>
                    </div>
                    <Button
                      className="right-concept-buttons px-4 float-end"
                      variant="primary"
                      type="submit"
                      onClick={updateData}
                    >
                      {name.common.update}
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
              {/* start image pop up*/}
              <Modal
                className="custom-modal custom-modal2"
                show={showHide}
                aria-labelledby="passwordMatch"
                centered
              >
                <Modal.Header
                  className="close-btn1 customheader modal-header"
                  closeButton
                  onClick={() => questionModalShowHide()}
                >
                  {/* <Modal.Title> </Modal.Title> */}
                </Modal.Header>
                <Col className="question-form justify-content-end d-flex">
                  <Form className="d-flex mb-0 mt-2">
                    {subHeaderComponentMemo}
                  </Form>
                </Col>
                <Modal.Body className="bodypadding0">
                  <div className="table-responsive">
                    {getQuestionList?.length && (
                      <ClassQuestion
                        // key={Math.random()}
                        data={getQuestionList}
                        handlechange={handleChange}
                        rowselect={selectedHandle}
                        filterText={filterText}
                      />
                    )}
                  </div>
                  <div className="text-right mt-2">
                    <Button onClick={() => addQuestion()} className="add-btn">
                      {name.common.add}&nbsp;+
                    </Button>
                  </div>
                </Modal.Body>
              </Modal>
              <Modal
                className="custom-modal"
                show={imgHide}
                aria-labelledby="passwordMatch"
                centered
              >
                <Modal.Header
                  className="customheader"
                  closeButton
                  onClick={() => CancleCropbtn()}
                ></Modal.Header>

                {srcImg && (
                  <>
                    <Modal.Body className="custombody12">
                      <div className="cropImage">
                        <Cropper
                          image={srcImg}
                          crop={crop}
                          rotation={rotation}
                          zoom={zoom}
                          aspect={16 / 9}
                          onCropChange={setCrop}
                          onRotationChange={setRotation}
                          onCropComplete={onCropComplete}
                          onZoomChange={setZoom}
                        />
                      </div>
                    </Modal.Body>

                    <Modal.Footer className="footercustom1">
                      <Button
                        className="add-btn btn btn-primary"
                        onClick={showCroppedImage}
                      >
                        {name.common.crop}
                      </Button>
                    </Modal.Footer>
                  </>
                )}
              </Modal>

              {/* End image pop up */}
            </Col>
            {/* End Right Create concept form */}
          </Row>
          {/* End Create concept Table */}
        </BlockUi>
        <DeletePopup
          showModal={deleteshowHide}
          cancelDelete={CancleDelete}
          confirmDelete={ConfirmDelete}
        />
      </Container>
    </>
  );
};
export default UpdateClass;
