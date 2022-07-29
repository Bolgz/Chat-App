import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import "./Home.css";
import React, { useState, useEffect } from "react";
import ChatBox from "../../Chat/ChatBox";
import MessageList from "../../MessageList/MessageList";
import MessageListMobile from "../../MobileMessageList/MessageListMobile";
import { getAuth } from "firebase/auth";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import * as utilities from "../../Utilities/FireStoreUtilities";
import * as ReactDOM from "react-dom";

function Home() {
  const [message, setMessage] = useState("");
  const [shouldShowFriendsList, setShouldShowFriendsList] = useState(true);
  //Sets the user to message ID
  const [userToMessageID, setUserToMessageID] = useState("");
  //Sets the user to message name
  const [userToMessageName, setUserToMessageName] = useState("");
  //Messages to display in Message Box
  const [messages, setMessages] = useState([]);

  const auth = getAuth();

  //Sends message to Firestore
  function sendMessage(event) {
    event.preventDefault();
    if (userToMessageID !== "") {
      utilities.sendMessage(
        getAuth().currentUser.displayName, //Senders display name
        getAuth().currentUser.uid, //Senders ID
        userToMessageID, //Recepient's ID
        message //Message
      );
    }

    //Resets message box input on submit
    ReactDOM.findDOMNode(document.getElementById("message")).value = "";
  }

  //Gets the user-to-message & retrieves their conversation
  function getUserToMessage(userID, displayName) {
    setUserToMessageID(userID);

    retrieveMessages(userID, displayName);

    //Setup listener to get new messages
    onSnapshot(
      doc(getFirestore(), "conversations", auth.currentUser.uid + "-" + userID),
      (doc) => {
        retrieveMessages(userID, displayName);
      }
    );
    //Setup listener to get new messages
    onSnapshot(
      doc(getFirestore(), "conversations", userID + "-" + auth.currentUser.uid),
      (doc) => {
        retrieveMessages(userID, displayName);
      }
    );
  }

  //Retrieve messages if they exist. If not, create a new conversation
  function retrieveMessages(userID, displayName) {
    const auth = getAuth();

    //See if the user has a conversation with the userToMessageID
    utilities
      .getConversation(auth.currentUser.uid, userID)
      .then((conversation) => {
        if (!conversation) {
          //If the user doesn't have a conversation with the userToMessageID, create one
          utilities.createConversation(auth.currentUser.uid, userID);
        } else {
          if (conversation.length > 0) {
            const listOfMessages = [];

            conversation.forEach((message) => {
              listOfMessages.push({
                Message: message.message, //The message
                SenderID: message.sender, //The sender ID
                Recepient: displayName, //The display name of the recepient
                Sender: message.senderDN, //The display name of the sender
              });
            });
            setMessages(listOfMessages);
          }
        }
      });

    setUserToMessageName(displayName);
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
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="page-content">
      <div className="grid-item">
        {shouldShowFriendsList ? (
          <MessageList returnUserToMessage={getUserToMessage} />
        ) : (
          <MessageListMobile returnUserToMessage={getUserToMessage} />
        )}
      </div>

      <div className="grid-item">
        <ChatBox messages={messages} currentlyMessaging={userToMessageName} />

        <div>
          <Form onSubmit={sendMessage}>
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Message"
                onChange={(e) => setMessage(e.target.value)}
                id="message"
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
