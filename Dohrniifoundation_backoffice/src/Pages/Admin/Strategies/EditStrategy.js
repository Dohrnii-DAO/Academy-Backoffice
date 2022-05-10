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
import { validationError, alert, name } from "../../../Utility/constant";
import {
  updateStrategy,
  GetStrategyConcept,
  deleteStrategyConcept,
} from "../../../Redux/Dashboard/Strategies/action";
import { conceptList } from "../../../Redux/Dashboard/Concept/action";
import getCroppedImg from "../../../Utility/ResuableCode/croping";
import delet from "../../../Assets/images/login/delete.png";
import { adminRoute as admin } from "../../../Route/Route";
import history from "../../../Utility/history";

import Cropper from "react-easy-crop";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import BlockUi from "react-block-ui";
import DeletePopup from "../../../Component/Modal/deletePopUp";
import TitleDescription from "../../../Component/Modal/TitleDescription";

const UpdateStrategies = ({ location }) => {
  const [showHide, setShowHide] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDespcription] = useState("");
  const [shortdespcription, setShortdespcription] = useState("");
  const [srcImg, setSrcImg] = useState(null);
  const [illustration_image, setillustration_image] = useState([null]);
  const { id } = useParams();
  const [conceptName, setConceptName] = useState(""); //// to be removed
  const [conceptdata, setConceptdata] = useState([]);
  const [imgHide, setImgHide] = useState(false);
  const [titlevalid, setTitlevalid] = useState("");
  const [desvalid, setDesvalid] = useState("");
  const [sdesvalid, setSdesvalid] = useState("");
  const [imageL, setImgL] = useState("");
  const [imgvalid, setImgvalid] = useState("");
  const [imgtypev, setImgtypev] = useState("");
  const [imgsizev, setImgsizev] = useState("");
  const [isloading, setIsloading] = useState(false);
  const [crop, setCrop] = useState({ x: 16, y: 9 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [deleteshowHide, setdeleteShowHide] = useState([]);
  const [conceptid, setConceptid] = useState("");
  const [conceptvalid, setConceptvalid] = useState("");
  const [crconceptid, crsetConceptid] = useState("");
  const [conceptnumber, setConceptnumber] = useState("");
  const [deletReletion, setdeletReletion] = useState(""); //delete answer

  const dispatch = useDispatch();
  const getConceptList = useSelector((state) => state?.concept?.concepts?.data);

  useEffect(() => {
    if (!location.state?.title) {
      return history.push(admin.NETWORKERROR);
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(conceptList());
    (async function name() {
      setIsloading(true);
      try {
        let data = await GetStrategyConcept(id);
        setConceptdata(data.data.data);
        setIsloading(false);
      } catch (e) {}
    })();

    ////////////////////////
    setTitle(location.state?.title);
    setDespcription(location.state?.description);
    setShortdespcription(location.state?.short_description);
    setillustration_image(location.state?.illustration_image);
    setCroppedImage(location.state?.croppedImage);
  }, [dispatch]);

  // image upload function
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

  const onClose = useCallback(() => {
    setCroppedImage(null);
  }, []);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  // add concept data
  const addConcept = async (e) => {
    if (conceptName === "")
      return setConceptvalid(validationError.select.required);
    setConceptvalid("");
    setConceptName("");

    //////////////////////////////////////
    if (
      getConceptList
        .map((element) => element.conceptName)
        .indexOf(conceptName) !=
      conceptdata.map((element) => element.concepts.title).indexOf(conceptName)
    ) {
      return toast.error(`${name.common.AlleadyExist}`, {
        position: "top-right",
        autoClose: 1500,
        theme: "colored",
        toastId: "1",
      });
    } else {
      setConceptdata((preState) => [
        ...preState,
        { concepts: { title: conceptName, id: crconceptid } },
      ]);
    }
    let currentData = [
      ...conceptdata,
      { concepts: { title: conceptName, id: crconceptid } },
    ];

    let concepts_ids = "";
    if (currentData.length) {
      currentData.forEach((item, index) => {
        concepts_ids += `${parseInt(currentData[index].concepts.id)},`;
      });
      concepts_ids = concepts_ids.replace(/,\s*$/, "");
    }
    setShowHide(!showHide);
    setIsloading(true);
    let file = new File([illustration_image], imageL);
    const strategyData = new FormData();
    strategyData.append("id", id);
    strategyData.append("title", title);
    strategyData.append("description", description);
    strategyData.append("short_description", shortdespcription);
    strategyData.append("illustration_image", file);
    strategyData.append("concepts", concepts_ids);
    await dispatch(updateStrategy(strategyData));
    await GetStrategyConcept(id);
    setIsloading(false);
    //////////////////////////////////
    setConceptnumber("");
  };

  // submit updated data for strategy
  const updateData = async (event) => {
    event.preventDefault();
    if (title === "") return setTitlevalid(validationError.field.required);
    setTitlevalid("");
    if (shortdespcription === "")
      return setSdesvalid(validationError.field.required);
    setSdesvalid("");
    if (description === "") return setDesvalid(validationError.field.required);
    setDesvalid("");

    if (imgtypev === validationError.imagetype.required) {
      return false;
    }

    let concepts_ids = "";
    if (conceptdata.length) {
      conceptdata.forEach((item, index) => {
        concepts_ids += `${parseInt(conceptdata[index].concepts.id)},`;
      });
      concepts_ids = concepts_ids.replace(/,\s*$/, "");
    }

    setIsloading(true);
    let file = new File([illustration_image], imageL);
    const strategyData = new FormData();
    strategyData.append("id", id);
    strategyData.append("title", title);
    strategyData.append("description", description);
    strategyData.append("short_description", shortdespcription);
    strategyData.append("illustration_image", file);
    strategyData.append("concepts", concepts_ids);

    /////////////////////////////////////////////////////////////////////////////
    let UpdateData = await dispatch(updateStrategy(strategyData));
    if (UpdateData?.statuscode === 200) {
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

  const CancleCropbtn = () => {
    setImgHide(!imgHide);
  };
  const selectConcept = (e) => {
    const { value } = e.target;

    setConceptName(value?.split(",")[1]);
    crsetConceptid(value?.split(",")[0]);
    if (value === "Select Concepts") {
      setConceptName("");
    }
  };

  const ConfirmDelete = async () => {
    setdeleteShowHide(!deleteshowHide);
    setIsloading(true);
    await deleteStrategyConcept(deletReletion, conceptid);
    setTimeout(async () => {
      let data = await GetStrategyConcept(id);

      setConceptdata(data?.data?.data);
      toast.success(`${alert.message.delete}`, {
        position: "top-right",
        autoClose: 1500,
        theme: "colored",
        toastId: "1",
      });
      setIsloading(false);
    }, 800);
  };
  const deleteConcept = (concepts_id) => {
    if (conceptdata.length === 2) {
      toast.error(`${name.common.addOtherToDelete}`, {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
        toastId: "1",
      });
    } else {
      setdeleteShowHide(!deleteshowHide);
      setConceptid(concepts_id);
      setdeletReletion(id);
    }
  };
  const CancleDelete = () => {
    setdeleteShowHide(!deleteshowHide);
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
                  <Breadcrumbs activeS={false} showSt={true} showUst={true} />
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
                      shortDescriptionvalid={sdesvalid}
                      descriptionValidation={desvalid}
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

                        {!croppedImage && (
                          <div className="col-md-4 mt-3">
                            <img
                              className="cropdone"
                              src={illustration_image}
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
                        {" "}
                        {conceptdata.length
                          ? conceptdata.map(
                              ({ concepts: { title, id }, i }, index) => (
                                <tr key={id}>
                                  <td>{title}</td>
                                  <td>
                                    <div className="actionbtns delete">
                                      <div className="actions2">
                                        <Image
                                          className="questionnaire-action"
                                          src={delet}
                                          onClick={() => deleteConcept(id)}
                                        />
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              )
                            )
                          : ""}
                      </tbody>
                    </Table>

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
                  <Modal.Title> </Modal.Title>
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
                    <Button className="add-btn" onClick={() => addConcept()}>
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
                >
                  {/* <Modal.Title className="custommodaltitle" id="passwordMatch">
                  {name.common.delete}
                </Modal.Title> */}
                </Modal.Header>

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

        <DeletePopup
          showModal={!deleteshowHide}
          cancelDelete={CancleDelete}
          confirmDelete={ConfirmDelete}
        />
        {/* End Create strategy Table */}
      </Container>
    </>
  );
};

export default UpdateStrategies;
