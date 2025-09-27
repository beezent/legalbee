import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, Send, Volume2, MicOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  quickActions?: string[];
}

interface ChatInterfaceProps {
  className?: string;
}

export const ChatInterface = ({ className }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "আমি Legal Bee, আপনার আইনি সহায়ক। আমি বাংলাদেশের আইন সম্পর্কে আপনাকে সাহায্য করতে পারি। আপনার প্রশ্ন করুন",
      isUser: false,
      timestamp: new Date(),
      quickActions: [
        "Explain in simple words",
        "Show me the law reference",
        "Summarize this",
      ],
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // ✅ API call
  const handleSendMessage = async (text: string = inputText) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    try {
      const response = await fetch(
        "https://mdmuhir-legal-bee-api.hf.space/query",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: text }),
        }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response || "⚠️ দুঃখিত, আমি উত্তর আনতে পারিনি।",
        isUser: false,
        timestamp: new Date(),
        quickActions: [
          "Explain in simple words",
          "Show me the law reference",
          "Summarize this",
        ],
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error fetching API:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          text: "⚠️ সার্ভারে সংযোগ করতে সমস্যা হচ্ছে। পরে আবার চেষ্টা করুন।",
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickAction = (action: string) => {
    handleSendMessage(action);
  };

  // ✅ Render structured replies
  // ✅ Render messages neatly with bold headers
  // ✅ Render messages neatly with bold headers (Bangla + English)
  const renderMessage = (text: string) => {
    // Match either emoji headers OR English section headers
    if (/(🎯|📚|⚖️|📋|⚠️|💼)/i.test(text)) {
      const sections = text.split(/(?=(🎯|📚|⚖️|📋|⚠️|💼))/i);
      return (
        <div className="space-y-2">
          {sections.map((sec, idx) => {
            const [header, ...rest] = sec.trim().split("→");
            if (!header) return null;
            return (
              <div key={idx} className="text-sm leading-relaxed">
                <strong className="font-semibold">{header.trim()} →</strong>{" "}
                {rest.join("→")}
              </div>
            );
          })}
        </div>
      );
    }
    return (
      <p className="text-sm leading-relaxed whitespace-pre-line">{text}</p>
    );
  };

  // ✅ Speech Recognition + TTS
  useEffect(() => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "bn-BD";

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
        toast({
          title: "Voice input error",
          description: "Could not process voice input. Please try again.",
          variant: "destructive",
        });
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    if ("speechSynthesis" in window) {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      try {
        setIsListening(true);
        recognitionRef.current.start();
      } catch (error) {
        console.error("Error starting speech recognition:", error);
        setIsListening(false);
        toast({
          title: "Voice input unavailable",
          description: "Voice input is not supported in your browser.",
          variant: "destructive",
        });
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const speakText = (text: string) => {
    if (synthRef.current && "speechSynthesis" in window) {
      synthRef.current.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "bn-BD";
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      synthRef.current.speak(utterance);
    } else {
      toast({
        title: "Text-to-speech unavailable",
        description: "Text-to-speech is not supported in your browser.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className={cn("flex flex-col h-full bg-background", className)}>
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex",
              message.isUser ? "justify-end" : "justify-start"
            )}
          >
            <div className="flex flex-col max-w-[80%]">
              <div
                className={cn(
                  message.isUser
                    ? "chat-bubble-user ml-auto"
                    : "chat-bubble-bot"
                )}
              >
                {renderMessage(message.text)}
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs opacity-60">
                    {message.timestamp.toLocaleTimeString("bn-BD", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  {!message.isUser && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 opacity-60 hover:opacity-100"
                      onClick={() => speakText(message.text)}
                    >
                      <Volume2 className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Quick Action Buttons */}
              {!message.isUser && message.quickActions && (
                <div className="flex flex-wrap gap-2 mt-2 ml-2">
                  {message.quickActions.map((action, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      size="sm"
                      className="text-xs h-7 px-2 border-primary/20 text-primary hover:bg-primary/5"
                      onClick={() => handleQuickAction(action)}
                    >
                      {action}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="chat-bubble-bot">
              <div className="flex items-center space-x-1">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-primary rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
                <span className="text-xs ml-2">Legal Bee typing...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t bg-card p-4">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            className={cn(
              "shrink-0 border-primary/20 hover:bg-primary/5",
              isListening &&
                "bg-emergency text-emergency-foreground border-emergency"
            )}
            onClick={isListening ? stopListening : startListening}
          >
            {isListening ? (
              <MicOff className="h-4 w-4" />
            ) : (
              <Mic className="h-4 w-4 text-primary" />
            )}
          </Button>

          <div className="flex-1 relative">
            <Input
              ref={inputRef}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your legal question in Bangla or English..."
              className="pr-12 border-primary/20 focus:border-primary"
            />
            <Button
              onClick={() => handleSendMessage()}
              disabled={!inputText.trim()}
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 bg-primary hover:bg-primary/90"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
