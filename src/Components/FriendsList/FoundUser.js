import { Button } from "react-bootstrap";

function FoundUser(props) {
  function messageUser() {
    console.log("Messaging user");
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
