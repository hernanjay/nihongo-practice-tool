import React, { useState, useEffect } from 'react'
import { Row, Col, Container, CardFooter, Card, Modal, ModalFooter } from 'react-bootstrap';
import KanjiCardsHiraganaButtonsChoices from './KanjiCardsHiraganaButtonsChoices';
import { KanjiModal } from '../../Components/JavaScript/Modals';
import PaginationBar from "../../Components/JavaScript/PaginationBar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../CSS/Kanji.css';

const data = shuffle(require('../../HiriganaList.json').kanji);
let pages = [1, 2, 3, 4, 5, 6, 7];
let activePage = 1
let modalAnswerData = [];

function setActivePage(pageNum) {
    activePage = pageNum;
}

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

function setModalAnswerText(item, index) {
    modalAnswerData[0] = `${index + 1} / ${data.length}`;
    modalAnswerData[1] = item.kanjiChar;
    modalAnswerData[2] = item.kanjiHir;
    modalAnswerData[3] = item.kanjiMeaning.charAt(0).toUpperCase() + item.kanjiMeaning.slice(1);
}

function KanjiCardsHiragana() {
    const [modalShow, setModalShow] = useState(false);
    const [hasChanged, setHasChanged] = useState(false);

    useEffect(() => {
        if (hasChanged) setHasChanged(false);
    }, [hasChanged]);

    return (
        <>
            <KanjiModal
                answerData={modalAnswerData}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <Container fluid className='p-3 bg'>
                <PaginationBar
                    dataProp={data}
                    pagesProp={pages}
                    activePageProp={activePage}
                    setActivePageProp={setActivePage}
                    setHasChangedProp={setHasChanged}
                />
                <Row>
                    {createCardsFromData(setHasChanged, setModalShow, activePage)}
                </Row>
                <PaginationBar
                    dataProp={data}
                    pagesProp={pages}
                    activePageProp={activePage}
                    setActivePageProp={setActivePage}
                    setHasChangedProp={setHasChanged}
                />
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

function createCardsFromData(hasChangedFunc, modalShowFunc, activePage) {
    return (
        data.map((item, index) => {
            if (index >= (activePage - 1) * 16 && index <= ((activePage) * 16 - 1)) {
                return (
                    <>
                        <Col md={3} className='p-3'>
                            <div id={'div' + index} key={index}>
                                <Card className='shadow kanjiCard kanjiCardBorder'>
                                    <Card.Header className='kanjiCardHeader'>
                                        <Row className='text-center text-light'>
                                            <Col md={2} type="button" onClick={() => {
                                                modalShowFunc(true);
                                                setModalAnswerText(item, index);
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
                                                answer={index}
                                                list={data}
                                                func={function () {
                                                    hasChangedFunc(true);
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
                    </>
                )
            }
        })
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