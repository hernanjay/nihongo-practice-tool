import React, { useState } from 'react'
import NavBar from '../../Components/JavaScript/NavBar';
import KanjiCardsKanji from './KanjiCardsKanji';
import KanjiCardsHiragana from './KanjiCardsHiragana';
import VocabCards from './VocabCards';
import '../CSS/Home.css';
import { Container, Card, CardGroup, Row, Col } from 'react-bootstrap';
function Home() {
    const [hasChanged, setHasChanged] = useState(false);
    const writtingImg = 'https://1.bp.blogspot.com/-0wXC6MMwTqs/Xrea7O9QSuI/AAAAAAABY1U/apyEhwKBcTws66j3jFVmQUD0dMvIO7GRwCNcBGAsYHQ/s400/study_school_jugyou_boy.png';

    const currentPath = window.location.href.split(window.location.origin)[1];

    function getPage() {
        if (currentPath === '/nihongo-practice-tool/#/kanji') {
            return <KanjiCardsKanji />;
        } else if (currentPath === '/nihongo-practice-tool/#/hiragana') {
            return <KanjiCardsHiragana />
        } else if (currentPath === '/nihongo-practice-tool/#/vocab') {
            return <VocabCards />
        } else {
            return landingPage();
        }
    }

    function landingPage() {
        return (
            <>
                <Container fluid className='m-auto p-lg-5'>
                    <Row className="d-flex justify-content-center">
                        <Col lg={3} className='d-inline p-3'>
                            <Card className='homeCardBorder'>
                                <Card.Header className='p-4 text-center homeCardHeader homeCardBorder'><Card.Title>漢字 ー＞ 平仮名</Card.Title> </Card.Header >
                                <Card.Body className=' p-5 homeCard'>
                                    <Card.Text className='py-2'>
                                        <Card.Img src={writtingImg} />
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer className=''>
                                    <small className="text-muted">Last updated 3 mins ago</small>
                                </Card.Footer>
                            </Card>
                        </Col>
                        <Col lg={3} className='d-inline p-3'>
                            <Card className='homeCardBorder'>
                                <Card.Header className='p-4 text-center homeCardHeader homeCardBorder'><Card.Title>平仮名 ー＞ 漢字</Card.Title> </Card.Header >
                                <Card.Body className='p-5 homeCard'>
                                    <Card.Text className='py-2'>
                                        <Card.Img src={writtingImg} />
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <small className="text-muted">Last updated 3 mins ago</small>
                                </Card.Footer>
                            </Card>
                        </Col>
                        <Col lg={3} className='d-inline p-3'>
                            <Card className='homeCardBorder'>
                                <Card.Header className='p-4 text-center homeCardHeader homeCardBorder'><Card.Title>語彙</Card.Title> </Card.Header >
                                <Card.Body className='p-5'>
                                    <Card.Text className='py-2'>
                                        <Card.Img src={writtingImg} />
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <small className="text-muted">Last updated 3 mins ago</small>
                                </Card.Footer>
                            </Card>
                        </Col>
                    </Row >
                    <Row className="d-flex justify-content-center">
                        <Col lg={3} className='d-inline p-3'>
                            <Card className='homeCardBorder'>
                                <Card.Header className='p-4 text-center homeCardHeader homeCardBorder'><Card.Title>聴取</Card.Title> </Card.Header >
                                <Card.Body className=' p-5 homeCard'>
                                    <Card.Text className='py-2'>
                                        <Card.Img src={writtingImg} />
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer className=''>
                                    <small className="text-muted">Last updated 3 mins ago</small>
                                </Card.Footer>
                            </Card>
                        </Col>
                        <Col lg={3} className='d-inline p-3'>
                            <Card className='homeCardBorder'>
                                <Card.Header className='p-4 text-center homeCardHeader homeCardBorder'><Card.Title>文法</Card.Title> </Card.Header >
                                <Card.Body className='p-5 homeCard'>
                                    <Card.Text className='py-2'>
                                        <Card.Img src={writtingImg} />
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <small className="text-muted">Last updated 3 mins ago</small>
                                </Card.Footer>
                            </Card>
                        </Col>
                        <Col lg={3} className='d-inline p-3'>
                            <Card className='homeCardBorder'>
                                <Card.Header className='p-4 text-center homeCardHeader homeCardBorder'><Card.Title>語彙</Card.Title> </Card.Header >
                                <Card.Body className='p-5'>
                                    <Card.Text className='py-2'>
                                        <Card.Img src={writtingImg} />
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer>
                                    <small className="text-muted">Last updated 3 mins ago</small>
                                </Card.Footer>
                            </Card>
                        </Col>
                    </Row >
                </Container>
            </>
        )
    }

    return (
        <>
            <NavBar
                func={function () {
                    setHasChanged(!hasChanged);
                }} />
            {getPage()}
        </>
    )
}

export default Home;