import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./Login.css";
import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import React, { useState } from "react";

function Login() {
  //State for email and password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //State for if an login error occurs
  const [loginError, setLoginError] = useState(false);

  //Logs in users and sets their authentication persistence
  function setAuthPersistence() {
    const auth = getAuth();
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        // Existing and future Auth states are now persisted in the current
        // session only. Closing the window would clear any existing state even
        // if a user forgets to sign out.
        // ...
        // New sign-in will be persisted with local persistence.
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in
          })
          .catch((error) => {
            setLoginError(true);
          });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  }

  return (
    <div className="main-content-login">
      <Form className="login-form">
        <h2 className="form-title-login">Log in to Chat-App!</h2>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="form-subtitle-login">Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="form-subtitle-login">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Link to="/" className="login-button">
          <Button variant="primary" onClick={setAuthPersistence}>
            Log in
          </Button>
        </Link>

        {loginError && (
          <p className="error-message-login">Incorrect email or password</p>
        )}

        <Link to="/signup" className="signup-link">
          Click here to Signup
        </Link>
      </Form>
    </div>
  );
}

export default Login;
