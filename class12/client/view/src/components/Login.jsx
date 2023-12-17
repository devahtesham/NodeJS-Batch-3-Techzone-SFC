import React from 'react'
import FormComp from './Bootstrap/FormComp'
import { Container, Row, Col } from 'react-bootstrap'
import NavBar from './NavBar/NavBar'

const Login = () => {
  return (
    <>
    <NavBar />
    <Container className='mt-5'>
      <Row className='justify-content-center'>
        <h1 className='text-center'>Login</h1>
        <Col lg={6}>
          <FormComp isLoginPage={true} />
        </Col>
      </Row>
    </Container>
    </>
  )
}

export default Login