"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Send, Bot, User, Globe } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [language, setLanguage] = useState("fr")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const savedLanguage = localStorage.getItem("userLanguage") || "fr"
    setLanguage(savedLanguage)

    // Welcome message
    const welcomeMessages = {
      fr: "Bonjour ! Je suis votre assistant Auto27. Comment puis-je vous aider à prendre rendez-vous aujourd'hui ?",
      en: "Hello! I'm your Auto27 assistant. How can I help you book an appointment today?",
      ar: "مرحباً! أنا مساعدك في Auto27. كيف يمكنني مساعدتك في حجز موعد اليوم؟",
    }

    setMessages([
      {
        id: "1",
        text: welcomeMessages[savedLanguage as keyof typeof welcomeMessages],
        sender: "bot",
        timestamp: new Date(),
      },
    ])
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const translations = {
    fr: {
      placeholder: "Tapez votre message...",
      send: "Envoyer",
      typing: "En train d'écrire...",
      language: "Langue",
    },
    en: {
      placeholder: "Type your message...",
      send: "Send",
      typing: "Typing...",
      language: "Language",
    },
    ar: {
      placeholder: "اكتب رسالتك...",
      send: "إرسال",
      typing: "يكتب...",
      language: "اللغة",
    },
  }

  const t = translations[language as keyof typeof translations]

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate bot response
    setTimeout(() => {
      const botResponses = {
        fr: [
          "Je comprends que vous souhaitez prendre rendez-vous. Quel type de service recherchez-vous ?",
          "Parfait ! Quand souhaiteriez-vous venir ? Je peux vous proposer plusieurs créneaux.",
          "Excellent choix ! Je vais noter vos préférences. Avez-vous d'autres questions ?",
          "Je vais vérifier la disponibilité pour vous. Un moment s'il vous plaît...",
        ],
        en: [
          "I understand you want to book an appointment. What type of service are you looking for?",
          "Perfect! When would you like to come? I can suggest several time slots.",
          "Excellent choice! I'll note your preferences. Do you have any other questions?",
          "I'll check availability for you. One moment please...",
        ],
        ar: [
          "أفهم أنك تريد حجز موعد. ما نوع الخدمة التي تبحث عنها؟",
          "ممتاز! متى تريد أن تأتي؟ يمكنني اقتراح عدة أوقات.",
          "اختيار ممتاز! سأسجل تفضيلاتك. هل لديك أسئلة أخرى؟",
          "سأتحقق من التوفر لك. لحظة من فضلك...",
        ],
      }

      const responses = botResponses[language as keyof typeof botResponses]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage)
    localStorage.setItem("userLanguage", newLanguage)
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Language Selector */}
      <div className="mb-4 flex justify-end">
        <div className="flex items-center space-x-2">
          <Globe className="w-4 h-4 text-[#444444]" />
          <Select value={language} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fr">Français</SelectItem>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="ar">العربية</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Chat Container */}
      <Card className="h-[600px] flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${
                  message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender === "user" ? "bg-[#FFDD00]" : "bg-[#444444]"
                  }`}
                >
                  {message.sender === "user" ? (
                    <User className="w-4 h-4 text-black" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>
                <div
                  className={`px-4 py-2 rounded-lg ${
                    message.sender === "user" ? "bg-[#FFDD00] text-black" : "bg-gray-100 text-[#444444]"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 rounded-full bg-[#444444] flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-gray-100 px-4 py-2 rounded-lg">
                  <p className="text-sm text-[#444444]">{t.typing}</p>
                  <div className="flex space-x-1 mt-1">
                    <div className="w-2 h-2 bg-[#FFDD00] rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-[#FFDD00] rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-[#FFDD00] rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t p-4">
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t.placeholder}
              className="flex-1"
              disabled={isTyping}
            />
            <Button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="bg-[#FFDD00] hover:bg-[#F9C900] text-black"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
