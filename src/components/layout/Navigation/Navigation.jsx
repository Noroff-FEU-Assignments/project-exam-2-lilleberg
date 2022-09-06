import React, { useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "../../../logo.png";
import Container from "react-bootstrap/Container";
import AuthContext from "../../../context/AuthContext";

function Navigation() {
  const [auth, setAuth] = useContext(AuthContext);
  const navigate = useNavigate();

  function logout() {
    setAuth(null);
    navigate("/");
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid className="container-nav">
        <Navbar.Brand href="/" className="navbar__brand">
          <img className="navbar__logo" src={logo} alt="Logo for Holidaze" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav justify-content-end align-items-end">
            <Nav.Item className="nav__item">
              <NavLink to="/" className="nav__link">
                Home
              </NavLink>
            </Nav.Item>

            <Nav.Item className="nav__item">
              <NavLink to="/establishments" className="nav__link">
                Establishments
              </NavLink>
            </Nav.Item>

            <Nav.Item className="nav__item">
              <NavLink to="/contact" className="nav__link">
                Contact
              </NavLink>
            </Nav.Item>

            {auth ? (
              <>
                <Nav.Item className="nav__item">
                  <NavLink to="/admin/contact-messages" className="nav__link">
                    Messages
                  </NavLink>
                </Nav.Item>
                <Nav.Item className="nav__item">
                  <NavLink to="/admin/enquiries" className="nav__link">
                    Enquiries
                  </NavLink>
                </Nav.Item>
                <Nav.Item className="nav__item">
                  <NavLink to="/admin/new-establishment" className="nav__link">
                    New establishment
                  </NavLink>
                </Nav.Item>
                <button onClick={logout} className="btn nav__btn--logout">
                  Log out
                </button>
              </>
            ) : (
              <Nav.Item className="nav__item">
                <NavLink to="/login" className="nav__link">
                  Sign in
                </NavLink>
              </Nav.Item>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
