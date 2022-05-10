import React, { useEffect, useState, useMemo } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

import Breadcrumbs from "../../../Component/Breadcrumbs";
import "../../../Assets/Css/lessons.css";
import { useDispatch, useSelector } from "react-redux";
import history from "../../../Utility/history";
import { ClassList, deleteClass } from "../../../Redux/Dashboard/Class/action";
import { popUp, name, alert } from "../../../Utility/constant";
import { toast } from "react-toastify";
import TableClass from "../../../Component/DataTable/Class/DataTable";
import BlockUi from "react-block-ui";
import FilterComponent from "../../../Component/DataTable/FilterComponents";
import DeletePopup from "../../../Component/Modal/deletePopUp";
import { adminRoute as admin } from "../../../Route/Route";

const Class = () => {
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [showHide, setShowHide] = useState(false);
  const [iloading, setIloading] = useState(false);
  const [deleteClassId, setDeleteClassId] = useState("");
  const isloading = useSelector((state) => state.user.isLoading);
  const ClassListdata = useSelector((state) => state.class.classes.data);
  const Emptydata = ["There are no records to display"];

  const dispatch = useDispatch();

  useEffect(() => {
    setIloading(true);
    setTimeout(() => {
      dispatch(ClassList());
      setIloading(false);
    }, 800);
  }, [dispatch]);
  //.........Cancle delete...............//
  const CancleDelete = () => {
    setShowHide(!showHide);
  };
  //.........Confirm delete...............//
  const ConfirmDelete = (id) => {
    setIloading(true);
    deleteClass(deleteClassId).then((res) => {
      setTimeout(() => {
        toast.success(`${alert.message?.delete}`, {
          position: "top-right",
          autoClose: 1500,
          theme: "colored",
          toastId: "1",
        });
        setIloading(false);
        dispatch(ClassList());
      }, 800);
    });

    setShowHide(!showHide);
  };

  const DeleteClass = (id) => {
    setShowHide(!showHide);
    setDeleteClassId(id);
  };
  //.........Table search filter...............//
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
                <h3>{name.class.class}</h3>
              </Col>
              <Col sm="6" md="12" lg="12">
                <h6>
                  <Breadcrumbs activeClass={true} showClass={true} />
                </h6>
              </Col>
            </Row>
          </Col>
          <Col className="concept-form justify-content-end d-flex">
            <Form className="d-flex mb-0 mt-2">
              {subHeaderComponent}
              <Button
                onClick={() => history.push(admin.CREATECLASS)}
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
                {ClassListdata?.length && (
                  <TableClass
                    key={window.location.pathname}
                    data={ClassListdata !== "Null" ? ClassListdata : Emptydata}
                    newdeleteClass={DeleteClass}
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
          type={"class"}
        />

        {/* End Lessons card */}
      </Container>
    </>
  );
};

export default Class;
