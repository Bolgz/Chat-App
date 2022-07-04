import { Modal, Button } from "react-bootstrap";
import React, { useState } from "react";
import * as utilities from "../Utilities/FireStoreUtilities";
import FoundUser from "./FoundUser";

function FriendsListModal(props) {
  //State for username to search for
  const [username, setUsername] = useState("");
  const [userFoundId, setUserFoundId] = useState("");
  const [searchError, setSearchError] = useState(false);

  async function searchForUser() {
    setUserFoundId("");
    setSearchError(false);
    //Search for user
    const result = await utilities.getUserIdFromDisplayName(username);
    if (result) {
      setUserFoundId(result);
    } else {
      setSearchError(true);
    }
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Find a user
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input onChange={(e) => setUsername(e.target.value)}></input>
        <Button onClick={searchForUser}>Search</Button>
        <div>{searchError ? "User not found" : " "}</div>
        <FoundUser userID={userFoundId} userDisplayName={username} />
      </Modal.Body>
    </Modal>
  );
}

export default FriendsListModal;
