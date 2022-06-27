import "bootstrap/dist/css/bootstrap.min.css";
import "./NavigationBar.css";
import { Button } from "react-bootstrap";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

function NavigationBar(props) {
  function Logout() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("Signout successful");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/" className="link">
            Chat App
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link to="/messages" className="link">
              Messages
            </Link>
            <Link to="/friends" className="link">
              Friends
            </Link>
          </Nav>
          <Nav>
            <Link to="/account" className="link">
              Account
            </Link>
            <Button variant="link" className="logout-button" onClick={Logout}>
              <Link to="/login" className="link">
                Log out
              </Link>
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
