import React from 'react'
import { Col } from 'react-bootstrap'
import "./TaskListing.css"
import { FaEdit } from "react-icons/fa";
import { RiDeleteBack2Fill } from "react-icons/ri";
import { successNotify } from './Taostify/Toastify';
import axios from 'axios';
import { BASE_URL } from '../global';

const TaskListing = (props) => {
    let tasks = props.tasks;
    let handleShow = props.handleShow
    let appendTaskDetail = props.appendTaskDetail
    let setIsUpdatedCall = props.setIsUpdatedCall
    let setAllTasks = props.setAllTasks

    const editTaskHandler = (index) => {
        let task = tasks[index];
        setIsUpdatedCall(true)
        appendTaskDetail(task, task._id)
        handleShow();
    }
    const deleteTaskHandler = (index) => {
        let task = tasks[index]
        tasks.splice(index, 1)
        setAllTasks([...tasks])

        // delete api
        let token = localStorage.getItem('token')
        let config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        axios.delete(`${BASE_URL}/tasks/${task._id}`, config)
            .then((response) => {
                successNotify("Deleted Successfully !!")
            })
            .catch((error) => {
                errorNotify(error.response.data.message)
            })
    }
    return (
        <>
            {
                tasks.length < 1 ? <h1>No Task Added !</h1> : tasks.map((task, index) => (
                    <Col key={task._id} lg={4} className='mb-5'>
                        <div className="task-card">
                            <div className='d-flex justify-content-end'>
                                <div>
                                    <span onClick={() => {
                                        editTaskHandler(index)
                                    }} >
                                        <FaEdit size={22} />
                                    </span>
                                    <span className='ms-2' onClick={() => {
                                        deleteTaskHandler(index)
                                    }}>
                                        <RiDeleteBack2Fill size={22} />
                                    </span>
                                </div>
                            </div>
                            <h2>{task.title}</h2>
                            <div className='task-desc'>
                                <p>{task.description}</p>
                            </div>
                            <div className='fw-bold d-flex align-items-center justify-content-between'>
                                <span>{task.status}</span>
                                <span>{task.created_on}</span>
                            </div>
                        </div>
                    </Col>

                ))
            }


        </>
    )
}

export default TaskListing