import { Button } from "react-bootstrap";
import * as utilities from "../Utilities/FireStoreUtilities";
import { getAuth } from "firebase/auth";

async function FoundUser(props) {
  function messageUser() {
    // const auth = getAuth();
    // utilities.getUserDataFromUserId(auth.currentUser.uid).then((user) => {
    //   //Check if userID is already in contact list
    //   console.log(user.contactlist);
    //   // if (!user.includes(props.userID)) {
    //   //   utilities.addContact(auth.currentUser.uid, props.userID);
    //   // }
    // });
  }

  //If user is found, show the user's profile
  if (props.userID) {
    return (
      <div>
        <p>User Found</p>
        <div>
          <p>User ID: {props.userID}</p>
          <p>User Display Name: {props.userDisplayName}</p>
        </div>
        <Button onClick={messageUser}>Message User</Button>
      </div>
    );
  }
}

export default FoundUser;
