import React, { useState, useEffect } from 'react'
import { Row, Col, Container, Form, CardFooter, Card, Modal, ModalFooter } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import NavBar from './NavBar';
import 'react-toastify/dist/ReactToastify.css';
import '../CSS/Kanji.css';

const data = shuffle(require('../../VocabList.json').vocab.slice(0, Math.ceil(1828 / 2)));
let modalAnswerData = [];

function checkIfAnswerValid(isValid) {
    let cardClass = "shadow kanjiCard ";
    return cardClass += isValid ? 'border-success text-success' : 'kanjiCardBorder';
}

function scrollToElem(element, margin) {
    window.scrollTo(window.scrollX, element - margin);
}

function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className='kanjiCardHeader text-white' closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {modalAnswerData[0]}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4 className='kanjiCardBody text-center p-5 m-5 fs-1'>{modalAnswerData[1]}</h4>
                <ModalFooter>
                    <blockquote className="blockquote mb-0">
                        <p className='text-muted'>{`意味`}</p>
                        <footer className="blockquote-footer">
                            <cite title="Source Title">{modalAnswerData[2]}</cite>
                        </footer>
                    </blockquote>
                </ModalFooter>
            </Modal.Body>
        </Modal>
    );
}

function KanjiCardsKanji() {
    const [hasChanged, setHasChanged] = useState(false);
    const notify = (kanji, hiragana) => toast.success(`${kanji} : ${hiragana}`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
    const [modalShow, setModalShow] = React.useState(false);

    useEffect(() => {
        if (hasChanged) setHasChanged(false);
    }, [hasChanged]);

    return (
        <>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <Container fluid className='p-3 bg'>
                <Row>
                    {data.map((item, index) =>
                        <Col md={3} className='p-3'>
                            <div id={'div' + index} key={index}>
                                <Card className={checkIfAnswerValid(item.isValid)}>
                                    <Card.Header className='kanjiCardHeader'>
                                        <Row className='text-center text-light'>
                                            <Col md={2} type="button" onClick={() => {
                                                setModalShow(true);
                                                modalAnswerData[0] = `${index + 1} / ${data.length}`;
                                                modalAnswerData[1] = item.vocabHir;
                                                modalAnswerData[2] = item.vocabMeaning.charAt(0).toUpperCase() + item.vocabMeaning.slice(1);
                                            }}>?</Col>
                                            <Col md={6} className=''></Col>
                                            <Col md={4}>{index + 1} / {data.length}</Col>
                                        </Row>
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Title className='kanjiCardBody'>
                                            <p className='text-center fs-3 p-5'>{item.vocabHir}</p>
                                        </Card.Title>
                                        <Form>
                                            <Form.Control
                                                id={index}
                                                className='border text-center mb-3'
                                                type="text"
                                                onChange={(e) => {
                                                    if (item.vocabHir === e.currentTarget.value) {
                                                        item.isValid = true;
                                                        if (index + 1 !== data.length) {
                                                            document.getElementById(index + 1).focus()
                                                            // document.getElementById('div' + (index + 1)).scrollIntoView({ behavior: "smooth", block: "start", inline: "start" });
                                                            scrollToElem(document.getElementById('div' + (index + 1)).offsetTop, 75);
                                                        }
                                                        notify(item.vocabHir, e.currentTarget.value);
                                                        setHasChanged(true);
                                                    }
                                                }}
                                                disabled={item.isValid}
                                                autoComplete="off"
                                            />
                                        </Form>
                                    </Card.Body>
                                    <CardFooter className='p-3'>
                                        <blockquote className="blockquote mb-0">
                                            <p className='text-muted'>{item.isValid ? item.kanjiHir : "意味"}</p>
                                            <footer className="blockquote-footer">
                                                <cite title="Source Title">{item.isValid ? item.kanjiMeaning.charAt(0).toUpperCase() + item.kanjiMeaning.slice(1) : "Definition"}</cite>
                                            </footer>
                                        </blockquote>
                                    </CardFooter>
                                </Card>
                            </div>
                        </Col>
                    )}
                </Row>
            </Container >
            <ToastContainer
                position="top-right"
                autoClose={1000}
                limit={5}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

export default KanjiCardsKanji;