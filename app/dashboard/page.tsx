"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Chatbot from "@/components/chatbot"
import Footer from "@/components/footer"

export default function Dashboard() {
  const [language, setLanguage] = useState("fr")
  const router = useRouter()

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      router.push("/")
      return
    }

    const savedLanguage = localStorage.getItem("userLanguage") || "fr"
    setLanguage(savedLanguage)
  }, [router])

  const translations = {
    fr: {
      title: "Assistant Auto27",
      subtitle: "Votre assistant intelligent pour la prise de rendez-vous",
    },
    en: {
      title: "Auto27 Assistant",
      subtitle: "Your intelligent assistant for appointment booking",
    },
    ar: {
      title: "مساعد Auto27",
      subtitle: "مساعدك الذكي لحجز المواعيد",
    },
  }

  const t = translations[language as keyof typeof translations]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#444444] mb-2">{t.title}</h1>
          <p className="text-gray-600">{t.subtitle}</p>
        </div>
        <Chatbot />
      </main>
      <Footer />
    </div>
  )
}
