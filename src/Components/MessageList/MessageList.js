import "./MessageList.css";
import { Button } from "react-bootstrap";
import MessageListModal from "./MessageListModal";
import React, { useState } from "react";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import UserCard from "./UserCard";

function MessageList() {
  const [modalShow, setModalShow] = useState(false);
  const [displayNames, setDisplayNames] = useState([]);

  const auth = getAuth();

  //Set up a document listener to get the user's contact list
  const unsub = onSnapshot(
    doc(getFirestore(), "users", auth.currentUser.uid),
    (doc) => {
      setDisplayNames(doc.data().contactlist);
    }
  );

  return (
    <div>
      <div className="friends-list">
        <h3>Message List</h3>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          Start Conversation
        </Button>
        <MessageListModal show={modalShow} onHide={() => setModalShow(false)} />
        {displayNames.map((displayName) => (
          <UserCard
            displayName={displayName.contactDisplayName}
            userID={displayName.contactId}
            key={displayName.contactId}
          />
        ))}
      </div>
    </div>
  );
}

export default MessageList;
