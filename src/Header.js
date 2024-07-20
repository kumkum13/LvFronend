import React, { useEffect, useCallback, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import axios from "axios";
import { UserContext } from "./UserContext";
import "./navbar.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { baseURL } from './Url';

function Header() {
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  const fetchCurrentUser = useCallback(() => {
    axios
      .get(`${baseURL}/current_user`, { withCredentials: true })
      .then((response) => {
        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
      })
      .catch((error) => console.error("Error fetching user:", error));
  }, [setUser]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      fetchCurrentUser();
    }
  }, [setUser, fetchCurrentUser]);

  const handleLogout = () => {
    axios
      .post(`${baseURL}/logout`, {}, { withCredentials: true })
      .then((response) => {
        if (response.data.status === "Logged out successfully") {
          setUser(null);
          localStorage.removeItem("user");
          navigate("/");
        }
      })
      .catch((error) => console.error("Error logging out:", error));
  };

  return (
    <Navbar expand="lg" className="nav">
      <Navbar.Brand as={Link} to="/" className="clr">
        <img
          src="./img/logo.png"
          width="20%"
          height="20%"
          className="d-inline-block align-top"
          alt="VijayiBhav Logo"
          style={{
            marginLeft: "4%",
            width:"100%",
          }}
        />
      </Navbar.Brand>
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        className="navbar-toggler-custom"
      >
        <i className="fa-solid fa-bars"></i> {/* Custom FontAwesome icon */}
      </Navbar.Toggle>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="navlinks">
          <Nav.Link
            as={Link}
            to="/"
            className={`clr ${currentPath === "/" ? "active" : ""}`}
          >
            Home
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/resources"
            className={`clr ${currentPath === "/resources" ? "active" : ""}`}
          >
            Resources
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/languages"
            className={`clr ${currentPath === "/languages" ? "active" : ""}`}
          >
            Languages
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/about"
            className={`clr ${currentPath === "/about" ? "active" : ""}`}
          >
            About Us
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/contact"
            className={`clr ${currentPath === "/contact" ? "active" : ""}`}
          >
            Contact Us
          </Nav.Link>
        </Nav>
        <Nav className="Drop-Down">
          {user ? (
            <NavDropdown
              title={
                <div className="user-info">
                  <span className="name-span">
                    Hello! {user.name}
                  </span>
                  <img
                    src={user.image || "/img/userpic.jpg"}
                    alt="user"
                    className="user-image"
                  />
                </div>
              }
              id="user-dropdown"
              className="user-dropdown"
            >
              <NavDropdown.Item
                as={Link}
                to="/dashboard"
                className={`${currentPath === "/dashboard" ? "active" : ""}`}
              >
                <b>Dashboard</b>
              </NavDropdown.Item>
              
              
              {(user.role === "owner" || user.role === "admin") && (
                <NavDropdown.Item
                  as={Link}
                  to="/Admin"
                  className={`${currentPath === "/Admin" ? "active" : ""}`}
                >
                
                  <b>Admin Panel</b>
                </NavDropdown.Item>
                
              )}
                <hr />
               <NavDropdown.Item onClick={handleLogout}>
                <b>Log Out</b>
              </NavDropdown.Item>
            </NavDropdown>
          ) : (
            <NavDropdown title="Account" className="account" >
              <NavDropdown.Item
                as={Link}
                to="/login"
                className={`${currentPath === "/login" ? "active" : ""}`}
              >
                <b>Login</b>
              </NavDropdown.Item>
              <NavDropdown.Item
                as={Link}
                to="/register"
                className={`${currentPath === "/register" ? "active" : ""}`}
              >
                <b>Register</b>
              </NavDropdown.Item>
              
              {/* Admin Panel link hidden for non-authenticated users */}
            </NavDropdown>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Header;
