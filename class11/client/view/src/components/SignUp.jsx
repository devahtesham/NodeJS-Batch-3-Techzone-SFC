import React, { useState } from 'react'
import FormComp from './Bootstrap/FormComp'
import { Container, Row, Col } from 'react-bootstrap'

const SignUp = () => {
  
  return (
    <Container className='mt-5'>
      <Row className='justify-content-center'>
        <h1 className='text-center'>Sign Up</h1>
        <Col lg={6}>
          <FormComp isLoginPage={false} />

        </Col>
      </Row>
    </Container>
  )
}

export default SignUp