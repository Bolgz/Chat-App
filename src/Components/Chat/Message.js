import "./Message.css";
import { getAuth } from "firebase/auth";

function Message(props) {
  const auth = getAuth();

  if (auth.currentUser.displayName === props.sender) {
    return (
      <div className="sentBubble">
        <p className="sentUserName">{props.sender}</p>
        <p className="sentMessage">{props.message}</p>
      </div>
    );
  } else {
    return (
      <div className="receivedBubble">
        <p className="receivedUserName">{props.sender}</p>
        <p className="receivedMessage">{props.message}</p>
      </div>
    );
  }
}

export default Message;
