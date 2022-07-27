import "./UserCard.css";
import { Button, CloseButton } from "react-bootstrap";
import * as utilities from "../Utilities/FireStoreUtilities";
import { getAuth } from "firebase/auth";

function UserCard(props) {
  function handleRemoveButton() {
    utilities.removeContact(getAuth().currentUser.uid, props.userID);
  }

  //Passing the userID of user to message to the function in the parent component
  function messageUser() {
    props.returnUserToMessage(props.userID, props.displayName);
  }

  return (
    <div className="button-container">
      <Button
        variant="secondary"
        className="user-message-button"
        onClick={messageUser}
      >
        {props.displayName}
      </Button>
      <CloseButton
        className="remove-contact-button"
        onClick={handleRemoveButton}
      />
    </div>
  );
}

export default UserCard;
