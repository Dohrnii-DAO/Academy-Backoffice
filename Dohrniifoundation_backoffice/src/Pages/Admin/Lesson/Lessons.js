import React, { useEffect, useState, useMemo } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

import Breadcrumbs from "../../../Component/Breadcrumbs";
import "../../../Assets/Css/lessons.css";
import { useDispatch, useSelector } from "react-redux";
import history from "../../../Utility/history";
import {
  LessonList,
  deleteLesson,
} from "../../../Redux/Dashboard/Lesson/action";
import { name } from "../../../Utility/constant";
import { alert } from "../../../Utility/constant";
import { toast } from "react-toastify";
import TableLesson from "../../../Component/DataTable/Lesson/DataTable";
import BlockUi from "react-block-ui";
import FilterComponent from "../../../Component/DataTable/FilterComponents";
import DeletePopup from "../../../Component/Modal/deletePopUp";
import { adminRoute as admin } from "../../../Route/Route";

const Lessons = () => {
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [showHide, setShowHide] = useState(false);
  const [iloading, setIloading] = useState(false);
  const [deleteLessonId, setDeleteLessonId] = useState("");
  const isloading = useSelector((state) => state.user.isLoading);
  const LessonListdata = useSelector((state) => state.lesson.lessons.data);
  const Emptydata = ["There are no records to display"];
  const dispatch = useDispatch();

  useEffect(() => {
    setIloading(true);
    setTimeout(() => {
      dispatch(LessonList());
    }, 800);
    setIloading(false);
  }, [dispatch]);

  //.....................Delete lesson.........................//
  const ConfirmDelete = (id) => {
    setIloading(true);
    deleteLesson(deleteLessonId).then((res) => {
      console.log(res, "eeeeeeeee");
      if (res?.data?.status === true) {
        setTimeout(() => {
          toast.success(`${alert.message.delete}`, {
            position: "top-right",
            autoClose: 1500,
            theme: "colored",
            toastId: "1",
          });
          setIloading(false);
          dispatch(LessonList());
        }, 800);
      }
    });

    setShowHide(!showHide);
  };
  const CancleDelete = () => {
    setShowHide(!showHide);
  };
  const DeleteLesson = (id) => {
    setShowHide(!showHide);
    setDeleteLessonId(id);
  };
  //.....................Search and filter.........................//
  const subHeaderComponent = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <>
      <Container fluid className="lessons-section">
        {/* Start Lessons card */}
        {/* Start Lessons card header */}
        <Row>
          <Col className="lessons-title">
            <Row className="ps-lg-3 ps-md-3">
              <Col sm="6" md="12" lg="12">
                <h3>{name.common.lesson}</h3>
              </Col>
              <Col sm="6" md="12" lg="12">
                <h6>
                  <Breadcrumbs
                    activeL={true}
                    showL={true}
                    showCL={false}
                    showQ={false}
                    showCQ={false}
                  />
                </h6>
              </Col>
            </Row>
          </Col>
          <Col className="concept-form justify-content-end d-flex">
            <Form className="d-flex mb-0 mt-2">
              {subHeaderComponent}
              <Button
                onClick={() => history.push(admin.CREATELESSONS)}
                className="add-btn"
              >
                {name.common.add}&nbsp;+
              </Button>
            </Form>
          </Col>
        </Row>
        {/* End Lessons card header */}
        {/* Start Lessons Table */}
        <BlockUi tag="div" blocking={iloading}>
          <Card className="p-0 border-0">
            <Card.Body className="p-0">
              <div className="table-responsive ">
                {LessonListdata?.length && (
                  <TableLesson
                    key={window.location.pathname}
                    data={
                      LessonListdata !== "Null" ? LessonListdata : Emptydata
                    }
                    newdeleteLessons={DeleteLesson}
                    filterText={filterText}
                  />
                )}
              </div>
            </Card.Body>
          </Card>
        </BlockUi>
        {/* End Lessons Table */}

        <DeletePopup
          showModal={showHide}
          cancelDelete={CancleDelete}
          confirmDelete={ConfirmDelete}
          type={"lesson"}
        />
      </Container>
    </>
  );
};

export default Lessons;
