import { useState } from 'react';
import { Container, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BsPlusSquareFill } from "react-icons/bs";
import TextareaComp from './TextareaComp';
import StatusComp from './StatusComp';
import TaskListing from '../TaskListing';

function ModalComp() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className='text-center mt-4'>
                <span>
                    <BsPlusSquareFill onClick={handleShow} size={50} />
                </span>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Set New Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label className='fw-bolder'>Title</Form.Label>
                        <Form.Control type="text" placeholder="What do you want to do ?" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label className='fw-bolder'>Description</Form.Label> <br />
                        <TextareaComp />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label className='fw-bolder'>Status</Form.Label> <br />
                        <StatusComp />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer className='border-0'>
                    <Button variant="primary" onClick={handleClose}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* task listing */}
            <Container>
                <Row className='mt-5'>
                    <TaskListing />
                </Row>
            </Container>
        </>
    );
}

export default ModalComp;