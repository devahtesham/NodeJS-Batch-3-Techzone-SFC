import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function FormComp({ isLoginPage }) {
    const submitHandler = (e)=>{
        e.preventDefault();
        if(isLoginPage){
            console.log("login submitted")
        }else{
            console.log("signup submitted")
        }
    }
    return (
        <Form onSubmit={submitHandler}>
            {
                !isLoginPage && (
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter your Full Name" />
                    </Form.Group>
                )
            }
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            {
                !isLoginPage && (
                    <Form.Group className="mb-3" controlId="formBasicPhone">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control type="number" placeholder="+92 xxx-xxxx" />
                    </Form.Group>
                )
            }
            <Button variant="primary" type="submit">
                {
                    isLoginPage ? 'Login' : "SignUp"
                }
            </Button>
        </Form>
    );
}

export default FormComp;