import React, { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import "./MessageListMobile.css";
import MessageList from "../MessageList/MessageList";

function MessageListMobile() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

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
          <MessageList />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default MessageListMobile;
