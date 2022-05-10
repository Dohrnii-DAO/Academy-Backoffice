import React from "react";
import { Modal, Button } from "react-bootstrap";
import { popUp, name } from "../../Utility/constant";

const DeciderPopup = ({ showModal, cancelDecider, confirmDecider }) => {
  return (
    <>
      <Modal
        size="sm"
        className="custom-modal"
        show={showModal}
        aria-labelledby="passwordMatch"
        centered
      >
        <Modal.Header
          className="customheader"
          closeButton
          onClick={() => cancelDecider()}
        >
          <Modal.Title className="custommodaltitle" id="passwordMatch">
            {popUp.decider.decider}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="custom-check"> {popUp.decider.content}</p>
        </Modal.Body>
        <Modal.Footer as="row" className="m-auto border-0 pt-0 pb-4">
          <Button
            variant="secondary"
            className="text-center my-0 px-3"
            onClick={() => confirmDecider()}
          >
            {name.common.yes}
          </Button>
          <Button
            variant="outline-secondary"
            className="text-center my-0 px-3 btn-cancel"
            onClick={() => cancelDecider()}
          >
            {name.common.no}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default DeciderPopup;
