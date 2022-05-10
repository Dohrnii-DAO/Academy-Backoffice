import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "../../Assets/Css/forgotpassword.css";
import logo from "../../Assets/images/login/logo.png";
import lock from "../../Assets/images/login/password.png";
import pwdLabel from "../../Assets/images/login/lock.png";
import { toast } from "react-toastify";
import { requestResetCurrentpassword } from "../../Redux/User/action";
import queryString from "query-string";
import BlockUi from "react-block-ui";
import { errorMessages, LoginPage } from "../../Utility/constant";

const ResetPassword = (props) => {
  const [password, setPassword] = useState("");
  const [cnfPassword, setConfirmPassword] = useState("");
  const [validated, setValidate] = useState(false);

  const isloading = useSelector((state) => state.user.isLoading);
  const [show, setshow] = useState("");
  const dispatch = useDispatch();
  const token = queryString.parse(props.location.search);

  const handleresetEmail = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    setValidate(true);
    if (password.length === 0) return setshow(errorMessages.password.required);
    if (!validateUsername(password))
      return setshow(errorMessages.password.contain);
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      if (cnfPassword == password) {
        dispatch(
          requestResetCurrentpassword({ password, token: token?.token })
        );
      } else {
        toast.error(`${alert.matchPassword.required}`, {
          position: "top-left",
          autoClose: 2000,
          theme: "colored",
          toastId: "1",
        });
      }
    }
    setValidate(true);
  };
  function validateUsername(username) {
    const name = /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,}$/;
    if (name.test(username)) {
      setshow("");
      return true;
    }
    setValidate(false);
    return false;
  }

  return (
    <>
      <Container fluid className="password-section">
        <Row>
          {/*Left Section*/}
          <Col className="password-bg-left" md={6} sm={12}>
            <div className="logo">
              <Image src={logo} alt="Logo" />
            </div>
            <BlockUi tag="div" blocking={isloading}>
              <Form
                className="password-form"
                noValidate
                validated={validated}
                onSubmit={handleresetEmail}
              >
                <h3> {LoginPage.reset.resetPassword}</h3>
                <p>{errorMessages.password.resetBlank}</p>
                <Form.Group controlId="formPassword">
                  <Form.Label className="pwd-label">
                    <Image src={pwdLabel} alt="Password Label" /> New Password
                  </Form.Label>
                  <Form.Control
                    required
                    type="password"
                    placeholder="**********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <b className="error-valid"> {show} </b>
                  {/* <Form.Control.Feedback type="invalid">
                                    Password is required
                                </Form.Control.Feedback>*/}
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label className="pwd-label">
                    <Image src={pwdLabel} alt="Password Label" />
                    {LoginPage.reset.confirmPassword}
                  </Form.Label>
                  <Form.Control
                    required
                    type="password"
                    placeholder="**********"
                    value={cnfPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errorMessages.password.confirm}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button className="w-100 my-3" type="submit">
                  Save
                </Button>
              </Form>
            </BlockUi>
          </Col>
          {/*right Section*/}
          <Col className="password-bg-right" md={6} sm={12}>
            <div className="bg-right-block">
              <img className="password-img" src={lock} />
            </div>
            <div className="password-bg-right-text">
              <h3 className="password-text">{LoginPage.reset.resetpassword}</h3>
              <p className="password-caption">{LoginPage.reset.content}</p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ResetPassword;
