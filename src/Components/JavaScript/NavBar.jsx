import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import '../CSS/NavBar.css';

function appNavBar(props) {
    return (
        <Navbar expand="lg" className="nav-bar-bg shadow sticky-top" data-bs-theme="dark">
            <Container>
                <Navbar.Brand >
                    <img
                        src="https://media.tenor.com/WBFzeBqRZgYAAAAi/gudetama-busy.gif"
                        width="40"
                        height="40"
                        className="d-inline-block"
                        alt='Nihongo Practice Tool Logo'
                    />
                </Navbar.Brand>
                <Navbar.Brand>N4 Nihongo Practice Tool</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/kanji" onClick={(e) => {
                            props.func();
                        }}>Kan to Hir</Nav.Link>
                        <Nav.Link as={NavLink} to="/hiragana" onClick={(e) => {
                            props.func();
                        }}>Hir to Kan</Nav.Link>
                        <Nav.Link as={NavLink} to="/vocab" onClick={(e) => {
                            props.func();
                        }}>Vocab</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default appNavBar;