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

function Home() {
  const [message, setMessage] = useState("");
  const [shouldShowFriendsList, setShouldShowFriendsList] = useState(true);
  //Sets the user to message ID
  const [userToMessageID, setUserToMessageID] = useState("");
  //Messages to display in Message Box
  const [messages, setMessages] = useState([]);

  const auth = getAuth();

  function sendMessage(event) {
    event.preventDefault();
    if (userToMessageID !== "") {
      utilities.sendMessage(
        getAuth().currentUser.uid,
        userToMessageID,
        message
      );
    }
  }

  //Gets the user to message & retrieves their conversation
  function getUserToMessage(userID, displayName) {
    setUserToMessageID(userID);

    retrieveMessages(userID, displayName);
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
          setMessages(["You have started a conversation with " + displayName]);
        } else {
          if (conversation.length > 0) {
            const listOfMessages = [];
            conversation.forEach((message) => {
              listOfMessages.push([message.message, message.sender]);
            });
            setMessages(listOfMessages);
          } else {
            setMessages([
              "You have started a conversation with " + displayName,
            ]);
          }
        }
      });
  }

  useEffect(() => {
    //Set up a document listener to for user contact list
    const unsub = onSnapshot(
      doc(getFirestore(), "users", auth.currentUser.uid),
      (doc) => {
        //Set up listeners for conversations between the user and each contact
        let combinations = [];
        //Get each possible combination of the user and each contact in the contact list
        doc.data().contactlist.forEach((contact) => {
          combinations.push(
            [contact.contactId, auth.currentUser.uid],
            [auth.currentUser.uid, contact.contactId]
          );
        });
        //If one of the combinations is a conversation, set up a listener for it
      }
    );
  }, []);

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
        {shouldShowFriendsList ? (
          <MessageList returnUserToMessage={getUserToMessage} />
        ) : (
          <MessageListMobile returnUserToMessage={getUserToMessage} />
        )}
      </div>

      <div className="grid-item">
        <ChatBox messages={messages} />

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
