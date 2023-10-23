import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import '../CSS/NavBar.css';

function userLogInMenu(props) {
    if (props.isLoggedIn) {
        return (
            <>
                <Nav.Link as={NavLink} to="/home" onClick={(e) => {
                    props.func();
                }}>{props.userName}</Nav.Link>
                <Nav.Link as={NavLink} to="/logout" onClick={(e) => {
                    props.setIsLoggedIn(false);
                    props.setUserName('');
                    props.func();
                }}>Logout</Nav.Link>
            </>
        )
    } else {
        return (
            <>
                <Nav.Link as={NavLink} to="/login" onClick={(e) => {
                    props.func();
                }}>Login</Nav.Link>
                <Nav.Link as={NavLink} to="/register" onClick={(e) => {
                    props.func();
                }}>Register</Nav.Link>
            </>
        )
    }
}

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
                        <Navbar.Brand className='fs-2 display-1 text-center py-3 py-md-1' as={NavLink} to="/home" onClick={(e) => {
                            props.func();
                        }}>N4・日本語・練習用・ツール
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav " className="my-2 my-md-1" />
                    </Nav>
                </span>
                <span>
                    <Navbar.Collapse id="basic-navbar-nav text-center ">
                        <Nav className="me-auto py-3 py-md-1">
                            <Nav.Link as={NavLink} to="/kanji" onClick={(e) => {
                                props.func();
                            }}>漢字 ー＞ 平仮名</Nav.Link>
                            <Nav.Link as={NavLink} to="/hiragana" onClick={(e) => {
                                props.func();
                            }}>平仮名 ー＞ 漢字</Nav.Link>
                            <Nav.Link as={NavLink} to="/vocab" onClick={(e) => {
                                props.func();
                            }}>語彙</Nav.Link>
                            {userLogInMenu(props)}
                        </Nav>
                    </Navbar.Collapse>
                </span>
            </Container>
        </Navbar>
    );
}

export default appNavBar;