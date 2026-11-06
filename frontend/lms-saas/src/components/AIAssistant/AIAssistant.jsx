import { useState, useRef, useEffect } from "react";
import { Bot, X, Send, Minimize2, Loader2 } from "lucide-react";
import "./AIAssistant.css";

const API_URL = "http://localhost:5000/api/ai/chat";

function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "Hi! 👋 I'm your AI Course Assistant. I can help you with courses, enrollment, lessons, assignments, progress, and more.",
    },
  ]);

  const messagesEndRef = useRef(null);

  // ===============================
  // Auto Scroll
  // ===============================

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  // ===============================
  // Send Message
  // ===============================

  const handleSend = async (customMessage = null) => {
    const trimmedMessage = (
      customMessage !== null ? customMessage : message
    ).trim();

    if (!trimmedMessage || loading) {
      return;
    }

    // User message
    const userMessage = {
      id: Date.now(),
      sender: "user",
      text: trimmedMessage,
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
          message: trimmedMessage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "AI Assistant request failed"
        );
      }

      const aiMessage = {
        id: Date.now() + 1,
        sender: "ai",
        text:
          data.message ||
          "Sorry, I could not understand your question.",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("AI Assistant Error:", error);

      const errorMessage = {
        id: Date.now() + 1,
        sender: "ai",
        text: "Sorry! 😕 I couldn't connect to the AI Assistant. Please make sure your backend server is running.",
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // Enter Key
  // ===============================

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // ===============================
  // Suggestion
  // ===============================

  const handleSuggestion = (text) => {
    setMessage(text);
    handleSend(text);
  };

  return (
    <>
      {/* ===============================
          Floating Button
      =============================== */}

      {!isOpen && (
        <button
          type="button"
          className="ai-floating-button"
          onClick={() => setIsOpen(true)}
          aria-label="Open AI Assistant"
          aria-expanded={isOpen}
          aria-controls="learnsmart-ai-panel"
        >
          <Bot size={27} />

          <span className="ai-online-dot"></span>
        </button>
      )}

      {/* ===============================
          AI Assistant
      =============================== */}

      {isOpen && (
        <div className="ai-assistant-container" id="learnsmart-ai-panel" role="dialog" aria-label="LearnSmart AI Assistant">

          {/* Header */}

          <div className="ai-header">

            <div className="ai-header-info">

              <div className="ai-icon">
                <Bot size={22} />
              </div>

              <div>
                <h3>LearnSmart Assistant</h3>

                <span>
                  <span className="status-dot"></span>
                  Online
                </span>
              </div>

            </div>

            <div className="ai-header-actions">

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Minimize AI Assistant"
              >
                <Minimize2 size={18} />
              </button>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close AI Assistant"
              >
                <X size={19} />
              </button>

            </div>

          </div>

          {/* Messages */}

          <div className="ai-messages">

            {messages.map((item) => (
              <div
                key={item.id}
                className={`ai-message-row ${
                  item.sender === "user"
                    ? "user-row"
                    : "ai-row"
                }`}
              >

                {item.sender === "ai" && (
                  <div className="message-avatar">
                    <Bot size={16} />
                  </div>
                )}

                <div
                  className={`ai-message ${
                    item.sender === "user"
                      ? "user-message"
                      : "assistant-message"
                  }`}
                >
                  {item.text}
                </div>

              </div>
            ))}

            {/* Loading */}

            {loading && (
              <div className="ai-message-row ai-row">

                <div className="message-avatar">
                  <Bot size={16} />
                </div>

                <div className="ai-message assistant-message ai-loading">
                  <Loader2
                    size={16}
                    className="ai-loading-icon"
                  />

                  <span>Thinking...</span>
                </div>

              </div>
            )}

            <div ref={messagesEndRef}></div>

          </div>

          {/* Suggestions */}

          <div className="ai-suggestions">

            <button
              type="button"
              disabled={loading}
              onClick={() =>
                handleSuggestion(
                  "How can I enroll in a course?"
                )
              }
            >
              How do I enroll?
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() =>
                handleSuggestion(
                  "Where can I submit my assignment?"
                )
              }
            >
              Assignment help
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() =>
                handleSuggestion(
                  "Where can I find my courses?"
                )
              }
            >
              My courses
            </button>

          </div>

          {/* Input */}

          <div className="ai-input-area">

            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about your course..."
              rows="1"
              disabled={loading}
            />

            <button
              type="button"
              className="ai-send-button"
              onClick={() => handleSend()}
              disabled={!message.trim() || loading}
              aria-label="Send message"
            >
              {loading ? (
                <Loader2
                  size={18}
                  className="ai-loading-icon"
                />
              ) : (
                <Send size={18} />
              )}
            </button>

          </div>

          {/* Footer */}

          <div className="ai-footer">
            AI Course Assistant can help you navigate your LMS.
          </div>

        </div>
      )}
    </>
  );
}

export default AIAssistant;
