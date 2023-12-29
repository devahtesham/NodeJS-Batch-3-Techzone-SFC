import { useEffect, useState } from 'react';
import { Container, Form, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BsPlusSquareFill } from "react-icons/bs";
import TextareaComp from './TextareaComp';
import StatusComp from './StatusComp';
import TaskListing from '../TaskListing';
import Loader from '../Loader/Loader';
import { errorNotify } from '../Taostify/Toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../global';

function ModalComp() {
    useEffect(() => {
        getAllTasksHandler()
    }, [])
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const [isUpdatedCall, setIsUpdatedCall] = useState(false)
    const [updatedItemId,setUpdatedItemId] = useState("")
    const [allTasks, setAllTasks] = useState([])
    const [taskDetails, setTaskDetails] = useState({
        title: "",
        description: "",
        status: ""
    })
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // getting values
    const addTaskHandler = (e) => {
        const { name, value } = e.target
        setTaskDetails({
            ...taskDetails,
            [name]: value
        })
    }

    const getAllTasksHandler = () => {
        let token = localStorage.getItem('token');
        if (token) {
            let config = {
                headers: { Authorization: `Bearer ${token}` }
            }
            axios.get(`${BASE_URL}/tasks`, config)
                .then((response) => {
                    let tasks = response.data.data
                    setAllTasks([...tasks])
                    setIsLoading(false)

                })
                .catch((error) => {
                    setIsLoading(false)
                    errorNotify(error.response.data.message)
                })
        } else {
            navigate("/login")
            errorNotify("Please Login to Continue !")
        }
    }

    const taskSubmitHandler = () => {
        const title = taskDetails.title;
        const description = taskDetails.description;
        const status = taskDetails.status;


        if (!title || !description || !status) {
            errorNotify('Required Fields are missing !')
            return
        }

        let objToSend = {
            title, description, status
        }

        // add task api

        let token = localStorage.getItem('token')
        if (token) {
            let config = {
                headers: { Authorization: `Bearer ${token}` }
            }
            setIsLoading(true);
            if (!isUpdatedCall) {
                console.log("I AM ADD API")
                axios.post(`${BASE_URL}/addTask`, objToSend, config)
                    .then((response) => {
                        getAllTasksHandler()
                        setTaskDetails({
                            title:"",
                            description:"",
                            status:""
                        })

                    })
                    .catch((error) => {
                        setIsLoading(false)
                        errorNotify(error.response.data.message)
                    })
            } else {
                // put api call hogi
                axios.put(`${BASE_URL}/task`,{
                    ...objToSend,
                    id:updatedItemId
                }, config)
                    .then((response) => {
                        getAllTasksHandler()
                        setTaskDetails({
                            title:"",
                            description:"",
                            status:""
                        })
                        setIsUpdatedCall(false)

                    })
                    .catch((error) => {
                        setIsLoading(false)
                        errorNotify(error.response.data.message)
                    })

            }
        } else {
            navigate("/login")
            errorNotify("Please Login to Continue !")
        }
    }

    const appendTaskDetail = (obj,id) => {
        let { title, description, status } = obj
        setTaskDetails({
            title, description, status
        })
        setUpdatedItemId(id)
    }

    return (
        <>
            {
                isLoading ? <Loader /> : (
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
                                    <Form.Control type="text" placeholder="What do you want to do ?" name="title" value={taskDetails.title} onChange={addTaskHandler} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="description">
                                    <Form.Label className='fw-bolder'>Description</Form.Label> <br />
                                    <TextareaComp name="description" value={taskDetails.description} onChange={addTaskHandler} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="description">
                                    <Form.Label className='fw-bolder'>Status</Form.Label> <br />
                                    <StatusComp name="status" value={taskDetails.status} onChange={addTaskHandler} />
                                </Form.Group>
                            </Modal.Body>
                            <Modal.Footer className='border-0'>
                                <Button variant="primary" onClick={() => {
                                    taskSubmitHandler()
                                    handleClose()
                                }}>
                                    Save
                                </Button>
                            </Modal.Footer>
                        </Modal>
                        {/* task listing */}
                        <Container>
                            <Row className='mt-5'>
                                <TaskListing
                                    tasks={allTasks}
                                    handleShow={handleShow}
                                    appendTaskDetail={appendTaskDetail}
                                    setIsUpdatedCall={setIsUpdatedCall}
                                    setAllTasks={setAllTasks}
                                />
                            </Row>
                        </Container>

                    </>

                )
            }
        </>
    );
}

export default ModalComp;