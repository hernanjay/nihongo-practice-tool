import React from 'react'
import Swal from 'sweetalert2'
import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, InputGroup, Card, CardTitle } from 'react-bootstrap'
import userProvider from '../../Services/userProvider';
import { useNavigate } from 'react-router-dom';
import '../CSS/Register.css';


export default function Register(props) {
    const [hasChanged, setHasChanged] = useState(false);
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');
    const [isFormValid, setIsFromValid] = useState(false);

    useEffect(() => {
        if (userName !== '' && email !== '' && password !== '' && password === verifyPassword) setIsFromValid(true);
        if (hasChanged) setHasChanged(false);
    }, [hasChanged]);

    return (
        <>
            <Container fluid className='my-2 p-lg-5'>
                <Row className="d-flex justify-content-center">
                    <Col lg={6} className='d-inline p-3'>
                        <Card className='form'>
                            <Card.Header className='form-header'>
                                <CardTitle className='display-6 text-white text-center p-2'>Register</CardTitle>
                            </Card.Header>
                            <Card.Body className='form-body'>
                                <Form>
                                    <Form.Group className="mb-3" controlId="userName">
                                        <Form.Label>Username</Form.Label>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                                            <Form.Control
                                                required
                                                placeholder="Username"
                                                aria-label="Username"
                                                isValid={userName !== ''}
                                                isInvalid={userName === ''}
                                                onChange={(e) => {
                                                    setUserName(e.currentTarget.value);
                                                    setHasChanged(true);
                                                }}
                                            />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="userEmail"></Form.Group>
                                    <Form.Label>Email</Form.Label>
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                            required
                                            placeholder="Email address"
                                            aria-label="Email address"
                                            isValid={email !== ''}
                                            isInvalid={email === ''}
                                            onChange={(e) => {
                                                setEmail(e.currentTarget.value + '@awsys-i.com');
                                                setHasChanged(true);
                                            }}
                                        />
                                        <InputGroup.Text id="basic-addon2">@awsys-i.com</InputGroup.Text>
                                    </InputGroup>
                                    <Form.Group />
                                    <Form.Group className="mb-3" controlId="userPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            required
                                            type="password"
                                            placeholder="Password"
                                            isValid={password !== '' && password === verifyPassword}
                                            isInvalid={password === '' || password !== verifyPassword}
                                            onChange={(e) => {
                                                setPassword(e.currentTarget.value);
                                                setHasChanged(true);
                                            }}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="userVerifyPassword">
                                        <Form.Label>Verify Password</Form.Label>
                                        <Form.Control
                                            required
                                            type="password"
                                            placeholder="Password"
                                            isValid={verifyPassword !== '' && password === verifyPassword}
                                            isInvalid={verifyPassword === '' || password !== verifyPassword}
                                            onChange={(e) => {
                                                setVerifyPassword(e.currentTarget.value);
                                                setHasChanged(true);
                                            }}
                                        />
                                    </Form.Group>
                                    <Form.Group className="text-end" controlId="submitButton">
                                        <div className="d-grid  ">
                                            <Button disabled={!isFormValid} className='mt-3 p-2 btn register-button d-grid'
                                                onClick={() => {
                                                    Swal.fire({
                                                        title: 'Are you sure?',
                                                        text: "Make sure all informatin is correct  !",
                                                        icon: 'warning',
                                                        showCancelButton: true,
                                                        confirmButtonColor: '#3085d6',
                                                        cancelButtonColor: '#d33',
                                                        confirmButtonText: 'Yes, Register User!'
                                                    }).then((result) => {
                                                        /* Read more about isConfirmed, isDenied below */
                                                        if (result.isConfirmed) {
                                                            Swal.fire('Saved!', '', 'success')
                                                            userProvider.push({
                                                                userName,
                                                                password
                                                            });
                                                            navigate('/login');
                                                            props.func();
                                                        } else if (result.isDismissed) {
                                                            Swal.fire('Changes are not saved', '', 'info')
                                                        }
                                                    })
                                                }}>
                                                Submit
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
