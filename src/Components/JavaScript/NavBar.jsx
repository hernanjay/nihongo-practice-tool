import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import '../CSS/NavBar.css';

function appNavBar(props) {
    return (
        <Navbar expand="lg" className="navbar nav-bar-bg shadow sticky-top text-center" data-bs-theme="dark">
            <Container className=' justify-content-center justify-content-lg-between'>
                <span>
                    <Nav>
                        <Navbar.Brand className='d-none d-lg-flex'>
                            <img
                                src="https://media.tenor.com/WBFzeBqRZgYAAAAi/gudetama-busy.gif"
                                width="40"
                                height="40"
                                alt='Nihongo Practice Tool Logo'
                            />
                        </Navbar.Brand>
                        <Navbar.Brand className='fs-2 display-1 text-center ' as={NavLink} to="/home" onClick={(e) => {
                            props.func();
                        }}>N4・日本語・練習用・ツール
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    </Nav>
                </span>
                <span>
                    <Navbar.Collapse id="basic-navbar-nav text-center">
                        <Nav className="me-auto">
                            <Nav.Link as={NavLink} to="/kanji" onClick={(e) => {
                                props.func();
                            }}>漢字 ー＞ 平仮名</Nav.Link>
                            <Nav.Link as={NavLink} to="/hiragana" onClick={(e) => {
                                props.func();
                            }}>平仮名 ー＞ 漢字</Nav.Link>
                            <Nav.Link as={NavLink} to="/vocab" onClick={(e) => {
                                props.func();
                            }}>語彙</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </span>
            </Container>
        </Navbar>
    );
}

export default appNavBar;