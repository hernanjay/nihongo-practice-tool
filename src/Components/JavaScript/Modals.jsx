import React from 'react'
import { Modal, ModalFooter } from 'react-bootstrap';
import '../CSS/Modal.css';

let modalAnswerData = [];

export function KanjiModal(props) {
    modalAnswerData = props.answerData
    let isMobile = window.innerWidth < 720;
    return (
        <Modal
            {...props}
            size='md'
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className='kanjiCardHeader text-white' closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {modalAnswerData[0]}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* className='position-absolute top-50 start-0 translate-middle'*/}
                <img className="imgModal" alt='' src='https://1.bp.blogspot.com/-0wXC6MMwTqs/Xrea7O9QSuI/AAAAAAABY1U/apyEhwKBcTws66j3jFVmQUD0dMvIO7GRwCNcBGAsYHQ/s400/study_school_jugyou_boy.png' />
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
    )
}

export function HiraganaModal(params) {

}