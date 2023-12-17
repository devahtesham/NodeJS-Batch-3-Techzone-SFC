import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import "./NavBar.css"
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <>
    <header className='header py-2'>
        <Container>
            <Row className='justify-content-between align-items-center'>
                <Col lg={3}>
                    <h1 className='m-0'>LOGO</h1>
                </Col>
                <Col lg={8} className='d-flex align-items-center justify-content-between'>
                    <ul className='list-unstyled m-0 d-flex align-items-center gap-5 ps-5'>
                        <NavLink to={"/home"}>Home</NavLink>
                        <NavLink to={"/"}>Signup</NavLink>
                        <NavLink to={"/login"}>Login</NavLink>
                    </ul>
                    <button className='btn btn-danger'>Logout</button>
                </Col>
            </Row>
        </Container>
    </header>
    </>
  )
}

export default NavBar