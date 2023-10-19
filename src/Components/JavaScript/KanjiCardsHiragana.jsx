import React, { useState, useEffect } from 'react'
import { Row, Col, Container, CardFooter, Card, Modal, ModalFooter } from 'react-bootstrap';
import KanjiCardsHiraganaButtonsChoices from './KanjiCardsHiraganaButtonsChoices';
import NavBar from './NavBar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../CSS/Kanji.css';

const data = shuffle(require('../../KanjiList.json').kanji);
let modalAnswerData = [];

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
                        <p className='text-muted'>{`平仮名 : ${modalAnswerData[2]}`}</p>
                        <footer className="blockquote-footer">
                            <cite title="Source Title">{modalAnswerData[3]}</cite>
                        </footer>
                    </blockquote>
                </ModalFooter>
            </Modal.Body>
        </Modal>
    );
}


function KanjiCardsHiragana() {
    const [modalShow, setModalShow] = useState(false);
    const [hasChanged, setHasChanged] = useState(false);
    const notify = (hiragana, kanji) => toast.info(`${hiragana} : ${kanji}`, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });

    useEffect(() => {
        if (hasChanged) setHasChanged(false);
    }, [hasChanged]);

    return (
        <>
            <NavBar />
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <Container fluid className='p-3 bg'>
                <Row>
                    {data.map((item, index) =>
                        <Col md={3} className='p-3'>
                            <div id={'div' + index} key={index}>
                                <Card className='shadow kanjiCard kanjiCardBorder'>
                                    <Card.Header className='kanjiCardHeader'>
                                        <Row className='text-center text-light'>
                                            <Col md={2} type="button" onClick={() => {
                                                setModalShow(true);
                                                modalAnswerData[0] = `${index + 1} / ${data.length}`;
                                                modalAnswerData[1] = item.kanjiChar;
                                                modalAnswerData[2] = item.kanjiHir;
                                                modalAnswerData[3] = item.kanjiMeaning.charAt(0).toUpperCase() + item.kanjiMeaning.slice(1);
                                            }}>?</Col>
                                            <Col md={6} className=''></Col>
                                            <Col md={4}>{index + 1} / {data.length}</Col>
                                        </Row>
                                    </Card.Header>
                                    <Card.Body>
                                        <Card.Title className='kanjiCardBody'>
                                            <p className='text-center fs-4 py-5'>{item.kanjiHir}</p>
                                        </Card.Title>
                                        <Container fluid className='text-center'>
                                            <KanjiCardsHiraganaButtonsChoices
                                                answer={item}
                                                list={data}
                                                func={function () {
                                                    setHasChanged(true);
                                                    item.isValid = true;
                                                    notify(item.kanjiHir, item.kanjiChar);
                                                }}
                                            >
                                            </KanjiCardsHiraganaButtonsChoices>
                                        </Container>
                                    </Card.Body>
                                    <CardFooter className='p-3'>
                                        <blockquote className="blockquote mb-0">
                                            <p className='text-muted'>{item.isValid ? item.kanjiChar : "漢字"}</p>
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

export default KanjiCardsHiragana;