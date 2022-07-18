import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import "./Home.css";
import React, { useState, useEffect } from "react";
import ChatBox from "../../Chat/ChatBox";
import MessageList from "../../MessageList/MessageList";
import MessageListMobile from "../../MobileMessageList/MessageListMobile";

function Home() {
  const [message, setMessage] = useState("");
  const [shouldShowFriendsList, setShouldShowFriendsList] = useState(true);

  function sendMessage(event) {
    event.preventDefault();
    console.log(message);
  }

  //Handles the toggle of the friends list based upon current screen size
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 992) {
        setShouldShowFriendsList(false);
      } else {
        setShouldShowFriendsList(true);
      }
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="page-content">
      <div className="grid-item">
        {shouldShowFriendsList ? <MessageList /> : <MessageListMobile />}
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
