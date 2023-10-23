import React, { useState, useEffect } from 'react'
import { Row, Col, Container, Form, CardFooter, Card, Button, ButtonGroup } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import PaginationBar from "../../Components/JavaScript/PaginationBar";
import { KanjiModal } from '../../Components/JavaScript/Modals';
import 'react-toastify/dist/ReactToastify.css';
import '../CSS/Kanji.css';

let data = shuffle(require('../../KanjiList.json').kanji);
const baseData = require('../../KanjiListBase.json').kanji
let weightedData = weightData();

function resetDataSet() {
    const resetedData = [];
    for (let x = 0; x < baseData.length; x++) {
        for (let y = 0; y < data.length; y++) {
            if (baseData[x].kanjiChar === data[y].kanjiChar) {
                console.log(`Before ${baseData[x].kanjiChar} : ${baseData[x].Weight}`);
                baseData[x].Weight = data[y].Weight;
                console.log(`After ${baseData[x].kanjiChar} : ${baseData[x].Weight}`);
                resetedData.push(baseData[x]);
            }
        }
    }
    data = shuffle(resetedData)
}

function weightData() {
    let weightedData = [];
    for (let index = 10; index >= 0; index--) {
        data.forEach(e => {
            if (e.Weight === index) {
                weightedData.push(e);
            }
        });
    }
    return weightedData;
}

function setDataSet() {
    weightedData = weightData();
}

// const data = shuffle(require('../../KanjiList.json').kanji);
let pages = [1, 2, 3, 4, 5, 6, 7];
let activePage = 1
let modalAnswerData = [];

function setActivePage(pageNum) {
    activePage = pageNum;
}

//Toast Render
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

const notifyChangedWeight = (kanji, weight) => toast.info(`${kanji}'s Weight changed to ${weight}`, {
    position: "top-right",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
});

// Page Render
function KanjiCardsKanji() {
    const [hasChanged, setHasChanged] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    resetDataSet();

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
                <Col >
                    <PaginationBar
                        dataProp={data}
                        pagesProp={pages}
                        activePageProp={activePage}
                        setActivePageProp={setActivePage}
                        setHasChangedProp={setHasChanged}
                    />
                </Col>
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


//Functions
function checkIfAnswerValid(isValid) {
    let cardClass = "shadow kanjiCard ";
    return cardClass += isValid ? 'border-success text-success' : 'kanjiCardBorder';
}

function checkIfUserInputIsCorrect(item, index, event, func) {
    if (item.kanjiHir === event.currentTarget.value) {
        item.isValid = true;
        if (index + 1 !== data.length) {
            document.getElementById('form' + (index + 1)).focus()
            scrollToElem(document.getElementById('div' + (index + 1)).offsetTop, 75);
        }
        notify(item.kanjiChar, event.currentTarget.value);
        func(true);
    }
}

function scrollToElem(element, margin) {
    window.scrollTo(window.scrollX, element - margin);
}

function setValueWhenAnswered(isValid, value) {
    return isValid ? value : '平仮名で答え';
}

function setModalAnswerText(item, index) {
    modalAnswerData[0] = `${index + 1} / ${data.length}`;
    modalAnswerData[1] = item.kanjiChar;
    modalAnswerData[2] = item.kanjiHir;
    modalAnswerData[3] = item.kanjiMeaning.charAt(0).toUpperCase() + item.kanjiMeaning.slice(1);
}

//Card Render
function createCardsFromData(hasChangedFunc, modalShowFunc, activePage) {
    return (
        weightedData.map((item, index) => {
            if (index >= (activePage - 1) * 16 && index <= ((activePage) * 16 - 1)) {
                return (
                    <>
                        <Col md={3} className='p-3'>
                            <div id={'div' + index} key={index}>
                                <Card className={checkIfAnswerValid(item.isValid)}>
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
                                            <p className='text-center fs-3 p-5'>{item.kanjiChar}</p>
                                        </Card.Title>
                                        <Form>
                                            <Form.Control
                                                visibility={false}
                                                id={'form' + index}
                                                placeholder={setValueWhenAnswered(item.isValid, item.kanjiHir)}
                                                className='border text-center mb-3'
                                                isValid={item.isValid}
                                                onChange={(e) => {
                                                    checkIfUserInputIsCorrect(item, index, e, hasChangedFunc)
                                                }}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Shift') {
                                                        modalShowFunc(true);
                                                        setModalAnswerText(item, index, e);
                                                    }
                                                }}
                                                disabled={item.isValid}
                                                autoComplete="off"
                                            />
                                        </Form>
                                    </Card.Body>
                                    <CardFooter className='d-block p-3'>
                                        <blockquote className="d-block blockquote mb-0">
                                            <p className='text-muted'>{item.isValid ? item.kanjiHir : "平仮名"}</p>
                                            <footer className="blockquote-footer">
                                                <cite title="Source Title">{item.isValid ? item.kanjiMeaning.charAt(0).toUpperCase() + item.kanjiMeaning.slice(1) : "Definition"}</cite>
                                            </footer>
                                        </blockquote>
                                        <ButtonGroup className='d-block float-end mt-2'>
                                            <Button
                                                size="sm"
                                                className='priorityButtons priorityButtonsAdd'
                                                onClick={() => {
                                                    if (item.Weight < 10) {
                                                        data[index].Weight += 1;
                                                        notifyChangedWeight(item.kanjiChar, item.Weight);
                                                    }
                                                }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                                </svg>
                                            </Button>
                                            <Button size="sm" className='priorityButtons priorityButtonsRemove' onClick={() => {
                                                item.Weight = 0;
                                                notifyChangedWeight(item.kanjiChar, item.Weight);
                                            }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x" viewBox="0 0 16 16">
                                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                                </svg>
                                            </Button>
                                            <Button size="sm" className='priorityButtons priorityButtonsSubtract' onClick={() => {
                                                if (item.Weight > 0) {
                                                    data[index].Weight -= 1;
                                                    notifyChangedWeight(item.kanjiChar, data[index].Weight);
                                                }
                                            }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash" viewBox="0 0 16 16">
                                                    <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
                                                </svg>
                                            </Button>

                                        </ButtonGroup>
                                    </CardFooter>
                                </Card>
                            </div>
                        </Col >
                    </>
                )
            }
        }
        )
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