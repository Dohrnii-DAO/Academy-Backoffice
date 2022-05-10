import React, { useEffect, useState, useMemo } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

import Breadcrumbs from "../../../Component/Breadcrumbs";
import "../../../Assets/Css/concepts.css";
import style from "../../../Assets/Css/strategies.module.css";
import { useDispatch, useSelector } from "react-redux";
import history from "../../../Utility/history";
import { adminRoute as admin } from "../../../Route/Route";
import {
  conceptList,
  deleteConcept,
} from "../../../Redux/Dashboard/Concept/action";
import { alert } from "../../../Utility/constant";
import { toast } from "react-toastify";
import TableConcept from "../../../Component/DataTable/Concept/DataTable";
import BlockUi from "react-block-ui";
import FilterComponent from "../../../Component/DataTable/FilterComponents";
import DeletePopup from "../../../Component/Modal/deletePopUp";

const Concepts = () => {
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [showHide, setShowHide] = useState(false);
  const [iloading, setIloading] = useState(false);
  const [deleteConceptId, setDeleteConceptId] = useState("");
  const isloading = useSelector((state) => state.user.isLoading);
  const ConceptListdata = useSelector((state) => state.concept.concepts.data);
  const dispatch = useDispatch();

  useEffect(() => {
    setIloading(true);
    setTimeout(() => {
      dispatch(conceptList());
      setIloading(false);
    }, 800);
  }, [dispatch]);

  const CancleDelete = () => {
    setShowHide(!showHide);
  };
  //....................Delete concept.........................//
  const ConfirmDelete = (id) => {
    setIloading(true);
    deleteConcept(deleteConceptId).then((res) => {
      if (res?.data?.status === true) {
        setTimeout(() => {
          toast.success(`${alert.message.delete}`, {
            position: "top-right",
            autoClose: 1500,
            theme: "colored",
            toastId: "1",
          });
          setIloading(false);
          dispatch(conceptList());
        }, 800);
      }
    });
    setShowHide(!showHide);
  };

  const DeleteConcept = (id) => {
    setShowHide(!showHide);
    setDeleteConceptId(id);
  };
  //....................serach and filter.........................//
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
      <Container fluid className="concept-section">
        {/* Start concept card */}
        {/* Start concept card header */}
        <Row>
          <Col className={style["concept-title"]}>
            <Row className="ps-lg-3 ps-md-3">
              <Col sm="6" md="12" lg="12">
                <h3>Concepts</h3>
              </Col>
              <Col sm="6" md="12" lg="12">
                <h6>
                  <Breadcrumbs showCon={true} activeCon={true} />
                </h6>
              </Col>
            </Row>
          </Col>
          <Col className="concept-form justify-content-end d-flex">
            <Form className="d-flex mb-0 mt-2">
              {subHeaderComponent}
              <Button
                onClick={() => history.push(admin.CREATECONCEPTS)}
                className="add-btn"
              >
                Add&nbsp;+
              </Button>
            </Form>
          </Col>
        </Row>
        {/* End concept card header */}
        {/* Start concept Table */}
        <BlockUi tag="div" blocking={iloading}>
          <Card className="p-0 border-0">
            <Card.Body className="p-0">
              <div className={style["table-responsive "]}>
                {ConceptListdata?.length && (
                  <TableConcept
                    key={window.location.pathname}
                    data={ConceptListdata}
                    newdeleteConcept={DeleteConcept}
                    filterText={filterText}
                  />
                )}
              </div>
            </Card.Body>
          </Card>
        </BlockUi>
        {/* End concept Table */}
        <DeletePopup
          showModal={showHide}
          cancelDelete={CancleDelete}
          confirmDelete={ConfirmDelete}
        />
        {/* End concept card */}
      </Container>
    </>
  );
};
export default Concepts;
