import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Image,
  Carousel,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { publicRoutes as Route } from "../../Route/Route";
import { useDispatch, useSelector } from "react-redux";
import { requestSignIn } from "../../Redux/User/action";
import style from "../../Assets/Css/login.module.css";
import logo from "../../Assets/images/login/logo.png";
import emailLabel from "../../Assets/images/login/mail.png";
import pwdLabel from "../../Assets/images/login/lock.png";
import slide02 from "../../Assets/images/login/computer.png";
import slide22 from "../../Assets/images/login/managemenrt.png";
import BlockUi from "react-block-ui";
import Cookies from "universal-cookie";
import { LoginPage, errorMessages } from "../../Utility/constant";

const Login = (props) => {
  const cookies = new Cookies();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidate] = useState(false);
  const [status, setStatus] = useState(false);
  const isloading = useSelector((state) => state.user.isLoading);
  const [show, setShow] = useState("");
  const dispatch = useDispatch();

  const handleUserLogin = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    setValidate(true);
    setShow("");
    if (password.length === 0) return setShow(errorMessages.password.required);
    if (form.checkValidity() === false) {
    } else {
      event.preventDefault();
      dispatch(
        requestSignIn({ email, password, access_type: "admin", status })
      );
    }
  };

  const check = (e) => {
    const res = e.target.checked;
    setStatus(res);
  };

  function validateUsername(username) {
    const name = /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,}$/;
    if (name.test(username)) {
      setShow("");
      return true;
    }
    setValidate(false);
    return false;
  }

  React.useEffect(() => {
    if (cookies.get("email")) {
      setEmail(cookies.get("email"));
    }
    if (cookies.get("pass")) {
      setPassword(cookies.get("pass"));
    }
  }, []);
  return (
    <>
      <Container fluid className={style["login-section"]}>
        <Row>
          {/*Login Form Section*/}
          <Col className={style["login-bg-left"]} md={6} sm={12}>
            <div className={style.logo}>
              <Image src={logo} alt="Logo" />
            </div>
            <BlockUi tag="div" blocking={isloading}>
              <Form
                className={style["login-form"]}
                noValidate
                validated={validated}
                onSubmit={handleUserLogin}
              >
                <h3>{LoginPage.login.login}</h3>

                <p>{LoginPage.login.content}</p>
                <Form.Group controlId="formEmail">
                  <Form.Label className={style["emailadd-label"]}>
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
                <Form.Group controlId="formPassword">
                  <Form.Label className={style["pwd-label"]}>
                    <Image src={pwdLabel} alt="Password Label" />
                    {LoginPage.login.password}
                  </Form.Label>
                  <Form.Control
                    required
                    type="password"
                    placeholder="**********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {/* <b className={style["error-valid"]}> {show}</b> */}
                  <Form.Control.Feedback type="invalid">
                    {errorMessages.password.required}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formCheckbox">
                  <Row className="my-3">
                    <Col sm="6" className="w-50">
                      <Form.Check
                        onChange={check}
                        id="custom_checkbox"
                        type="checkbox"
                        label="Remember me"
                      />
                    </Col>
                    <Col sm="6" className="w-50 text-end">
                      <p className="pt-0">
                        <Link to={Route.FORGOT_PASSWORD}>
                          {LoginPage.login.forgotPassword}
                        </Link>
                      </p>
                    </Col>
                  </Row>
                </Form.Group>

                <Button className="w-100" type="submit">
                  {LoginPage.login.login}
                </Button>
              </Form>
            </BlockUi>
          </Col>

          {/*Carousel Section*/}
          <Col className={style["login-bg-right"]} md={6} sm={12}>
            <Carousel data-interval="false">
              <Carousel.Item className={style["carousel-bg"]}>
                <img className={style["login-img"]} src={slide02} />
                <Carousel.Caption>
                  <h3 className={style["login-text"]}>
                    {LoginPage.carousel.strategyManagement}
                  </h3>
                  <p className={style["login-caption"]}>
                    {LoginPage.carousel.strategyContent}
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item className={style["carousel-bg"]}>
                <img className={style["login-img"]} src={slide22} />
                <Carousel.Caption>
                  <h3 className={style["login-text"]}>
                    {LoginPage.carousel.lessonManagement}
                  </h3>
                  <p className={style["login-caption"]}>
                    {LoginPage.carousel.lessonContent}
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Login;
