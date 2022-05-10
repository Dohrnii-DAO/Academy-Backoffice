import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import history from "../../Utility/history";
import "../../Assets/Css/page404.css";
import { notFoundPage } from "../../Utility/constant";

const Page404 = (props) => {
  return (
    <>
      <Container fluid className="page-section">
        {/* Start Lesson Card-body */}
        <Card className="card col-lg-8 col-md-8 col-sm-10 mx-auto page-card">
          <Card.Body className="page-card-body p-5">
            <Card.Title className="page-card-title">
              {notFoundPage.fournotfour}
            </Card.Title>
            <Card.Subtitle className="page-card-subtitle">
              {notFoundPage.oops}
            </Card.Subtitle>
            <Card.Text className="page-card-text">
              {notFoundPage.content}
            </Card.Text>
            <Button
              onClick={() => history.goBack()}
              className="page-button w-50 m-auto d-block text-center"
            >
              <h3 className="p-0 m-0"> {notFoundPage.returnBack}</h3>
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Page404;
