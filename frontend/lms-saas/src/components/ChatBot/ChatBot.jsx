import { useState, useEffect, useRef } from 'react';
import { Send, X, Minimize2, Maximize2, MessageCircle } from 'lucide-react';
import './ChatBot.css';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "👋 Hi! I'm your LearnSmart Assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Knowledge base for chatbot
  const knowledgeBase = {
    'courses': {
      keywords: ['courses', 'course', 'learning', 'classes', 'what courses'],
      response: "🎓 LearnSmart offers 300+ courses in categories like:\n• Web Development\n• Mobile Apps\n• UI/UX Design\n• Data Science\n• Digital Marketing\n• Cloud Computing\n\nWould you like to explore any specific category?"
    },
    'pricing': {
      keywords: ['price', 'pricing', 'cost', 'free', 'paid', 'fee'],
      response: "💰 Our pricing:\n• 2 courses are FREE (Web Basics & Design Intro)\n• Premium courses: Rs. 5,999 - Rs. 15,999\n• Discounts available: Up to 50% OFF\n• Lifetime access after purchase\n• 30-day money-back guarantee\n\nWhat course interests you?"
    },
    'enrollment': {
      keywords: ['enroll', 'sign up', 'register', 'join', 'how to start'],
      response: "📝 Easy enrollment process:\n1. Click 'Sign Up' on homepage\n2. Create your account\n3. Browse courses\n4. Click 'Enroll' on course page\n5. Complete payment (if paid)\n6. Start learning immediately!\n\nNeed help with anything else?"
    },
    'payment': {
      keywords: ['payment', 'pay', 'card', 'jazzcash', 'credit', 'debit', 'transaction'],
      response: "💳 Payment methods accepted:\n• Credit/Debit Card (Visa, Mastercard)\n• JazzCash (Pakistan)\n• Bank Transfer\n• All payments are secure & encrypted\n• Instant access after payment\n\nAny other questions?"
    },
    'certificate': {
      keywords: ['certificate', 'certified', 'completion', 'credential'],
      response: "📜 Certificate details:\n• Earn certificate upon course completion\n• Recognized by industry professionals\n• Shareable on LinkedIn\n• Verifiable using certificate ID\n• Valid for lifetime\n\nWant to know about a specific course?"
    },
    'refund': {
      keywords: ['refund', 'money back', 'return', 'cancel'],
      response: "🔄 Refund policy:\n• 30-day money-back guarantee\n• Full refund if unsatisfied\n• No questions asked\n• Cancel anytime\n• Keep course materials\n\nContact support@learnsmart.com for assistance"
    },
    'support': {
      keywords: ['help', 'support', 'contact', 'issue', 'problem', 'technical'],
      response: "📞 Support channels:\n• Email: support@learnsmart.com\n• Chat: Available 24/7\n• Phone: +92-123-4567890\n• FAQ: www.learnsmart.com/faq\n\nWhat's your issue?"
    },
    'instructors': {
      keywords: ['instructor', 'teacher', 'author', 'expert', 'who teaches'],
      response: "👨‍🏫 Our instructors:\n• Industry professionals with 5-15 years experience\n• Real-world project experience\n• Regularly updated content\n• Responsive to student questions\n• Career mentors\n\nInterested in becoming an instructor?"
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const findResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [key, value] of Object.entries(knowledgeBase)) {
      if (value.keywords.some(keyword => lowerMessage.includes(keyword))) {
        return value.response;
      }
    }
    
    return "😊 Great question! I'm still learning about that topic. For detailed help, please contact our support team at support@learnsmart.com or visit www.learnsmart.com/faq";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: findResponse(input),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
    }, 500);
  };

  const handleQuickReply = (question) => {
    const userMessage = {
      id: messages.length + 1,
      text: question,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: findResponse(question),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 500);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="chatbot-toggle"
        title="Open ChatBot"
      >
        <MessageCircle size={24} />
        <span className="notification-badge">1</span>
      </button>
    );
  }

  return (
    <div className={`chatbot-container ${isMinimized ? 'minimized' : ''}`}>
      {/* Header */}
      <div className="chatbot-header">
        <div className="header-content">
          <div className="header-icon">📚</div>
          <div className="header-text">
            <h3>LearnSmart Assistant</h3>
            <p>Online</p>
          </div>
        </div>
        <div className="header-actions">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="btn-action"
            title={isMinimized ? 'Maximize' : 'Minimize'}
          >
            {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="btn-action"
            title="Close"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`message ${msg.sender === 'bot' ? 'bot' : 'user'}`}
              >
                <div className="message-avatar">
                  {msg.sender === 'bot' ? '🤖' : '👤'}
                </div>
                <div className="message-content">
                  <div className="message-bubble">
                    {msg.text.split('\n').map((line, idx) => (
                      <div key={idx}>{line}</div>
                    ))}
                  </div>
                  <span className="message-time">
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="message bot">
                <div className="message-avatar">🤖</div>
                <div className="message-content">
                  <div className="message-bubble typing">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length === 1 && (
            <div className="quick-replies">
              <button onClick={() => handleQuickReply('What courses do you offer?')}>
                📚 Explore Courses
              </button>
              <button onClick={() => handleQuickReply('What is the pricing?')}>
                💰 Pricing Info
              </button>
              <button onClick={() => handleQuickReply('How do I enroll?')}>
                📝 Enrollment
              </button>
              <button onClick={() => handleQuickReply('Contact support')}>
                📞 Support
              </button>
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSendMessage} className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              disabled={isLoading}
              className="input-field"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="btn-send"
              title="Send message"
            >
              <Send size={18} />
            </button>
          </form>
        </>
      )}
    </div>
  );
}
