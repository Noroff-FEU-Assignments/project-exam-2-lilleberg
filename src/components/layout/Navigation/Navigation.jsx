import { useContext, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "../../../logo.png";
import Container from "react-bootstrap/Container";
import AuthContext from "../../../context/AuthContext";

function Navigation() {
  const [auth, setAuth] = useContext(AuthContext);
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    setAuth(null);
    navigate("/");
  };

  const handleSetExpanded = () => {
    setExpanded(expanded ? false : true);
  };

  return (
    <Navbar bg="light" expand="lg" expanded={expanded}>
      <Container fluid className="container-nav flex-lg-column p-0">
        <Navbar.Brand href="/" className="navbar__brand me-lg-auto">
          <img className="navbar__logo" src={logo} alt="Logo for Holidaze" />
        </Navbar.Brand>
        <Navbar.Toggle
          className="border-0"
          aria-controls="basic-navbar-nav"
          onClick={() => {
            handleSetExpanded();
          }}
        >
          <div id="hamb-icon">
            <span className="line1" id="line1"></span>
            <span className="line2" id="line2"></span>
            <span className="line3" id="line3"></span>
            <span className="line4" id="line4"></span>
          </div>
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav
            className="nav justify-content-start align-items-center justify-content-lg-center"
            onClick={() => setExpanded(false)}
          >
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
                    Add establishment
                  </NavLink>
                </Nav.Item>
                <button
                  onClick={logout}
                  className="nav__link nav__btn--logout italic border-0"
                >
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
