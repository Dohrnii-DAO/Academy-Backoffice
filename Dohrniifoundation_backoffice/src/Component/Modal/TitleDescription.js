import React from "react";
import { Form } from "react-bootstrap";
import { name } from "../../Utility/constant";

const TitleDescription = ({
  title,
  setTitle,
  shortdespcription,
  description,
  setShortdespcription,
  setDespcription,
  titleValidation,
  tiltlespaceValidation,
  shortDescriptionvalid,
  shortdespacevalid,
  descriptionValidation,
  despacevalid,
}) => {
  return (
    <>
      <Form.Group className="mb-3" controlId="formTitle">
        <Form.Label>
          <p>{name.common.title}</p>
        </Form.Label>
        <Form.Control
          as="textarea"
          rows={5}
          value={title}
          onChange={setTitle}
        />
        <b className="error-valid">
          {titleValidation} {tiltlespaceValidation}
        </b>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formTextarea">
        <Form.Label>
          <p>{name.common.shortDescription}</p>
        </Form.Label>
        <Form.Control
          as="textarea"
          className="text-area py-2"
          rows={2}
          value={shortdespcription}
          onChange={setShortdespcription}
        />
        <b className="error-valid">
          {shortDescriptionvalid} {shortdespacevalid}
        </b>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formTextarea">
        <Form.Label>
          <p>{name.common.description}</p>
        </Form.Label>
        <Form.Control
          as="textarea"
          className="text-area py-2"
          rows={3}
          value={description}
          onChange={setDespcription}
        />
        <b className="error-valid">
          {descriptionValidation} {despacevalid}
        </b>
      </Form.Group>
    </>
  );
};
export default TitleDescription;
