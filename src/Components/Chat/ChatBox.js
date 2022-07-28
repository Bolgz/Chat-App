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
    return (
      <div className="chat-area">
        <p>No messages yet</p>
      </div>
    );
  }
}

export default ChatBox;
