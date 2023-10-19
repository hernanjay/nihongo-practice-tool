import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../CSS/NavBar.css';

function appNavBar() {
    return (
        <Navbar expand="lg" className="nav-bar-bg shadow sticky-top" data-bs-theme="dark">
            <Container>
                <Navbar.Brand>
                    <img
                        src="../../../mylogo.png"
                        width="50"
                        height="40"
                        className="d-inline-block"
                        alt='Nihongo Practice Tool Logo'
                    />
                </Navbar.Brand>
                <Navbar.Brand>N4 Nihongo Practice Tool</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="kanji">Kan to Hir</Nav.Link>
                        <Nav.Link href="hiragana">Hir to Kan</Nav.Link>
                        <Nav.Link href="vocab">Vocab</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default appNavBar;