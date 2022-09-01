import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import logo from "../../../logo.png";

function Navigation() {
  /*
    const [auth, setAuth] = useContext(AuthContext);
    const navigate = useNavigate();

    function logout() {
      setAuth(null);
      navigate"/
    }
  */
  return (
    <Navbar className="navbar" bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img className="navbar__logo" src={logo} alt="Logo for Holidaze" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="justify-content-end">
            <Nav.Item>
              <Nav.Link href="/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/establishments">Establishments</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/contact">Contact</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/login">Sign in</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    /* <Nav className="justify-content-end">
      <Nav.Item>
        <Nav.Link href="/" activeKey="/" className="nav__link">
          Home
        </Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <Nav.Link href="/establishments">Establishments</Nav.Link>
      </Nav.Item>

      <Nav.Item>
        <NavLink href="/contact">Contact</NavLink>
      </Nav.Item>
      <NavLink to="/login">Sign in</NavLink>

      {
        (auth = (
          <>
            <NavLink
              to="/admin/contact-messages"
              className={({ isActive }) =>
                isActive ? activeClassName : undefined
              }
            >
              Messages
            </NavLink>

            <NavLink
              to="/admin/enquiries"
              className={({ isActive }) =>
                isActive ? activeClassName : undefined
              }
            >
              Enquiries
            </NavLink>

            <NavLink
              to="/admin/new-establishment"
              className={({ isActive }) =>
                isActive ? activeClassName : undefined
              }
            >
              Create new establishment
            </NavLink>

            <button onClick={logout} className="nav__btn-logout"></button>
          </>
        ))
      } */
  );
}

export default Navigation;
