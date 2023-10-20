import React from 'react'
import { Modal, ModalFooter } from 'react-bootstrap';

let modalAnswerData = [];

export function KanjiModal(props) {
    modalAnswerData = props.answerData
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
                <img alt='' className='position-absolute top-50 start-0 translate-middle' src='https://1.bp.blogspot.com/-auO3Bo9t3Q0/X7zMhiUnzhI/AAAAAAABccw/qJt-eSC-STwa8Upc6z3Degmc6ZLHDzekwCNcBGAsYHQ/s450/sagyouin_stand_smartphone_woman.png' />
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