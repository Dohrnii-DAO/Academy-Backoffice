import React, { useState, useMemo, useEffect } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

import Breadcrumbs from "../../../Component/Breadcrumbs";
import "../../../Assets/Css/chapters.css";
import history from "../../../Utility/history";
import { adminRoute as admin } from "../../../Route/Route";
import { useDispatch, useSelector } from "react-redux";
import {
  ChapterList,
  deleteChapter,
} from "../../../Redux/Dashboard/Chapter/action";
import { name, alert } from "../../../Utility/constant";
import TableChapter from "../../../Component/DataTable/Chapter/DataTable";
import FilterComponent from "../../../Component/DataTable/FilterComponents";
import DeletePopup from "../../../Component/Modal/deletePopUp";
import BlockUi from "react-block-ui";
import { toast } from "react-toastify";
const Chapters = () => {
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [iloading, setIloading] = useState(false);
  const [chapterId, setChapterId] = useState("");
  const isloading = useSelector((state) => state.user.isLoading);
  const Listdata = useSelector((state) => state.chapter.chapters.data);
  const Emptydata = ["There are no records to display"];
  const dispatch = useDispatch();

  useEffect(() => {
    setIloading(true);
    setTimeout(() => {
      dispatch(ChapterList());
      setIloading(false);
    }, 800);
  }, [dispatch]);

  //.........Cancle delete...............//
  const CancleDelete = () => {
    setDeleteShow(!deleteShow);
  };

  //.........Confirm delete...............//
  const ConfirmDelete = () => {
    setIloading(true);
    deleteChapter(chapterId).then((res) => {
      setTimeout(() => {
        toast.success(`${alert.message.delete}`, {
          position: "top-right",
          autoClose: 1500,
          theme: "colored",
          toastId: "1",
        });
        setIloading(false);
        dispatch(ChapterList());
      }, 800);
    });
    setDeleteShow(!deleteShow);
  };

  //.............Showing delete modal..............//
  const deletModalShowHide = (id) => {
    setDeleteShow(!deleteShow);
    setChapterId(id);
  };
  //................Table search.......................//
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
      <Container fluid className="chapter-section">
        {/* Start chapter card */}
        {/* Start chapter card header */}
        <Row>
          <Col className="chapter-title">
            <Row className="ps-lg-3 ps-md-3">
              <Col sm="6" md="12" lg="12">
                <h3>{name.common.chapter}</h3>
              </Col>
              <Col sm="6" md="12" lg="12">
                <h6>
                  <Breadcrumbs showChapter={true} activeChapter={true} />
                </h6>
              </Col>
            </Row>
          </Col>
          <Col className="chapter-form justify-content-end d-flex">
            <Form className="d-flex mb-0 mt-2">
              {subHeaderComponent}
              <Button
                onClick={() => history.push(admin.CREATECHAPTERS)}
                className="add-btn"
              >
                {name.common.add}&nbsp;+
              </Button>
            </Form>
          </Col>
        </Row>
        {/* End chapter card header */}
        {/* Start chapter Table */}
        <BlockUi tag="div" blocking={iloading}>
          <Card className="p-0 border-0">
            <Card.Body className="p-0">
              <div className="table-responsive">
                {Listdata?.length && (
                  <TableChapter
                    key={window.location.pathname}
                    ChapterDelete={deletModalShowHide}
                    data={Listdata !== "Null" ? Listdata : Emptydata}
                    filterText={filterText}
                  />
                )}
              </div>
            </Card.Body>
          </Card>
        </BlockUi>
        {/* End chapter Table */}
        {/* Start chapter Delete Modal */}
        <DeletePopup
          showModal={deleteShow}
          cancelDelete={CancleDelete}
          confirmDelete={ConfirmDelete}
          type={"chapter"}
        />
        {/* Start chapter Delete Modal */}
        {/* End chapter card */}
      </Container>
    </>
  );
};

export default Chapters;
