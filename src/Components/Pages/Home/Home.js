import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import "./Home.css";
import React, { useState } from "react";
import ChatBox from "../../Chat/ChatBox";

function Home(props) {
  const [message, setMessage] = useState("");

  function sendMessage(event) {
    event.preventDefault();
    console.log(message);
  }

  return (
    <div className="page-content">
      <h1>Home</h1>

      <ChatBox />

      <div className="chat-form">
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
  );
}

export default Home;
