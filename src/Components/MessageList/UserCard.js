import "./UserCard.css";
import { Button, CloseButton } from "react-bootstrap";
import * as utilities from "../Utilities/FireStoreUtilities";
import { getAuth } from "firebase/auth";

function UserCard(props) {
  function handleRemoveButton() {
    utilities.removeContact(getAuth().currentUser.uid, props.userID);
  }

  return (
    <div className="button-container">
      <Button variant="secondary" className="user-message-button">
        {props.displayName}
      </Button>
      <CloseButton
        className="remove-contact-button"
        onClick={handleRemoveButton()}
      />
    </div>
  );
}

export default UserCard;
