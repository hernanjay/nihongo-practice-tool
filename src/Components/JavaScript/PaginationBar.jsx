import React from 'react'
import { Col, Row, Pagination } from 'react-bootstrap';

let data;
let pages;
let activePage;

function movePage(action) {
    if (action === "forward" && pages[6] <= Math.round(data.length / 16)) {
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
        activePage -= 1;
    } else if (action === "backwardSkip" && pages[0] > 7) {
        for (let index = 0; index < pages.length; index++) {
            pages[index] = pages[index] - 7;

        }
        activePage -= 7;
    } else if (action === "first" && pages[0] >= 1) {
        for (let index = 0; index < pages.length; index++) {
            pages[index] = index + 1;
        }
        activePage = 1
    }
}

function PaginationBar(props) {
    data = props.dataProp;
    pages = props.pagesProp;
    activePage = props.activePageProp;
    return (
        <Row className='mt-3'>
            <Col className='d-flex justify-content-center'>
                <Pagination className='shadow' size='md'>
                    <Pagination.First
                        onClick={(e) => {
                            movePage('first');
                            props.setHasChangedProp(true);
                        }}
                        disabled={activePage === 1}
                    />
                    <Pagination.Prev
                        onClick={(e) => {
                            movePage('backward');
                            props.setHasChangedProp(true);
                            props.setActivePageProp(activePage);
                        }}
                        disabled={activePage === 1}
                    />
                    <Pagination.Item onClick={(e) => {
                        activePage = pages[0];
                        props.setHasChangedProp(true);
                    }} active={activePage === pages[0]}>{pages[0]}
                    </Pagination.Item>
                    <Pagination.Ellipsis onClick={(e) => {
                        movePage('backwardSkip');
                        props.setHasChangedProp(true);
                    }}
                        disabled={pages[0] < 7}
                    />
                    <Pagination.Item onClick={(e) => {
                        activePage = pages[1];
                        props.setHasChangedProp(true);
                    }} active={activePage === pages[1]}>{pages[1]}
                    </Pagination.Item>
                    <Pagination.Item onClick={(e) => {
                        activePage = pages[2];
                        props.setHasChangedProp(true);
                    }} active={activePage === pages[2]}>{pages[2]}</Pagination.Item>
                    <Pagination.Item onClick={(e) => {
                        activePage = pages[3];
                        props.setHasChangedProp(true);
                    }} active={activePage === pages[3]}>{pages[3]}</Pagination.Item>
                    <Pagination.Item onClick={(e) => {
                        activePage = pages[4];
                        props.setHasChangedProp(true);
                    }} active={activePage === pages[4]}>{pages[4]}</Pagination.Item>
                    <Pagination.Item onClick={(e) => {
                        activePage = pages[5];
                        props.setHasChangedProp(true);
                    }} active={activePage === pages[5]}>{pages[5]}</Pagination.Item>

                    <Pagination.Ellipsis onClick={(e) => {
                        movePage('forwardSkip');
                        props.setHasChangedProp(true);
                    }}
                        disabled={pages[6] > Math.round(data.length / 16) - 7}
                    />
                    <Pagination.Item onClick={(e) => {
                        activePage = pages[6];
                        props.setHasChangedProp(true);
                    }} active={activePage === pages[6]}>{pages[6]}</Pagination.Item>
                    <Pagination.Next onClick={(e) => {
                        movePage('forward');
                        props.setHasChangedProp(true);
                        props.setActivePageProp(activePage);
                    }}
                        disabled={activePage === Math.round(data.length / 16)}
                    />
                    <Pagination.Last onClick={(e) => {
                        movePage('last');
                        props.setHasChangedProp(true);
                    }}
                        disabled={activePage === Math.round(data.length / 16)}
                    />
                </Pagination>
            </Col>
        </Row >
    )
}

export default PaginationBar