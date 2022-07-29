import "./ChatBox.css";
import Message from "./Message";

function ChatBox(props) {
  if (props.messages.length > 0) {
    return (
      <div className="chat-area">
        {props.messages.map((message) => (
          <Message
            key={Math.random()}
            message={message.Message}
            recepient={message.Recepient}
            sender={message.Sender}
          />
        ))}
      </div>
    );
  } else {
    if (props.currentlyMessaging !== "") {
      return (
        <div className="chat-area">
          <p className="chatbox-header">
            Chatting with {props.currentlyMessaging}
          </p>
        </div>
      );
    } else {
      return (
        <div className="chat-area">
          <p className="chatbox-header">Start chatting with someone!</p>
        </div>
      );
    }
  }
}

export default ChatBox;
