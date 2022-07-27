import React, { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import "./MessageListMobile.css";
import MessageList from "../MessageList/MessageList";

function MessageListMobile(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  //Gets the user to meessage
  function getUserToMessage(userID, displayName) {
    props.returnUserToMessage(userID, displayName);
  }

  return (
    <>
      <Button variant="primary" onClick={toggleShow} className="me-2">
        Messages
      </Button>
      <Offcanvas show={show} onHide={handleClose} scroll={true}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <MessageList returnUserToMessage={getUserToMessage} />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default MessageListMobile;
