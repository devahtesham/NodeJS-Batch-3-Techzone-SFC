import React from 'react'
import { Col } from 'react-bootstrap'
import "./TaskListing.css"
import { FaEdit } from "react-icons/fa";
import { RiDeleteBack2Fill } from "react-icons/ri";

const TaskListing = () => {
    return (
        <>
            <Col lg={4}>
                <div className="task-card">
                    <div className='d-flex justify-content-end'>
                        <div>
                            <span >
                                <FaEdit size={22} />
                            </span>
                            <span className='ms-2'>
                                <RiDeleteBack2Fill size={22} />
                            </span>
                        </div>
                    </div>
                    <h2>Task Title</h2>
                    <div className='task-desc'>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat magnam at maxime omnis in ea facere doloremque dolore, deleniti repellendus inventore minus. Explicabo facere nihil itaque at ad, libero nam vel, ab beatae alias repellat provident doloribus, harum aperiam vitae repudiandae placeat corporis facilis perspiciatis architecto accusamus quisquam obcaecati dolor? In quae nesciunt, reiciendis, ipsum dicta, eveniet libero eius illum ea hic vel. Ullam facilis ipsam atque nemo, laboriosam nesciunt exercitationem provident. Deleniti architecto, vero, atque, dignissimos quos officia rerum odit consequatur nulla illum et natus! Quisquam error molestiae rem, nobis iusto dolorem accusantium ex id fugiat ea illo alias.</p>
                    </div>
                    <div className='fw-bold d-flex align-items-center justify-content-between'>
                        <span>Todo</span>
                        <span>16/12/2023</span>
                    </div>
                </div>
            </Col>
            <Col lg={4}>
                <div className="task-card">
                    <div className='d-flex justify-content-end'>
                        <div>
                            <span >
                                <FaEdit size={22} />
                            </span>
                            <span className='ms-2'>
                                <RiDeleteBack2Fill size={22} />
                            </span>
                        </div>
                    </div>
                    <h2>Task Title</h2>
                    <div className='task-desc'>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non fuga dolores dolor odit rerum nisi.</p>
                    </div>
                    <div className='fw-bold d-flex align-items-center justify-content-between'>
                        <span>Todo</span>
                        <span>16/12/2023</span>
                    </div>
                </div>
            </Col>
            <Col lg={4}>
                <div className="task-card">
                    <h2>Task Title</h2>
                    <div className='task-desc'>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Non fuga dolores dolor odit rerum nisi.</p>
                    </div>
                    <div className='fw-bold d-flex align-items-center justify-content-between'>
                        <span>Todo</span>
                        <span>16/12/2023</span>
                    </div>
                </div>
            </Col>

        </>
    )
}

export default TaskListing