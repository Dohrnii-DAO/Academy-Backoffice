import React, { useState } from 'react';
import '../Assets/Css/modal.css'
import { Modal, Button } from 'react-bootstrap';
const Verify = (props) => {


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <>
            <Button className="w-100" onClick={handleShow} >Valid Modal</Button>
            <Button className="w-100" onClick={handleShow} >Invalid Modal</Button>

            {/* Start Email Verification Modal */}
            {/* <Modal size="md" className="email-modal" show={show} onHide={handleClose} aria-labelledby="passwordMatch" centered>
                <Modal.Header className="email-header" closeButton>
                    <Modal.Title className="email-title" id="passwordMatch">Email Confirmation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4 className="text-center"> <span className="email-check">✓ </span></h4>
                    <p> You have successfully Reset Password.
                        Please check your Email.
                    </p>
                </Modal.Body>
                <Modal.Footer className="m-auto border-0 pt-0 pb-4">
                    <Button variant="secondary" className="text-center my-0 px-3 py-1" onClick={props.onHide}>Go To Login</Button>
                </Modal.Footer>
            </Modal> */}
            {/* End Email Verification Modal */}

            {/* Start InValid Email Verification Modal */}
            <Modal size="md" className="email-invalid-modal" show={show} onHide={handleClose} aria-labelledby="passwordInvalid" centered>
                <Modal.Header className="email-invalid-header" closeButton>
                    <Modal.Title className="email-invalid-title" id="passwordInvalid">Email Invalid</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4 className="text-center"> <span className="email-invalid">✖ </span></h4>
                    <p> You have Entered Wrong Email.
                        Please check your Email.
                    </p>
                </Modal.Body>
                <Modal.Footer className="m-auto border-0 pt-0 pb-4">
                    <Button variant="success" className="text-center my-0 px-3 py-1" onClick={props.onHide}>Return</Button>
                </Modal.Footer>
            </Modal>
            {/* End Email Verification Modal */}


        </>
    )
}

export default Verify;