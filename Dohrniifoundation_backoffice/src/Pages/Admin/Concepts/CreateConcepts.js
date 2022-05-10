import React, { useState, useCallback } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Modal,
  Card,
  InputGroup,
} from "react-bootstrap";

import Breadcrumbs from "../../../Component/Breadcrumbs";
import "../../../Assets/Css/createconcepts.css";
import { useDispatch } from "react-redux";
import getCroppedImg from "../../../Utility/ResuableCode/croping";
import { validationError, alert, name } from "../../../Utility/constant";
import { createConcept } from "../../../Redux/Dashboard/Concept/action";
import history from "../../../Utility/history";
import { adminRoute as admin } from "../../../Route/Route";

import Cropper from "react-easy-crop";
import { toast } from "react-toastify";
import BlockUi from "react-block-ui";
import TitleDescription from "../../../Component/Modal/TitleDescription";

const CreateConcepts = () => {
  const dispatch = useDispatch();
  const [isloading, setIsloading] = useState("");

  /////////////////// STATE FOR IMAGE ////////////////////////////////
  const [imageL, setImgL] = useState("");
  /////////////////// STATE FOR TYPE VIDEO TEXT IMAGE //////////////////
  const [vedioUploadType, setVedioUploladType] = useState("");
  const [vedioUploadTypeUrl, setvedioUploadTypeUrl] = useState("");
  const [vimeoUrlType, setVimeoUrlType] = useState("");
  const [uTubeType, setYouTubeType] = useState("");
  const [imageType, setImageType] = useState("");

  /////////////////// STATE FOR CROPPED IMAGE /////////////////////////
  const [crop, setCrop] = useState({ x: 16, y: 9 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [croppedImageType, setCroppedImageType] = useState(null);

  /////////////////// STATE FOR VALIDATION/////////////////////////////
  const [titlevalid, setTitlevalid] = useState("");
  const [desvalid, setDesvalid] = useState("");
  const [titlespacevalid, setTitleSpacevalid] = useState("");
  const [shortdespacevalid, setShortdespacevalid] = useState("");
  const [despacevalid, setDespacevalid] = useState("");
  const [imgvalid, setImgvalid] = useState("");
  const [imagevalidType, setImagevalidType] = useState("");
  const [imgtypev, setImgtypev] = useState("");
  const [imgsizev, setImgsizev] = useState("");
  const [vedioUploadvalid, setVedioUploadvalid] = useState("");
  const [urlvalid, setUrlValid] = useState("");
  const [textvalid, setTextvalid] = useState("");
  const [spaceTxtvalid, setSpaceTxtvalid] = useState("");
  const [imageTypeValid, setImageTypeValid] = useState("");
  const [imagetypev, setImagetypev] = useState("");
  const [uploadtypev, setUploadtypev] = useState("");
  const [imagesizev, setImagesizev] = useState("");
  const [chooseType, setChooseType] = useState("Choose type");
  const [checkV, setCheckV] = useState("youtube");
  const [sdesvalid, setSdesvalid] = useState("");
  const [chooseTypeValid, setChooseTypeValid] = useState("");

  /////////////////// STATE FOR CONTROL SHOW HIDE///////////////////////
  const [imgHide, setImgHide] = useState(false);
  const [imgHideType, setImgHideType] = useState(false);
  const [text, setText] = useState(false);
  const [image, setImage] = useState(false);
  const [video, setVideo] = useState(false);
  const [urlTube, setUrlTube] = useState(false);
  const [vimeo, setVimeo] = useState(false);
  const [youTube, setYouTube] = useState(true);
  const [upload, setUpload] = useState(false);
  const [check, setCheck] = useState({
    YouTube: false,
    Vimeo: false,
    Upload: false,
  });

  /////////////////// STATE FOR INPUT /////////////////////////////////
  const [title, setTitle] = useState("");
  const [shortdespcription, setShortdespcription] = useState("");
  const [description, setDespcription] = useState("");
  const [illustration_image, setillustration_image] = useState([null]);
  const [illustration_imageType, setillustration_imageType] = useState([null]);
  const [type, setType] = useState("");
  const [textContentType, setTextContentType] = useState("");
  const [srcImg, setSrcImg] = useState(null);
  const [srcImgType, setSrcImgType] = useState(null);

  /////////////////// FUNCTION FOR HANDLE IMAGE LEFT ////////////////////////////////
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
        // return setImgtypev(validationError.imagesize.required);
      }
      // else if (event.target.files[0].size < 360000) {
      //   setSrcImg("");
      //   setImgvalid("");
      //   setImgHide(imgHide);
      //   return setImgtypev(validationError.imagesize.required);
      // }
      else {
        setImgtypev();
        setImgvalid("");
        return setSrcImg(URL.createObjectURL(event.target.files[0]));
      }
    }
  };

  /////////////////// FUNCTION FOR HANDLE IMAGE RIGHT ////////////////////////////////
  const handleImageType = async (event) => {
    setCroppedImageType("");
    setImagevalidType("");
    setImgHideType(!imgHideType);
    setImageType(event.target.files[0]?.name);
    if (event.target.files[0]?.name) {
      if (
        !event.target.files[0].name.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG|)$/)
      ) {
        setSrcImgType("");
        setImagevalidType("");
        setImgHideType(imgHideType);
        setImageTypeValid("");
        return setImagetypev(validationError.imagetype.required);
      } else if (event.target.files[0].size > 1440000) {
        setSrcImgType("");
        setImagevalidType("");
        setImgHideType(imgHideType);
        return setImagetypev(validationError.imagesize.required);
      } else {
        setImagetypev();
        setImagevalidType("");
        return setSrcImgType(URL.createObjectURL(event.target.files[0]));
      }
    }
  };

  /////////////////// FUNCTION FOR crop image //////////////////////////////////
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

  /////////////////// FUNCTION FOR crop image Right //////////////////////////////////
  const TypeCroppedImage = useCallback(async () => {
    try {
      const croppedImageType = await getCroppedImg(
        srcImgType,
        croppedAreaPixels,
        rotation
      );
      let imageUrltype = URL.createObjectURL(croppedImageType);
      setCroppedImageType(imageUrltype);
      setillustration_imageType(croppedImageType);
      setImgHideType(!imgHideType);
    } catch (e) {}
  }, [croppedAreaPixels, rotation]);

  /////////////////// FUNCTION FOR CLOSE CROPPED IMAGE AND CROP COMPLETE ////////////////////////////
  const onClose = useCallback(() => {
    setCroppedImage(null);
  }, []);

  const onCloseTpye = useCallback(() => {
    setCroppedImageType(null);
  }, []);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  /////////////////// FUNCTION FOR SUBMITTING DATA  ////////////////////////////
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
    /////////////////////////////choose type validation////////////////////////////////////////////////

    if (chooseType === "Choose Type") {
      return setChooseTypeValid(validationError.select.required);
    } else {
      setChooseTypeValid("");
    }

    if (chooseType === "text") {
      setUrlValid("");
      setImgvalid("");
      if (textContentType === "")
        return setTextvalid(validationError.field.required);
      setTextvalid("");
      setUrlValid("");
      setSpaceTxtvalid("");
      if (textContentType.trim() === "")
        return setSpaceTxtvalid(validationError.emptySpace.blank);
      setSpaceTxtvalid("");
      setUrlValid("");
    }

    if (chooseType === "video") {
      setTextvalid("");
      setSpaceTxtvalid("");
      setVimeoUrlType("");
      if (check.YouTube || check.Vimeo) {
        let reg =
          /(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/;
        if (uTubeType === "") return setUrlValid(validationError.url.required);
        setUrlValid("");
        setVimeoUrlType("");
        if (!reg.test(uTubeType)) return setVimeoUrlType(name.common.validurl);
        setVimeoUrlType("");
      }

      if (uploadtypev != "") {
        return false;
      }

      if (check.Upload) {
        if (vedioUploadType === "")
          return setVedioUploadvalid(validationError.field.required);
        setVedioUploadvalid("");
        setUrlValid("");
        setVimeoUrlType("");
      }
      setVedioUploadvalid("");
    }

    if (chooseType === "image") {
      setImagevalidType("");
      setImageTypeValid("");

      if (imageType === "")
        return setImageTypeValid(validationError.field.required);

      setImagevalidType("");
      setUrlValid("");
      setVimeoUrlType("");
      if (imagetypev != undefined) {
        return false;
      }
    }
    setIsloading(true);
    let file = new File([illustration_image], imageL);
    let imgfiletype = new File([illustration_imageType], imageType);
    const ConceptForm = new FormData();
    ConceptForm.append("title", title);
    ConceptForm.append("description", description);
    ConceptForm.append("short_description", shortdespcription);
    ConceptForm.append("illustration_image", file);
    ConceptForm.append("type", type);
    type === "video"
      ? ConceptForm.append("video_type", checkV)
      : ConceptForm.append("video_type", "");

    type === "image"
      ? ConceptForm.append("content_url", imgfiletype)
      : ConceptForm.append("content_url", vedioUploadType);

    ConceptForm.append("content_url_text", uTubeType);
    ConceptForm.append("content_text", textContentType);

    let conceptAdd = await dispatch(createConcept(ConceptForm));
    if (conceptAdd?.statuscode === 200) {
      history.push(admin.CONCEPTS);
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

  /////////////////// FUNCTION FOR HANDALING CHOOSE TYPE CONTROL  ////////////////////////////
  const handleChangeType = (e) => {
    setUpload(false);
    let name = e.target.value;
    setType(name);
    setChooseTypeValid("");
    setvedioUploadTypeUrl("");
    setImagetypev("");
    setCroppedImageType("");
    setChooseType(e.target.value);
    setImageType("");
    if (name === "image") {
      setVedioUploladType("");
      setCheck({ YouTube: false, Vimeo: false, Upload: false });
      setImage(true);
      setVideo(false);
      setText(false);
      setUpload(false);
      setUrlValid("");
      setVimeoUrlType("");
      setVedioUploadvalid("");
      setImageTypeValid("");
      setTextvalid("");
      setSpaceTxtvalid("");
      setImagevalidType("");
    } else if (name === "video") {
      setVedioUploladType("");
      setCheck((pre) => ({ ...pre, YouTube: true }));
      setImage(false);
      setVideo(true);
      setText(false);
      setUpload(false);
      setYouTubeType("");
      setTextvalid("");
      setSpaceTxtvalid("");
    } else if (name === "text") {
      setCheck({ YouTube: false, Vimeo: false, Upload: false });
      setText(true);
      setImage(false);
      setVideo(false);
      setUpload(false);
      setUrlValid("");
      setVimeoUrlType("");
      setVedioUploadvalid("");
      setTextvalid("");
      setSpaceTxtvalid("");
    } else {
      setCheck({ YouTube: false, Vimeo: false, Upload: false });
      setText(false);
      setImage(false);
      setVideo(false);
      setUpload(false);
      setUrlValid("");
      setVimeoUrlType("");
      setVedioUploadvalid("");
      setTextvalid("");
      setSpaceTxtvalid("");
      setImagevalidType("");
      setTextContentType("");
    }
  };

  const handleChecked = (e) => {
    const { value } = e.target;
    setCheckV(value);
    setVedioUploladType("");
    setChooseTypeValid("");
    setvedioUploadTypeUrl("");
    setUploadtypev("");
    if (e.target.value === "youtube") {
      setCheck({ YouTube: true, Vimeo: false, Upload: false });
      setYouTube(true);
      setVimeo(false);
      setUpload(false);
      setUrlTube(true);
      setUrlValid("");
      setVimeoUrlType("");
      setVedioUploadvalid("");
      setYouTubeType("");
    } else if (e.target.value === "vimeo") {
      setCheck({ YouTube: false, Vimeo: true, Upload: false });
      setYouTube(false);
      setUrlTube(true);
      setVimeo(true);
      setUpload(false);
      setUrlValid("");
      setVimeoUrlType("");
      setVedioUploadvalid("");

      setYouTubeType("");
    } else if (e.target.value === "upload") {
      setCheck({ YouTube: false, Vimeo: false, Upload: true });
      setYouTube(false);
      setVimeo(false);
      setUrlTube(false);
      setUpload(true);
      setUrlValid("");
      setVimeoUrlType("");
      setVedioUploadvalid("");
    } else {
      setYouTube(false);
      setUrlTube(false);
      setVimeo(false);
      setUpload(false);
    }
  };

  /////////////////// FUNCTION FOR HANDALING SHOW AND HIDE  ////////////////////////////
  const CancleCropbtn = () => {
    setImgHide(!imgHide);
  };
  const CancleCropType = () => {
    setImgHideType(!imgHideType);
  };
  /////////////////// FUNCTION FOR VIDEO CONVERT  ////////////////////////////

  const changeFileToURL = (e) => {
    let files = e.target.files[0];
    setVedioUploladType(e.target.files[0]);
    //  setVedioUploladType(e.target.files[0]?.name);
    setVedioUploadvalid("");
    if (!e.target.files[0]?.name?.match(/\.(mp4)$/))
      return setUploadtypev("Invalid format choose mp4 file.");
    setUploadtypev("");
    setvedioUploadTypeUrl(URL.createObjectURL(files));
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
                <h3>Concepts</h3>
              </Col>
              <Breadcrumbs activeCon={false} showCon={true} showCcon={true} />
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
            {/* End left Create concept form */}
            {/* Start Right Create concept form */}
            <Col md="6" sm="12" lg="6">
              <Card className="right-questionnaire-card">
                <Card.Body>
                  {/* <Form.Group className=" text-end">
                                <Button onClick={() => handleModalShowHide()} className="add-btn">Add&nbsp;+</Button>
                                </Form.Group> */}

                  <Form className="right-concept-form">
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <p>{name.common.type}</p>
                      </Form.Label>
                      <Form.Select
                        onChange={handleChangeType}
                        className="right-concept-select form-control"
                      >
                        <option className="right-concept-option">
                          {name.common.choosetype}
                        </option>
                        <option className="right-concept-option" value="video">
                          {name.common.video}
                        </option>
                        <option className="right-concept-option" value="image">
                          {name.common.image}
                        </option>
                        <option className="right-concept-option" value="text">
                          {name.common.text}
                        </option>
                      </Form.Select>
                      <b className="error-valid">{chooseTypeValid}</b>
                    </Form.Group>
                    {/* Add Question Type Radio Buttons */}
                    {video ? (
                      <>
                        <fieldset className="mx-3">
                          <Form.Group
                            as={Row}
                            className="right-concept-radio mb-3"
                          >
                            <Col sm={2}>
                              <Form.Check
                                className="concept-radio-check"
                                type="radio"
                                label="YouTube"
                                value="youtube"
                                onChange={handleChecked}
                                name="formRadio"
                                checked={check.YouTube}
                              />
                            </Col>
                            <Col sm={2}>
                              <Form.Check
                                className="concept-radio-check"
                                type="radio"
                                label="Vimeo"
                                value="vimeo"
                                onChange={handleChecked}
                                name="formRadio"
                                checked={check.Vimeo}
                              />
                            </Col>
                            <Col sm={2}>
                              <Form.Check
                                onChange={handleChecked}
                                className="concept-radio-check"
                                type="radio"
                                label="Upload"
                                value="upload"
                                name="formRadio"
                                checked={check.Upload}
                              />
                            </Col>
                          </Form.Group>
                        </fieldset>
                        {(check.YouTube || check.Vimeo) && (
                          <Form.Group className="mb-3">
                            <Form.Control
                              onChange={(e) => setYouTubeType(e.target.value)}
                              value={uTubeType}
                              type="text"
                              placeholder="URL"
                            />
                          </Form.Group>
                        )}
                      </>
                    ) : (
                      ""
                    )}
                    <b className="error-valid">
                      {urlvalid}
                      {vimeoUrlType}
                    </b>

                    {/* Video Upload */}
                    {check.Upload ? (
                      <Form.Group className="mb-3">
                        <InputGroup>
                          <Form.Control
                            className="left-concept-custom-file"
                            id="formlessonsVideo"
                            type="file"
                            onChange={changeFileToURL}
                          />
                          <label
                            className="input-group-text"
                            htmlFor="formlessonsVideo"
                            onChange={changeFileToURL}
                          >
                            {name.common.upload}
                          </label>
                        </InputGroup>
                        <b className="error-valid">
                          {vedioUploadvalid} {uploadtypev}
                        </b>
                      </Form.Group>
                    ) : (
                      ""
                    )}
                    {vedioUploadTypeUrl ? (
                      <video
                        key={vedioUploadTypeUrl}
                        width="270"
                        height="200"
                        controls
                      >
                        <source src={vedioUploadTypeUrl} type="video/mp4" />
                      </video>
                    ) : (
                      ""
                    )}
                    {/* Image Upload */}
                    {image ? (
                      <>
                        <Form.Group className="">
                          <InputGroup>
                            <Form.Control
                              className="left-concept-custom-file"
                              id="images"
                              type="file"
                              accept="image/*"
                              onChange={handleImageType}
                            />
                            <label
                              className="input-group-text"
                              htmlFor="images"
                            >
                              {name.common.browse}
                            </label>
                          </InputGroup>
                          <b className="error-valid">
                            {imageTypeValid} {imagetypev} {imagesizev}
                          </b>

                          <div className="row">
                            {croppedImageType && (
                              <div className="col-md-4 mt-3">
                                <img
                                  className="cropdone"
                                  src={croppedImageType}
                                  alt="cropped imageType"
                                  onClose={onCloseTpye}
                                />
                              </div>
                            )}
                          </div>
                        </Form.Group>{" "}
                      </>
                    ) : (
                      ""
                    )}

                    {/* Add Question Type Text Buttons */}

                    {text ? (
                      <Form.Group className="mb-3">
                        <Form.Label>
                          <p> {name.common.content}</p>
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          className="text-area py-2"
                          rows={3}
                          value={textContentType}
                          onChange={(e) => setTextContentType(e.target.value)}
                        />
                      </Form.Group>
                    ) : (
                      ""
                    )}
                    <b className="error-valid">
                      {textvalid} {spaceTxtvalid}
                    </b>
                    <Button
                      className="right-concept-buttons px-4 float-end"
                      variant="primary"
                      type="submit"
                      onClick={submitData}
                    >
                      {name.common.save}
                    </Button>
                  </Form>
                </Card.Body>
              </Card>

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

              <Modal
                className="custom-modal"
                show={imgHideType}
                aria-labelledby="passwordMatch"
                centered
              >
                <Modal.Header
                  className="customheader"
                  closeButton
                  onClick={() => CancleCropType()}
                ></Modal.Header>

                {srcImgType && (
                  <>
                    <Modal.Body className="custombody12">
                      <div className="cropImage">
                        <Cropper
                          image={srcImgType}
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
                        onClick={TypeCroppedImage}
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
        </BlockUi>
        {/* End Create concept Table */}
      </Container>
    </>
  );
};

export default CreateConcepts;
