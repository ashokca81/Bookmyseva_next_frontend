import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, MoreVertical, User, Phone, Mail, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { io, Socket } from "socket.io-client";
import axios from "axios";
import { API_URL } from "@/config";

// Derive Socket URL from API_URL (remove /api suffix)
const SOCKET_URL = API_URL.replace(/\/api\/v1$|\/api$/, "");

interface Message {
  _id?: string;
  sender: 'user' | 'bot' | 'admin';
  message: string;
  isRead?: boolean;
  createdAt?: string;
}

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isOnYellowBg, setIsOnYellowBg] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [quickActions, setQuickActions] = useState<any[]>([]);
  const [showQuickMenu, setShowQuickMenu] = useState(false);
  const [guestDetails, setGuestDetails] = useState({ name: "", phone: "", email: "" });
  const [isUserInfoSubmitted, setIsUserInfoSubmitted] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Load User Info & Guest ID
  useEffect(() => {
    const stored = localStorage.getItem("chatGuestUser");
    if (stored) {
      setGuestDetails(JSON.parse(stored));
      setIsUserInfoSubmitted(true);
    }
    // Generate persistent Guest ID if not exists
    if (!localStorage.getItem("chatGuestId")) {
      localStorage.setItem("chatGuestId", `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);
    }
  }, []);

  // Initialize Socket and Fetch Data
  useEffect(() => {
    // Connect to backend
    const newSocket = io(SOCKET_URL);
    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to chat server");
      const guestId = localStorage.getItem("chatGuestId");
      const stored = localStorage.getItem("chatGuestUser");

      const joinData = {
        userId: null,
        guestId: guestId,
        guestDetails: stored ? JSON.parse(stored) : null
      };

      newSocket.emit("join_session", joinData);
    });

    newSocket.on("message", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    // Listen for session joined - load old messages
    newSocket.on("session_joined", (data: { sessionId: string | null, messages: Message[] }) => {
      console.log("Session joined:", data.sessionId);
      if (data.sessionId) {
        setSessionId(data.sessionId);
      }
      if (data.messages && data.messages.length > 0) {
        setMessages(data.messages);
        console.log("Loaded", data.messages.length, "old messages");
      }
    });

    // Listen for chat ended confirmation
    newSocket.on("chat_ended", () => {
      console.log("Chat ended by server");
      setMessages([]);
      setSessionId(null);
    });

    // Fetch Quick Actions
    axios.get(`${API_URL.replace('/api', '/api/v1')}/chat/quick-actions`)
      .then(res => setQuickActions(res.data))
      .catch(err => console.error("Failed to load actions", err));

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowQuickMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle Scroll logic for button styling
  useEffect(() => {
    const handleScroll = () => {
      const chatButton = document.querySelector('.chat-widget-button');
      if (!chatButton) return;

      const rect = chatButton.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;

      // Check if chat button is over yellow sections
      const elementsAtPoint = document.elementsFromPoint(rect.left + rect.width / 2, centerY);

      const isOverYellow = elementsAtPoint.some(el => {
        const styles = window.getComputedStyle(el);
        const bgColor = styles.backgroundColor;
        const bgImage = styles.backgroundImage;

        // Check for yellow background colors (RGB approximation of #FEB703, #FFCB05)
        const isYellowBg = bgColor.includes('254, 183, 3') ||
          bgColor.includes('255, 203, 5') ||
          bgImage.includes('gradient') && (
            bgImage.includes('254, 183, 3') ||
            bgImage.includes('255, 203, 5')
          );

        return isYellowBg;
      });

      setIsOnYellowBg(isOverYellow);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleUserInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (guestDetails.name && guestDetails.phone && guestDetails.email) {
      setIsUserInfoSubmitted(true);
      localStorage.setItem("chatGuestUser", JSON.stringify(guestDetails));
      if (socket) {
        const guestId = localStorage.getItem("chatGuestId");
        socket.emit("join_session", { userId: null, guestId, guestDetails });
      }
    }
  };

  const handleSendMessage = () => {
    if (!message.trim() || !socket) return;

    // Emit message to server (optimistic update happens via 'message' event listener)
    const guestId = localStorage.getItem("chatGuestId");
    socket.emit("send_message", { message, userId: null, guestId });
    setMessage("");
  };

  const handleSendMessageFromClick = (msg: string) => {
    if (!msg.trim() || !socket) return;
    const guestId = localStorage.getItem("chatGuestId");
    socket.emit("send_message", { message: msg, userId: null, guestId });
  };

  const handleQuickAction = (action: any) => {
    if (!socket) return;
    const guestId = localStorage.getItem("chatGuestId");

    if (action.type === 'message') {
      socket.emit("send_message", { message: action.config?.message || action.title, userId: null, guestId });
    } else if (action.type === 'navigate') {
      window.location.href = action.config?.url || '#';
    }
    // Track click
    axios.post(`${API_URL.replace('/api', '/api/v1')}/chat/quick-actions/${action._id}/click`);
    setShowQuickMenu(false); // Close menu after action
  };

  // End Chat - Clear everything and start fresh
  const handleEndChat = () => {
    if (!socket) return;

    const guestId = localStorage.getItem("chatGuestId");
    if (guestId) {
      // Tell server to end the session
      socket.emit("end_chat", { guestId });
    }

    // Clear local storage
    localStorage.removeItem("chatGuestId");
    localStorage.removeItem("chatGuestUser");

    // Generate new guest ID for next chat
    localStorage.setItem("chatGuestId", `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`);

    // Reset state
    setMessages([]);
    setSessionId(null);
    setGuestDetails({ name: "", phone: "", email: "" });
    setIsUserInfoSubmitted(false);
    setIsOpen(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`chat-widget-button fixed bottom-20 md:bottom-4 right-4 z-50 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300 group ${isOpen ? "hidden" : ""
          } ${isOnYellowBg
            ? "bg-gradient-to-br from-maroon via-maroon to-maroon-dark hover:shadow-maroon/50 ring-4 ring-marigold/30"
            : "bg-gradient-to-br from-marigold via-marigold-light to-marigold hover:shadow-marigold/50 ring-4 ring-white/50"
          }`}
      >
        {/* Animated Pulse Ring */}
        <span className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-75"></span>

        {/* Poojari Icon */}
        <div className="relative w-10 h-10 flex items-center justify-center">
          <div className="absolute inset-0 bg-white/40 rounded-full blur-sm group-hover:bg-white/60 transition-all duration-300"></div>
          <span className="text-3xl relative z-10 drop-shadow-lg animate-bounce" style={{ animationDuration: '3s' }}>🧘</span>
        </div>

        {/* Notification dot */}
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-sacred-red rounded-full flex items-center justify-center shadow-lg animate-bounce ring-2 ring-white">
          <span className="text-[11px] text-white font-bold">1</span>
        </span>

        {/* Sparkle Effect */}
        <span className="absolute -top-2 -left-2 text-xl animate-pulse opacity-80">✨</span>
        <span className="absolute -bottom-2 -right-2 text-xl animate-pulse opacity-80" style={{ animationDelay: '1s' }}>✨</span>
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-20 md:bottom-24 right-4 z-50 w-80 md:w-96 bg-card rounded-2xl shadow-elevated border border-border overflow-hidden animate-slide-up flex flex-col h-[80vh] max-h-[900px]">
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-maroon to-maroon-dark px-4 py-3 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-marigold/20 rounded-full flex items-center justify-center">
                <span className="text-xl">🙏</span>
              </div>
              <div>
                <h4 className="text-secondary-foreground font-semibold">Seva Sahayak</h4>
                <p className="text-secondary-foreground/70 text-xs flex items-center gap-1">
                  <span className="w-2 h-2 bg-spiritual-green rounded-full animate-pulse"></span>
                  Online now
                </p>
              </div>
            </div>

            {/* Header Actions - Right Side */}
            <div className="flex items-center gap-1">
              {/* End Chat Button - Only show when chat is active */}
              {isUserInfoSubmitted && messages.length > 0 && (
                <button
                  onClick={handleEndChat}
                  className="p-2 hover:bg-red-500/30 rounded-lg transition-colors group"
                  title="End Chat Session"
                >
                  <LogOut className="h-5 w-5 text-secondary-foreground group-hover:text-red-200" />
                </button>
              )}

              {/* Close/Minimize Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-secondary-foreground/10 rounded-lg transition-colors"
                title="Minimize"
              >
                <X className="h-5 w-5 text-secondary-foreground" />
              </button>
            </div>
          </div>

          {!isUserInfoSubmitted ? (
            <div className="flex-1 p-6 flex flex-col justify-center space-y-6 bg-white overflow-y-auto">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-marigold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="h-8 w-8 text-marigold" />
                </div>
                <h3 className="font-bold text-xl text-maroon">Namaste! 🙏</h3>
                <p className="text-sm text-gray-500 max-w-[250px] mx-auto">
                  Please provide your details to start chatting with our Seva team.
                </p>
              </div>

              <form onSubmit={handleUserInfoSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs font-medium uppercase text-gray-500">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      id="name"
                      placeholder="Enter your name"
                      className="pl-9"
                      value={guestDetails.name}
                      onChange={(e) => setGuestDetails({ ...guestDetails, name: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-xs font-medium uppercase text-gray-500">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone"
                      className="pl-9"
                      value={guestDetails.phone}
                      onChange={(e) => setGuestDetails({ ...guestDetails, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs font-medium uppercase text-gray-500">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-9"
                      value={guestDetails.email}
                      onChange={(e) => setGuestDetails({ ...guestDetails, email: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-maroon hover:bg-maroon-dark text-white shadow-lg shadow-maroon/20 transition-all hover:scale-[1.02]"
                >
                  Start Chatting
                </Button>

                <p className="text-[10px] text-center text-gray-400 pt-2">
                  Your details are safe with us and will only be used for communication purposes.
                </p>
              </form>
            </div>
          ) : (
            <>
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white scrollbar-thin scrollbar-thumb-maroon/20">
                {/* Initial Welcome Message (Local) */}
                <div className="flex flex-col gap-3">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-marigold/20 rounded-full flex items-center justify-center shrink-0">
                      <span className="text-sm">🙏</span>
                    </div>
                    <div className="bg-[#FFF9E5] rounded-2xl rounded-tl-sm px-4 py-3 max-w-[85%] border border-marigold/10 shadow-sm">
                      <p className="text-sm text-foreground">
                        Namaste! 🙏 Welcome to Book My Seva. How may I assist you today?
                      </p>
                    </div>
                  </div>

                  {/* Quick Actions Menu Button */}
                  <div className="relative" ref={menuRef}>
                    <button
                      onClick={() => setShowQuickMenu(!showQuickMenu)}
                      className="flex items-center gap-1 text-marigold hover:text-maroon text-xs font-medium py-1 hover:underline transition-colors cursor-pointer"
                    >
                      <MoreVertical className="h-4 w-4" />
                      <span>Quick Options</span>
                    </button>

                    {/* Dropdown Menu */}
                    {showQuickMenu && (
                      <div className="absolute left-0 top-full mt-1 w-48 bg-white rounded-xl shadow-lg border border-border overflow-hidden z-10 animate-in fade-in slide-in-from-top-2 duration-200">
                        {quickActions.map((action, index) => (
                          <button
                            key={action._id}
                            onClick={() => handleQuickAction(action)}
                            className={`w-full text-left px-4 py-3 text-sm text-foreground hover:bg-marigold/10 transition-colors flex items-center gap-3 ${index !== quickActions.length - 1 ? 'border-b border-border/50' : ''
                              }`}
                          >
                            <span className="text-lg">{action.icon}</span>
                            <span>{action.title}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Dynamic Messages */}
                {messages.map((msg, idx) => (
                  <div key={idx} className="flex flex-col gap-2">
                    <div className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                      {msg.sender !== 'user' && (
                        <div className="w-8 h-8 bg-marigold/20 rounded-full flex items-center justify-center shrink-0">
                          <span className="text-sm">🙏</span>
                        </div>
                      )}
                      <div className={`rounded-2xl px-4 py-3 max-w-[85%] shadow-sm ${msg.sender === 'user'
                        ? 'bg-[#8D0303] text-white rounded-tr-sm'
                        : 'bg-[#FFF9E5] text-foreground rounded-tl-sm border border-marigold/10'
                        }`}>
                        <p className={`text-sm ${msg.sender === 'user' ? 'text-white' : ''}`}>{msg.message}</p>
                      </div>
                    </div>

                    {/* Bot Quick Replies */}
                    {msg.sender === 'bot' && (msg as any).metadata?.quickReplies && (
                      <div className="flex flex-wrap gap-2 px-2 py-1">
                        {(msg as any).metadata.quickReplies.map((reply: string, i: number) => (
                          <button
                            key={i}
                            onClick={() => handleSendMessageFromClick(reply)}
                            className="bg-[#FFF9E5] text-marigold hover:bg-[#FFF0C2] text-xs font-medium px-4 py-2 rounded-full transition-colors border border-marigold/10 shadow-sm"
                          >
                            {reply}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-border bg-white">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type your question..."
                    className="flex-1 bg-muted rounded-xl px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-marigold/50"
                  />
                  <Button onClick={handleSendMessage} variant="sacred" size="icon" className="shrink-0 bg-maroon hover:bg-maroon-dark text-white">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default ChatbotWidget;
