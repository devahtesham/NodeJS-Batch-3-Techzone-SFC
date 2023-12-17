import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { BASE_URL } from '../../global';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { errorNotify, successNotify } from '../Taostify/Toastify';
import { useNavigate } from 'react-router-dom';


function FormComp({ isLoginPage }) {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")

    const [isLoading, setIsLoading] = useState(false)


    // signup logic
    const signUpHandler = (objToSend) => {
        setIsLoading(true)
        axios.post(`${BASE_URL}/signup`, objToSend)
            .then((response) => {
                successNotify(response.data.message)
                setIsLoading(false)

                // reset
                setName("")
                setEmail("")
                setPassword("")
                setPhone("")

                // redirect to login
                navigate('/login')
            })
            .catch((error) => {
                setIsLoading(false)
                errorNotify(error.response.data.message)
            })
    }

    // login logic
    const loginHandler = (objToSend) => {
        setIsLoading(true)
        axios.post(`${BASE_URL}/login`, objToSend)
            .then((response) => {
                const token = response.data.token;
                localStorage.setItem('token',token)
                successNotify(response.data.message)
                setIsLoading(false)

                // reset
                
                setEmail("")
                setPassword("")

                // redirect to login
                navigate('/home')
            })
            .catch((error) => {
                setIsLoading(false)
                errorNotify(error.response.data.message)
            })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        if (isLoginPage) {
            if (!email || !password) {
                errorNotify('Required Fields are missing !')
                return
            }
            let objToSend = {
                email, password
            }
            loginHandler(objToSend)

        } else {
            if (!name || !email || !password || !phone) {
                errorNotify('Required Fields are missing !')
                return
            }

            let objToSend = {
                name, email, password, phone
            }

            signUpHandler(objToSend)

        }
    }
    return (
        <>
            {
                isLoading ? <Loader /> : (
                    <Form onSubmit={submitHandler}>
                        {
                            !isLoginPage && (
                                <Form.Group className="mb-3" controlId="name">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter your Full Name" onChange={(e) => setName(e.target.value)} value={name} />
                                </Form.Group>
                            )
                        }
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                        </Form.Group>
                        {
                            !isLoginPage && (
                                <Form.Group className="mb-3" controlId="formBasicPhone">
                                    <Form.Label>Phone</Form.Label>
                                    <Form.Control type="number" placeholder="+92 xxx-xxxx" onChange={(e) => setPhone(e.target.value)} value={phone} />
                                </Form.Group>
                            )
                        }
                        <Button variant="primary" type="submit">
                            {
                                isLoginPage ? 'Login' : "SignUp"
                            }
                        </Button>
                    </Form>
                )
            }

        </>
    );
}

export default FormComp;