import React, { useState, useEffect } from 'react'
import { Row, Col, Container, Form, CardFooter, Card, Modal, ModalFooter, Pagination } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../CSS/Kanji.css';
import { act } from 'react-dom/test-utils';

const data = shuffle(require('../../KanjiList.json').kanji);
let pages = [1, 2, 3, 4, 5, 6, 7];
let activePage = 1;
let modalAnswerData = [];


function checkIfAnswerValid(isValid) {
    let cardClass = "shadow kanjiCard ";
    return cardClass += isValid ? 'border-success text-success' : 'kanjiCardBorder';
}

function scrollToElem(element, margin) {
    window.scrollTo(window.scrollX, element - margin);
}

function movePage(action) {
    if (action === "forward" && pages[6] < Math.round(data.length / 16)) {
        if (!(activePage < pages[6])) {
            for (let index = 0; index < pages.length; index++) {
                pages[index] = pages[index] + 1;
            }
        }
        activePage += 1;
    } else if (action === "forwardSkip" && pages[6] < Math.round(data.length / 16) - 6) {
        for (let index = 0; index < pages.length; index++) {
            pages[index] = pages[index] + 7;

        }
        activePage += 7;
    } else if (action === "last" && pages[6] < Math.round(data.length / 16)) {
        for (let index = 0; index < pages.length; index++) {
            pages[index] = Math.round(data.length / 16) - (pages.length - (index + 1));
        }
        activePage = Math.round(data.length / 16);
    } else if (action === "backward" && pages[0] >= 1) {
        if (!(activePage > pages[0])) {
            for (let index = 0; index < pages.length; index++) {
                pages[index] = pages[index] - 1;
            }
        }
        activePage = activePage - 1;
    } else if (action === "backwardSkip" && pages[0] > 7) {
        for (let index = 0; index < pages.length; index++) {
            pages[index] = pages[index] - 7;

        }
        activePage -= 7;
    } else if (action === "first" && pages[0] > 1) {
        for (let index = 0; index < pages.length; index++) {
            pages[index] = index + 1;
        }
        activePage = 1
    }
}

function paginationComp(setHasChanged) {
    return (
        <Pagination className='shadow' size='md'>
            <Pagination.First onClick={(e) => {
                movePage('first');
                setHasChanged(true);
            }} />
            <Pagination.Prev onClick={(e) => {
                movePage('backward');
                setHasChanged(true);
            }} />
            <Pagination.Item onClick={(e) => {
                activePage = pages[0];
                setHasChanged(true);
            }} active={activePage === pages[0]}>{pages[0]}
            </Pagination.Item>
            <Pagination.Ellipsis onClick={(e) => {
                movePage('backwardSkip');
                setHasChanged(true);
            }} />

            <Pagination.Item onClick={(e) => {
                activePage = pages[1];
                setHasChanged(true);
            }} active={activePage === pages[1]}>{pages[1]}
            </Pagination.Item>
            <Pagination.Item onClick={(e) => {
                activePage = pages[2];
                setHasChanged(true);
            }} active={activePage === pages[2]}>{pages[2]}</Pagination.Item>
            <Pagination.Item onClick={(e) => {
                activePage = pages[3];
                setHasChanged(true);
            }} active={activePage === pages[3]}>{pages[3]}</Pagination.Item>
            <Pagination.Item onClick={(e) => {
                activePage = pages[4];
                setHasChanged(true);
            }} active={activePage === pages[4]}>{pages[4]}</Pagination.Item>
            <Pagination.Item onClick={(e) => {
                activePage = pages[5];
                setHasChanged(true);
            }} active={activePage === pages[5]}>{pages[5]}</Pagination.Item>

            <Pagination.Ellipsis onClick={(e) => {
                movePage('forwardSkip');
                setHasChanged(true);
            }} />
            <Pagination.Item onClick={(e) => {
                activePage = pages[6];
                setHasChanged(true);
            }} active={activePage === pages[6]}>{pages[6]}</Pagination.Item>
            <Pagination.Next onClick={(e) => {
                movePage('forward');
                setHasChanged(true);
            }} />
            <Pagination.Last onClick={(e) => {
                movePage('last');
                setHasChanged(true);
            }} />
        </Pagination>
    )
}

function MyVerticallyCenteredModal(props) {
    return (
        <Modal
            {...props}
            size="md"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className='kanjiCardHeader text-white' closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {modalAnswerData[0]}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img className='position-absolute top-50 start-0 translate-middle' src='https://1.bp.blogspot.com/-auO3Bo9t3Q0/X7zMhiUnzhI/AAAAAAABccw/qJt-eSC-STwa8Upc6z3Degmc6ZLHDzekwCNcBGAsYHQ/s450/sagyouin_stand_smartphone_woman.png' />
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
                <Row className='mt-3'>
                    <Col className='d-flex justify-content-center'>
                        {paginationComp(setHasChanged)}
                    </Col>
                </Row>
                <Row>
                    {data.map((item, index) => {
                        if (index >= (activePage - 1) * 16 && index <= ((activePage) * 16 - 1)) {
                            return (
                                <>
                                    <Col md={3} className='p-3'>
                                        <div id={'div' + index} key={index}>
                                            <Card className={checkIfAnswerValid(item.isValid)}>
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
                                                        <p className='text-center fs-3 p-5'>{item.kanjiChar}</p>
                                                    </Card.Title>
                                                    <Form>
                                                        <Form.Control
                                                            id={index}
                                                            placeholder='平仮名で答え'
                                                            className='border text-center mb-3'
                                                            isValid={item.isValid}
                                                            type="text"
                                                            onChange={(e) => {
                                                                if (item.kanjiHir === e.currentTarget.value) {
                                                                    item.isValid = true;
                                                                    if (index + 1 !== data.length) {
                                                                        document.getElementById(index + 1).focus()
                                                                        scrollToElem(document.getElementById('div' + (index + 1)).offsetTop, 75);
                                                                    }
                                                                    notify(item.kanjiChar, e.currentTarget.value);
                                                                    setHasChanged(true);
                                                                }
                                                            }}
                                                            onKeyDown={(event) => {
                                                                if (event.key === 'Shift') {
                                                                    setModalShow(true);
                                                                    modalAnswerData[0] = `${index + 1} / ${data.length}`;
                                                                    modalAnswerData[1] = item.kanjiChar;
                                                                    modalAnswerData[2] = item.kanjiHir;
                                                                    modalAnswerData[3] = item.kanjiMeaning.charAt(0).toUpperCase() + item.kanjiMeaning.slice(1);
                                                                }
                                                            }}
                                                            disabled={item.isValid}
                                                            autoComplete="off"
                                                        />
                                                    </Form>
                                                </Card.Body>
                                                <CardFooter className='p-3'>
                                                    <blockquote className="blockquote mb-0">
                                                        <p className='text-muted'>{item.isValid ? item.kanjiHir : "平仮名"}</p>
                                                        <footer className="blockquote-footer">
                                                            <cite title="Source Title">{item.isValid ? item.kanjiMeaning.charAt(0).toUpperCase() + item.kanjiMeaning.slice(1) : "Definition"}</cite>
                                                        </footer>
                                                    </blockquote>
                                                </CardFooter>
                                            </Card>
                                        </div>
                                    </Col>
                                </>
                            )
                        }
                    }
                    )}
                </Row>
                <Row className='mt-3'>
                    <Col className='d-flex justify-content-center'>
                        {paginationComp(setHasChanged)}
                    </Col>
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