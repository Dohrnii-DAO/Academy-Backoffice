import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Image,
  Modal,
  Button,
  InputGroup,
  Card,
} from "react-bootstrap";

import Breadcrumbs from "../../../Component/Breadcrumbs";
import "../../../Assets/Css/createchapters.css";
import delet from "../../../Assets/images/login/delete.png";
import { validationError, alert, name } from "../../../Utility/constant";
import history from "../../../Utility/history";
import getCroppedImg from "../../../Utility/ResuableCode/croping";
import {
  createChapter,
  CategoryList,
} from "../../../Redux/Dashboard/Chapter/action";
import { LessonList } from "../../../Redux/Dashboard/Lesson/action";
import DeletePopup from "../../../Component/Modal/deletePopUp";
import { adminRoute as admin } from "../../../Route/Route";
import { useDispatch, useSelector } from "react-redux";
import ReactDragListView from "react-drag-listview";
import Cropper from "react-easy-crop";
import { toast } from "react-toastify";
import BlockUi from "react-block-ui";
const CreateChapters = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [dhnslot90, setdhnslot90] = useState("");
  const [dhnslot80, setdhnslot80] = useState("");
  const [dhnslot100, setdhnslot100] = useState("");
  const [jelly, setJelly] = useState("");
  const [quesLimit, setQuesLimit] = useState("");
  const [quesLimitValid, setQuesLimitValid] = useState("");
  const [timeLimit, setTimeLimit] = useState("");
  const [timeLimitValid, setTimeLimitValid] = useState("");
  const [categoty, setCategory] = useState("");
  const [categoryvalid, setCategoryvalid] = useState("");
  const [dhnslot90Numvalid, setdhnslot90Numvalid] = useState("");
  const [dhnslot80Numvalid, setdhnslot80Numvalid] = useState("");
  const [dhnslot100Numvalid, setdhnslot100Numvalid] = useState("");
  const [jellyvalid, setJellyvalid] = useState("");
  const [conceptnumber, setLessonNumber] = useState("");
  const [lessonvalid, setLessonvalid] = useState("");
  const [description, setDespcription] = useState("");
  const [showHide, setShowHide] = useState(false);
  const [titlevalid, setTitlevalid] = useState("");
  const [desvalid, setDesvalid] = useState("");
  const [isloading, setIsloading] = useState("");
  const [lessonName, setLessonName] = useState("");
  const [illustration_image, setillustration_image] = useState([null]);
  const [lessondata, setLessondata] = useState([]);
  const [lessonId, setLessonId] = useState("");
  const [deleteLessonId, setDeleteLessonId] = useState("");
  const [deleteshowHide, setdeleteShowHide] = useState([]);
  const [imgvalid, setImgvalid] = useState("");
  const [imgtypev, setImgtypev] = useState("");
  const [imgsizev, setImgsizev] = useState("");
  const [imageL, setImgL] = useState("");
  const [srcImg, setSrcImg] = useState(null);
  const [imgHide, setImgHide] = useState(false);
  const [sequence, setsequence] = useState("");
  const [crop, setCrop] = useState({ x: 16, y: 16 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const getLessonList = useSelector((state) => state?.lesson?.lessons?.data);
  const categoryList = useSelector((state) => state?.chapter?.chapters?.data);
  useEffect(() => {
    dispatch(LessonList());
    dispatch(CategoryList());
  }, [dispatch]);

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
      } else {
        setImgtypev();
        setImgvalid("");
        return setSrcImg(URL.createObjectURL(event.target.files[0]));
      }
    }
  };
  //.....................Crop image..............//
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
  //.....................Close crop image..............//
  const onClose = useCallback(() => {
    setCroppedImage(null);
  }, []);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  //................Submiting data.....................//
  const submitData = async (event) => {
    event.preventDefault();
    if (title === "" || title.trim() === "")
      return setTitlevalid(validationError.field.required);
    setTitlevalid("");
    if (description === "" || description.trim() === "")
      return setDesvalid(validationError.field.required);
    setDesvalid("");
    if (categoty === "" || categoty === "Category List")
      return setCategoryvalid(validationError.field.required);
    setCategoryvalid("");

    if (dhnslot80 === "" || dhnslot80.split(".")[1]?.length > 18)
      return setdhnslot80Numvalid(validationError.invaliPercentage.required);
    setdhnslot80Numvalid("");
    if (dhnslot90 === "" || dhnslot90.split(".")[1]?.length > 18)
      return setdhnslot90Numvalid(validationError.invaliPercentage.required);
    setdhnslot90Numvalid("");
    if (dhnslot100 === "" || dhnslot100.split(".")[1]?.length > 18)
      return setdhnslot100Numvalid(validationError.invaliPercentage.required);
    setdhnslot100Numvalid("");

    if (jelly <= 0 || jelly === "")
      return setJellyvalid(validationError.invaliNumber.required);
    setJellyvalid("");

    if (quesLimit === "" || quesLimit <= 0)
      return setQuesLimitValid(validationError.invaliLimit.required);
    setQuesLimitValid("");
    if (timeLimit === "" || timeLimit <= 0)
      return setTimeLimitValid(validationError.invaliLimit.required);
    setTimeLimitValid("");
    if (imageL === "") return setImgvalid(validationError.field.required);
    if (imgtypev != undefined) {
      return false;
    }

    let lesson_id = "";
    if (lessondata.length) {
      lessondata.forEach((item, index) => {
        lesson_id += lessondata[index].id + ",";
      });
      lesson_id = lesson_id.replace(/,\s*$/, "");
    }
    if (lessondata?.length < 2 || lessondata == undefined) {
      toast.error(`${name.common.AtleastTwo}`, {
        position: "top-right",
        autoClose: 1500,
        theme: "colored",
        toastId: "1",
      });
      setIsloading(false);
      return false;
    }

    const lessons = lessondata.map(({ id, sequence }, lessonId) => ({
      lessons_id: parseInt(id),
      sequence: lessonId + 1,
    }));

    setIsloading(true);
    let file = new File([illustration_image], imageL);
    const ChapterForm = new FormData();
    ChapterForm.append("name", title);
    ChapterForm.append("description", description);
    ChapterForm.append("category_id", categoty);
    ChapterForm.append("DHN_slot_80", dhnslot80);
    ChapterForm.append("DHN_slot_90", dhnslot90);
    ChapterForm.append("DHN_slot_100", dhnslot100);
    ChapterForm.append("crypto_jelly", jelly);
    ChapterForm.append("question_limit", quesLimit);
    ChapterForm.append("quiz_timer", timeLimit);
    ChapterForm.append("illustration_image", file);
    ChapterForm.append("lessons", JSON.stringify(lessons));
    let ChapterAdd = await dispatch(createChapter(ChapterForm));
    if (ChapterAdd?.data?.statuscode === 200) {
      history.push(admin.CHAPTERS);
      toast.success(`${alert.message.success}`, {
        position: "top-right",
        autoClose: 1500,
        theme: "colored",
        toastId: "1",
      });
      setIsloading(false);
    } else {
      toast.error(`${alert.message.error}`, {
        position: "top-right",
        autoClose: 1500,
        theme: "colored",
        toastId: "1",
      });
      setIsloading(false);
    }
  };
  //..................Show lesson Modal...................//
  const lessonModalShowHide = () => {
    setShowHide(!showHide);
    setLessonvalid("");
  };
  //..................Add lesson...................//
  const addLesson = async (e) => {
    if (lessonName === "" || lessonName === "Select Lesson")
      return setLessonvalid(validationError.select.required);
    setLessonvalid("");
    setLessonName("");

    if (
      getLessonList.map((element) => element.lessonName).indexOf(lessonName) !=
      lessondata.map((element) => element.lessonName).indexOf(lessonName)
    ) {
      return toast.error(`${name.common.AlleadyExist}`, {
        position: "top-right",
        autoClose: 1500,
        theme: "colored",
        toastId: "1",
      });
    } else {
      setLessondata((preState) => [...preState, { id: lessonId, lessonName }]);
    }
    setShowHide(!showHide);
    setLessonNumber("");
  };
  const CancleDelete = () => {
    setdeleteShowHide(!deleteshowHide);
  };
  //.........................Confirm delete popup........................//
  const ConfirmDelete = () => {
    setdeleteShowHide(!deleteshowHide);
    let deleteData = lessondata.filter((g, i) => i !== deleteLessonId);
    setLessondata(deleteData);
  };

  //.........................Delete Lesson........................//
  const deleteLesson = (id) => {
    setDeleteLessonId(id);
    setdeleteShowHide(!deleteshowHide);
  };
  const selectLesson = (e) => {
    const { value } = e.target;
    setsequence(value?.split(",")[2]);
    setLessonName(value?.split(",")[1]);
    setLessonId(value?.split(",")[0]);
    if (value === "Select Lesson") {
      setLessonName("");
    }
  };

  const CancleCropbtn = () => {
    setImgHide(!imgHide);
  };
  //........................Drag&drop...................//
  const dragProps = {
    async onDragEnd(fromIndex, toIndex) {
      const dragData = [...lessondata];

      let newData = dragData[toIndex];
      const item = dragData.splice(fromIndex, 1)[0];
      dragData.splice(toIndex, 0, item);
      if (dragData) {
        for (let i = 0; i < dragData.length; i++);
      }
      setLessondata(dragData);
    },
    nodeSelector: ".body-custom1",
  };

  //................Disable point..................//
  const DisablePoint = (e) => {
    if (e.keyCode === 190 || e.keyCode === 110) {
      e.preventDefault();
      return false;
    }
    return true;
  };

  return (
    <>
      <Container fluid className="create-chapter-section">
        {/* Start Create chapter card */}
        {/* Start Create chapter card header */}
        <Row className="create-chapter">
          <Col className="create-chapter-title">
            <Row className="ps-lg-3 ps-md-3">
              <Col sm="6" md="12" lg="12">
                <h3>{name.common.chapter}</h3>
              </Col>
              <Col sm="6" md="12" lg="12">
                <h6>
                  <Breadcrumbs showCreateChapter={true} showChapter={true} />
                </h6>
              </Col>
            </Row>
          </Col>
        </Row>
        {/* End Create chapter card header */}
        {/* Start Create chapter */}
        <BlockUi tag="div" blocking={isloading}>
          <Row>
            {/* Start left Create chapter form */}
            <Col md="6" sm="12" lg="6">
              <Card className="left-chapter-card">
                <Card.Body>
                  <Form className="left-chapter-form">
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
                    <Form.Group
                      className="mb-3"
                      controlId="formSelect"
                      value={categoty}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <Form.Label>
                        <p>{name.common.category}</p>
                      </Form.Label>
                      <Form.Select className="right-questionnaire-select form-control selectbackground-color">
                        <option className="right-questionnaire-option">
                          {name.common.categoryList}
                        </option>
                        {categoryList !== "Null" &&
                          categoryList?.map(({ id, category_name }, i) => (
                            <option
                              key={id}
                              value={`${id}`}
                              className="right-chapter-option"
                            >
                              {category_name}
                            </option>
                          ))}
                      </Form.Select>
                      <b className="error-valid"> {categoryvalid} </b>
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Row className="my-3">
                        <Row className="my-3">
                          <Form.Group as={Col}>
                            <Form.Label>
                              <p
                                data-toggle="tooltip"
                                title=" DHN to be earned based on what score we earn."
                              >
                                {name.chapter.reward80}
                              </p>
                            </Form.Label>
                            <Form.Control
                              type="number"
                              step="0.01"
                              value={dhnslot80}
                              onChange={(e) => setdhnslot80(e.target.value)}
                            />
                            <b className="error-valid">{dhnslot80Numvalid}</b>
                          </Form.Group>
                          <Form.Group as={Col}>
                            <Form.Label>
                              <p
                                data-toggle="tooltip"
                                title=" DHN to be earned based on what score we earn."
                              >
                                {name.chapter.reward90}
                              </p>
                            </Form.Label>
                            <Form.Control
                              type="number"
                              min="0"
                              max="20"
                              step="0.01"
                              value={dhnslot90}
                              onChange={(e) => setdhnslot90(e.target.value)}
                            />
                            <b className="error-valid">{dhnslot90Numvalid}</b>
                          </Form.Group>

                          <Form.Group as={Col}>
                            <Form.Label>
                              <p
                                data-toggle="tooltip"
                                title=" DHN to be earned based on what score we earn."
                              >
                                {name.chapter.reward100}
                              </p>
                            </Form.Label>
                            <Form.Control
                              type="number"
                              min="1"
                              max="100"
                              step="0.01"
                              value={dhnslot100}
                              onChange={(e) => setdhnslot100(e.target.value)}
                            />
                            <b className="error-valid">{dhnslot100Numvalid}</b>
                          </Form.Group>
                        </Row>
                        <Form.Group className="mb-3">
                          <Row className="my-3">
                            <Form.Group as={Col}>
                              <Form.Label>
                                <p
                                  data-toggle="tooltip"
                                  title=" Crypto Jelly required to open chapter quiz"
                                >
                                  {name.chapter.CryptojellyUnlock}
                                </p>
                              </Form.Label>
                              <Form.Control
                                type="number"
                                min="1"
                                value={jelly}
                                onKeyDown={DisablePoint}
                                onChange={(e) => setJelly(e.target.value)}
                              />
                              <b className="error-valid">{jellyvalid}</b>
                            </Form.Group>

                            <Form.Group as={Col}>
                              <Form.Label>
                                <p>{name.class.QuestionLimit}</p>
                              </Form.Label>
                              <Form.Control
                                type="number"
                                value={quesLimit}
                                onKeyDown={DisablePoint}
                                onChange={(e) => setQuesLimit(e.target.value)}
                              />
                              <b className="error-valid"> {quesLimitValid} </b>
                            </Form.Group>
                            <Form.Group as={Col}>
                              <Form.Label>
                                <p>{name.chapter.TimeLimit}</p>
                              </Form.Label>
                              <Form.Control
                                type="number"
                                value={timeLimit}
                                onKeyDown={DisablePoint}
                                onChange={(e) => setTimeLimit(e.target.value)}
                              />
                              <b className="error-valid"> {timeLimitValid} </b>
                            </Form.Group>
                          </Row>
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
            {/* End left Create chapter form */}
            {/* Start Right Create chapter form */}
            <Col md="6" sm="12" lg="6">
              <Card className="right-chapter-card h-100">
                <Card.Body>
                  <Form.Group className=" text-end">
                    <Button
                      onClick={() => lessonModalShowHide()}
                      className="add-btn"
                    >
                      {name.common.add}&nbsp;+
                    </Button>
                  </Form.Group>
                  <Form className="right-chapter-form">
                    <Form.Label>
                      <p>{name.common.lesson}</p>
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
                        {lessondata.length
                          ? lessondata.map(
                              ({ lessonName, sequence, id }, index) => (
                                <div className="body-custom1 noselect" key={id}>
                                  <div className="itemlist1">{lessonName}</div>

                                  <div className="itemlist3 actionbtns lessonaction">
                                    <div className="actions2">
                                      <Image
                                        className="questionnaire-action"
                                        src={delet}
                                        onClick={() =>
                                          deleteLesson(
                                            index,
                                            lessonName,
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
                      onClick={submitData}
                      className="right-chapter-buttons px-4 float-end mt-4"
                      variant="primary"
                      type="submit"
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
                  onClick={() => lessonModalShowHide()}
                >
                  {/* <Modal.Title> </Modal.Title> */}
                </Modal.Header>
                <Modal.Body className="bodypadding0">
                  <Form.Select
                    onChange={selectLesson}
                    className="right-chapter-select form-control selectbackground-color"
                  >
                    <option className="right-chapter-option">
                      {name.common.selectLesson}
                    </option>
                    {getLessonList !== "Null" &&
                      getLessonList?.map(({ id, title }, i) => (
                        <option
                          key={id}
                          value={`${id},${title},${i + 1}`}
                          className="right-chapter-option"
                        >
                          {title}
                        </option>
                      ))}
                  </Form.Select>
                  <b className="error-valid"> {lessonvalid} </b>
                  <div className="text-right mt-2">
                    <Button onClick={() => addLesson()} className="add-btn">
                      {name.common.add}&nbsp;+
                    </Button>
                  </div>
                </Modal.Body>
              </Modal>
            </Col>
            {/* End Right Create chapter form */}
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
                        aspect={16 / 16}
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
          </Row>
        </BlockUi>
        <DeletePopup
          showModal={!deleteshowHide}
          cancelDelete={CancleDelete}
          confirmDelete={ConfirmDelete}
        />
      </Container>
    </>
  );
};

export default CreateChapters;
