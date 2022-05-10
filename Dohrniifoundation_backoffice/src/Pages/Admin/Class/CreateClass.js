import React, { useEffect, useState, useCallback } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  InputGroup,
  Modal,
  Table,
  Image,
} from "react-bootstrap";
import delet from "../../../Assets/images/login/delete.png";

import Breadcrumbs from "../../../Component/Breadcrumbs";
import "../../../Assets/Css/createclass.css";
import getCroppedImg from "../../../Utility/ResuableCode/croping";
import { validationError, alert, name } from "../../../Utility/constant";
import { createClass } from "../../../Redux/Dashboard/Class/action";
import Cropper from "react-easy-crop";
import { toast } from "react-toastify";
import BlockUi from "react-block-ui";
import { useDispatch, useSelector } from "react-redux";
import { adminRoute as admin } from "../../../Route/Route";
import history from "../../../Utility/history";
import DeletePopup from "../../../Component/Modal/deletePopUp";
import { quizList } from "../../../Redux/Dashboard/Question/action";
import ClassQuestion from "../../../Component/DataTable/Question/QuestionForClass";
import FilterComponent from "../../../Component/DataTable/FilterComponents";
let selectedQuestionforsend = []; //......storing selected question data.......//
const CreateClass = () => {
  const dispatch = useDispatch();
  const [isloading, setIsloading] = useState("");
  const [imageL, setImgL] = useState("");
  const [selectQuez, setSelectQuez] = useState([]);
  const [crop, setCrop] = useState({ x: 16, y: 9 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [titlevalid, setTitlevalid] = useState("");
  const [desvalid, setDesvalid] = useState("");
  const [illustrationValid, setIllustrationValid] = useState("");
  const [illustrationFormatValid, setIllustrationFormatValid] = useState("");
  const [imgsizev, setImgsizev] = useState("");
  const [tokenValid, setTokenValid] = useState("");
  const [token, setToken] = useState("5");
  const [quesLimit, setQuesLimit] = useState("");
  const [quesLimitValid, setQuesLimitValid] = useState("");
  const [imgHide, setImgHide] = useState(false);
  const [showHide, setShowHide] = useState(false);
  const [questionvalid, setquestionvalid] = useState("");
  const [questionName, setQuestionName] = useState("");
  const [questiondata, setquestiondata] = useState([]);
  const [questionId, setQuestionId] = useState("");
  const [deleteQuestionId, setDeleteQuestionId] = useState("");
  const [deleteshowHide, setdeleteShowHide] = useState("");
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDespcription] = useState("");
  const [illustration_image, setillustration_image] = useState([null]);
  const [srcImg, setSrcImg] = useState(null);
  const getQuestionList = useSelector(
    (state) => state?.question?.question?.data
  );
  const Emptydata = ["There are no records to display"];
  useEffect(() => {
    dispatch(quizList());
  }, [dispatch]);
  //...........................Handle image.........................//
  const handleImage = async (event) => {
    setCroppedImage("");
    setIllustrationValid("");
    setImgHide(!imgHide);
    setImgL(event.target.files[0]?.name);
    if (event.target.files[0]?.name) {
      if (!event.target.files[0].name.match(/\.(jpg|jpeg|JPG|PNG|JPEG|png)$/)) {
        setSrcImg("");
        setIllustrationValid("");
        setImgHide(imgHide);
        return setIllustrationFormatValid(validationError.imagetype.required);
      } else if (event.target.files[0].size > 1440000) {
        setSrcImg("");
        setIllustrationValid("");
        setImgHide(imgHide);
      } else {
        setIllustrationFormatValid();
        setIllustrationValid("");
        return setSrcImg(URL.createObjectURL(event.target.files[0]));
      }
    }
  };

  //...........................Crop image.........................//
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
    } catch (e) {
      window.alert("Something went wrong.");
      window.location.reload();
    }
  }, [croppedAreaPixels, rotation]);

  const onClose = useCallback(() => {
    setCroppedImage(null);
  }, []);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);
  //...........................Open question modal.........................//
  const questionModalShowHide = () => {
    setShowHide(!showHide);
    setquestionvalid("");
  };

  //...........................Submit data.........................//
  const submitData = async (event) => {
    event.preventDefault();
    if (title === "" || title.trim() === "")
      return setTitlevalid(validationError.field.required);
    setTitlevalid("");
    if (description === "" || description.trim() === "")
      return setDesvalid(validationError.field.required);
    setDesvalid("");
    if (quesLimit <= 0)
      return setQuesLimitValid(`${validationError.invaliLimit.required}`);
    setQuesLimitValid("");
    if (token <= 4)
      return setTokenValid(`${validationError.invaliToken.required}`);
    setTokenValid("");
    if (imageL === "")
      return setIllustrationValid(validationError.field.required);
    if (illustrationFormatValid != undefined) {
      return false;
    }

    let question_id = "";
    if (questiondata.length) {
      questiondata.forEach((item, index) => {
        question_id += questiondata[index].id + ",";
      });

      question_id = question_id.replace(/,\s*$/, "");
    }

    if (questiondata?.length < quesLimit) {
      toast.error(`${name.class.moreOrEqualQuesLimit}`, {
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
    ClassForm.append("title", title);
    ClassForm.append("description", description);
    ClassForm.append("question_limit", quesLimit);
    ClassForm.append("xp_token", token);
    ClassForm.append("illustration_image", file);
    ClassForm.append("quizes", question_id);
    setIsloading(true);
    let ClassAdd = await dispatch(createClass(ClassForm));

    if (ClassAdd?.data?.statuscode === 200) {
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

  //.................show and hide crop..............//
  const CancleCropbtn = () => {
    setImgHide(!imgHide);
  };

  //...........................Video convert........................//

  // const changeFileToURL = (e) => {
  //   let files = e.target.files[0];
  //   setVedioUploladType(e.target.files[0]);
  //   //  setVedioUploladType(e.target.files[0]?.name);
  //   setVideoValidation("");
  //   if (!e.target.files[0]?.name?.match(/\.(mp4)$/))
  //     return setVideoFormatValid("invalid format choose mp4 file.");
  //   setVideoFormatValid("");

  //   setPreviewVideo(URL.createObjectURL(files));
  // };

  const deleteQuestion = (id) => {
    setDeleteQuestionId(id);
    setdeleteShowHide(!deleteshowHide);
  };

  const CancleDelete = () => {
    setdeleteShowHide(!deleteshowHide);
  };
  //....................Confirm delete.....................//
  const ConfirmDelete = () => {
    setdeleteShowHide(!deleteshowHide);
    let deleteData = questiondata.filter((g, i) => i !== deleteQuestionId);
    setquestiondata(deleteData);
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
  const handleChange = (e) => {
    let data = e.selectedRows.map(({ id, ques_name }) => ({
      id: id,
      questionName: ques_name,
    }));
    selectedQuestionforsend = [...data];
  };
  //....................Add question.....................//
  const addQuestion = async (e) => {
    setquestiondata(selectedQuestionforsend);
    setShowHide(!showHide);
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
      <Container fluid className="create-class-section">
        {/* Start Create class card */}
        {/* Start Create class card header */}
        <Row className="create-class">
          <Col className="create-class-title">
            <Row className="ps-lg-3 ps-md-3">
              <Col sm="6" md="12" lg="12">
                <h3>{name.class.class}</h3>
              </Col>
              <Col sm="6" md="12" lg="12">
                <h6>
                  <Breadcrumbs showCreateClas={true} showClass={true} />
                </h6>
              </Col>
            </Row>
          </Col>
        </Row>
        {/* End Create class card header */}
        {/* Start Create class */}
        <BlockUi tag="div" blocking={isloading}>
          <Row>
            {/* Start left Create class form */}
            <Col md="6" sm="12" lg="6">
              <Card className="left-class-card">
                <Card.Body>
                  <Form className="left-class-form">
                    <Form.Group className="mb-3" controlId="formTitle">
                      <Form.Label>
                        <p>{name.common.title}</p>
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        value={title}
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
                          className="left-class-custom-file"
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
                        {illustrationValid} {illustrationFormatValid} {imgsizev}
                      </b>

                      <div className="row">
                        {croppedImage && (
                          <div className="col-md-4 mt-3">
                            <img
                              className="cropdone"
                              src={croppedImage}
                              alt="cropped image"
                              onClose={onClose}
                            />
                          </div>
                        )}
                      </div>
                    </Form.Group>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
            {/* End left Create class form */}
            {/* Start Right Create class form */}
            <Col md="6" sm="12" lg="6">
              <Card className="right-class-card">
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
                          {questiondata.length
                            ? questiondata.map(({ questionName, id }, i) => (
                                <tr key={id}>
                                  <td>{questionName}</td>
                                  <td>
                                    <div className="actionbtns question-delete ">
                                      <div className="actions2">
                                        <Image
                                          className="class-action question-delete"
                                          src={delet}
                                          onClick={() => deleteQuestion(i)}
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
                      className="right-class-buttons px-4 float-end"
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
                        data={
                          getQuestionList !== "Null"
                            ? getQuestionList
                            : Emptydata
                        }
                        handlechange={handleChange}
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
            </Col>
          </Row>
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

export default CreateClass;
