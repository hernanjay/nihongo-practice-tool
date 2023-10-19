import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import '../CSS/NavBar.css';

function appNavBar(props) {
    return (
        <Navbar expand="lg" className="nav-bar-bg shadow sticky-top" data-bs-theme="dark">
            <Container>
                <Navbar.Brand>
                    <img
                        src="https://lh3.googleusercontent.com/pw/ADCreHc5GyLsgFoMqdJ-gynEOsX9iKcbD5YCXUDNfsq2pJZpPZBKUr6q-G6WLeiIbKw9DZ7Aqo_8Lm20u-tKLj8INWUTDVlZ_kuWggWgurGuyMwbPWXeGo9N0GTZsfMFA3d-uL0qCXdHQx0vIQCzpzOLzT3-TbKs_GfAgUuCBMEfk9y_Odqe9WrDKEbkLW3Aw95P8Y_Z7SFN-rz5lIuMhfkn0pN-bgmkaXAZfYCJ6kwowa2NzjabH9ecFgwdOmHdZAW_z7ekIc3KxLO2kHsUTcypk-q5c8mlZQQYZVtwwlgVL0KykZZyx9qic-84OR-82vwJ-Zse8hEhXyQDyMlaSMaMWMmFK0m8PDRJmxXCIUvEwKDQ4jK0VQLOpDkgq1X2NvtlQLJ7Qx10RxwGYp0qDjHn6Ok7KW04tfmVr5dXQZNMX6hjEvoIHJHWtBcBEWF4AE16aFKV53W8KlS8ID4w9d1OhwQy0hkIicNVB6b4BOi4ULijXgglusRmM1O2qfqklu1c-NWmXBMq1qkZiWCjIJk6GooSfLmq_uusswGcgr_LjBMHO2m2cS8-gzXk3mkTaUBAPDfUX0tx-2WBxIUc-g-RtQvpZyvGFk1uEdQx1DlD1ceMQR4tPkVpe0985QZ1h9mWztdoobKYZCojJO52GqSCHj_L0W6d0oi9L8irlS2oFXnVkjKM91OuQ-rPO8I5-Vxq6im9t92hnooUR9GhuuGoefKpOfM_j-atWp6ShuDrtuYI7fGa6gsdDxKt9Urn9k2xvrdgg9Ev-amKXVDUROgJ1Mkz5T4e7eBUCx-AkCIcdjvfc3NJtWvQ63D6Ul68O5UNN4t7plFtgLX3o1HwWK7eX-2C-a5bSsSB2uCDK7HW84gZ2C_cJ24WNGXyqiHp_WVn2LEO5ab6t9CImtoQHL3yDFIruiAETOTRKEcZydYBmfeP0XldoaiTrLEBzQ=w435-h329-s-no-gm?authuser=0"
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