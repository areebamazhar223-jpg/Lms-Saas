import { useState } from "react";
import { Send, Bot, User, Loader2 } from "lucide-react";
import "./ChatBox.css";

const API_URL = "http://localhost:5000/api/ai/chat";

function ChatBox() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hi! 👋 I'm your LMS AI Assistant. How can I help you with your courses, lessons, enrollment, or assignments?",
    },
  ]);

  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();

    const text = message.trim();

    if (!text || loading) {
      return;
    }

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      const botMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text:
          data.message ||
          "Sorry, I could not understand your question.",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("AI Assistant Error:", error);

      const errorMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text: "Sorry! 😕 I am unable to connect to the AI Assistant right now. Please try again.",
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbox">
      {/* Header */}
      <div className="chatbox-header">
        <div className="chatbox-bot-icon">
          <Bot size={22} />
        </div>

        <div>
          <h3>AI Assistant</h3>
          <span>
            <span className="online-dot"></span>
            Online
          </span>
        </div>
      </div>

      {/* Messages */}
      <div className="chatbox-messages">
        {messages.map((item) => (
          <div
            key={item.id}
            className={`chat-message ${
              item.sender === "user"
                ? "user-message"
                : "bot-message"
            }`}
          >
            <div className="message-icon">
              {item.sender === "user" ? (
                <User size={17} />
              ) : (
                <Bot size={17} />
              )}
            </div>

            <div className="message-content">
              {item.text}
            </div>
          </div>
        ))}

        {/* Loading */}
        {loading && (
          <div className="chat-message bot-message">
            <div className="message-icon">
              <Bot size={17} />
            </div>

            <div className="message-content typing">
              <Loader2 size={16} className="loading-icon" />
              Thinking...
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form
        className="chatbox-input-area"
        onSubmit={sendMessage}
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask me anything..."
          disabled={loading}
        />

        <button
          type="submit"
          disabled={!message.trim() || loading}
          aria-label="Send message"
        >
          <Send size={19} />
        </button>
      </form>
    </div>
  );
}

export default ChatBox;