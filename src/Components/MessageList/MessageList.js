import "./MessageList.css";
import { Button } from "react-bootstrap";
import FriendsListModal from "./MessageListModal";
import React, { useState } from "react";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import * as utilities from "../Utilities/FireStoreUtilities";

function MessageList() {
  const [modalShow, setModalShow] = useState(false);
  const [contactList, setContactList] = useState([]);

  //This function is called everytime the user document changes
  const auth = getAuth();
  onSnapshot(doc(getFirestore(), "users", auth.currentUser.uid), (doc) => {
    setContactList(doc.data().contactlist);
  });

  return (
    <div>
      <div className="friends-list">
        <h3>Message List</h3>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          Start Conversation
        </Button>
        <FriendsListModal show={modalShow} onHide={() => setModalShow(false)} />
        {contactList.map((contact) => (
          <div key={contact}>{contact}</div>
        ))}
      </div>
    </div>
  );
}

export default MessageList;
