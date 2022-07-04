import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAuth, signOut, updateProfile } from "firebase/auth";
import "./DetailsForm.css";
import React, { useState } from "react";
import * as utilities from "../../Utilities/FireStoreUtilities";

function DetailsForm() {
  //State for username
  const [username, setUsername] = useState("");

  //State for if an signup error occurs
  const [usernameError, setusernameError] = useState("");

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

  async function handleSubmit() {
    //Make sure username is longer than 2 characters
    if (username.length < 3) {
      setusernameError("Username must be at least 3 characters");
      return;
    } else {
      setusernameError("");

      //Check if username is already taken
      const result = await utilities.checkDisplayName(username);
      if (result) {
        setusernameError("Username already exists");
        return;
      }

      //Set user's display name in Firestore
      const auth = getAuth();
      utilities.setDisplayName(auth.currentUser.uid, username);
      updateProfile(auth.currentUser, {
        displayName: username,
      })
        .then(() => {
          console.log("Profile updated: ", username);
          //Navigate to home page
          window.location.pathname = "/";
        })
        .catch((error) => {
          // An error occurred
          console.log("Error updating profile: ", error);
        });
    }
  }

  //Gets the appropriate error message for the signup error
  function getSignupErrorMessage() {
    if (usernameError === "Firebase: Error (auth/email-already-in-use).") {
      return <p className="error-message-signup">Email already in use</p>;
    } else if (usernameError === "Firebase: Error (auth/invalid-email).") {
      return <p className="error-message-signup">Invalid email</p>;
    } else if (
      usernameError ===
      "Firebase: Password should be at least 6 characters (auth/weak-password)."
    ) {
      return <p className="error-message-signup">Password is too weak</p>;
    } else if (usernameError === "Firebase: Error (auth/missing-password).") {
      return <p className="error-message-signup">Password is missing</p>;
    } else if (usernameError === "Firebase: Error (auth/missing-email).") {
      return <p className="error-message-signup">Email is missing</p>;
    } else if (usernameError === "Username is too short") {
      return <p className="error-message-signup">Username is too short</p>;
    } else if (usernameError === "Username must be at least 3 characters") {
      return <p className="error-message-signup">Username is too short</p>;
    } else if (usernameError === "Username already exists") {
      return <p className="error-message-signup">Username is taken</p>;
    }
  }

  return (
    <div className="main-content-details">
      <Button variant="link" className="logout-button-details" onClick={Logout}>
        <Link to="/login" className="link">
          Log out
        </Link>
      </Button>

      <Form className="signup-form">
        <h2 className="form-title-details">Pick a Username!</h2>

        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label className="form-subtitle-details">Username</Form.Label>
          <Form.Control
            type="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Form.Text className="text-muted-details">
            Your username will be public.
          </Form.Text>
        </Form.Group>

        {getSignupErrorMessage()}

        <div className="submit-button-details">
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default DetailsForm;
