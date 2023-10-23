import React from 'react'
import Swal from 'sweetalert2'
import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, InputGroup, Card, CardTitle } from 'react-bootstrap'
import userProvider from '../../Services/userProvider';
import { useNavigate } from 'react-router-dom';
import '../CSS/Login.css';

export default function Login(props) {
    const [hasChanged, setHasChanged] = useState(false);
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isFormValid, setIsFromValid] = useState(false);

    function verifyUser() {
        let isVerified = false;
        for (const user of userProvider) {
            if (user.userName === userName && user.password === password) {
                return true;
            }
        }
        return isVerified
    }

    useEffect(() => {
        if (userName !== '' && password !== '') setIsFromValid(true);
        if (hasChanged) setHasChanged(false);
    }, [hasChanged]);

    return (
        <>
            <Container fluid className='my-2 p-lg-5'>
                <Row className="d-flex justify-content-center">
                    <Col lg={6} className='d-inline p-3'>
                        <Card className='form'>
                            <Card.Header className='form-header'>
                                <CardTitle className='display-6 text-white text-center p-2'>Login</CardTitle>
                            </Card.Header>
                            <Card.Body className='form-body'>
                                <Form>
                                    <Form.Group className="mb-3" controlId="userName">
                                        <Form.Label>Username</Form.Label>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                                            <Form.Control
                                                required
                                                placeholder="Username (admin)"
                                                aria-label="Username"
                                                onChange={(e) => {
                                                    setUserName(e.currentTarget.value);
                                                    setHasChanged(true);
                                                }}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="userPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            required
                                            type="password"
                                            placeholder="Password (admin)"
                                            onChange={(e) => {
                                                setPassword(e.currentTarget.value);
                                                setHasChanged(true);
                                            }}
                                        />
                                    </Form.Group>
                                    <Form.Group className="text-end" controlId="submitButton">
                                        <div className="d-grid  ">
                                            <Button disabled={!isFormValid} className='mt-3 p-2 btn login-button d-grid'
                                                onClick={() => {
                                                    if (verifyUser()) {
                                                        navigate('/home');
                                                        props.func();
                                                        props.setIsLoggedIn(true);
                                                        props.setUserName(userName);
                                                        Swal.fire({
                                                            icon: 'success',
                                                            title: 'Logged In!',
                                                            text: `Welcome ${userName}`
                                                        })
                                                    } else {
                                                        Swal.fire({
                                                            icon: 'error',
                                                            title: 'Oops...',
                                                            text: 'User or Password may be incorrect!',
                                                        })
                                                    }
                                                }}>
                                                Login
                                            </Button>
                                        </div>
                                    </Form.Group>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row >
            </Container >
        </>
    )
}
