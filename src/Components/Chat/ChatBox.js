import "./ChatBox.css";

function ChatBox(props) {
  return <div className="chat-area">{props.messages}</div>;
}

export default ChatBox;
