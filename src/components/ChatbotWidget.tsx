import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MessageSquare, X, Send, Mic, Bot, User, Sparkles } from "lucide-react";
import { getPetitionById } from "@/lib/petitions";
import { toast } from "sonner";

export const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Array<{ role: "bot" | "user"; content: string; link?: string; linkText?: string }>>([
    { 
      role: "bot", 
      content: "Hello! I'm your CitizenVoice AI Assistant. I can help you lodge a complaint, check the status of your petition, or explain departmental SLAs. How can I help you today?" 
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isTyping]);

  const getBotResponse = (userText: string) => {
    const lower = userText.toLowerCase();

    // Check for petition ID pattern
    const petMatch = userText.match(/PET-\d{4}-\d{6}/i);
    if (petMatch) {
      const petId = petMatch[0].toUpperCase();
      const pet = getPetitionById(petId);
      if (pet) {
        return {
          content: `Found Petition ${pet.id}: "${pet.title}". Current status is "${pet.status.toUpperCase()}" assigned to ${pet.assignedTo}. Estimated resolution: ${pet.estimatedResolution}.`,
          link: `/track?id=${pet.id}`,
          linkText: `View Timeline for ${pet.id}`
        };
      } else {
        return {
          content: `I couldn't find a petition with ID ${petId}. You can track all petitions in your Dashboard.`,
          link: `/dashboard`,
          linkText: "Go to Dashboard"
        };
      }
    }

    if (lower.includes("track") || lower.includes("status") || lower.includes("check")) {
      return {
        content: "You can track any grievance in real-time by entering its Petition ID on our tracking portal or through your Dashboard.",
        link: "/track",
        linkText: "Open Petition Tracker"
      };
    }

    if (lower.includes("submit") || lower.includes("file") || lower.includes("complain") || lower.includes("grievance") || lower.includes("report")) {
      return {
        content: "You can submit a grievance in 3 quick steps with automatic AI classification and evidence attachment.",
        link: "/submit",
        linkText: "Submit New Grievance"
      };
    }

    if (lower.includes("water") || lower.includes("sewage") || lower.includes("drain")) {
      return {
        content: "Water & sanitation grievances are given priority routing to the Municipal Water Board. Average SLA is 48-72 hours.",
        link: "/submit",
        linkText: "Lodge Water Grievance"
      };
    }

    if (lower.includes("pothole") || lower.includes("road") || lower.includes("light") || lower.includes("public works")) {
      return {
        content: "Road and street light issues fall under Public Works Department (PWD). You can upload photos as proof to expedite field crew dispatch.",
        link: "/submit",
        linkText: "Report Road Issue"
      };
    }

    if (lower.includes("category") || lower.includes("categories")) {
      return {
        content: "We support: Public Works, Healthcare, Education, Transportation, Water & Sanitation, and Law & Order. If you're not sure, our AI will classify it automatically!"
      };
    }

    return {
      content: "Thank you for reaching out. You can submit a grievance, track an existing one, or access your petitions dashboard anytime.",
      link: "/submit",
      linkText: "File a Grievance Now"
    };
  };

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || message;
    if (!text.trim()) return;
    
    setMessages(prev => [...prev, { role: "user", content: text }]);
    if (!textToSend) setMessage("");
    setIsTyping(true);

    setTimeout(() => {
      const resp = getBotResponse(text);
      setMessages(prev => [...prev, {
        role: "bot",
        content: resp.content,
        link: resp.link,
        linkText: resp.linkText
      }]);
      setIsTyping(false);
    }, 600);
  };

  const handleMicClick = () => {
    toast.info("Listening... speak your grievance (Demo Voice Input)");
    setTimeout(() => {
      setMessage("Street light broken on Main Road");
    }, 1500);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-elevated bg-gradient-primary hover:opacity-95 transition-all z-50 flex items-center justify-center p-0"
          size="icon"
          title="Open AI Support Assistant"
        >
          <MessageSquare className="h-6 w-6 text-white" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-2rem)] h-[540px] flex flex-col shadow-elevated z-50 animate-in slide-in-from-bottom-4 border-primary/20 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-gradient-primary text-primary-foreground">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-semibold text-sm leading-none flex items-center gap-1.5">
                  CitizenVoice AI
                  <Sparkles className="h-3 w-3 text-accent" />
                </p>
                <p className="text-[11px] text-primary-foreground/80 mt-1">24/7 Grievance Companion</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-white/20 h-8 w-8 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-card">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "bot" && (
                  <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="h-3.5 w-3.5 text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-sm shadow-sm ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-none"
                      : "bg-muted text-foreground rounded-bl-none border border-border/60"
                  }`}
                >
                  <p className="leading-relaxed">{msg.content}</p>
                  {msg.link && (
                    <div className="mt-2 pt-2 border-t border-border/40">
                      <Link 
                        to={msg.link} 
                        onClick={() => setIsOpen(false)}
                        className="text-xs font-semibold text-primary underline hover:text-primary/80 inline-flex items-center gap-1"
                      >
                        {msg.linkText || "View details"} &rarr;
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 items-center text-xs text-muted-foreground">
                <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <Bot className="h-3.5 w-3.5 text-primary" />
                </div>
                <div className="bg-muted px-3 py-2 rounded-2xl border border-border/60 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 bg-primary/60 rounded-full animate-bounce"></span>
                  <span className="h-1.5 w-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="h-1.5 w-1.5 bg-primary/60 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-1.5 bg-muted/40 border-t border-border/60 flex gap-1.5 overflow-x-auto text-[11px]">
            <button 
              onClick={() => handleSendMessage("How do I submit a grievance?")}
              className="px-2 py-1 bg-card border rounded-full text-foreground hover:bg-muted whitespace-nowrap"
            >
              How to submit?
            </button>
            <button 
              onClick={() => handleSendMessage("Track PET-2024-001234")}
              className="px-2 py-1 bg-card border rounded-full text-foreground hover:bg-muted whitespace-nowrap"
            >
              Track PET-2024-001234
            </button>
            <button 
              onClick={() => handleSendMessage("What categories are available?")}
              className="px-2 py-1 bg-card border rounded-full text-foreground hover:bg-muted whitespace-nowrap"
            >
              Categories
            </button>
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border bg-card">
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="icon" 
                className="shrink-0 h-9 w-9" 
                title="Voice dictation"
                onClick={handleMicClick}
              >
                <Mic className="h-4 w-4 text-muted-foreground hover:text-primary" />
              </Button>
              <Input
                placeholder="Ask AI or enter petition ID..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                className="h-9 text-sm"
              />
              <Button 
                onClick={() => handleSendMessage()} 
                size="icon" 
                className="shrink-0 h-9 w-9 bg-primary"
                disabled={!message.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};
