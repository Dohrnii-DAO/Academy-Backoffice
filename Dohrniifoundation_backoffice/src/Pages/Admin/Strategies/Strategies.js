import React, { useState, useEffect, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Modal,
  Button,
  Card,
} from "react-bootstrap";

import Breadcrumbs from "../../../Component/Breadcrumbs";
import style from "../../../Assets/Css/strategies.module.css";

import history from "../../../Utility/history";
import { adminRoute as admin } from "../../../Route/Route";
import { useDispatch, useSelector } from "react-redux";
import {
  strategyList,
  deleteStrategy,
} from "../../../Redux/Dashboard/Strategies/action";
import { name, alert } from "../../../Utility/constant";
import BlockUi from "react-block-ui";
import { toast } from "react-toastify";
import DeletePopup from "../../../Component/Modal/deletePopUp";
import TableStrategy from "../../../Component/DataTable/Strategy/DataTable";
import FilterComponent from "../../../Component/DataTable/FilterComponents";

const Strategies = (props) => {
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [showHide, setShowHide] = useState(false);
  const [deleteStrategyId, setDeleteStrategyId] = useState("");
  const [iloading, setIloading] = useState(false);
  const isloading = useSelector((state) => state.user.isLoading);
  const StrategyListdata = useSelector(
    (state) => state.strategy.strategies.data
  );

  const dispatch = useDispatch();
  useEffect(() => {
    setIloading(true);
    setTimeout(() => {
      dispatch(strategyList());
      setIloading(false);
    }, 800);
  }, [dispatch]);

  const CancleDelete = () => {
    setShowHide(!showHide);
  };

  const DeleteStrategy = (id) => {
    if (StrategyListdata.length === 2) {
      toast.error(`${name.common.addOtherToDelete}`, {
        position: "top-right",
        autoClose: 2000,
        theme: "colored",
        toastId: "1",
      });
    } else {
      setShowHide(!showHide);
      setDeleteStrategyId(id);
    }
  };

  const ConfirmDelete = (id) => {
    setIloading(true);
    deleteStrategy(deleteStrategyId).then((res) => {
      if (res?.data?.status === true) {
        setTimeout(() => {
          toast.success(`${alert.message.delete}`, {
            position: "top-right",
            autoClose: 1500,
            theme: "colored",
            toastId: "1",
          });
          setIloading(false);
          dispatch(strategyList());
        }, 800);
      }
    });
    setShowHide(!showHide);
  };

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
      <Container fluid className={style["Strategies-section"]}>
        {/* Start Strategies card */}
        {/* Start Strategies card header */}
        <Row>
          <Col className={style["Strategies-title"]}>
            <Row className="ps-lg-3 ps-md-3">
              <Col sm="6" md="12" lg="12">
                <h3>{name.common.strategy}</h3>
              </Col>
              <Col sm="6" md="12" lg="12">
                <h6>
                  <Breadcrumbs showSt={true} activeS={true} />
                </h6>
              </Col>
            </Row>
          </Col>
          <Col className="Strategies-form justify-content-end d-flex">
            <Form className="d-flex mb-0 mt-2">
              {subHeaderComponent}

              <Button
                onClick={() => history.push(admin.CREATESTRATEGIES)}
                className="add-btn"
              >
                {name.common.add}&nbsp;+
              </Button>
            </Form>
          </Col>
        </Row>
        {/* End Strategies card header */}
        {/* Start Strategies Table */}
        <BlockUi tag="div" blocking={iloading}>
          <Card className="p-0 border-0">
            <Card.Body className="p-0">
              <div className={style["table-responsive"]}>
                {StrategyListdata?.length && (
                  <TableStrategy
                    key={window.location.pathname}
                    newdelete={DeleteStrategy}
                    data={StrategyListdata}
                    filterText={filterText}
                  />
                )}
              </div>
            </Card.Body>
          </Card>
        </BlockUi>
        {/* End Strategies Table */}
        {/* Start Strategies Delete Modal */}

        <DeletePopup
          showModal={showHide}
          cancelDelete={CancleDelete}
          confirmDelete={ConfirmDelete}
        />
        {/* Start Strategies Delete Modal */}
        {/* End Strategies card */}
      </Container>
    </>
  );
};

export default Strategies;
