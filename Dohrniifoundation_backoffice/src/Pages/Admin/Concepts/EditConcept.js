import React, { useEffect, useState, useCallback } from "react";
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
import "../../../Assets/Css/editconcepts.css";
import { updateConcept } from "../../../Redux/Dashboard/Concept/action";
import { useDispatch } from "react-redux";

import getCroppedImg from "../../../Utility/ResuableCode/croping";
import { adminRoute as admin } from "../../../Route/Route";
import { validationError, name, alert } from "../../../Utility/constant";

import Cropper from "react-easy-crop";
import { toast } from "react-toastify";
import BlockUi from "react-block-ui";
import history from "../../../Utility/history";
import LazyLoad from "react-lazyload";
import TitleDescription from "../../../Component/Modal/TitleDescription";

const UpdateConcept = ({ location, match }) => {
  const dispatch = useDispatch();
  const [isloading, setIsloading] = useState("");

  /////////////////// STATE FOR IMAGE ////////////////////////////////
  const [imageL, setImgL] = useState("");

  /////////////////// STATE FOR TYPE VIDEO TEXT IMAGE //////////////////
  const [vedioUploadType, setVedioUploadType] = useState("");
  const [updateUploadvideo, setupdateUploadvideo] = useState("");
  const [vimeoUrlType, setVimeoUrlType] = useState("");
  const [vedioUploadTypeUrl, setvedioUploadTypeUrl] = useState("");
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
  const [illustration_image, setillustration_image] = useState("");
  const [illustration_imageType, setillustration_imageType] = useState("");
  const [type, setType] = useState("");
  const [textContentType, setTextContentType] = useState("");
  const [srcImg, setSrcImg] = useState(null);
  const [srcImgType, setSrcImgType] = useState(null);

  /////////////////// USE-EFECT ////////////////////////////////
  useEffect(() => {
    if (!location.state?.title) {
      return history.push(admin.NETWORKERROR);
    }
  }, [dispatch]);

  useEffect(async () => {
    setTitle(location.state?.title);
    setDespcription(location.state?.description);
    setShortdespcription(location.state?.short_description);
    await setillustration_image(location.state?.illustration_image);
    setCroppedImage(location.state?.croppedImage);
    setType(location.state?.type);
    await setillustration_imageType(location.state?.content_url);
    await setImageType(location.state?.content_url);
    setTextContentType(location.state?.content_text);
    await setVedioUploadType(location.state?.content_url);
    setYouTubeType(location.state?.content_url);
    setChooseType(location.state?.type);

    if (location.state?.type === "image") {
      setImageType(location.state?.content_url);
      setVedioUploadType("");

      setImageTypeValid("");
      setYouTubeType("");
      setupdateUploadvideo("");
      setCheck({ YouTube: false, Vimeo: false, Upload: false });
      setImage(true);
      setVideo(false);
      setText(false);
      setUpload(false);
      setUrlValid("");
      setVedioUploadvalid("");
      setTextvalid("");
      setSpaceTxtvalid("");
      setImagevalidType("");
    }

    if (location.state?.type === "video") {
      let youtubeIsTrue =
        location.state?.video_type == "youtube" ? true : false;
      let vimeoIsTrue = location.state?.video_type == "vimeo" ? true : false;
      let uploadIsTrue = location.state?.video_type == "upload" ? true : false;
      setCheck({
        YouTube: youtubeIsTrue,
        Vimeo: vimeoIsTrue,
        Upload: uploadIsTrue,
      });
      setImage(false);
      setVideo(true);
      setText(false);
      setUpload(false);
      setTextvalid("");
      setSpaceTxtvalid("");
      setCheckV(location.state?.video_type);
    }

    if (location.state?.type === "text") {
      setTextContentType(location.state?.content_text);
      setCheck({ YouTube: false, Vimeo: false, Upload: false });
      setText(true);
      setImage(false);
      setVideo(false);
      setUpload(false);
      setUrlValid("");
      setVedioUploadvalid("");
      setTextvalid("");
      setSpaceTxtvalid("");
      setVedioUploadType("");
    }
  }, [dispatch]);
  /////////////////// FUNCTION FOR HANDLE IMAGE LEFT ////////////////////////////////
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

  /////////////////// FUNCTION FOR HANDLE IMAGE RIGHT ////////////////////////////////
  const handleImageType = async (event) => {
    setCroppedImageType("");
    setImagevalidType("");
    setImgHideType(!imgHideType);
    setImageType(event.target.files[0]?.name);
    if (event.target.files[0]) {
      if (
        !event.target.files[0]?.name.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG|)$/)
      ) {
        setSrcImgType("");
        setImagevalidType("");
        setImageTypeValid("");
        setImgHideType(imgHideType);
        return setImagetypev(validationError.imagetype.required);
      } else if (event.target.files[0]?.size > 1440000) {
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
    /////////////////////////////////////////choose type/////////////////////////////
    if (chooseType === "Choose Type") {
      return setChooseTypeValid("Choose File Type");
    } else {
      setChooseTypeValid("");
    }

    if (chooseType === "video") {
      setTextvalid("");
      setSpaceTxtvalid("");
      setVimeoUrlType("");
      if (check.YouTube || check.Vimeo) {
        let reg =
          /(http:|https:|)\/\/(player.|www.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com))\/(video\/|embed\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/;
        if (uTubeType === "")
          return setUrlValid(validationError.field.required);
        setUrlValid("");
        setVimeoUrlType("");
        if (!reg.test(uTubeType)) return setVimeoUrlType(name.common.validurl);
        setVimeoUrlType("");
      }

      if (uploadtypev != "") {
        return false;
      }
      if (check.Upload) {
        setVedioUploadvalid("");
        if (vedioUploadType != "") {
          setVedioUploadvalid("");
        } else if (updateUploadvideo === "")
          return setVedioUploadvalid(validationError.field.required);
        setVedioUploadvalid("");
        setUrlValid("");
        setVimeoUrlType("");
      }
    }

    if (chooseType === "image") {
      setImageTypeValid("");
      setImagevalidType("");
      if (imageType === "")
        return setImageTypeValid(validationError.field.required);
      setImagevalidType("");
      setUrlValid("");
      setVimeoUrlType("");
      if (imageType != undefined && imageType === "") {
        return false;
      } else if (imagetypev === validationError.imagetype.required) {
        return false;
      }
    }

    if (chooseType === "text") {
      setUrlValid("");
      setVimeoUrlType("");
      setImgvalid("");
      if (textContentType === "")
        return setTextvalid(validationError.field.required);
      setTextvalid("");
      setSpaceTxtvalid("");
      if (textContentType.trim() === "")
        return setSpaceTxtvalid(validationError.emptySpace.blank);
      setSpaceTxtvalid("");
      setUrlValid("");
    }
    setIsloading(true);
    let file = new File([illustration_image], imageL);
    let fileType = new File([illustration_imageType], imageType);
    const ConceptForm = new FormData();
    ConceptForm.append("id", match.params.id);
    ConceptForm.append("title", title);
    ConceptForm.append("description", description);
    ConceptForm.append("short_description", shortdespcription);
    ConceptForm.append("illustration_image", file);
    ConceptForm.append("type", type);
    type === "video"
      ? ConceptForm.append("video_type", checkV)
      : ConceptForm.append("video_type", null);
    type === "image"
      ? ConceptForm.append("content_url", fileType)
      : ConceptForm.append("content_url", updateUploadvideo);
    checkV === "upload"
      ? ConceptForm.append("content_url_text", null)
      : ConceptForm.append("content_url_text", uTubeType);
    ConceptForm.append("content_text", textContentType);

    let UpdatedData = await dispatch(updateConcept(ConceptForm));
    if (UpdatedData?.statuscode === 200) {
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
    setChooseTypeValid("");
    setImagetypev("");
    setType(name);
    setChooseType(e.target.value);

    if (name === "image") {
      setCroppedImageType("");
      setYouTubeType("");
      if (location.state?.type === "image") {
        setImageType(location.state?.content_url);
      } else {
        setImageType("");
      }
      setupdateUploadvideo("");

      setCheck({ YouTube: false, Vimeo: false, Upload: false });
      setImage(true);
      setVideo(false);
      setText(false);
      setUpload(false);
      setVimeoUrlType("");
      setUrlValid("");
      setVedioUploadvalid("");
      setImageTypeValid("");
      setTextvalid("");
      setSpaceTxtvalid("");
      setImagevalidType("");
    } else if (name === "video") {
      setCroppedImageType("");
      setupdateUploadvideo("");
      setCheck((pre) => ({ ...pre, YouTube: true }));
      setImage(false);
      setVideo(true);
      setText(false);
      setUpload(false);
      setYouTubeType("");
      setVimeoUrlType("");
      setTextvalid("");
    } else if (name === "text") {
      setCroppedImageType("");
      if (location.state?.type === "text") {
        setTextContentType(location.state?.content_text);
      } else {
        setTextContentType("");
      }

      setCheck({ YouTube: false, Vimeo: false, Upload: false });
      setText(true);
      setImage(false);
      setVideo(false);
      setUpload(false);
      setUrlValid("");
      setVimeoUrlType("");
      setVedioUploadvalid("");
      // setTextContentType("");
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
      setVedioUploadvalid("");
      setVimeoUrlType("");
      if (location.state?.video_type == "youtube") {
        setYouTubeType(location.state?.content_url);
      } else {
        setYouTubeType("");
      }
    } else if (e.target.value === "vimeo") {
      setCheck({ YouTube: false, Vimeo: true, Upload: false });
      setYouTube(false);
      setUrlTube(true);
      setVimeo(true);
      setUpload(false);
      setUrlValid("");
      setVedioUploadvalid("");
      setVimeoUrlType("");
      if (location.state?.video_type == "vimeo") {
        setYouTubeType(location.state?.content_url);
      } else {
        setYouTubeType("");
      }
    } else if (e.target.value === "upload") {
      setCheck({ YouTube: false, Vimeo: false, Upload: true });
      setYouTube(false);
      setVimeo(false);
      setUrlTube(false);
      setUpload(true);
      setUrlValid("");
      setVedioUploadvalid("");
      setupdateUploadvideo("");
      setVimeoUrlType("");
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
  /////////////////// FUNCTION FOR video convert  ////////////////////////////
  const UpdateVideoFileToURL = (e) => {
    let files = e.target.files[0];
    setVedioUploadvalid("");
    setupdateUploadvideo(e.target.files[0]);
    if (!e.target.files[0]?.name?.match(/\.(mp4)$/))
      return setUploadtypev(name.common.choosemp4);
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
                <h3> {name.concept.concept}</h3>
              </Col>
              <Breadcrumbs activeCon={false} showUcon={true} showCon={true} />
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
                      shortDescriptionvalid={sdesvalid}
                      descriptionValidation={desvalid}
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
            {/* End left Create concept form */}
            {/* Start Right Create concept form */}
            <Col md="6" sm="12" lg="6">
              <Card className="right-questionnaire-card">
                <Card.Body>
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
                        <option
                          selected={location.state?.type === "video"}
                          className="right-concept-option"
                          value="video"
                        >
                          {name.common.video}
                        </option>
                        <option
                          selected={location.state?.type === "image"}
                          className="right-concept-option"
                          value="image"
                        >
                          {name.common.image}
                        </option>
                        <option
                          selected={location.state?.type === "text"}
                          className="right-concept-option"
                          value="text"
                        >
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
                            onChange={UpdateVideoFileToURL}
                          />
                          <label
                            className="input-group-text"
                            htmlFor="formlessonsVideo"
                            onChange={UpdateVideoFileToURL}
                          >
                            {name.common.upload}
                          </label>
                        </InputGroup>
                        <b className="error-valid">
                          {vedioUploadvalid}
                          {uploadtypev}
                        </b>
                        <div className="row">
                          <div className="col-md-4 mt-3">
                            {vedioUploadTypeUrl && (
                              <video
                                key={vedioUploadTypeUrl}
                                width="270"
                                height="200"
                                controls
                              >
                                <source
                                  src={vedioUploadTypeUrl}
                                  type="video/mp4"
                                />
                              </video>
                            )}

                            {!updateUploadvideo && vedioUploadType && (
                              <video
                                key={vedioUploadType}
                                width="270"
                                height="200"
                                controls
                              >
                                <source
                                  src={vedioUploadType}
                                  type="video/mp4"
                                />
                              </video>
                            )}
                          </div>
                        </div>{" "}
                        {/* Image Upload */}
                      </Form.Group>
                    ) : (
                      ""
                    )}
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
                                <LazyLoad>
                                  <img
                                    className="cropdone"
                                    src={croppedImageType}
                                    alt="cropped imageType"
                                    onClose={onCloseTpye}
                                  />
                                </LazyLoad>
                              </div>
                            )}
                            {!croppedImageType && illustration_imageType && (
                              <div className="col-md-4 mt-3">
                                <LazyLoad>
                                  <img
                                    className="cropdone"
                                    src={illustration_imageType}
                                    alt=""
                                    onClose={onCloseTpye}
                                  />
                                </LazyLoad>
                              </div>
                            )}
                          </div>{" "}
                        </Form.Group>{" "}
                      </>
                    ) : (
                      ""
                    )}
                    {/* Add Question Type Text Buttons */}
                    {text ? (
                      <Form.Group className="mb-3">
                        <Form.Label>
                          <p>{name.common.content}</p>
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          className="text-area py-2"
                          rows={3}
                          value={textContentType}
                          onChange={(e) => setTextContentType(e.target.value)}
                          placeholder="Loreum Ipsum Content consectetur adipisicing elit, sed do eiusmod"
                        />
                      </Form.Group>
                    ) : (
                      ""
                    )}
                    <b className="error-valid">
                      {textvalid}
                      {spaceTxtvalid}
                    </b>
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
          {/* End Create concept Table */}
        </BlockUi>
      </Container>
    </>
  );
};
export default UpdateConcept;
