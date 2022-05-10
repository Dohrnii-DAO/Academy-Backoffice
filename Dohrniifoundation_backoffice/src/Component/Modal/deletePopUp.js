import React from "react";
import { Modal, Button } from "react-bootstrap";
import { popUp, name } from "../../Utility/constant";

const DeletePopup = ({ showModal, cancelDelete, confirmDelete, type }) => {
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
          onClick={() => cancelDelete()}
        >
          <Modal.Title className="custommodaltitle" id="passwordMatch">
            {name.common.delete}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {type == "chapter" && (
            <p className="custom-check">{popUp.delete.contentChapter}</p>
          )}
          {type == "lesson" && (
            <p className="custom-check">{popUp.delete.contentLesson}</p>
          )}
          {type == "class" && (
            <p className="custom-check">{popUp.delete.contentClass}</p>
          )}
          <p className="custom-check">{popUp.delete.content}</p>
        </Modal.Body>
        <Modal.Footer as="row" className="m-auto border-0 pt-0 pb-4">
          <Button
            variant="secondary"
            className="text-center my-0 px-3"
            onClick={() => confirmDelete()}
          >
            {name.common.yes}
          </Button>
          <Button
            variant="outline-secondary"
            className="text-center my-0 px-3 btn-cancel"
            onClick={() => cancelDelete()}
          >
            {name.common.no}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default DeletePopup;
