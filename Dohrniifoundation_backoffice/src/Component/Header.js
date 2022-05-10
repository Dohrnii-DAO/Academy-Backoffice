import React, { useEffect } from "react";
import {
  Container,
  Navbar,
  Nav,
  NavDropdown,
  Dropdown,
  Image,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import "../Assets/Css/Header.css";
import { requestLogout, requestAdminProfile } from "../Redux/User/action";
import { useDispatch, useSelector } from "react-redux";
import logo from "../Assets/images/login/h-logo.png";
import home from "../Assets/images/login/h-home.png";
import back from "../Assets/images/login/h-back.png";
import history from "../Utility/history";
import { Link } from "react-router-dom";

const Header = ({
  HomeBackInside = false,
  HomeBackButton = false,
  dashboardback,
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(requestAdminProfile());
  }, [dispatch]);

  return (
    <>
      <Container fluid className="header-section p-0">
        <Navbar className="header-navbar">
          <Container fluid>
            {HomeBackButton && (
              <Row className="header-action">
                <Col>
                  <Link to="/Admin/Dashboard">
                    <Button variant="info">
                      <Image className="header-action-btn" src={home} />
                    </Button>
                  </Link>
                </Col>
                <Col>
                  <Link to="/Admin/Dashboard">
                    <Button variant="info">
                      <Image className="header-action-btn" src={back} />
                    </Button>
                  </Link>
                </Col>
              </Row>
            )}

            {HomeBackInside && (
              <Row className="header-action">
                <Col>
                  {!(dashboardback == "/admin/dashboard") && (
                    <Link to="/admin/dashboard">
                      <Button variant="info">
                        <Image className="header-action-btn" src={home} />
                      </Button>
                    </Link>
                  )}
                </Col>
                <Col>
                  {!(dashboardback == "/admin/dashboard") && (
                    <Button onClick={() => history.goBack()} variant="info">
                      <Image className="header-action-btn" src={back} />
                    </Button>
                  )}
                </Col>
              </Row>
            )}

            <Navbar.Brand className="header" href="#home">
              <div className="dashboard-logo">
                <Image src={logo} alt="Logo" />
              </div>
            </Navbar.Brand>
            {/* <Navbar.Toggle /> */}
            <Navbar.Collapse className="justify-content-end d-block">
              <Nav className=" col-md-12 d-block">
                <NavDropdown
                  className="d-dropdown min-width d-flex justify-content-end"
                  title={`${user?.firstname || " "} ${user?.lastname || ""}`}
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item href="#">My Account</NavDropdown.Item>
                  <Dropdown.Divider />
                  <NavDropdown.Item onClick={() => dispatch(requestLogout())}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Container>
    </>
  );
};

export default Header;
