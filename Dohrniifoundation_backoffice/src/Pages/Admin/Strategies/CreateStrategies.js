import React, { useEffect, useState, useCallback } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Modal,
  Image,
  Button,
  Card,
  Table,
  InputGroup,
} from "react-bootstrap";

import Breadcrumbs from "../../../Component/Breadcrumbs";
import "../../../Assets/Css/createstrategies.css";
import { useDispatch, useSelector } from "react-redux";
import history from "../../../Utility/history";
import { validationError, alert, name } from "../../../Utility/constant";
import { adminRoute as admin } from "../../../Route/Route";
import { createStrategy } from "../../../Redux/Dashboard/Strategies/action";
import getCroppedImg from "../../../Utility/ResuableCode/croping";
import delet from "../../../Assets/images/login/delete.png";
import Cropper from "react-easy-crop";
import { toast } from "react-toastify";
import BlockUi from "react-block-ui";
import { conceptList } from "../../../Redux/Dashboard/Concept/action";
import DeletePopup from "../../../Component/Modal/deletePopUp";
import TitleDescription from "../../../Component/Modal/TitleDescription";

const CreateStrategies = (props) => {
  const [showHide, setShowHide] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDespcription] = useState("");
  const [shortdespcription, setShortdespcription] = useState("");
  const [srcImg, setSrcImg] = useState(null);
  const [conceptnumber, setConceptnumber] = useState("");
  const [conceptName, setConceptName] = useState(""); //// to be removed
  const [illustration_image, setillustration_image] = useState([null]);
  const [isloading, setIsloading] = useState("");
  const [imgHide, setImgHide] = useState(false);
  const [titlevalid, setTitlevalid] = useState("");

  const [titlespacevalid, setTitleSpacevalid] = useState("");
  const [shortdespacevalid, setShortdespacevalid] = useState("");
  const [despacevalid, setDespacevalid] = useState("");
  const [desvalid, setDesvalid] = useState("");
  const [sdesvalid, setSdesvalid] = useState("");
  const [imageL, setImgL] = useState("");
  const [imgvalid, setImgvalid] = useState("");
  const [imgtypev, setImgtypev] = useState("");
  const [imgsizev, setImgsizev] = useState("");
  const [crop, setCrop] = useState({ x: 1920, y: 720 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [conceptdata, setConceptdata] = useState([]);
  const [conceptvalid, setConceptvalid] = useState("");
  const [deleteshowHide, setdeleteShowHide] = useState([]);
  const [conceptid, setConceptid] = useState("");
  const [crconceptid, crsetConceptid] = useState("");
  const getConceptList = useSelector((state) => state?.concept?.concepts?.data);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(conceptList());
  }, [dispatch]);

  // choose image file on click
  const handleImage = async (event) => {
    setCroppedImage("");
    setImgvalid("");
    setImgHide(!imgHide);
    setImgL(event.target.files[0]?.name);
    if (event.target.files[0]) {
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

  // crop image function
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

  // close cropped pop up
  const onClose = useCallback(() => {
    setCroppedImage(null);
  }, []);

  // close cropped pop up after complete
  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // add concept data
  const addConcept = async (e) => {
    if (conceptName === "")
      return setConceptvalid(validationError.select.required);
    setConceptvalid("");
    setConceptName("");
    setConceptdata((preState) => [
      ...preState,
      { id: crconceptid, conceptName },
    ]); /// to be removed
    setShowHide(!showHide);
    setConceptnumber("");
  };

  // function for submiting data for strategy
  const submitData = async (event) => {
    event.preventDefault();
    if (title === "") return setTitlevalid(validationError.field.required);
    setTitlevalid("");
    setTitleSpacevalid("");
    if (title.trim() === "")
      return setTitleSpacevalid(validationError.emptySpace.blank);
    setTitleSpacevalid("");
    setTitlevalid("");

    if (shortdespcription === "")
      return setSdesvalid(validationError.field.required);
    setSdesvalid("");
    setShortdespacevalid("");
    if (shortdespcription.trim() === "")
      return setShortdespacevalid(validationError.emptySpace.blank);
    setShortdespacevalid("");
    setSdesvalid("");
    if (description === "") return setDesvalid(validationError.field.required);
    setDesvalid("");
    setDespacevalid("");
    if (description.trim() === "")
      return setDespacevalid(validationError.emptySpace.blank);
    setDespacevalid("");
    setDesvalid("");

    if (imageL === "") return setImgvalid(validationError.field.required);
    if (imgtypev != undefined) {
      return false;
    }

    let concepts_ids = "";
    if (conceptdata.length) {
      conceptdata.forEach((item, index) => {
        concepts_ids += conceptdata[index].id + ",";
      });
      concepts_ids = concepts_ids.replace(/,\s*$/, "");
    }

    if (conceptdata?.length < 2 || conceptdata == undefined) {
      toast.error(`${name.common.AtleastTwo}`, {
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
    const strategyData = new FormData();
    strategyData.append("title", title);
    strategyData.append("description", description);
    strategyData.append("short_description", shortdespcription);
    strategyData.append("illustration_image", file);
    strategyData.append("concepts", concepts_ids);
    let strategyAdd = await dispatch(createStrategy(strategyData));

    if (strategyAdd?.data.statuscode === 200) {
      history.push(admin.STRATEGIES);
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

  const conceptModalShowHide = () => {
    setShowHide(!showHide);
  };

  // cancle crop popUp
  const CancleCropbtn = () => {
    setImgHide(!imgHide);
  };

  const CancleDelete = () => {
    setdeleteShowHide(!deleteshowHide);
  };
  //confirm delete popup concept
  const ConfirmDelete = () => {
    setdeleteShowHide(!deleteshowHide);
    let deleteData = conceptdata.filter((g, i) => i !== conceptid);

    setConceptdata(deleteData);
  };

  // delete concept data
  const deleteConcept = (id) => {
    setConceptid(id);
    setdeleteShowHide(!deleteshowHide);
  };

  ///to be removed
  const selectConcept = (e) => {
    const { value } = e.target;
    setConceptName(value?.split(",")[1]);

    crsetConceptid(value?.split(",")[0]);
    if (value === "Select Concepts") {
      setConceptName("");
    }
  };

  return (
    <>
      <Container fluid className="create-strategy-section">
        {/* Start Create strategy card */}
        {/* Start Create strategy card header */}
        <Row className="create-strategy">
          <Col className="create-strategy-title">
            <Row className="ps-lg-3 ps-md-3">
              <Col sm="6" md="12" lg="12">
                <h3>{name.common.strategy}</h3>
              </Col>
              <Col sm="6" md="12" lg="12">
                <h6>
                  <Breadcrumbs activeS={false} showSt={true} showCst={true} />
                </h6>
              </Col>
            </Row>
          </Col>
        </Row>
        {/* End Create strategy card header */}
        {/* Start Create strategy */}
        <BlockUi tag="div" blocking={isloading}>
          <Row>
            {/* Start left Create strategy form */}

            <Col md="6" sm="12" lg="6">
              <Card className="left-strategy-card">
                <Card.Body>
                  <Form className="left-strategy-form">
                    <TitleDescription
                      title={title}
                      setTitle={(e) => setTitle(e.target.value)}
                      shortdespcription={shortdespcription}
                      setShortdespcription={(e) =>
                        setShortdespcription(e.target.value)
                      }
                      description={description}
                      setDespcription={(e) => setDespcription(e.target.value)}
                      titleValidation={titlevalid}
                      tiltlespaceValidation={titlespacevalid}
                      shortDescriptionvalid={sdesvalid}
                      shortdespacevalid={shortdespacevalid}
                      descriptionValidation={desvalid}
                      despacevalid={despacevalid}
                    />

                    <Form.Group className="">
                      <Form.Label>
                        <p>{name.common.illustrationimage} </p>
                      </Form.Label>
                      <InputGroup>
                        <Form.Control
                          className="left-strategy-custom-file"
                          id="illustrationImg"
                          type="file"
                          accept="image/*"
                          onChange={handleImage}
                        />
                        <label
                          className="input-group-text"
                          htmlFor="illustrationImg"
                          onChange={handleImage}
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
            {/* End left Create strategy form */}
            {/* Start Right Create strategy form */}
            <Col md="6" sm="12" lg="6">
              <Card className="right-questionnaire-card">
                <Card.Body>
                  <Form.Group className=" text-end">
                    <Button
                      onClick={() => conceptModalShowHide()}
                      className="add-btn"
                    >
                      {name.common.add}&nbsp;+
                    </Button>
                  </Form.Group>

                  <Form className="right-questionnaire-form">
                    <Form.Label>
                      <p>{name.common.concept}</p>
                    </Form.Label>
                    <Table className="border">
                      <thead className="table-thead">
                        <tr>
                          <th>{name.common.title}</th>
                          <th className="text-right">{name.common.action}</th>
                        </tr>
                      </thead>

                      <tbody className="question-table-body">
                        {conceptdata.length
                          ? conceptdata.map(({ conceptName, id }, i) => (
                              <tr key={id}>
                                <td>{conceptName}</td>
                                <td>
                                  <div className="actionbtns delete">
                                    <div className="actions2">
                                      <Image
                                        className="questionnaire-action"
                                        src={delet}
                                        onClick={() => deleteConcept(i)}
                                      />
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ))
                          : ""}
                      </tbody>
                    </Table>
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
              <Modal
                className="custom-modal custom-modal2"
                show={showHide}
                aria-labelledby="passwordMatch"
                centered
              >
                <Modal.Header
                  className="close-btn1 customheader modal-header"
                  closeButton
                  onClick={() => conceptModalShowHide()}
                >
                  {/* <Modal.Title> </Modal.Title> */}
                </Modal.Header>
                <Modal.Body className="bodypadding0">
                  <Form.Select
                    onChange={selectConcept}
                    className="right-questionnaire-select form-control selectbackground-color"
                  >
                    <option className="right-questionnaire-option">
                      {name.common.Chooseconcept}
                    </option>

                    {getConceptList &&
                      getConceptList.map(({ id, title }, i) => (
                        <option
                          key={id}
                          value={`${id},${title},${i + 1}`}
                          className="right-questionnaire-option"
                        >
                          {title}
                        </option>
                      ))}
                  </Form.Select>
                  <b className="error-valid"> {conceptvalid} </b>
                  <div className="text-right mt-2">
                    <Button onClick={() => addConcept()} className="add-btn">
                      {name.common.add}&nbsp;+
                    </Button>
                  </div>
                </Modal.Body>
              </Modal>
              {/* start image pop up*/}

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

            {/* End Right Create strategy form */}
          </Row>
        </BlockUi>
        {/* End Create strategy Table */}
        <DeletePopup
          showModal={!deleteshowHide}
          cancelDelete={CancleDelete}
          confirmDelete={ConfirmDelete}
        />
      </Container>
    </>
  );
};

export default CreateStrategies;
