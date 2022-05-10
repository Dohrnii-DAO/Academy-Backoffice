import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "../../Assets/Css/forgotpassword.css";
import logo from "../../Assets/images/login/logo.png";
import emailLabel from "../../Assets/images/login/mail.png";
// import lockbg from "../../Assets/images/login/bg-2.png";
import lock from "../../Assets/images/login/password.png";
import { requestPaswwordRestEmail } from "../../Redux/User/action";
import BlockUi from "react-block-ui";
import { errorMessages, LoginPage } from "../../Utility/constant";

const Forgotpassword = (props) => {
  const [email, setEmail] = useState("");
  const [validated, setValidate] = useState(false);
  const isloading = useSelector((state) => state.user.isLoading);
  const dispatch = useDispatch();

  const handleresetEmail = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      dispatch(requestPaswwordRestEmail({ email, access_type: "admin" }));
    }
    setValidate(true);
  };

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
                <h3>{LoginPage.ForgotPassword.forgotPassword}</h3>
                <p>{LoginPage.ForgotPassword.content}</p>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label className="password-label">
                    <Image src={emailLabel} alt="Email Label" />
                    {LoginPage.login.email}
                  </Form.Label>
                  <Form.Control
                    required
                    type="email"
                    placeholder="Example@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errorMessages.email.required}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button className="w-100" type="submit">
                  Send
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
              <h3 className="password-text">
                {LoginPage.ForgotPassword.FORGOTpassword}
              </h3>
              <p className="password-caption">
                {LoginPage.ForgotPassword.content}
              </p>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Email Verification Modal */}
      {/* <Modal size="md" className="email-modal" show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header className="email-header" closeButton>
                    <Modal.Title className="email-title" id="contained-modal-title-vcenter">Email Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4 className="text-center"> <span className="email-check">✓ </span></h4>
                    <p> You have successfully Reset Password.
                        Please check your Email.
                    </p>
                </Modal.Body>
                <Modal.Footer className="m-auto border-0 pt-0 pb-4">
                    <Button variant="secondary" className="text-center my-0" onClick={props.onHide}>Go To Login</Button>
                </Modal.Footer>
            </Modal> */}
    </>
  );
};

export default Forgotpassword;
