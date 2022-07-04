import "./MessageList.css";
import { Button } from "react-bootstrap";
import FriendsListModal from "./MessageListModal";
import React, { useState } from "react";

function FriendsList() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div>
      <div className="friends-list">
        <h3>Message List</h3>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          Start Conversation
        </Button>
        <FriendsListModal show={modalShow} onHide={() => setModalShow(false)} />
      </div>
    </div>
  );
}

export default FriendsList;
