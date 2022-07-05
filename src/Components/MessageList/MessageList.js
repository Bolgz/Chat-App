import "./MessageList.css";
import { Button } from "react-bootstrap";
import MessageListModal from "./MessageListModal";
import React, { useState, useEffect } from "react";
import { doc, getFirestore, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import * as utilities from "../Utilities/FireStoreUtilities";
import { flushSync } from "react-dom";

function MessageList() {
  const [modalShow, setModalShow] = useState(false);
  const [contactList, setContactList] = useState([]);
  const [displayNames, setDisplayNames] = useState([]);

  const auth = getAuth();

  async function getContactListDisplayNames() {
    const contactIds = await utilities.getContactList(auth.currentUser.uid);

    //Get display names for each contact
    let displayNamesTemp = [];

    await Promise.all(
      contactIds.map(async (contactID) => {
        const userRef = doc(getFirestore(), "users", contactID);
        const docSnap = await getDoc(userRef);
        displayNamesTemp.push(docSnap.data().displayname);
      })
    );

    setDisplayNames(displayNamesTemp);
    console.log("CALLED");
  }

  return (
    <div>
      <div className="friends-list">
        <h3>Message List</h3>
        <Button variant="primary" onClick={() => setModalShow(true)}>
          Start Conversation
        </Button>
        <MessageListModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          updatemessagelist={getContactListDisplayNames}
        />
        {displayNames.map((displayName) => (
          <p key={displayName}>{displayName}</p>
        ))}
      </div>
      <button onClick={getContactListDisplayNames}>Refresh Message List</button>
    </div>
  );
}

export default MessageList;
