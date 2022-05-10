import React from "react";

import { Container, Card, Row, Col, Image } from "react-bootstrap";
import "../../Assets/Css/dashboard.css";
import lesson from "../../Assets/images/dashboard/lesson.png";
import chapter from "../../Assets/images/dashboard/chapter.png";
import question from "../../Assets/images/dashboard/question.png";
import strategies from "../../Assets/images/dashboard/strategies.png";
import classes2 from "../../Assets/images/dashboard/classes2.png";
import concept from "../../Assets/images/dashboard/concept.png";
import questionnaires from "../../Assets/images/dashboard/questionnaires.png";
import book from "../../Assets/images/dashboard/book.png";
import history from "../../Utility/history";
import { adminRoute as admin } from "../../Route/Route";
import { name } from "../../Utility/constant";

const Dashboard = () => {
  return (
    <>
      <Container fluid className="dashboard-section">
        {/* dashboard card start */}
        <div className="dashboard-title">
          <h3>{name.card.dashboard}</h3>
        </div>

        <Card className="dashboard-head mb-4">
          <Card.Header className="dashboard-header m-0">
            {name.card.lesson}
          </Card.Header>

          <Card.Body className="p-0">
            <Row className="dashboard-row">
              <Col sm={12} md={6} lg={4} className="p-3">
                <Card
                  onClick={() => history.push(admin.CHAPTERS)}
                  className="dashboard-chapter-card mx-auto my-4"
                >
                  <Card.Body className="dashboard-chapter-body">
                    <Row>
                      <Col sm={6} md={4} lg={5}>
                        <Image
                          className="lesson-card-image"
                          src={chapter}
                          alt="Email Label"
                        />
                      </Col>
                      <Col sm={6} md={8} lg={7} className="px-0 d-grid">
                        <h3 className="lesson-card-text">
                          {name.card.chapter}
                        </h3>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>

              <Col sm={12} md={6} lg={4} className="p-3">
                <Card
                  onClick={() => history.push(admin.LESSONS)}
                  className="dashboard-lesson-card mx-auto my-4"
                >
                  <Card.Body className="dashboard-lesson-body">
                    <Row>
                      <Col sm={6} md={4} lg={5}>
                        <Image
                          className="lesson-card-image"
                          src={lesson}
                          alt="Email Label"
                        />
                      </Col>
                      <Col sm={6} md={8} lg={7} className="px-0 d-grid">
                        <h3 className="lesson-card-text">lessons</h3>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>

              <Col sm={12} md={6} lg={4} className="p-3">
                <Card
                  onClick={() => history.push(admin.CLASS)}
                  className="dashboard-lesson-card mx-auto my-4"
                >
                  <Card.Body className="dashboard-lesson-body">
                    <Row>
                      <Col sm={6} md={4} lg={5}>
                        <Image
                          className="lesson-card-image"
                          src={classes2}
                          // src={classs}
                          // alt="Email Label"
                        />
                      </Col>
                      <Col sm={6} md={8} lg={7} className="px-0 d-grid">
                        <h3 className="lesson-card-text">Classes</h3>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>

              <Col sm={12} md={6} lg={4} className="p-3">
                <Card
                  onClick={() => history.push(admin.QUESTIONS)}
                  className="dashboard-question-card mx-auto my-4"
                >
                  <Card.Body className="dashboard-question-body">
                    <Row>
                      <Col sm={6} md={4} lg={5}>
                        <Image
                          className="lesson-card-image"
                          src={question}
                          alt="Email Label"
                        />
                      </Col>
                      <Col sm={6} md={8} lg={7} className="px-0 d-grid">
                        <h3 className="lesson-card-text">
                          {name.card.question}
                        </h3>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Card.Body>
          <Card.Img className="dashboard-book-image" variant="top" src={book} />
        </Card>

        {/* Strategies and investor's Profile  Card-body */}
        <Card className="dashboard-head mb-4">
          <Card.Header className="dashboard-header m-0">
            {name.card.investorProfile}
          </Card.Header>
          <Card.Body className="p-0">
            <Row className="dashboard-row">
              <Col sm={12} md={6} lg={4} className="p-3">
                <Card
                  onClick={() => history.push(admin.STRATEGIES)}
                  className="dashboard-strategies-card mx-auto my-4"
                >
                  <Card.Body className="dashboard-strategies-body">
                    <Row>
                      <Col sm={6} md={4} lg={5}>
                        <Image
                          className="strategies-card-image"
                          src={strategies}
                          alt="Email Label"
                        />
                      </Col>
                      <Col sm={6} md={8} lg={7} className="px-0 d-grid">
                        <h3 className="strategies-card-text">
                          {name.card.strategies}
                        </h3>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={12} md={6} lg={4} className="p-3">
                <Card className="dashboard-concept-card mx-auto my-4">
                  <Card.Body
                    onClick={() => history.push(admin.CONCEPTS)}
                    className="dashboard-concept-body"
                  >
                    <Row>
                      <Col sm={6} md={4} lg={5}>
                        <Image
                          className="strategies-card-image"
                          src={concept}
                          alt="Email Label"
                        />
                      </Col>
                      <Col sm={6} md={8} lg={7} className="px-0 d-grid">
                        <h3 className="strategies-card-text">
                          {name.card.concept}
                        </h3>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={12} md={6} lg={4} className="p-3">
                <Card
                  onClick={() => history.push(admin.QUESTIONNAIRE)}
                  className="dashboard-questionnaires-card mx-auto my-4"
                >
                  <Card.Body className="dashboard-questionnaires-body">
                    <Row>
                      <Col sm={6} md={4} lg={5}>
                        <Image
                          className="strategies-card-image"
                          src={questionnaires}
                          alt="Email Label"
                        />
                      </Col>
                      <Col sm={6} md={8} lg={7} className="px-0 d-grid">
                        <h3 className="strategies-card-text">
                          {name.card.questionnaire}
                        </h3>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Card.Body>
        </Card>
        {/* faq and Policy */}
      </Container>
    </>
  );
};

export default Dashboard;
