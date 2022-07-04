import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import "./Home.css";
import React, { useState } from "react";
import ChatBox from "../../Chat/ChatBox";
import MessageList from "../../MessageList/MessageList";

function Home() {
  const [message, setMessage] = useState("");

  function sendMessage(event) {
    event.preventDefault();
    console.log(message);
  }

  return (
    <div className="page-content">
      <div className="grid-item">
        <MessageList />
      </div>

      <div className="grid-item">
        <ChatBox />

        <div>
          <Form onSubmit={sendMessage}>
            <Form.Group className="mb-3" controlId="formMessage">
              <Form.Control
                type="message"
                placeholder="Message"
                onChange={(e) => setMessage(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Home;
